import React from 'react';
import {Button,Grid,Divider,Box,Paper,TextField} from '@material-ui/core';
import TitleBar from '../containers/TitleBar';
import { FormattedMessage } from 'react-intl';
import CartTable from '../containers/CartTable';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { validateForm } from '../util';
import clsx from 'clsx';
import '../assets/style.css';
import { withRouter } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

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
  },
   title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  toolbar:{
  marginTop: theme.spacing(10),
  },
  homeSpace: {
    marginRight: theme.spacing(1),
  }
 
}));

const CheckoutForm = ({ cart,setRequestParams, history,totalPrice,totalQuantity}) => {
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
  
  const [errors, setErrors] = React.useState({});
  
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
      }
    }
    else {
       setRequestParams(form);
       history.push("/checkout/confirm");
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
            onClick={handleSubmit}
            disabled={!cart.length}
           
          
          >
           <FormattedMessage id="Button.Confirm" defualtMessage="Confirm" />
          </Button>
        </div>
      </form>
    </div>
  );
  
  const handleHome = event => {
    event.preventDefault();
    history.push("/");
  };

  return (
    <React.Fragment>
       <TitleBar showMenu={false} showNav={false} showIcon={true} />
        <div className={classes.toolbar} />
        
        <div className="title_Ship">
        
          <div className="ho">1.<FormattedMessage id="Label.ShippingInformation" defualtMessage="Shipping Information" /></div>
          <div className="txt3"><FormattedMessage id="Label.Information" defualtMessage="Information" /></div>
          <div className="text2"><FormattedMessage id="Label.InformationDetail" defualtMessage="Please fill your information fully" /></div>
        
          <Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Box display="flex" >
                <Box ml="auto" my="auto" mr={1}>
                  <Button onClick={handleHome} variant="contained" color="primary">
                    <HomeIcon className={classes.homeSpace} />
                    <FormattedMessage id="Button.Shopping" defualtMessage="ShoppingContinuation" />
                  </Button>
                </Box>
              </Box>
              {addressForm}
              <Divider/> 
            </Grid>
          </Grid>
        </div>
        
        <div className="title_Ship">
          <div className="ho">2.<FormattedMessage id="Label.OrderReview" defualtMessage="Order Review" /></div>
           
           
           
          <Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <CartTable showQty={true}/>
              <Box display="flex" flexDirection="column" marginTop="20px" bgcolor="#f2f2f2">
                <Paper className={classes.gridPaper}>
                  <Box  mt={1} mb={1}  textAlign="right" className="text1" mr={0} display="flex">
                    <Grid className="text1" item xs={9} sm={8}><FormattedMessage id="Label.TotalQuantity" defualtMessage="Total Quantity" />:</Grid> <Grid item xs={3} sm={4} className={classes.gridTotalPrice}> {totalQuantity}(Items)</Grid>
                  </Box>
                  <Box  mt={1} mb={1} textAlign="right" className="text1" mr={0} display="flex">
                    <Grid className="text1" item xs={9} sm={8}><FormattedMessage id="Label.TotalPrice" defualtMessage="Total Price" />:</Grid> <Grid item xs={3} sm={4} className={classes.gridTotalPrice}> {totalPrice}(MMK)</Grid>
                  </Box>
                </Paper>
              </Box>  
              <Divider/> 
           </Grid>
         </Grid>
        </div>
    </React.Fragment>
    
  );
};
CheckoutForm.propTypes = {
   totalPrice: PropTypes.number.isRequired,
   totalQuantity: PropTypes.number.isRequired,
};
export default withRouter(CheckoutForm);