import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import accountReducer from "./accountSlice";
import checkoutReducer from "./checkoutSlice";


const store = configureStore({
    reducer:{
        cart:cartReducer,
        user:userReducer,
        auth:authReducer,
        account:accountReducer,
        checkout:checkoutReducer,
    }
});

export default store;

