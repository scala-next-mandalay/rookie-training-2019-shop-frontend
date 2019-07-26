import { connect } from 'react-redux';
import CartTable from '../components/CartTable';

export default connect(
  (state) => ({
    cart: state.cart.rows
  })
)(CartTable);
