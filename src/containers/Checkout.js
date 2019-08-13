import { connect } from 'react-redux';
import Checkout from '../components/Checkout';
import { clearCheckout } from '../modules/orders'

export default connect(
  (state) => ({
    cart: state.cart.rows,
    requestParams: state.orders.requestParams,
    postResultObj: state.orders.postResultObj,
  }),
  (dispatch) => ({
    clearCheckout: () =>  dispatch(clearCheckout())
  })
)(Checkout);

