import { connect } from 'react-redux';
import CheckoutConfirm from '../components/CheckoutConfirm';
import { postOrder } from '../modules/orders'
export default connect(
  (state) => ({
    postResultObj: state.orders.postResultObj,
    requestParams: state.orders.requestParams,
    loading:state.orders.loading,
    totalQuantity: state.cart.totalQuantity,
  }),
  (dispatch) => ({
    postOrder: () =>  dispatch(postOrder())
  })
)(CheckoutConfirm);

