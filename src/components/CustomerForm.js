import React, { Component } from "react";
import "./style.css";
import TitleBar from '../containers/TitleBar'
import ToolbarSpacer from './ToolbarSpacer'
import CartTable from '../containers/CartTable'
import TotalOrder from '../containers/TotalOrder'
import {Divider,Grid,Link,Box} from '@material-ui/core'
// import PropTypes from 'prop-types'
import {Link as RouterLink} from 'react-router-dom'




// const emailRegex = RegExp(
//   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// );

const txt=RegExp(/^[a-zA-Z]*$/);



const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};


class CustomerForm extends Component {
   
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      address1: null,
      address2: null,
      country: null,
      statetxt: null,
      city: null,
      formErrors: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        country: "",
        statetxt: "",
        city: "",
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --CustomerForm--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Address1: ${this.state.address1}
        Address2: ${this.state.address2}
        Country :${this.state.country}
        State :${this.state.statetxt}
        City :${this.state.city}
      `);
    }
    else if(this.state.firstName===null||this.state.lastName===null||this.state.address1===null||this.state.address2===null||this.state.country===null||this.state.city===null||this.state.statetxt){
       alert("fill your information fully");
    }
    
    else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        // formErrors.firstName =
        //   value.length < 3 ? "minimum 3 characaters required" : "";
        formErrors.firstName =txt.test(value)?"":"invalid first name(put only alphabetical)";
        break;
      case "lastName":
        formErrors.lastName =txt.test(value)?"":"invalid last name(put only alphabetical)"
        break;
      case "address1":
        formErrors.address1=
         value.length < 5? "required address1":"";
        break;
       case "address2":
        formErrors.address2=
         value.length < 3? "required address2":"";
        break;
       case "country":
        formErrors.country=txt.test(value)?"":"invalid country";
        break;
        // case "statetxt":
        // formErrors.statetxt=
        // value.length <= 0? "required state":"";
        // break;
        case "city":
        formErrors.city=
         formErrors.city=txt.test(value)?"":"invalid city";
        break;
        
        
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;
    // const customer = ({totalPrice}) => {
    // return (
    //     <Box mt={1} fontSize="h6.fontSize" fontWeight={600}>
    //         Total {totalPrice} Ks
    //       </Box>
    //   )
    
    //  }
    return (
        
      <div >
      <TitleBar showMenu={false} />
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
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="address1">
              <label htmlFor="address1">Address1</label>
              <input
                className={formErrors.address1.length > 0 ? "error" : null}
                placeholder="eg . 62 streetx 32 street"
                type="text"
                name="address1"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.address1.length > 0 && (
                <span className="errorMessage">{formErrors.address1}</span>
              )}
            </div>
            
            <div className="address2">
              <label htmlFor="address2">Address2</label>
              <input
                className={formErrors.address2.length > 0 ? "error" : null}
                placeholder="eg . No.2/Building F"
                type="text"
                name="address2"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.address2.length > 0 && (
                <span className="errorMessage">{formErrors.address2}</span>
              )}
            </div>
             <div className="country">
              <label htmlFor="country">Country</label>
              <input
                className={formErrors.country.length > 0 ? "error" : null}
                placeholder="eg . Myanmar"
                type="text"
                name="country"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.country.length > 0 && (
                <span className="errorMessage">{formErrors.country}</span>
              )}
            </div>
            <div className="statetxt">
              <label htmlFor="statetxt">State</label>
              <input
                className={formErrors.statetxt.length > 0 ? "error" : null}
                placeholder="eg . Mandalay"
                type="text"
                name="statetxt"
                noValidate
                onChange={this.handleChange}
              />
             
            </div>
             <div className="city">
              <label htmlFor="city">City</label>
              <input
                className={formErrors.city.length > 0 ? "error" : null}
                placeholder="eg . PyinOoLwin"
                type="text"
                name="city"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.city.length > 0 && (
                <span className="errorMessage">{formErrors.city}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">PROCEED TO PUCHARSE</button>
             
            </div>
          </form>
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
       <CartTable/>
      <TotalOrder/>
     
       
        <Divider marginTop="2px"/> 
       </Grid>
       </Grid>
       
        </div>
        
        
      
        </div>
    );
  }
}



export default CustomerForm;