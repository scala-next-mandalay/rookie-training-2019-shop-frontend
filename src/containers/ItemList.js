import { connect } from 'react-redux';
import ItemList from '../components/ItemList';
import { fetchItems} from '../modules/items';

const _getItemsByCategory = (rows, categoryId) => {
  console.log("item lis ",rows);
  if (categoryId <= 0) {
    return rows;
  }
  else {
    return rows.filter(t => t.category_id === categoryId);
  }
};

export default connect(
  (state) => ({
    items: _getItemsByCategory(state.items.rows, state.items.selectedCateogryId),
    noMoreFetch: state.items.noMoreFetch
  }),
  (dispatch) => ({
    fetchItems: () => dispatch(fetchItems()),
  })
)(ItemList);
