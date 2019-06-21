import { connect } from 'react-redux'
import App from '../components/App'
import { fetchCartData } from '../modules/cart'
import { fetchAllCategories } from '../modules/categories'
import { setUser } from '../modules/auth'

const mapStateToProps = (state, ownProps) => ({
  locale: 'en'
})

const mapDispatchToProps = dispatch => ({
  fetchCartData: () => dispatch(fetchCartData()),
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  setUser: (userId) => dispatch(setUser(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
