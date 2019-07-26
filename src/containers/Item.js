import { connect } from 'react-redux';
import Item from '../components/Item';
import { addCartItem} from '../modules/cart';

const mapDispatchToProps = dispatch => ({
  addCartItem: (itemId) => dispatch(addCartItem(itemId)),
});

export default connect(
  null,
  mapDispatchToProps
)(Item);
