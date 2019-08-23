import { connect } from 'react-redux';
import OrderHistory from '../components/OrderHistory';
import { fetchAllOrders, setSearchByOrderId,clickOrderId ,setbeginDate,setendDate} from '../modules/orders';
import { fetchAuthedUser, refreshToken } from '../modules/auth';

export default connect(
  (state) => ({
    orders: state.orders.rows, 
    // searchTextOrderId: state.orders.searchTextOrderId,
    searchTextBegin: state.orders.searchTextBegin,
    searchTextEnd: state.orders.searchTextEnd,
    user: state.auth.user,
    authState: state.auth.authState,
    loading: state.auth.loading,
  }),
   
  (dispatch) => ({
    fetchAllOrders: () => dispatch(fetchAllOrders()),
    setSearchByOrderId: (text) =>  dispatch(setSearchByOrderId(text)),
    clickOrderId :(orderId) => dispatch(clickOrderId(orderId)),
    setbeginDate: (date) =>  dispatch(setbeginDate(date)),
    setendDate: (date) =>  dispatch(setendDate(date)),
    fetchAuthedUser: () => dispatch(fetchAuthedUser()),
    refreshToken: () => dispatch( refreshToken() )
  })
  
 
)(OrderHistory);
