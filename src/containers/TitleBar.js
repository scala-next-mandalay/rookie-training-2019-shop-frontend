import { connect } from 'react-redux';
import TitleBar from '../components/TitleBar';

export default connect(
  (state) => ({
    cart: state.cart.rows,
    totalQuantity:  state.cart.totalQuantity,
  }),
  null
)(TitleBar);
