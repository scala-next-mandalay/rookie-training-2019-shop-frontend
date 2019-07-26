import { connect } from 'react-redux';
import Checkout from '../components/Checkout';
import { setRequestParams } from '../modules/orders';
import { fetchAllItems } from '../modules/items';
const _a = (rows) => {
  console.log("item detail checkout row ",rows );
  
};
export default connect(
  (state) => ({
    cart: state.cart.rows,
    totalPrice: state.cart.totalPrice,
    totalQuantity: state.cart.totalQuantity,
    orderitems: _a(state.items.rows),
  }),
  (dispatch) => ({
    setRequestParams: (addressForm) =>  dispatch(setRequestParams(addressForm)),
     fetchAllItems: () => dispatch(fetchAllItems()),
  })
)(Checkout);