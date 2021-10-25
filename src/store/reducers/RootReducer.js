import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import categoryReducer from "./CategoryReducer";
import userReducer from "./UserReducer";
import productReducer from "./ProductReducer";
import changeState from "./changeState";

const rootReducer = combineReducers({
    products: productReducer,
    categories: categoryReducer,
    user: userReducer,
    changeState,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;
