import { createSlice } from "@reduxjs/toolkit";


export const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.qty++;
            } else {
                state.cart.push({ ...action.payload, qty: 1 })
            }
        },

        removeFromCart: (state, action) => {


        },
        increaseQuantity: (state, action) => {
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            existingItem.qty++;

        },
        decreaseQuantity: (state, action) => {
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem.qty === 1) {
                existingItem.qty === 0;
                const newCartItems = state.cart.filter(x => x.id === action.payload.id);
                state.cart = newCartItems;
            } else {
                existingItem.qty--;
            }

        },
        clearCart : (state) => {
            state.cart = [];
        }
    }
})


export const {addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart} = CartSlice.actions;


export default CartSlice.reducer;