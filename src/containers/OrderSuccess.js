import { connect } from 'react-redux';
import OrderSuccess from '../components/OrderSuccess';
import { fetchAllOrders } from '../modules/orders';

export default connect(
  (state) => ({
    // cart: state.cart.rows,
    requestParams: state.orders.requestParams,
    totalPrice: state.cart.totalPrice,
    totalQuantity: state.cart.totalQuantity,
    orders: state.orders.rows,
     
  }),
  (dispatch) => ({
    fetchAllOrders: () => dispatch(fetchAllOrders()),
    
  })
)(OrderSuccess)
