import React from 'react';
import CheckoutForm from '../containers/CheckoutForm';
import CheckoutConfirm from '../containers/CheckoutConfirm';
import CheckoutSuccess from '../containers/CheckoutSuccess';

const Checkout = ({ showForm, cart, requestParams, postResultObj, clearCheckout }) => {
  let comp = <CheckoutForm />;
  if (showForm || cart.length === 0) {
    //Don't show old form data. So clear old form data. 
    clearCheckout();
  }
  else if (postResultObj != null) {
    comp = <CheckoutSuccess />;
  }
  else if (requestParams != null) {
    comp = <CheckoutConfirm />;
  }
  return (comp);
};

export default Checkout;