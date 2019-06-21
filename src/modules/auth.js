import { Auth } from 'aws-amplify';

const initialState = {
  userId: null,
}

//=============================================================================
//　Reducer
//=============================================================================
export const　authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        userId: action.payload
      }
    case 'SIGN_OUT':
      return {
        ...state,
        userId: null
      }
    default:
      return state
  }
}

//=============================================================================
//　ActionCreators
//=============================================================================
export const setUser = userId => ({
  type: 'SET_USER',
  payload: userId
})

export const signOut = () => {
  return async (dispatch, getState) => {
    try {
      await Auth.signOut()
    }
    catch(err) {}
    dispatch({
      type: 'SIGN_OUT',
    })
  }
}
