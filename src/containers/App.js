import { connect } from 'react-redux'
import App from '../components/App'
import { fetchCartData } from '../modules/cart'

const mapStateToProps = (state, ownProps) => ({
  locale: 'en'
})

const mapDispatchToProps = dispatch => ({
  fetchCartData: () => dispatch(fetchCartData()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
