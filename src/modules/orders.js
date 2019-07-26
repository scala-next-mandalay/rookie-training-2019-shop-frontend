import { URL_REST_ORDERS } from '../constants';
import moment from 'moment';
import axios from 'axios';

const initialState = {
  postResultObj: null,
  requestParams: null,
  alreadyFetched: false,
  rows: [],
  selectedOrderId: null,
  searchText: '',
  clickedOrderId : '',
  searchTextBegin:'',
  searchTextEnd:''
};

//=============================================================================
//　Reducer
//=============================================================================
export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ORDERS_FETCH_DONE':
      return {
        ...state,
        rows: action.payload
      };
    case 'ORDERS_SET_REQUEST_PARAMS':
      return {
        ...state,
        requestParams: action.payload,
      };
    case 'ORDERS_SET_BY_ID':
      return {
        ...state,
        selectedOrderId: action.payload
      };
    case 'ORDERS_SET_SEARCH_TEXT':
      console.log('ORDERS_SET_SEARCH_TEXT',action.payload);
      return {
        
        ...state,
        searchText: action.payload
      };
    case 'ORDERS_SET_BEGIN_DATE':
      console.log('ORDERS_SET_BEGIN_DATE',action.payload);
      return {
        
        ...state,
        searchTextBegin : action.payload
       
      };
    case 'ORDERS_SET_END_DATE':
      console.log('ORDERS_SET_END_DATE',action.payload);
      return {
        ...state,
        searchTextEnd : action.payload
       
      };
    case 'ORDERS_POST_DONE':
      console.log('ORDERS_POST_DONE', action.payload);
      return {
        ...state,
        requestParams: null,
        postResultObj: action.payload
      };
    default:
      return state;
  }
};

//=============================================================================
//　ActionCreators
//=============================================================================
export const setRequestParams = addressForm => {
  
  return(dispatch, getState) => {
    const reqParams = {...addressForm};
   
    reqParams.total_price = getState().cart.totalPrice;
     console.log("reqParams.total_price",reqParams.total_price);
    reqParams.item_id_array = [];
    reqParams.item_qty_array = [];
    reqParams.item_price_array = [];
    
    const cartItems = getState().cart.rows;
    for (const cartItem of cartItems) {
      reqParams.item_id_array.push(cartItem.id);
      reqParams.item_qty_array.push(cartItem.quantity);
      reqParams.item_price_array.push(cartItem.price);
    }

    
    dispatch({
      type: 'ORDERS_SET_REQUEST_PARAMS',
      payload: reqParams
    });
  };
};

const _fetchRows = async (beginDate=null, endDate=null) => {
  let url = URL_REST_ORDERS;
  const urlParams = [];
  if (beginDate) {
    urlParams.push("begin_date=" + moment(beginDate).format('YYYYMMDD'));
  }
  if (endDate) {
    urlParams.push("end_date=" + moment(endDate).format('YYYYMMDD'));
  } 
  console.log('URLPARAMS',urlParams )
  if (urlParams.length > 0) {
    url = url + '?' + urlParams.join('&');
  }
  console.log(url);
  
  const axRes = await axios.get(url); 

  return axRes.data.data;
}

export const fetchAllOrders = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'ORDERS_FETCH_DONE',
      payload: await _fetchRows()
    });
  };
};
export const clickOrderId = order_id => ({
  type: 'ORDER_ITEM_CLICK',
  payload: order_id
}) ;

export const setOrderId = orderId => ({
  type: 'ORDERS_SET_BY_ID',
  payload: orderId
});

export const setSearchText = text => ({
  type: 'ORDERS_SET_SEARCH_TEXT',
  payload: text
});

export const setbeginDate = (date) => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'ORDERS_SET_BEGIN_DATE',
      payload: date
    });
    
    dispatch({
      type: 'ORDERS_FETCH_DONE',
      payload: await _fetchRows(date, getState().orders.searchTextEnd)
    });
  };
};

export const setendDate = (date) => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'ORDERS_SET_END_DATE',
      payload: date
    });
    
    dispatch({
      type: 'ORDERS_FETCH_DONE',
      payload: await _fetchRows(getState().orders.searchTextBegin, date)
    });
  };
};

export const postOrder = () => {
  return async (dispatch, getState) => {
    const reqParams = getState().orders.requestParams;
    const axRes = await axios.post(URL_REST_ORDERS, reqParams);
    
    dispatch({
      type: 'ORDERS_POST_DONE',
      payload: axRes.data.data
    });
    dispatch({
      type: 'CART_CLEAR_CART' //modules/cart.js
    });
  }
}


