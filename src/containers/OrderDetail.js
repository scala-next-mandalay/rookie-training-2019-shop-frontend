import { connect } from 'react-redux';
import OrderDetail from '../components/OrderDetail';


const _getOrderById = (orders, id) => {

  for (const order of orders) {
    if (order.id === id) {
      return order;
    }
   }
   return null;
};
export default connect(
  
  (state) => ({
    
    orderitems: state.orderitems.rows,
    selectedOrder:  _getOrderById(state.orders.rows, state.orders.selectedOrderId)
   
  })
  
)(OrderDetail);
