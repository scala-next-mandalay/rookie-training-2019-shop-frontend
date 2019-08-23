import React from 'react';
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router-dom';
import SignIn from '../containers/auth/SignIn';
import SignUp from '../containers/auth/SignUp';
import ConfirmSignUp from '../containers/auth/ConfirmSignUp';
import ForgotPassword from '../containers/auth/ForgotPassword';
import ForgotPasswordSubmit from '../containers/auth/ForgotPasswordSubmit';



const Login = ({handleDrawerToggle, totalQuantity, authState, changeAuthState, fetchAuthedUser, signOut, user, loading, history}) => {
    
    const isFirstRef = React.useRef(true);
    React.useEffect(() => {
      if (isFirstRef.current) {
        isFirstRef.current = false;
        fetchAuthedUser();
      }
      
      if (user && authState === null) {
        history.push("/");
      }
    });
   const auth = (
    <React.Fragment>
      <SignIn />
      <SignUp />
      <ConfirmSignUp />
      <ForgotPassword />
      <ForgotPasswordSubmit />
    </React.Fragment>
  );

  
  return (
    <Box flexGrow={1} textAlign="center" >
      
      {auth}
     
      
    </Box>  
  );
};
export default withRouter(Login);
