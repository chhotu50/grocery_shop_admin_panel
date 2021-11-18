import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], numberOfItems: 0, hasErrors: false };

const CartSlice = createSlice({
    name: "myCart",
    initialState,
    reducers: {
        addToCart(state, { payload }) {
            state.numberOfItems++;
            state.numberOfItems.push(payload);
        },
        removeFromCart(state, { payload }) {
            state.items.pop();
            state.numberOfItems--;
        },
        emptyCart(state, { payload }) {
            state.items = [];
            state.numberOfItems = 0;
        },
    },
});
