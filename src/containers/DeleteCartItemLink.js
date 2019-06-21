import { connect } from 'react-redux'
import DeleteCartItemLink from '../components/DeleteCartItemLink'
import { deleteCartItem } from '../modules/cart'

export default connect(
  null,
  (dispatch) => ({
    deleteCartItem: (itemId) => dispatch(deleteCartItem(itemId)),
  })
)(DeleteCartItemLink)
