import { authReducer} from '../auth';
import mockAxios from "axios";
// import { async } from 'q';
/*global expect*/
/*global jest*/

//==============================================================================
//Reducer testing
//==============================================================================

describe("order reducer actions", () => {

  const initialState = {
    authState: "signIn",
    user: null,
    email: null,
    error: null,
    loading: false,
  };
  const _getCommonState={
  ...initialState, 
  error: null,
  loading: false,
};

  it("Auth system error", () => {
    const action = {
      type: "AUTH_SYSTEM_ERROR",
       payload: "error",
       loading:false
    };
    const expectedState = {
      ..._getCommonState,
      error:"error",
      loading:false
    };
    const inputState = authReducer(initialState, action);
    expect(inputState).toEqual(expectedState);

  });
  
   it("Auth begin loading", () => {
    const action = {
      type: "AUTH_BEGIN_LOADING",
    };
    const expectedState = {
      ..._getCommonState,
      loading:true
    };
    const inputState = authReducer(initialState, action);
    expect(inputState).toEqual(expectedState);

  });
  
  it("Auth init", () => {
    const action = {
      type: "AUTH_INIT",
    };
    const expectedState = {
      ...initialState,
    };
    const inputState = authReducer(initialState, action);
    expect(inputState).toEqual(expectedState);

  });
  
  it("Auth change state", () => {
    const action = {
      type: "AUTH_CHANGE_AUTH_STATE",
      payload:"forgotPasswordReset"
    };
    const expectedState = {
     ..._getCommonState,
     authState:"forgotPasswordReset"
    };
    const inputState = authReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
    

  });
  
    it("Auth fetch user", () => {
    const action = {
      type: "AUTH_FETCH_AUTHED_USER",
      payload:[{id:1,email:"a@gmail.com"}]
      // user=[{id:1,email:"a@gmail.com"}]
    };
    const expectedState = {
     ..._getCommonState,
     user:[{id:1,email:"a@gmail.com"}]
    };
    const inputState = authReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
    });
    
    it("Auth signin success", () => {
    const action = {
      type: "AUTH_SIGN_IN_SUCCESS",
      payload:[{id:1,email:"a@gmail.com"}]

    };
    const expectedState = {
     ..._getCommonState,
     user:[{id:1,email:"a@gmail.com"}],
     authState:null
    };
    const inputState = authReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("Auth signup success", () => {
    const action = {
      type: "AUTH_SIGN_UP_SUCCESS",
      payload:[{id:1,email:"a@gmail.com"}]

    };
    const expectedState = {
     ..._getCommonState,
     email:[{id:1,email:"a@gmail.com"}],
     authState:'confirmSignUp'
   
    };
    const inputState = authReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  
   it("Auth forgot password success", () => {
    const action = {
      type: "AUTH_FORGOT_PASSWORD_SUCCESS",
      payload:[{id:1,email:"a@gmail.com"}]

    };
    const expectedState = {
     ..._getCommonState,
     email:[{id:1,email:"a@gmail.com"}],
     authState:'forgotPasswordReset'
   
    };
    const inputState = authReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
  });
  
  it("default", () => {
    const action = {
      type: 'default',
    };
    const expectedState = {
      ...initialState
    };
    const inputState = authReducer(initialState, action);
    expect(inputState).toEqual(expectedState);
});

});

//=============================================================================
//　ActionCreators Testing
//=============================================================================