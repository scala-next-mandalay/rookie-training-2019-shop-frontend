import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {  Container, Paper,Box,Grid,Button,Divider,Typography} from '@material-ui/core';
import TitleBar from '../containers/TitleBar';
import PropTypes from 'prop-types';
import '../assets/style.css';
import { withRouter } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { FormattedMessage } from 'react-intl';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  toolbar:{
   marginTop: theme.spacing(10),
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  submitButton: {
    margin: theme.spacing(3, 0)
  },
  boxTitle: {
    fontWeight: 600,
    padding: theme.spacing(2, 0),
    marginLeft: theme.spacing(3)
  },
  boxValue: {
    padding: theme.spacing(2, 0),
    letterSpacing: '2px',
     marginLeft: theme.spacing(2)
  },
  main :{
    marginTop: theme.spacing(5),
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
   btnProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
   AppDiv:{
       flexGrow: 1,
   }

}));


const CheckoutConfirm = ({requestParams,history, loading,postOrder,totalQuantity }) => {
  const classes = useStyles();
  
  const handleBack = event => {
    event.preventDefault();
    history.push("/checkout");
  };
 
  const handleHome = event => {
    event.preventDefault();
    history.push("/");
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    postOrder();
  };
  
  const handleClose = event => {
    event.preventDefault();
    history.push("/checkout");
  };
  
  return (
    <div>
      <Container maxWidth="lg">
        <TitleBar showMenu={false} showIcon={false} showNav={false}/>
        <div className={classes.toolbar}/>
        <Box display="flex" >
          <Box ml="auto" my="auto" mr={1}>
            <Button onClick={handleHome} variant="contained" color="primary">
              <HomeIcon className={classes.homeSpace} />
              <FormattedMessage id="Button.Shopping" defualtMessage="Shopping" />
            </Button>
          </Box>
        </Box>
      
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
      
          <Container maxWidth="lg" className={classes.main}>
            <div className={classes.AppDiv}>  
              <AppBar position="static">
              <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  <FormattedMessage id="Label.OrderConfirm" defualtMessage="Order Confirmation" />
                </Typography>
                <Button color="inherit" onClick={handleClose}>
                   <FormattedMessage id="Button.Close" defualtMessage="Close" />
                </Button>
              </Toolbar>
              </AppBar>
            </div>
          
            <Paper className={classes.paper} >
              <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row">
                  <Box className={classes.boxTitle}>First name : </Box>
                  <Box className={classes.boxValue}><div className="text2">{requestParams.first_name}</div></Box>
                </Box>
                <Divider />
               
                <Box display="flex" flexDirection="row">
                  <Box className={classes.boxTitle}>Last name : </Box>
                  <Box className={classes.boxValue}><div className="text2">{requestParams.last_name}</div></Box>
                </Box>
                <Divider />
                <Box display="flex" flexDirection="row">
                  <Box className={classes.boxTitle}>Address1 : </Box>
                  <Box className={classes.boxValue}><div className="text2">{requestParams.address1}</div></Box>
                </Box>
                <Divider />
                <Box display="flex" flexDirection="row">
                  <Box className={classes.boxTitle}>Address2 : </Box>
                  <Box className={classes.boxValue}><div className="text2">{requestParams.address2}</div></Box>
                </Box>
                <Divider />
                <Box display="flex" flexDirection="row">
                  <Box className={classes.boxTitle}>Country : </Box>
                  <Box className={classes.boxValue}><div className="text2">{requestParams.country}</div></Box>
                </Box>
                <Divider />
                <Box display="flex" flexDirection="row">
                  <Box className={classes.boxTitle}>State : </Box>
                  <Box className={classes.boxValue}><div className="text2">{requestParams.state}</div></Box>
                </Box>
                <Divider />
                
                <Box display="flex" flexDirection="row">
                  <Box className={classes.boxTitle}>City : </Box>
                  <Box className={classes.boxValue}><div className="text2">{requestParams.city}</div></Box>
                </Box>
              </Box>
              <Divider />
              <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row">
                  <Box className={classes.boxTitle}><FormattedMessage id="Label.TotalQuantity" defualtMessage="Total Quantity" /></Box>
                  <Box className={classes.boxValue}>{totalQuantity}</Box>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row">
                  <Box className={classes.boxTitle}><FormattedMessage id="Label.TotalPrice" defualtMessage="Total Price" /></Box>
                  <Box className={classes.boxValue}>{requestParams.total_price}(MMK)</Box>
               </Box>
              </Box>
            </Paper>
            <Grid container>
              <Button
                fullWidth
                className={classes.submitButton}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                <FormattedMessage id="Button.Confirm" defualtMessage="Confirm" />
              </Button>
              {loading && <CircularProgress size={24} className={classes.btnProgress} />}
            </Grid>
          </Container>
        </form>
        <Box display="flex" >
          <Box ml="auto" my="auto" mr={0} mt={3}>
            <Button onClick={handleBack} variant="contained" color="primary">
              <FormattedMessage id="Button.Back" />
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

CheckoutConfirm.propTypes = {
  
   totalQuantity: PropTypes.number.isRequired,
};
export default withRouter(CheckoutConfirm);
