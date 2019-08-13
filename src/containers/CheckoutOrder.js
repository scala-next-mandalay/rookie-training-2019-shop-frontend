import { connect } from 'react-redux';
import CheckoutOrder from '../components/CheckoutOrder';
import { deleteCartItem ,changeQuantity} from '../modules/cart';


export default connect(
  (state) => ({
    cart: state.cart.rows,
    totalPrice: state.cart.totalPrice,
    totalQuantity: state.cart.totalQuantity,
    maxQuantity: state.cart.maxQuantity
  }),
  (dispatch) => ({
    deleteCartItem: (itemId) => dispatch(deleteCartItem(itemId)),
    changeQuantity: (itemId, quantity) => dispatch(changeQuantity(itemId, quantity)),    

  })
)(CheckoutOrder);