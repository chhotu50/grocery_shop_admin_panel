import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "./slices/CategorySlice";
import userReducer from "./slices/UserSlice";
import productReducer from "./slices/ProductSlice";
import CurrentUserReducer from "./slices/CurrentUserSlice";
import SidebarSlice from "./slices/SidebarSlice";

const store = configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer,
        user: userReducer,
        currentUser: CurrentUserReducer,
        sidebar: SidebarSlice,
    },
});

export default store;
