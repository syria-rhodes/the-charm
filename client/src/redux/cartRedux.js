import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        cartQuantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.cartQuantity += 1;
            state.items.push(action.payload.product);
            state.total += action.payload.price;
        },
        delProduct: (state, action) => {
            state.items.splice(action.payload.index, 1);
            state.total -= action.payload.price;
            state.cartQuantity -= 1;
        },
        clearCart: (state) => {
            state.items = [];
            state.cartQuantity = 0;;
            state.total = 0;
        }
    }
}); 

export const { clearCart, addProduct, delProduct } = cartSlice.actions;
export default cartSlice.reducer;