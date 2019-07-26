import { connect } from 'react-redux';
import OrderHistory from '../components/OrderHistory';
import { fetchAllOrders,setOrderId, setSearchText,clickOrderId ,setbeginDate,setendDate} from '../modules/orders';


export default connect(
  (state) => ({
    // cart: state.cart.rows,
    //orders: state.orders.rows,
    orders: state.orders.rows, 
    searchText: state.orders.searchText,
    searchTextBegin: state.orders.searchTextBegin,
    searchTextEnd: state.orders.searchTextEnd
  }),
   
  (dispatch) => ({
    fetchAllOrders: () => dispatch(fetchAllOrders()),
    setOrderId: (orderId) =>  dispatch(setOrderId(orderId)),
    setSearchText: (text) =>  dispatch(setSearchText(text)),
    clickOrderId :(orderId) => dispatch(clickOrderId(orderId)),
    setbeginDate: (date) =>  dispatch(setbeginDate(date)),
    setendDate: (date) =>  dispatch(setendDate(date)),
  })
  
 
)(OrderHistory);
