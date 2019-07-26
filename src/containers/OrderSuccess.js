import { connect } from 'react-redux';
import OrderSuccess from '../components/OrderSuccess';

export default connect(
  (state) => ({
    postResultObj: state.orders.postResultObj
  })
)(OrderSuccess)
