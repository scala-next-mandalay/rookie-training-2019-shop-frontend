import {categoriesReducer, fetchAllCategories} from "../categories"
 import mockAxios from "axios";

/*global expect*/
/*global jest*/


//=============================================================================
//　Reducer Testing
//=============================================================================

describe("categories reducer actions",()=>{
    const initialState={
        alreadyFetched: false,
        rows: [{ id: 1, name: "test1" }]
    };
     
    
    it("category already fetched",()=>{
        const action={
            type: "CATEGORIES_SET_ALREADY_FETCHED"
        };
        const expectedState={
            ...initialState,
            alreadyFetched:true,
        };
        const inputState=categoriesReducer(initialState,action);
        expect(inputState).toEqual(expectedState);
    });
    
    it("category fetch row done", () => {
    const action = {
      type: "CATEGORIES_FETCH_DONE",
      payload: [{ id: 1, name: "test1" }]
    };

    const expectedState = {
      ...initialState,
    //   rows: [{id: 1, name: "test1" }]
      rows: [{id:0, name:'Categories'},{id: 1, name: "test1" }]
    };
    expect(categoriesReducer(initialState, action)).toEqual(expectedState);

  });
});


//=============================================================================
//　ActionCreators Testing
//=============================================================================


describe("ActionCreators Testing", () => {
  const getState = () => {
    return {
      categories: { alreadyFetched: false },
    };
  };
 
  it("category already fetch", async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: [{ id: 1, name: "item1" },{ id: 2, name: "item2" }]}
      })
    );
    const expectedAction1 = [{
      type: 'CATEGORIES_SET_ALREADY_FETCHED'
    }];
    const expectedAction2 = [{
      type: 'CATEGORIES_FETCH_DONE',
      payload: [{ id: 1, name: "item1" },{ id: 2, name: "item2" }]

    }];
    const dispatch = jest.fn();
    await fetchAllCategories()(dispatch, getState);
    expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
  });
  
  
  


});