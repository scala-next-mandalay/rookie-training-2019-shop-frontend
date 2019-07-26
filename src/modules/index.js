import { combineReducers } from 'redux';
import { itemsReducer } from './items';
import { categoriesReducer } from './categories';
import { cartReducer } from './cart';
import { ordersReducer } from './orders';
import { orderItemReducer } from './orderitems';

export default combineReducers({
  items: itemsReducer,
  categories:categoriesReducer,
  cart: cartReducer,
  orders:ordersReducer,
   orderitems:orderItemReducer,
   
});
