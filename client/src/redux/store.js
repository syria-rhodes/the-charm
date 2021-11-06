import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartRedux'
import customerReducer from './customerRedux'
import itemReducer from './itemIdRedux'

export default configureStore({
    reducer: {
        cart: cartReducer,
        itemID: itemReducer,
        customer: customerReducer
    }
}); 