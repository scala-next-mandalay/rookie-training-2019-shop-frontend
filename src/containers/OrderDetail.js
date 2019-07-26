import { connect } from 'react-redux';
import OrderDetail from '../components/OrderDetail';
const _getOrderItemsByOrder = (rows, OrderId) => {
  console.log("_getOrderItemsByOrder-rows ",rows);
  console.log("_getOrderItemsByOrder-OrderId:" ,OrderId);
  if (OrderId <= 0) {
    return rows;
  }
  else {
    const newRows = rows.filter(oitem => oitem.order_id === parseInt(OrderId));
    console.log('_getItemsByCategory2', newRows);
    return newRows;
  }
};

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
   orderitems: _getOrderItemsByOrder(state.orderitems.rows, state.orders.clickedOrderId),
    items: state.items.rows,
    orders: state.orders.rows,
    selectedOrder: _getOrderById(state.orders.rows, state.orders.clickedOrderId)
   
  })
)(OrderDetail);
