import { connect } from 'react-redux'
import App from '../components/App'
import { fetchCartData } from '../modules/cart'
import { fetchAllCategories } from '../modules/categories'

const mapStateToProps = (state, ownProps) => ({
  locale: 'en'
})

const mapDispatchToProps = dispatch => ({
  fetchCartData: () => dispatch(fetchCartData()),
  fetchAllCategories: () => dispatch(fetchAllCategories()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
