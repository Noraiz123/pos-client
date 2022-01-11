import { combineReducers } from 'redux';
import AuthReducer from './auth.reducer';
import ProductsReducer from './products.reducer';
import OrdersReducer from './orders.reducer';

export default combineReducers({
  auth: AuthReducer,
  products: ProductsReducer,
  orders: OrdersReducer,
});
