import { URL_REST_ORDERITEMS_ID } from '../constants';
import axios from 'axios';
const initialState = {
   alreadyFetched: false,
   rows: [],
};

//=============================================================================
//　Reducer
//=============================================================================
export const orderItemReducer = (state = initialState, action) => {
  switch (action.type) {
    
      case 'FETCH_ORDERSITEM_DONE':
      return {
        ...state,
        rows: action.payload
      };
    default:
      return state;
  }
};

//=============================================================================
//　ActionCreators
//=============================================================================

export const fetchAllOrdersItem = () => {
  return async (dispatch, getState) => {
   const axRes = await axios.get(URL_REST_ORDERITEMS_ID);
    dispatch({
      type: 'FETCH_ORDERSITEM_DONE',
      payload: axRes.data.data
    });
  };
};

