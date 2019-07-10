import { connect } from 'react-redux'
import TotalOrder from '../components/TotalOrder'

export default connect(
  (state) => ({
    totalPrice: state.cart.totalPrice
  })
)(TotalOrder)
