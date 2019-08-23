import { itemsReducer,fetchItems } from '../items';
import mockAxios from "axios";

/*global expect*/
/*global jest*/

//=============================================================================
//　Reducer Testing
//=============================================================================

describe("item reducer actions", () => {
   
   
   const initialState  = {
    rows: [],
    selectedCateogryId: null,
    noMoreFetch: false,
  };
  
  const state = {
    rows: [{ id: 1, name: "item1" }, { id: 2, name: "item2" }],
    selectedCateogryId: null,
    noMoreFetch: false,
  };
  
  it("item set category id", () => {
    const action = {

      type: 'ITEMS_SET_CATEGORY_ID',
      payload: 1
    };

    const expectedState = {
      ...state,
      selectedCateogryId: 1
    };
    const inputState = itemsReducer(state, action);
    expect(inputState).toEqual(expectedState);

  });
  it("item fetch rows done",()=>{
      const action = {
      type: 'ITEMS_FETCH_DONE',
      payload: [{ id: 1, name: "item1" },{ id: 2, name: "item2" }]
    };
     const expectedState = {
      ...initialState,
      rows: [...initialState.rows, ...[{ id: 1, name: "item1" },{ id: 2, name: "item2" }]]
     };
    const inputState = itemsReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("no more fetch item", () => {
    const action = {
      type: 'ITEMS_NO_MORE_FETCH',
    };
    const expectedState = {
      ...initialState,
      noMoreFetch: true
    };
    const inputState = itemsReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });

  it("default", () => {
    const action = {
      type: 'default',
    };
    const expectedState = {
      ...initialState
    };
    const inputState = itemsReducer(initialState, action);
    expect(inputState).toEqual(expectedState);

  });
});
//=============================================================================
//　ActionCreators
//=============================================================================

  describe("ActionCreators Testing", () => {

  const getState = () => {
    return {
      items: { rows: [{ id: 1, name: "item1" }] },
    };
  };



  it("fetch all items with data", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: [{ id: 1, name: "item1" }] }
      })

    );
   
    const expectedAction = [{
      type: 'ITEMS_FETCH_DONE',
      payload: [{ id: 1, name: "item1" }]

    }];
    const dispatch = jest.fn();
    await fetchItems()(dispatch, getState);
    expect(dispatch.mock.calls[0]).toEqual(expectedAction);
 

  });
  
  it("fetch all items with no data", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: [] }
      })
    );
    const expectedAction = [{
      type: 'ITEMS_NO_MORE_FETCH'
    }];
    const dispatch = jest.fn();
    await fetchItems()(dispatch, getState);
    expect(dispatch.mock.calls[0]).toEqual(expectedAction);
  });
  });
 

  
