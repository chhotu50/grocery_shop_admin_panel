import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "./slices/CategorySlice";
import userReducer from "./slices/UserSlice";
import productReducer from "./slices/ProductSlice";

const store = configureStore({
    reducer: { category: categoryReducer, product: productReducer, user: userReducer },
});

export default store;
