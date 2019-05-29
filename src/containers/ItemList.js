import { connect } from 'react-redux'
import ItemList from '../components/ItemList'
import { 
  fetchAllItems, 
  getVisibleItems,
} from '../modules/items'

const mapStateToProps = state => ({
  items: getVisibleItems(state.items.items, state.items.visibilityFilter),
  noMoreFetch: state.items.noMoreFetch
})

const mapDispatchToProps = dispatch => ({
  fetchAllItems: () => dispatch(fetchAllItems()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList)
