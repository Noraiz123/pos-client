import { combineReducers } from 'redux';
import AuthReducer from './auth.reducer';
import ProductsReducer from './products.reducer';
import OrdersReducer from './orders.reducer';
import categoriesReducer from './categories.reducer';
import customersReducer from './customers.reducer';
import usersReducer from './users.reducer';
import vendorsReducer from './vendors.reducer';
import tagsReducer from './tags.reducer';

export default combineReducers({
  auth: AuthReducer,
  products: ProductsReducer,
  orders: OrdersReducer,
  categories: categoriesReducer,
  customers: customersReducer,
  users: usersReducer,
  vendors: vendorsReducer,
  tags: tagsReducer,
});
