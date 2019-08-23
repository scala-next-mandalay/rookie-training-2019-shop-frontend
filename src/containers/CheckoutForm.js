import { connect } from 'react-redux';
import CheckoutForm from '../components/CheckoutForm';
import { setRequestParams } from '../modules/orders';

export default connect(
  (state) => ({
    cart: state.cart.rows,
    totalPrice: state.cart.totalPrice,
    totalQuantity: state.cart.totalQuantity,
  }),
  (dispatch) => ({
    setRequestParams: (addressForm) =>  dispatch(setRequestParams(addressForm))
  })
)(CheckoutForm);