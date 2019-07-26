import { connect } from 'react-redux';
import CategoryList from '../components/CategoryList';
import { setCategoryId } from '../modules/items';

export default connect(
  (state) => ({
    categories: state.categories.rows,
  }),
  (dispatch) => ({
    setCategoryId: (id) => dispatch(setCategoryId(id)),
  })
)(CategoryList);
