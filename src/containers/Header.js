import { connect } from 'react-redux'
import Header from '../components/Header'
import { setCategoryId } from '../modules/items'
import { fetchAllCategories } from '../modules/categories'

const mapStateToProps = state => ({
  categories: state.categories.rows,
  cart: state.cart.rows,
  totalQuantity:  state.cart.totalQuantity
})

const mapDispatchToProps = dispatch => ({
  setCategoryId: (id) => dispatch(setCategoryId(id)),
  fetchAllCategories: () => dispatch(fetchAllCategories()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
