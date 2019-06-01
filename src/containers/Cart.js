import { connect } from 'react-redux'
import Cart from '../components/Cart'
import { changeQuantity, deleteCartItem } from '../modules/cart'


const mapStateToProps = state => ({
  cart: state.cart.rows,
  maxQuantity: state.cart.maxQuantity
})

const mapDispatchToProps = dispatch => ({
  changeQuantity: (itemId, quantity) => dispatch(changeQuantity(itemId, quantity)),
  deleteCartItem: (itemId) => dispatch(deleteCartItem(itemId)),
  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
