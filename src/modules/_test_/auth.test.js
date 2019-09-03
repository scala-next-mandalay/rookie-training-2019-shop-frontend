import { authReducer,changeAuthState,fetchAuthedUser,signOut,signIn,signUp,confirmSignUp,resendSignUp,forgotPasswordSubmit,forgotPassword} from '../auth';
import { Auth } from 'aws-amplify';
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
    const inputState = authReducer(_getCommonState, action);
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
    const inputState = authReducer(_getCommonState, action);
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
    const inputState = authReducer(_getCommonState, action);
    expect(inputState).toEqual(expectedState);
    

  });
  
    it("Auth fetch user", () => {
    const action = {
      type: "AUTH_FETCH_AUTHED_USER",
      payload:[{id:1,email:"a@gmail.com"}]
    };
    const expectedState = {
     ..._getCommonState,
     user:[{id:1,email:"a@gmail.com"}]
    };
    const inputState = authReducer(_getCommonState, action);
    expect(inputState).toEqual(expectedState);
    });
    
    it("Auth signin success", () => {
    const action = {
      type: "AUTH_SIGN_IN_SUCCESS",
      payload:[{id:1,email:"a@gmail.com",password:'aaa11111'}]

    };
    const expectedState = {
      ..._getCommonState,
      user:[{id:1,email:"a@gmail.com",password:'aaa11111'}],
      authState:null
    };
    const inputState = authReducer(_getCommonState, action);
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
    const inputState = authReducer(_getCommonState, action);
    expect(inputState).toEqual(expectedState);
  });
  
