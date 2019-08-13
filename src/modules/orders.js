/*global localStorage*/
import { URL_REST_ORDERS,URL_REST_ORDER_ID ,URL_REST_ORDERITEMS_ID} from '../constants';
import moment from 'moment';
import axios from 'axios';

const initialState = {
  postResultObj: null,
  requestParams: null,
  alreadyFetched: false,
  rows: [],
  selectedOrderId: null,
  searchTextOrderId: '',
  clickedOrderItems : [],
  searchTextBegin:'',
  searchTextEnd:'',
  loading:false,
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
        postResultObj: null
        
      };
      
    case 'ORDERS_SET_BY_ID':
      return {
        ...state,
        selectedOrderId: action.payload
      };
      
    case 'ORDERS_SET_SEARCH_ByOrderId':
       return {
        ...state,
        searchTextOrderId: action.payload
      };
      
    case 'ORDERS_SET_BEGIN_DATE':
      return {
        ...state,
        searchTextBegin : action.payload
       
      };
      
    case 'ORDERS_SET_END_DATE':
      return {
        ...state,
        searchTextEnd : action.payload
       
      };
      case 'ORDER_LOADING':
        return{
          ..._getCommonState(state),
          loading:true
        }; 
    case 'ORDERS_POST_DONE':
      return {
        ..._getCommonState(state),
        postResultObj: action.payload,
        
        
      };
     
     
      
    default:
      return state;
  }
};
const _getCommonState = (state) => ({
  ...state, 
  loading: false,
});
//=============================================================================
//　ActionCreators
//=============================================================================
export const setRequestParams = addressForm => {
  
  return(dispatch, getState) => {
    const reqParams = {...addressForm};
    reqParams.total_price = getState().cart.totalPrice;
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



const _fetchRows = async (beginDate=null, endDate=null, id=null) => {
  let url = URL_REST_ORDERS;
  const urlParams = [];
  if (beginDate) {
   
    urlParams.push("begin_date=" + moment(beginDate).format('YYYYMMDD'));
  }
  if (endDate) {
    urlParams.push("end_date=" + moment(endDate).format('YYYYMMDD'));
  }
  if (urlParams.length > 0) {
    url = url + '?' + urlParams.join('&');
  }
  if(id){
    url = URL_REST_ORDER_ID +"?order_id="+ id;
  }
  
  const axRes = await axios.get(url); 
  return axRes.data.data;
};




//for Fetching All Orders
export const fetchAllOrders = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'ORDERS_FETCH_DONE',
      payload: await _fetchRows()
    });
  };
};

//for ViewDetail of OrderHistory
export const clickOrderId = order_id => {
  return async (dispatch, getState) => {
    dispatch({
     
      type: 'ORDERS_SET_BY_ID',
      payload: order_id
    });
    const axRes = await axios.get(URL_REST_ORDERITEMS_ID+"?order_id="+order_id);
     dispatch({
      type: 'FETCH_ORDERSITEM_DONE',
      payload: axRes.data.data
    });
    
 
} ;
};

//for Searching Data By OrderId
export const setSearchByOrderId = (orderId) => {
  return async (dispatch,getState) => {
    dispatch({
       type: 'ORDERS_SET_SEARCH_ByOrderId',
        payload: orderId
    });
    dispatch({
      type: 'ORDERS_FETCH_DONE',
      payload: await _fetchRows(null, null, orderId)
    });
  };
 
};

//for Searching Data By BeginDate
export const setbeginDate = (date) => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'ORDERS_SET_BEGIN_DATE',
      payload: date
    });
    
    dispatch({
      type: 'ORDERS_FETCH_DONE',
      payload: await _fetchRows(date, getState().orders.searchTextEnd,null)
    });
  };
};

//for Searching Data By EndDate
export const setendDate = (date) => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'ORDERS_SET_END_DATE',
      payload: date
    });
    
    dispatch({
      type: 'ORDERS_FETCH_DONE',
      payload: await _fetchRows(getState().orders.searchTextBegin,date,null)
    });
  };
};

//for Posting Customer_Information in OrderSuccess 
export const postOrder = () => {
  
  return async (dispatch, getState) => {
    dispatch({
      type:'ORDER_LOADING',
      
    });
    const reqParams = getState().orders.requestParams;
    const axRes = await axios.post(URL_REST_ORDERS, reqParams);
    localStorage.removeItem('cart');
    dispatch({
      type: 'ORDERS_POST_DONE',
      payload: axRes.data.data
    });
    dispatch({
      type: 'CART_CLEAR_CART' 
    });
  };
};


