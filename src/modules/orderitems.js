
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
    

    const axRes = {
      data: {
        data: [
          {id: 1, order_id: 1,item_id: 23,unit_price:1000,quantity:50, item_name:'item23'},
          {id: 2, order_id: 2,item_id: 15,unit_price:1000,quantity:8, item_name:'item15'},
          {id: 3, order_id: 2,item_id: 14,unit_price:1000,quantity:7, item_name:'item14'},
          {id: 4, order_id: 3,item_id: 20,unit_price:1000,quantity:9, item_name:'item20'},
          {id: 5, order_id: 3,item_id: 21,unit_price:1000,quantity:3, item_name:'item21'},
          {id: 6, order_id: 4,item_id: 23,unit_price:1000,quantity:1, item_name:'item23'},
        ]
      }
    };
    
    
    dispatch({
      type: 'FETCH_ORDERSITEM_DONE',
      payload: axRes.data.data
    });
  };
};

