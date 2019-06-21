import { connect } from 'react-redux'
import TitleBar from '../components/TitleBar'
import { signOut } from '../modules/auth'

export default connect(
  (state) => ({
    cart: state.cart.rows,
    totalQuantity:  state.cart.totalQuantity,
    userId: state.auth.userId
  }),
  (dispatch) => ({
    signOut: () => dispatch(signOut()),    
  })
)(TitleBar)
