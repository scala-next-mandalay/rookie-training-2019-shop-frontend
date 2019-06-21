import { combineReducers } from 'redux'
import { itemsReducer } from './items'
import { categoriesReducer } from './categories'
import { cartReducer } from './cart'
import { authReducer } from './auth'

export default combineReducers({
  items: itemsReducer,
  categories:　categoriesReducer,
  cart: cartReducer,
  auth: authReducer,
})
