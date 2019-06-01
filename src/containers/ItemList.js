import { connect } from 'react-redux'
import ItemList from '../components/ItemList'
import { 
  fetchAllItems,
  getItemsByCategory,
} from '../modules/items'

const mapStateToProps = state => ({
  items: getItemsByCategory(state.items.rows, state.items.selectedCateogryId),
  noMoreFetch: state.items.noMoreFetch
})

const mapDispatchToProps = dispatch => ({
  fetchAllItems: () => dispatch(fetchAllItems()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList)
