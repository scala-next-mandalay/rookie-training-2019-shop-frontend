import { connect } from 'react-redux';
import CheckoutOrder from '../components/CheckoutOrder';

export default connect(
  (state) => ({
    cart: state.cart.rows,
    totalPrice: state.cart.totalPrice,
    totalQuantity: state.cart.totalQuantity,
  }),
  null
)(CheckoutOrder);