import { combineReducers } from 'redux';  
import  authReducer   from './authReducer'; 
import cartReducer from './cartReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';
import adminReducer from './adminReducer'; 
import adminOrdersReducer from './adminOrdersReducer';
import notificationReducer from './notificationReducer'; 
import reviewsReducer from './reviewsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    products: productReducer, 
    notification: notificationReducer,
    orders: orderReducer, 
    admin: adminReducer, 
    adminOrders: adminOrdersReducer, 
    reviews: reviewsReducer
});

export {rootReducer};