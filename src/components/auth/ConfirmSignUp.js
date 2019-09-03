import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Link, Button, TextField,Grid}  from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';
import '../../assets/style.css';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles,createMuiTheme } from '@material-ui/core/styles';
 import { FormattedMessage } from 'react-intl';

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

const ConfirmSignUp = React.memo(({
  authState, 
  changeAuthState,
  loading,
  error,
  email,
  confirmSignUp,
  history
}) => {
  const classes = useStyles();
  const [form, setForm] = React.useState({email:"", password:"",confirmationCode:""});
  
  const handleChangeValue = fieldName => event => {
    const newForm = {...form};
    newForm[fieldName] =  event.target.value;
    setForm(newForm);
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    confirmSignUp(email, form['confirmationCode']);
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
  <Box className="authTitle">
  <FormattedMessage id="Label.CheckEmail" defualtMessage="Please check your email" />
  </Box>
  
  
  <Link onClick={handleClose}>
  <span className="close-btn">
  <img src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png" alt="closeicon"></img> 
   </span>
   </Link>

  

  <form onSubmit={handleSubmit}>
      <Box display="flex" mx="auto" my="auto" mt={2} fontWeight={600} color="error.main">
            {error}
      </Box>
      <ThemeProvider theme={theme}>
        <Grid container>
        <Grid item xs={12} sm={12}  >
        <Box mx="auto" my="auto" p={1} mt={5}>
            <TextField
              id="confirmationCode"
              name="confirmationCode"
              label="Confirmation Code"
              onChange={handleChangeValue("confirmationCode")} 
              value={form.confirmationCode}
              variant="outlined"
              required
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
           <Grid container className={classes.btnWrapper}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className="btnSign"
            >
        
            <FormattedMessage id="Button.Confirm" defualtMessage="Confirm" />
            </Button>
              {loading && <CircularProgress size={24} className={classes.btnProgress} />}
             </Grid>  
             <Grid container >
              <Grid item xs={12}>
              <Box mt={2}>
                   <Box color="red">
                  <FormattedMessage id="Label.ResendCode" defualtMessage="Resend code to" />{email}
                </Box>
                </Box>
              </Grid>
            </Grid>
     </form>
    </Container> 
  );
  return (authState === 'confirmSignUp') ? content : null;
});

ConfirmSignUp.propTypes = {
  authState: PropTypes.string.isRequired,
  changeAuthState: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  email: PropTypes.string,
  confirmSignUp: PropTypes.func.isRequired,
};

export default withRouter(ConfirmSignUp);
