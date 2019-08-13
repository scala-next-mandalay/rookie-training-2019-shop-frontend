import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Link, Button, Grid, TextField}  from '@material-ui/core';
import { makeStyles,createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
 import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import '../../assets/style.css';
import { ThemeProvider } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  btnWrapper: {
    marginTop: theme.spacing(2),
    position: 'relative',
  },
  btnProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const SignIn = ({
  authState, 
  changeAuthState,
  signIn,
  loading,
  error,
  history
}) => {
  
  const classes = useStyles();
  
  const [form, setForm] = React.useState({email:"", password:""});
  
  const handleChangeValue = fieldName => event => {
    const newForm = {...form};
    newForm[fieldName] =  event.target.value;
    setForm(newForm);
  };
  const handleSubmit = event => {
    event.preventDefault();
    signIn(form['email'], form['password']);
  };
  
  const handleForgotPassword = event => {
    event.preventDefault();
    changeAuthState('forgotPassword');
  };
  
  const handleSignUp = event => {
    event.preventDefault();
    changeAuthState('signUp');
  };
  const handleClose=event=>{
    event.preventDefault();
    history.push("/");
  };
  const theme = createMuiTheme({
  palette: {
    primary: {
       main:'#cccccc'
    }
  },
});

  const content = (
   
  <Container component="main" maxWidth="xs" className="container">
  <Box className="authTitle"><FormattedMessage id="Label.SignIn" defualtMessage="Sign In" /></Box>
  
  
  <Link onClick={handleClose}>
  <span className="close-btn">
  <img src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png" alt="closeicon"></img> 
 
   </span>
   </Link>

  

  <form onSubmit={handleSubmit}>
      
         <Box display="flex" mx="auto" my="auto" mt={2} fontWeight={600} color="error.main">
            {error}
          </Box>
      <Box mt={3}>
      <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12} sm={12}  >
        <Box mx="auto" my="auto" p={1} mt={2}>
            <TextField
              id="email"
              autoComplete="email"
              type="email"
              onChange={handleChangeValue('email')}
              value={form.email}
              label="Email Address"
              className="txtField"
              required
              variant="outlined"
              fullWidth
              InputLabelProps={{
              style: {
              color: "#ffffff",
              }
             }}
              
             
            />
          
             </Box>
        </Grid>
        <Grid item xs={12} sm={12}  >
         <Box mx="auto" my="auto"  p={1} mt={2}>
           <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={handleChangeValue('password')} 
              value={form.password}
              className="txtField2"
              placeholder="Password"
              required
              variant="outlined"
              fullWidth
              InputLabelProps={{
              style: {
              color: "#ffffff",
              }
             }}
            />
            </Box>
        </Grid>
        </Grid>
        </ThemeProvider>
        </Box>
           <Grid container className={classes.btnWrapper}>
              <Button className="btnSign" type="submit" fullWidth disabled={loading} color="primary" variant="contained">
                <FormattedMessage id="Button.SignIn" defualtMessage="Sign In" />
              </Button>
              {loading && <CircularProgress size={24} className={classes.btnProgress} />}
             </Grid>  
             <Grid container >
              <Grid item xs={6}>
              <Box mt={2}>
                <Link className="ho" variant="body2" onClick={handleForgotPassword}>
                 <FormattedMessage id="Label.ForgotPassword" defualtMessage="Forgot Password" />
          
                </Link>
                </Box>
              </Grid>
              <Grid item xs={6}>
              <Box mt={2}>
                <Link className="ho" variant="body2" onClick={handleSignUp}>
                   <FormattedMessage id="Label.NotAccount" defualtMessage="No Account?SignUp?" />
          
                </Link>
                </Box>
              </Grid>
            </Grid>
     </form>
    </Container>
  );
  return (authState === 'signIn') ? content : null;
};

SignIn.propTypes = {
  authState: PropTypes.string.isRequired,
  changeAuthState: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired
};

export default  withRouter(SignIn);