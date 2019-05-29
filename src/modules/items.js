import axios from 'axios'
import { URL_GET_ALL_ITEMS } from '../constants'
import format from 'string-format'

const initialState = {
  inputText: '',
  items: [],
  noMoreFetch: false,
  visibilityFilter: null
}

export const　itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return {
        ...state,
        visibilityFilter: action.payload
      }
    case 'FETCH_TODOS_DONE':
      return {
        ...state,
        items: state.items.concat(action.payload)
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

export const getVisibleItems = (items, category_id) => {
  if (category_id == null) {
    return items
  }
  else {
    return items.filter(t => t.category_id === category_id)
  }
}

//=============================================================================
//　ActionCreators
//=============================================================================

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  payload: filter
})

export const fetchAllItems = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'SET_ALREADY_FETCHED'
    })

    const axRes = await axios.get(format(URL_GET_ALL_ITEMS, getState().items.items.length))

    if (axRes.data.data.length === 0) {
      dispatch({
        type: 'NO_MORE_FETCH'
      })
    }

    dispatch({
      type: 'FETCH_TODOS_DONE',
      payload: axRes.data.data
    })
  }
}
