import axios from 'axios'
import { URL_GET_ALL_ITEMS } from '../constants'
import format from 'string-format'

const initialState = {
  inputText: '',
  rows: [],
  noMoreFetch: false,
  selectedCateogryId: null
}

export const getItemsByCategory = (rows, categoryId) => {
  if (categoryId == null) {
    return rows
  }
  else {
    return rows.filter(t => t.category_id === categoryId)
  }
}

//=============================================================================
//　Reducer
//=============================================================================
export const　itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CATEGORY_ID':
      return {
        ...state,
        selectedCateogryId: action.payload
      }
    case 'FETCH_ITEMS_DONE':
      return {
        ...state,
        rows: state.rows.concat(action.payload)
      }
    case 'NO_MORE_FETCH':
      return {
        ...state,
        noMoreFetch: true
      }
    default:
      return state
  }
}

//=============================================================================
//　ActionCreators
//=============================================================================
export const setCategoryId = categoryId => ({
  type: 'SET_CATEGORY_ID',
  payload: categoryId
})

export const fetchAllItems = () => {
  return async (dispatch, getState) => {
    const axRes = await axios.get(format(URL_GET_ALL_ITEMS, getState().items.rows.length))

    if (axRes.data.data.length === 0) {
      dispatch({
        type: 'NO_MORE_FETCH'
      })
    }

    dispatch({
      type: 'FETCH_ITEMS_DONE',
      payload: axRes.data.data
    })
  }
}
