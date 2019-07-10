import React, { Component } from "react";
import "./style.css";
import {Divider,Grid} from '@material-ui/core'

// import PropTypes from 'prop-types'


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


class Payment extends Component {
   
  constructor(props) {
    super(props);

    this.state = {
      cardName: null,
      cardNumber: null,
      code: null,
      date:null,
      formErrors: {
        cardName: "",
        cardNumber: "",
        code: "",
        date: "",
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Card Name: ${this.state.cardName}
        card Number: ${this.state.cardNumber}
        date: ${this.state.date}
        code: ${this.state.code}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "cardName":
        formErrors.cardName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
     
       case "cardNumber":
        formErrors.cardNumber =
          value.length < 10 ? "wrong" : "";
        break;
      case "code":
        formErrors.code =
          value.length < 6 ? "minimum 6 characaters required" : "";
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
        
      <div>
     
      <Grid display="flex" flexDirection="row" >
      <Grid item xs={12} sm={12} md={8} lg={8}>
      <div className="wrapper">
        <div className="form-wrapper">
        <div className="priceTxt">
        Credit Card
        </div>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="cardName">
              <label htmlFor="cardName">Name on card *</label>
              <input
                className={formErrors.cardName.length > 0 ? "error" : null}
                
                type="text"
                name="cardName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.cardName.length > 0 && (
                <span className="errorMessage">{formErrors.cardName}</span>
              )}
            </div>
            <div className="cardNumber">
              <label htmlFor="cardNumber">Credit card number *</label>
              <input
                className={formErrors.cardNumber.length > 0 ? "error" : null}
                type="text"
                name="cardNumber"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.cardNumber.length > 0 && (
                <span className="errorMessage">{formErrors.cardNumber}</span>
              )}
            </div>
            <div className="date">
            <label htmlFor="code">Expiry Date: *</label>
              <input type="date"
              noValidate/>
            </div>
            <div className="code">
              <label htmlFor="code">Security code *</label>
              <input
                className={formErrors.code.length > 0 ? "error" : null}
                type="text"
                name="code"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.code.length > 0 && (
                <span className="errorMessage">{formErrors.code}</span>
              )}
            </div>
            
            <Divider />
           
            <Grid item xs={12} sm={12} md={8} lg={8} className="priceTxt">
            By clicking "Proceed to payment" you agree to our Terms & Conditions and you have reviewed your order and personal details.
            </Grid>
       
           
            <Grid item xs={12} sm={12} md={4} lg={4}>
            <div className="createAccount">
             <button type="submit">Proceed to Payment</button>
            </div>
            </Grid>
           
             <Divider />
          </form>
        </div>
        </div>
        </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
        <Divider marginTop="2px"/>
        </Grid>
        </div>
    );
  }
}

// customer.propTypes = {
//   totalPrice: PropTypes.number.isRequired,
// }

export default Payment;