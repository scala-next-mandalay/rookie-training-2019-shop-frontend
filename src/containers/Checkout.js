import { connect } from 'react-redux';
import Checkout from '../components/Checkout';
import { setRequestParams} from '../modules/orders';

export default connect(
  (state) => ({
    totalPrice: state.cart.totalPrice,
    totalQuantity: state.cart.totalQuantity,
  }),
  (dispatch) => ({
    setRequestParams: (addressForm) =>  dispatch(setRequestParams(addressForm)),
   
  })
)(Checkout);