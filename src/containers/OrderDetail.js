import { connect } from 'react-redux';
import OrderDetail from '../components/OrderDetail';

const _getOrderById = (orders, id) => {
  console.log("order row ",orders);
  console.log("order id:" ,id);
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
    items: state.items.rows,
    orders: state.orders.rows,
    selectedOrder: _getOrderById(state.orders.rows, state.orders.clickedOrderId)
   
  })
)(OrderDetail);
