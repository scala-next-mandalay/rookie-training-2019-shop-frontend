import { connect } from 'react-redux';
import App from '../components/App';
import { fetchCartData } from '../modules/cart';
import { fetchAllCategories } from '../modules/categories';
import { fetchAllOrders } from '../modules/orders';
import { fetchAllOrdersItem } from '../modules/orderitems';


const mapStateToProps = (state, ownProps) => ({
  locale: 'en'
});

const mapDispatchToProps = dispatch => ({
  fetchCartData: () => dispatch(fetchCartData()),
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  fetchAllOrders: () => dispatch(fetchAllOrders()),
  fetchAllOrdersItem: () => dispatch(fetchAllOrdersItem()),
  
  
   
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
