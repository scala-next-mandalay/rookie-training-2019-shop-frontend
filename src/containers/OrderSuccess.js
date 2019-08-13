import { connect } from 'react-redux';
import OrderSuccess from '../components/OrderSuccess';
import { setRequestParams, postOrder } from '../modules/orders'
export default connect(
  (state) => ({
    postResultObj: state.orders.postResultObj,
    requestParams: state.orders.requestParams,
    loading:state.orders.loading,
    totalPrice: state.cart.totalPrice,
    totalQuantity: state.cart.totalQuantity,
  }),
  (dispatch) => ({

    setRequestParams: (addressForm) =>  dispatch(setRequestParams(addressForm)),

    postOrder: () =>  dispatch(postOrder())

  })
  
  
)(OrderSuccess);
