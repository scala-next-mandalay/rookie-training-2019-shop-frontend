import { ordersReducer, setRequestParams, setSearchByOrderId,fetchAllOrders,postOrder,setbeginDate,setendDate,clearCheckout} from '../orders';
import mockAxios from "axios";
// import { async } from 'q';
/*global expect*/
/*global jest*/

//==============================================================================
//Reducer testing
//==============================================================================

describe("order reducer actions", () => {

  const initialState = {
    postResultObj: null,
    requestParams: null,
    rows:   [{id:1, first_name: "mg", last_name: "aung" ,address1:"30X31street",address2:"YaKinTaung",city:"AungMyayTharZan",state:"Mandalay"},
            {id:2, first_name: "mg", last_name: "myint" ,address1:"29x30street",address2:"YaKinTaung",city:"AungMyayTharZan",state:"Mandalay"}],

    selectedOrderId: null,
    searchTextOrderId: '',
    searchTextBegin:'',
    searchTextEnd:'',
    loading:false

  }
  const _getCommonState={
  ...initialState, 
  loading: false,
};

  it("order set request params", () => {
    const action = {
      type: "ORDERS_SET_REQUEST_PARAMS",
      payload: { first_name: "mg", last_name: "aung" ,address1:"30X31street",address2:"YaKinTaung",city:"AungMyayTharZan",state:"Mandalay"}

    };

    const expectedState = {
      ...initialState,
      requestParams: { first_name: "mg", last_name: "aung" ,address1:"30X31street",address2:"YaKinTaung",city:"AungMyayTharZan",state:"Mandalay" },
      postResultObj: null

    }

    const inputState = ordersReducer(initialState, action);
    expect(inputState).toEqual(expectedState);

  });



  it("post order", () => {

    const action = {
      type: "ORDERS_POST_DONE",
      payload: { first_name: "aung", last_name: "aung" }

    };

    const expectedState = {
      ..._getCommonState,
      requestParams: null,
      postResultObj: { first_name: "aung", last_name: "aung" }

    };

    const inputState = ordersReducer(initialState, action);
    expect(inputState).toEqual(expectedState);

  });
  
  
  it("order fetch", () => {
    const action = {
      type: "ORDERS_FETCH_DONE",
      payload: [{id:1, first_name: "mg", last_name: "aung" ,address1:"30X31street",address2:"YaKinTaung",city:"AungMyayTharZan",state:"Mandalay"},
            {id:2, first_name: "mg", last_name: "myint" ,address1:"29x30street",address2:"YaKinTaung",city:"AungMyayTharZan",state:"Mandalay"}],

    };

    const expectedState = {
      ...initialState,
    rows:[...initialState.rows]
    //   rows:[{id:1, first_name: "mg", last_name: "aung" ,address1:"30X31street",address2:"YaKinTaung",city:"AungMyayTharZan",state:"Mandalay"},
    //       {id:2, first_name: "mg", last_name: "myint" ,address1:"29x30street",address2:"YaKinTaung",city:"AungMyayTharZan",state:"Mandalay"}],

    };
    const inputState = ordersReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
});

  it("order set id for order detail", () => {
    const action = {
      type: "ORDERS_SET_BY_ID",
      payload: 1
    };

    const expectedState = {
      ...initialState,
    selectedOrderId : 1
    };
    const inputState = ordersReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("order search by orderid", () => {
    const action = {
      type: "ORDERS_SET_SEARCH_ByOrderId",
      payload: 1
    };

    const expectedState = {
      ...initialState,
    searchTextOrderId : 1
    };
    const inputState = ordersReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });

  it("order set begin_date", () => {
    const action = {
      type: "ORDERS_SET_BEGIN_DATE",
      payload: "08/06/2019"
    };

    const expectedState = {
      ...initialState,
    searchTextBegin : "08/06/2019"
    };
    const inputState = ordersReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });

  it("order end begin_date", () => {
    const action = {
      type: "ORDERS_SET_END_DATE",
      payload: "08/13/2019"
    };

    const expectedState = {
      ...initialState,
    searchTextEnd : "08/13/2019"
    };
    const inputState = ordersReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });

  it("order loading", () => {
    const action = {
      type: "ORDER_LOADING"
    };

    const expectedState = {
      ..._getCommonState,
    loading: true,
    };
    const inputState = ordersReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });

  it("clear checkout", () => {
    const action = {
      type: "CLEAR_CHECKOUT",
    };

    const expectedState = {
      ..._getCommonState,
    requestParams: null,
    postResultObj: null
    };
    const inputState = ordersReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("orderitem fetch done", () => {
    const action = {
      type: "FETCH_ORDERSITEM_DONE",
      payload: { id: 1, item_id:20 , name: "item1", price: "1000" }
    };

    const expectedState = {
      ...initialState,
    orderitems : { id: 1, item_id:20 , name: "item1", price: "1000" }
    };
    const inputState = ordersReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });


  it("default", () => {
    const action = {
      type: "Default"
    };

    const expectedState = {
      ...initialState
    };

    const inputState = ordersReducer(initialState, action);
    expect(inputState).toEqual(expectedState);

  });

});


//=============================================================================
//　ActionCreators
//=============================================================================

describe("ActionCreators Testing", () => {

  const getState = () => {

    return {
      cart: {
        totalPrice: 8000,
        rows: [
          { id: 1, quantity: 2, price: 2000 },
          { id: 2, quantity: 4, price: 1000 }
        ]
      },
        orders:{
        requestParams: null
      },
    };

  };
  
   const addressFrom = {
    first_name: "Mg",
    last_name: "Aye",
    address1: "padauk street",
    address2: "ChanMyaTharZi",
    city:"PyinOoLwin"

  };
  
  it("set customer request params",()=>{
    const expectedAction=[{
      type: 'ORDERS_SET_REQUEST_PARAMS',

      payload: {
        ...addressFrom,
        total_price: 8000,
        item_id_array: [1, 2],
        item_qty_array: [2, 4],
        item_price_array: [2000, 1000]

      }
    }]
    const dispatch=jest.fn();
    setRequestParams(addressFrom)(dispatch,getState)
    expect(dispatch.mock.calls[0]).toEqual(expectedAction)
    
  })
  it("post order", async() => {
   
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: { id: 1, totalPrice: 8000 } }
      })
    );
    const expectedAction1 = [{
      type: 'ORDER_LOADING'
    }];
    const expectedAction2 = [{
      type: 'ORDERS_POST_DONE',
      payload: { id: 1, totalPrice: 8000 }
    }];
    const dispatch = jest.fn();
    await postOrder()(dispatch, getState);
    expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
  }); 

    it("order fetched", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: [{id: 1, created_at: "20190812"},{id: 2, created_at: "20190813"},{id: 3, created_at: "20190814"},{id: 4, created_at: "20190815"},{id: 5, created_at: "20190816"}]}
      })
    );
    const expectedAction = [{
      type: 'ORDERS_FETCH_DONE',
      payload: [{id: 1, created_at: "20190812"},{id: 2, created_at: "20190813"},{id: 3, created_at: "20190814"},{id: 4, created_at: "20190815"},{id: 5, created_at: "20190816"}]
    }];
    const dispatch = jest.fn();
    await fetchAllOrders()(dispatch, getState);
    
    expect(dispatch.mock.calls[0]).toEqual(expectedAction);
    expect(mockAxios.get).toHaveBeenCalledWith("http://mbrookietraining2019shopbackend-env.prbnqikdxw.ap-northeast-1.elasticbeanstalk.com/api/orders");
  });
  
  
    it("order searching Data By OrderId",async ()=>{
    const order_id=3;
    const expectedAction1=[{
      type : 'ORDERS_SET_SEARCH_ByOrderId',
      payload : order_id
    }];
     mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: [{id: 2, created_at: "20190813"}]}
      })
    );
    const expectedAction2 = [{
      type: 'ORDERS_FETCH_DONE',
      payload:[{id: 2, created_at: "20190813"}]
    }];
    const dispatch = jest.fn();
    await setSearchByOrderId(order_id)(dispatch, getState);
    expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
    expect(mockAxios.get).toHaveBeenCalledWith("http://mbrookietraining2019shopbackend-env.prbnqikdxw.ap-northeast-1.elasticbeanstalk.com/api/orders?order_id=3");

  });
  
   it("order searching Data By BeginDate",async ()=>{
    const begin_date="20190814";
    const expectedAction1=[{
      type : 'ORDERS_SET_BEGIN_DATE',
      payload : begin_date
    }];
     mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: [{id: 2, created_at: "20190813"}]}
      })
    );
    const expectedAction2 = [{
      type: 'ORDERS_FETCH_DONE',
      payload:[{id: 2, created_at: "20190813"}]
    }];
    const dispatch = jest.fn();
    await setbeginDate(begin_date)(dispatch, getState);
    expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
    expect(mockAxios.get).toHaveBeenCalledWith("http://mbrookietraining2019shopbackend-env.prbnqikdxw.ap-northeast-1.elasticbeanstalk.com/api/orders?begin_date=20190814");

  });
  
     it("order searching Data By endDate",async ()=>{
    const end_date="20190816";
  
    const expectedAction1=[{
      type : 'ORDERS_SET_END_DATE',
      payload : end_date
    }];
     mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: [{id: 2, created_at: "20190813"}]}
      })
    );
    const expectedAction2 = [{
      type: 'ORDERS_FETCH_DONE',
      payload:[{id: 2, created_at: "20190813"}]
    }];
    const dispatch = jest.fn();
    await setendDate(end_date)(dispatch, getState);
    expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
    expect(mockAxios.get).toHaveBeenCalledWith("http://mbrookietraining2019shopbackend-env.prbnqikdxw.ap-northeast-1.elasticbeanstalk.com/api/orders?end_date=20190816");

  });
  
  
  it("clear checkout",async()=>{
    const expectedAction={
      type: 'CLEAR_CHECKOUT'
    };
    const action=clearCheckout();
    expect(action).toEqual(expectedAction);
  });
  
});