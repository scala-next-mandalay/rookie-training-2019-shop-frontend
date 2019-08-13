import axios from 'axios';
import { URL_GET_ALL_ITEMS } from '../constants';
import format from 'string-format';

const initialState = {
  inputText: '',
  rows: [],
  noMoreFetch: false,
  selectedCateogryId: null
};

//=============================================================================
//　Reducer
//=============================================================================
export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ITEMS_SET_CATEGORY_ID':
      return {
        ...state,
        selectedCateogryId: action.payload
      };
    case 'ITEMS_FETCH_DONE':
      return {
        ...state,
        rows:[...state.rows , ...action.payload] 
      };
    case 'ITEMS_NO_MORE_FETCH':
      return {
        ...state,
        noMoreFetch: true
      };
    default:
      return state;
  }
};

//=============================================================================
//　ActionCreators
//=============================================================================
export const setCategoryId = categoryId => ({
  type: 'ITEMS_SET_CATEGORY_ID',
  payload: categoryId
});

export const fetchItems = () => {
  return async (dispatch, getState) => {
    const axRes = await axios.get(format(URL_GET_ALL_ITEMS, getState().items.rows.length));
     
    if (axRes.data.data.length === 0) {
      dispatch({
        type: 'ITEMS_NO_MORE_FETCH'
      });
    }
    dispatch({
      type: 'ITEMS_FETCH_DONE',
      payload: axRes.data.data
    });
   
  };
};
