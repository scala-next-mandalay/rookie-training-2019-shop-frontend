import { connect } from 'react-redux';
import CheckoutSuccess from '../components/CheckoutSuccess';
export default connect(
  (state) => ({
    postResultObj: state.orders.postResultObj
  })
)(CheckoutSuccess);
