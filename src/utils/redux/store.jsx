import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import accountReducer from "./accountSlice";

const store = configureStore({
    reducer:{
        cart:cartReducer,
        user:userReducer,
        auth:authReducer,
        account:accountReducer
    }
});

export default store;