it("Auth forgot password success", () => {
  const action = {
      type: "AUTH_FORGOT_PASSWORD_SUCCESS",
      payload:[{email:"a@gmail.com"}]

    };
    const expectedState = {
      ..._getCommonState,
      email:[{email:"a@gmail.com"}],
      authState:'forgotPasswordReset'
   
    };
    const inputState = authReducer(_getCommonState, action);
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

describe("ActionCreators Testing", () => {
  const getState = () => {
    return {
      auth: { 
        user: {email:'lawoon@gmail.com',password:'aaa11111'},
        authState: '',
        email: null,
        error: null,
        loading: false,
        }
    };
  };
  
  it("refresh Token ", async () => {
    let user = {data: { email:'mgmg'}};
    Auth.currentAuthenticatedUser = jest.fn().mockImplementation(
    () => {
        return  user;
    });
    let session = {data: { session:'11111'}};
    Auth.currentSession = jest.fn().mockImplementation(
    () => {
        return  session;
    });
  });
  it("testing change auth state ", async () => {
    const expectedAction = {
      type: 'AUTH_CHANGE_AUTH_STATE',
      payload: 'signIn'
    };
    const value = "signIn";
    const action = changeAuthState(value);
    expect(action).toEqual(expectedAction);
  });
  it("testing fetch authenticated user", async () => {
    let user = {data: { email:'lawoon@gmail.com'}};
    Auth.currentAuthenticatedUser = jest.fn().mockImplementation(
        () => {
           return  user;
       });
    const expectedAction1=[{
       type :'AUTH_BEGIN_LOADING'
    }];
    const expectedData = { data: { email:'lawoon@gmail.com'}};
     
    const expectedAction2 = [{
       type :'AUTH_FETCH_AUTHED_USER',
       payload : expectedData
     }];
    
    const dispatch = jest.fn();
    await fetchAuthedUser()(dispatch, getState);
    expect(Auth.currentAuthenticatedUser).toHaveBeenCalled();
    expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
   });

   it("testing fetch authenticated user with throw error", async () => {
    Auth.currentAuthenticatedUser = jest.fn().mockImplementation(
      () => {
         throw "error"
     });
    const expectedAction1=[{
     type :'AUTH_BEGIN_LOADING'
    }];
    const expectedAction2=[{
    type :'AUTH_INIT'
    }];
  
    const dispatch = jest.fn();
    await fetchAuthedUser()(dispatch, getState);
    expect(Auth.currentAuthenticatedUser).toHaveBeenCalled();
    expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
 });
 
   it("testing sign Out", async () => {
    const expectedAction=[{
      type :'AUTH_INIT'
    }];
    const dispatch = jest.fn();
    Auth.signOut = jest.fn().mockImplementation(
      () => {
     });
    await signOut()(dispatch, getState);
    expect(Auth.signOut).toHaveBeenCalled();
    expect(dispatch.mock.calls[0]).toEqual(expectedAction);
  });

  it("testing sign Out with throw error", async () => {
    const expectedAction1=[{
      type :'AUTH_INIT'
    }];
    Auth.signOut = jest.fn().mockImplementation(
      () => {
        throw "error"
     });
    const expectedAction2=[{
      type :'AUTH_SYSTEM_ERROR',
      payload :"error"
    }];
    const dispatch = jest.fn();
    await signOut()(dispatch, getState);
    expect(Auth.signOut).toHaveBeenCalled();
    expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
  });
 

  it("testing sign In ", async () => {
    let data ={data: { email:'lawoon@gmail.com', password: '12345678' }};
    const expectedAction_common=[{
       type :'AUTH_BEGIN_LOADING'
     }];
    Auth.signIn = jest.fn().mockImplementation(
      () => {
         return  data;
    });
     
    const expectedData= { data: { email:'lawoon@gmail.com', password: '12345678' }};
     
    const expectedAction1 = [{
       type :'AUTH_SIGN_IN_SUCCESS',
       payload : expectedData
    }];
 
    const dispatch = jest.fn();
    await signIn('lawoon@gmail.com','12345678')(dispatch, getState);
    expect(Auth.signIn).toHaveBeenCalledWith('lawoon@gmail.com','12345678');
    expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
   });
   
   it("testing sign In with throw error", async () => {
    const expectedAction_common=[{
      type :'AUTH_BEGIN_LOADING'
     }];
     Auth.signIn = jest.fn().mockImplementation(
      () => {
        throw "error";
     });
     
     const expectedAction1 = [{
      type :'AUTH_SYSTEM_ERROR',
      payload : "error"
     }];
 
    const dispatch = jest.fn();
    await signIn('lawoon@gmail.com','12345678')(dispatch, getState);
    expect(Auth.signIn).toHaveBeenCalledWith('lawoon@gmail.com','12345678');
    expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
   });

    it("testing sign In ", async () => {
    let data ={data: { email:'lawoon@gmail.com', password: '12345678' }};
    const expectedAction_common=[{
       type :'AUTH_BEGIN_LOADING'
     }];
    Auth.signIn = jest.fn().mockImplementation(
      () => {
         return  data;
     });
     
    const expectedData= { data: { email:'lawoon@gmail.com', password: '12345678' }};
     
    const expectedAction1 = [{
       type :'AUTH_SIGN_IN_SUCCESS',
       payload : expectedData
     }];
 
    const dispatch = jest.fn();
    await signIn('lawoon@gmail.com','12345678')(dispatch, getState);
    expect(Auth.signIn).toHaveBeenCalledWith('lawoon@gmail.com','12345678');
    expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
   });
   
   it("testing sign In with throw error", async () => {
    const expectedAction_common=[{
       type :'AUTH_BEGIN_LOADING'
     }];
     Auth.signIn = jest.fn().mockImplementation(
      () => {
         throw "error";
     });
     
    const expectedAction1 = [{
       type :'AUTH_SYSTEM_ERROR',
       payload : "error"
     }];
 
    const dispatch = jest.fn();
    await signIn('lawoon@gmail.com','12345678')(dispatch, getState);
    expect(Auth.signIn).toHaveBeenCalledWith('lawoon@gmail.com','12345678');
    expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
   });
   
   it("testing sign Up ", async () => {
    let data ={data: { email:'lawoon@gmail.com', password: '12345678' }};
    const expectedAction_common=[{
       type :'AUTH_BEGIN_LOADING'
     }];
     Auth.signUp = jest.fn().mockImplementation(
      () => {
         return  data;
     });
     
     const expectedAction1 = [{
       type :'AUTH_SIGN_UP_SUCCESS',
       payload : 'lawoon@gmail.com'
     }];
 
     const dispatch = jest.fn();
     await signUp('lawoon@gmail.com','12345678')(dispatch, getState);
     expect(Auth.signUp).toHaveBeenCalledWith('lawoon@gmail.com','12345678');
     expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
     expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
   });
   
   it("testing sign Up with throw error", async () => {
    const expectedAction1=[{
       type :'AUTH_BEGIN_LOADING'
     }];
     Auth.signUp = jest.fn().mockImplementation(
      () => {
         throw "error";
     });
     
     const expectedAction2 = [{
       type :'AUTH_SYSTEM_ERROR',
       payload : "error"
     }];
 
     const dispatch = jest.fn();
     await signUp('lawoon@gmail.com','12345678')(dispatch, getState);
     expect(Auth.signUp).toHaveBeenCalledWith('lawoon@gmail.com','12345678');
     expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
     expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
   });

  it("testing confirm signUp", async () => {
    const expectedAction_common=[{
      type :'AUTH_BEGIN_LOADING'
    }];
    
    Auth.confirmSignUp = jest.fn().mockImplementation(
     () => {
    });
    
    const expectedAction1=[{
      type :'AUTH_INIT'
    }];

    const dispatch = jest.fn();
    await confirmSignUp('lawoon@gmail.com','123455')(dispatch, getState);
    expect(Auth.confirmSignUp).toHaveBeenCalledWith('lawoon@gmail.com','123455');
    expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
  });

  it("testing confirm sign Up with throw error", async () => {
    const expectedAction1=[{
       type :'AUTH_BEGIN_LOADING'
     }];
     Auth.signIn = jest.fn().mockImplementation(
      () => {
         throw "error message";
     });
     
    const expectedAction2 = [{
       type :'AUTH_SYSTEM_ERROR',
       payload : "error message"
     }];
 
     const dispatch = jest.fn();
     await signIn('lawoon@gmail.com','12345678')(dispatch, getState);
     expect(Auth.signIn).toHaveBeenCalledWith('lawoon@gmail.com','12345678');
     expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
     expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
   });
  
  it("testing resend sign Up", async () => {
    const expectedAction_common=[{
      type :'AUTH_BEGIN_LOADING'
    }];
    
    Auth.resendSignUp = jest.fn().mockImplementation(
     () => {
    });
    
    const dispatch = jest.fn();
    await resendSignUp('lawoon@gmail.com')(dispatch, getState);
    expect(Auth.resendSignUp).toHaveBeenCalledWith('lawoon@gmail.com');
    expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
  });
  it("testing resent sign up with throw error", async () => {
    const expectedAction1=[{
       type :'AUTH_BEGIN_LOADING'
     }];
     Auth.resendSignUp = jest.fn().mockImplementation(
      () => {
         throw "error message";
     });
     
     const expectedAction2 = [{
       type :'AUTH_SYSTEM_ERROR',
       payload : "error message"
     }];
 
     const dispatch = jest.fn();
     await resendSignUp('lawoon@gmail.com')(dispatch, getState);
     expect(Auth.resendSignUp).toHaveBeenCalledWith('lawoon@gmail.com');
     expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
     expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
   });
  it("testing forgot password", async () => {
    let data ={data: { email:'lawoon@gmail.com'}};
    const expectedAction1=[{
      type :'AUTH_BEGIN_LOADING'
    }];
    
    Auth.forgotPassword = jest.fn().mockImplementation(
     () => {
       return data;
    });
    
    const expectedAction2=[{
      type :'AUTH_FORGOT_PASSWORD_SUCCESS',
      payload: 'lawoon@gmail.com',
      
    }];
    
    const dispatch = jest.fn();
    await forgotPassword('lawoon@gmail.com')(dispatch, getState);
    expect(Auth.forgotPassword).toHaveBeenCalledWith('lawoon@gmail.com');
    expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
  });

  it("testing forgot password with throw error", async () => {
    const expectedAction1=[{
       type :'AUTH_BEGIN_LOADING'
     }];
     Auth.forgotPassword = jest.fn().mockImplementation(
      () => {
         throw "error message";
     });
     
     const expectedAction2 = [{
       type :'AUTH_SYSTEM_ERROR',
       payload : "error message"
     }];
 
     const dispatch = jest.fn();
     await forgotPassword('lawoon@gmail.com')(dispatch, getState);
     expect(Auth.forgotPassword).toHaveBeenCalledWith('lawoon@gmail.com');
     expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
     expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
   });
  
  it("testing forgot password submit", async () => {
    const expectedAction_common=[{
      type :'AUTH_BEGIN_LOADING'
    }];
    
    Auth.forgotPasswordSubmit = jest.fn().mockImplementation(
     () => {
    });
    
    const expectedAction1=[{
      type :'AUTH_INIT'
    }];
    
    const dispatch = jest.fn();
    await forgotPasswordSubmit('lawoon@gmail.com','112233','aaa11111')(dispatch, getState);
    expect(Auth.forgotPasswordSubmit).toHaveBeenCalledWith('lawoon@gmail.com','112233','aaa11111');
    expect(dispatch.mock.calls[0]).toEqual(expectedAction_common);
    expect(dispatch.mock.calls[1]).toEqual(expectedAction1);
  });
  it("testing forgot password submit with throw error", async () => {
    const expectedAction1=[{
       type :'AUTH_BEGIN_LOADING'
     }];
     Auth.forgotPasswordSubmit = jest.fn().mockImplementation(
      () => {
         throw "error message";
     });
     
     const expectedAction2 = [{
       type :'AUTH_SYSTEM_ERROR',
       payload : "error message"
     }];
 
     const dispatch = jest.fn();
     await forgotPasswordSubmit('lawoon@gmail.com','112233','aaa11111')(dispatch, getState);
     expect(Auth.forgotPasswordSubmit).toHaveBeenCalledWith('lawoon@gmail.com','112233','aaa11111');
     expect(dispatch.mock.calls[0]).toEqual(expectedAction1);
     expect(dispatch.mock.calls[1]).toEqual(expectedAction2);
   });

 });