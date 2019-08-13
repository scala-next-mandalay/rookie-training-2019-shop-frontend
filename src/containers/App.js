import { connect } from 'react-redux';
import App from '../components/App';
import { fetchCartData } from '../modules/cart';
import { fetchAllCategories } from '../modules/categories';
import { fetchAllOrders } from '../modules/orders';
import { fetchAllOrdersItem } from '../modules/orderitems';
import { fetchAuthedUser, refreshToken } from '../modules/auth';

export default connect(
  (state) => ({
    authState: state.auth.authState,
    dialogOpened: state.auth.dialogOpened,
    user: state.auth.user,
    loading: state.auth.loading,
    locale: state.locale.locale
    
  }),
  (dispatch) => ({
    fetchCartData: () => dispatch(fetchCartData()),
    fetchAllCategories: () => dispatch(fetchAllCategories()),
    fetchAllOrders: () => dispatch(fetchAllOrders()),
    fetchAllOrdersItem: () => dispatch(fetchAllOrdersItem()),
    fetchAuthedUser: () => dispatch(fetchAuthedUser()),
    refreshToken: () => dispatch( refreshToken() )
    
  })
)(App)
