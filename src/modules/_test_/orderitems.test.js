import {orderItemReducer,fetchAllOrdersItem} from "../orderitems"
 import mockAxios from "axios";

/*global expect*/
/*global jest*/


//=============================================================================
//　Reducer Testing
//=============================================================================

describe("orderitems reducer actions",()=>{
    const initialState={
        alreadyFetched: false,
        rows: [{ id: 1, name: "test1" }]
    };
    
    it("order items fetch row done", () => {
    const action = {
      type: "FETCH_ORDERSITEM_DONE",
      payload: [{ id: 1, name: "test1" }]
    };

    const expectedState = {
      ...initialState,
    //   rows: [{id: 1, name: "test1" }]
      rows: [{id: 1, name: "test1" }]
    };
    expect(orderItemReducer(initialState, action)).toEqual(expectedState);

  });
});


//=============================================================================
//　ActionCreators Testing
//=============================================================================


describe("ActionCreators Testing", () => {
const getState = () => {
    return {
      orderitems : { rows: [{ id: 1, name: "item1" },{ id: 2, name: "item2" }] },
    };
  };
  it("order fetch", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: [{ id: 1, name: "item1" },{ id: 2, name: "item2" }]}
      })
    );
 
    const expectedAction = [{
      type: 'FETCH_ORDERSITEM_DONE',
      payload: [{ id: 1, name: "item1" },{ id: 2, name: "item2" }]

    }];
    const dispatch = jest.fn();
    await fetchAllOrdersItem()(dispatch, getState);
    expect(dispatch.mock.calls[0]).toEqual(expectedAction);
    expect(mockAxios.get).toHaveBeenCalledWith("http://mbrookietraining2019shopbackend-env.prbnqikdxw.ap-northeast-1.elasticbeanstalk.com/api/orderitems");
  });
});