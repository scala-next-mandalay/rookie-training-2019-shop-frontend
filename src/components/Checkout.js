import React from 'react';
import {Button,Grid,Divider,Dialog,Box,Container,Paper,Link,TextField} from '@material-ui/core';
import TitleBar from '../containers/TitleBar';
import ToolbarSpacer from './ToolbarSpacer';
import CartTable from '../containers/CartTable';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { validateForm } from '../util';
import clsx from 'clsx';
import './style.css';

const useStyles = makeStyles(theme => ({
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
    gridPaper: {
   backgroundColor: '#f2f2f2',
  },
  gridTotalPrice :{
    backgroundColor: '#fff',
    borderRadius:'2px',
    border : '1px solid #f2f2f2',
    marginRight: '40px',
    textAlign:'center'
  },
  textField: {
    backgroundColor : '#fff',
    border: '1px solid #f2f2f2'
  },
  dense: {
    marginTop: theme.spacing(2),
  }
}));

const Checkout = ({ setRequestParams, history,totalPrice,totalQuantity}) => {
   const classes = useStyles();
   const validationSetting = {
    isEmpty: ['first_name', 'address1', 'country', 'city']
  };
   const state  = {
    
    first_name: "", 
    last_name: "", 
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
  };
  const [form, setForm] = React.useState(state );
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  
  const handleChangeValue = fieldName => event => {
    const newForm = {...form};
    newForm[fieldName] =  event.target.value;
    setForm(newForm);
  };
  
  const handleSubmit = event => {
    event.preventDefault();
      const errs = validateForm(validationSetting, form);
    if (errs) {
      setErrors(errs);
       if(form.first_name===""||form.last_name===""||form.address1===""||form.address2===""||form.country===""||form.state===""||form.city===""){
       alert("fill your information form fully.");
       handleClose(false);
    }
    }
    else {
       setRequestParams(form);
     // history.push('/confirm')
     
      console.log(`
        --CustomerForm--
        First Name: ${form.first_name}
        Last Name: ${form.last_name}
        Address1: ${form.address1}
        Address2: ${form.address2}
        Country :${form.country}
        State :${form.state}
        City :${form.city}
      `);
    }
    };
  const addressForm = (
           <div>
            <form noValidate onSubmit={handleSubmit}>
          
            <div className="firstName">
            <TextField
            className={clsx(classes.textField, classes.dense)}
            id={"first_name"}
            name={"first_name"}
            value={form.first_name}
            error={errors.first_name ? true : false}
            required={validationSetting.isEmpty.indexOf("first_name") >=0 ? true : false}
            onChange={handleChangeValue("first_name")}
            label="First name"
            fullWidth
            autoComplete="fname"
            variant="outlined"
            
          />
        </div>
         
        <div className="lastName">
          <TextField
            className={clsx(classes.textField, classes.dense)}
            id={"last_name"}
            name={"last_name"}
            value={form.last_name}
            error={errors.last_name ? true : false}
            required={validationSetting.isEmpty.indexOf("last_name") >=0 ? true : false}
            onChange={handleChangeValue("last_name")}
            label="Last name"
            fullWidth
            autoComplete="lname"
            variant="outlined"
          />
        </div>
        
       <div className="address1">
          <TextField
            className={clsx(classes.textField, classes.dense)}
            id={"address1"}
            name={"address1"}
            value={form.address1}
            error={errors.address1 ? true : false}
            required={validationSetting.isEmpty.indexOf("address1") >=0 ? true : false}
            onChange={handleChangeValue("address1")}
            label="address1"
            fullWidth
            variant="outlined"
          />
        </div>
        
       <div className="address2">
          <TextField
           className={clsx(classes.textField, classes.dense)}
            id={"address2"}
            name={"address2"}
            value={form.address2}
            error={errors.address2 ? true : false}
            required={validationSetting.isEmpty.indexOf("address2") >=0 ? true : false}
            onChange={handleChangeValue("address2")}
            label="address2"
            fullWidth
            variant="outlined"
          />
        </div>
        
        <div className="country">
          <TextField
            className={clsx(classes.textField, classes.dense)}
            id={"country"}
            name={"country"}
            value={form.country}
            error={errors.country ? true : false}
            required={validationSetting.isEmpty.indexOf("country") >=0 ? true : false}
            onChange={handleChangeValue("country")}
            label="country"
            fullWidth
            variant="outlined"
          />
        </div>
        
        <div className="statetxt">
          <TextField
            className={clsx(classes.textField, classes.dense)}
            id={"state"}
            name={"state"}
            value={form.state}
            error={errors.state ? true : false}
            required={validationSetting.isEmpty.indexOf("state") >=0 ? true : false}
            onChange={handleChangeValue("state")}
            label="state"
            fullWidth
            variant="outlined"
          />
        </div>
        
       <div className="city">
          <TextField
            className={clsx(classes.textField, classes.dense)}
            id={"city"}
            name={"city"}
            value={form.city}
            error={errors.city ? true : false}
            required={validationSetting.isEmpty.indexOf("city") >=0 ? true : false}
            onChange={handleChangeValue("city")}
            label="city"
            fullWidth
            variant="outlined"
          />
        </div>
      
            <div className="createAccount">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleClickOpen}
            >
              Confirm
            </Button>
            
            </div>
        
           </form>
            <Dialog fullScreen open={open} onClose={handleClose}>
           <AppBar>
          <Toolbar>
         
           <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close"
            >
              <CloseIcon />
           </IconButton>
         </Toolbar>
        </AppBar>
         <Container maxWidth="lg" className={classes.main}>
           <Paper className={classes.paper} >
           <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}>First name : </Box>
              <Box className={classes.boxValue}>{form.first_name}</Box>
            </Box>
            <Divider />
           
            <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}>Last name : </Box>
              <Box className={classes.boxValue}>{form.last_name}</Box>
            </Box>
            <Divider />
            <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}>Address1 : </Box>
              <Box className={classes.boxValue}>{form.address1}</Box>
            </Box>
             <Divider />
            <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}>Address2 : </Box>
              <Box className={classes.boxValue}>{form.address2}</Box>
            </Box>
             <Divider />
            <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}>Country : </Box>
              <Box className={classes.boxValue}>{form.country}</Box>
            </Box>
             <Divider />
            <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}>State : </Box>
              <Box className={classes.boxValue}>{form.state}</Box>
            </Box>
             <Divider />
           <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}>City : </Box>
              <Box className={classes.boxValue}>{form.city}</Box>
           </Box>
           
           </Box>
           </Paper>
           <Paper className={classes.paper}>
              <Box display="flex" flexDirection="column">
              <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}>Total</Box>
              <Box className={classes.boxValue}>{totalPrice}(Kyats)</Box>
             </Box>
             </Box>
          </Paper>
        <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitButton}
            // onClick={handleSubmit}
            to="/checkoutconfirm"
            component={RouterLink}
          >
            Confirm
          </Button>
      </Container>
      </Dialog>
      </div>
      
  );
  
  return (
    <div maxWidth="lg">
     <TitleBar showMenu={false} showIcon={true} />
      <ToolbarSpacer />
     <div className="title_Ship">
      <div className="ho">1. Shipping information</div>
      <div className="priceTxt">If shipping to a work address, please include the company name.</div>
      <div className="txt3">Your information</div>
      </div>
      <Grid display="flex" flexDirection="row">
      <Grid item xs={12} sm={12} md={8} lg={8}>
       <Box display="flex" >
       <Box ml="auto" my="auto" mr={3}>
       <Link className='priceTxt' to="/"
            component={RouterLink}
            >
            Continue Shopping
       </Link>
       </Box>
      </Box>
       <div className="wrapper">
       <div className="form-wrapper">
       {addressForm}
        </div>
        </div>
        </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
        <Divider marginTop="2px"/>
        </Grid>
        <div className="title_Ship">
        <div className="ho">2. Order review</div>
        <Grid display="flex" flexDirection="row">
        <Grid item xs={12} sm={12} md={8} lg={8}>
        <CartTable showQty={true}/>
          <Box display="flex" flexDirection="column" marginTop="20px" backgroundColor="#f2f2f2">
          <Paper className={classes.gridPaper}>
          <Box  mt={1} mb={1} fontSize="h6.fontSize" textAlign="right" className="nameTxt" mr={0} display="flex">
          <Grid className="nameTxt" item xs={8} sm={8}> Total Quantity(Items) :</Grid> <Grid xs={4} sm={4} className={classes.gridTotalPrice}> {totalQuantity}(Items)</Grid>
          </Box>
          <Box  mt={1} mb={1} fontSize="h6.fontSize" textAlign="right" className="nameTxt" mr={0} display="flex">
          <Grid className="nameTxt" item xs={8} sm={8}> Total Price :</Grid> <Grid xs={4} sm={4} className={classes.gridTotalPrice}> {totalPrice}(MMK)</Grid>
          </Box>
        </Paper>
      </Box>  
      <Divider marginTop="2px"/> 
       </Grid>
       </Grid>
        </div>
    </div>
    
  );
}
Checkout.propTypes = {
  totalPrice: PropTypes.number.isRequired,
   totalQuantity: PropTypes.number.isRequired,
}
export default Checkout