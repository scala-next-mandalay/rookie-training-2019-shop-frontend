const initialState = {
  rows: [],
  totalQuantity: 0,
  maxQuantity: 0,
}

//=============================================================================
//　Reducer
//=============================================================================
export const　cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART_ITEM':
      _addCartItem(action.payload, state)
      return _updateState()
    case 'FETCH_CART_DATA':
      return _updateState()
    case 'CHANGE_QUANTITY':
      _changeQuantity(state.rows, action.payload.itemId, action.payload.quantity)
      return _updateState()
    case 'DELETE_CART_ITEM':
      _deleteCartItem(state.rows, action.payload)
      return _updateState()
    default:
      return state
  }
}

const _updateState = (state) => {
  const newState = {...state}

  const jsonData = localStorage.getItem('cart')
  if (jsonData) {
    newState.rows = JSON.parse(jsonData)
  }

  let totalQuantity = 0
  let maxQuantity = 0
  for (const row of newState.rows) {
    const qty = parseInt(row.quantity)
    totalQuantity += qty
    if (qty > maxQuantity) {
      maxQuantity = qty
    }
  }
  newState.totalQuantity = totalQuantity
  newState.maxQuantity = maxQuantity

  return newState
}


//=============================================================================
//　ActionCreators
//=============================================================================
export const deleteCartItem = itemId => ({
  type: 'DELETE_CART_ITEM',
  payload: itemId
})

const _deleteCartItem = (rows, itemId) => {
  //copy items except the itemId.
  const cartItems = []
  for (const row of rows) {
    if (row.id !== itemId) {
      cartItems.push({...row})
    }
  }

  //store in localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems));
}


export const changeQuantity = (itemId, quantity) => ({
  type: 'CHANGE_QUANTITY',
  payload: {itemId, quantity}
})

const _changeQuantity = (rows, itemId, quantity) => {
  //Be empty if the value smaller than 1.
  if (!quantity || quantity <= 0) {
    quantity = null
  }

  //All cart data
  const cartItems = [...rows]

  //update quantity
  for (const row of cartItems) {
    if (row.id === itemId) {
      row.quantity = quantity
      break
    }
  }

  //store in localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

export const addCartItem = item => ({
  type: 'ADD_CART_ITEM',
  payload: item
})

const _addCartItem = (item, state) => {
  //Define cart item object
  const cartItem = {...item}
  cartItem.quantity = 1

  //All cart data
  const cartItems = [...state.rows]
  
  //count up if found the item.
  let found = false
  for (const row of cartItems) {
    if (row.id === cartItem.id) {
      row.quantity += 1
      found = true
      break
    }
  }

  //push the item if not found.
  if (!found) {
    cartItems.push(cartItem)
  }

  //store in localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems) );
}

export const fetchCartData = item => ({
  type: 'FETCH_CART_DATA'
})

