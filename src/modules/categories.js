import axios from 'axios';
import { URL_GET_ALL_CATEGORIES } from '../constants';

const initialState = {
  alreadyFetched: false,
  rows: []
};

//=============================================================================
//　Reducer
//=============================================================================
export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CATEGORIES_SET_ALREADY_FETCHED':
      return {
        ...state,
        alreadyFetched: true
      };
    case 'CATEGORIES_FETCH_DONE':
      return {
        ...state,
        rows: [{id:-1, name:'ALL'}, ...action.payload]
      };
    default:
      return state;
  }
};

//=============================================================================
//　ActionCreators
//=============================================================================
export const fetchAllCategories = () => {
  return async (dispatch, getState) => {
    
    if (getState().categories.alreadyFetched) {
        return;
    }

    dispatch({
        type: 'CATEGORIES_SET_ALREADY_FETCHED'
    });

    const axRes = await axios.get(URL_GET_ALL_CATEGORIES);
   
    dispatch({
      type: 'CATEGORIES_FETCH_DONE',
      payload: axRes.data.data
    });
  };
};
