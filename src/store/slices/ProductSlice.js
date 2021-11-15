import { createSlice } from "@reduxjs/toolkit";
import Product from "src/apis/Product";

const initialState = { productData: [], toggle: false, loader: false, hasErrors: false };

const ProductSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {
        getProducts(state) {
            state.loader = true;
        },
        getProductsSuccess: (state, { payload }) => {
            state.productData = payload;
            state.loader = true;
            state.hasErrors = false;
        },
        getProductsFailure: (state) => {
            state.loader = false;
            state.hasErrors = true;
        },
        addProduct(state) {
            state.loader = true;
        },
        addProductSuccess(state, { payload }) {
            state.loader = true;
            state.hasErrors = false;
            state.productData.push(payload);
        },
        addProductFailure(state) {
            state.loader = false;
            state.hasErrors = true;
        },
        deleteProduct(state) {
            state.loader = true;
        },
        deleteProductSuccess(state, { payload }) {
            state.productData = state.productData.filter((element) => element._id !== payload);
            state.loader = true;
            state.hasErrors = false;
        },
        deleteProductFailure(state) {
            state.loader = false;
            state.hasErrors = true;
        },
        updateProduct(state) {
            state.loader = true;
        },
        updateProductSuccess(state, { payload }) {
            const index = state.productData.findIndex((obj) => obj._id === payload._id);
            state.productData[index] = payload;
            state.loader = true;
            state.hasErrors = false;
        },
        updateProductFailure(state) {
            state.loader = true;
            state.hasErrors = true;
        },
    },
});

export const {
    getProducts,
    getProductsSuccess,
    getProductsFailure,
    addProduct,
    addProductSuccess,
    addProductFailure,
    deleteProduct,
    deleteProductSuccess,
    deleteProductFailure,
    updateProduct,
    updateProductSuccess,
    updateProductFailure,
} = ProductSlice.actions;

export default ProductSlice.reducer;

export function fetchProductData() {
    return async (dispatch) => {
        dispatch(getProducts());

        try {
            Product.list().then((res) => {
                if (res.data.status === true) dispatch(getProductsSuccess(res.data.data));
            });
        } catch (err) {
            dispatch(getProductsFailure());
        }
    };
}

export function newProduct(data) {
    return async (dispatch) => {
        dispatch(addProduct());
        try {
            Product.add(data).then((res) => {
                if (res.data.status === true) dispatch(addProductSuccess(res.data.data));
            });
        } catch (err) {
            dispatch(addProductFailure());
        }
    };
}

export function removeProduct(id, data) {
    return async (dispatch) => {
        dispatch(deleteProduct());
        try {
            Product.remove(id).then((res) => {
                if (res.data.status === true) dispatch(deleteProductSuccess(id));
            });
        } catch (err) {
            dispatch(deleteProductFailure());
        }
    };
}

export function handleUpdateProduct(data) {
    return async (dispatch) => {
        dispatch(updateProduct());
        try {
            Product.update(data.id, data).then((res) => {
                if (res.data.status === true) dispatch(updateProductSuccess(data));
            });
        } catch (err) {
            dispatch(updateProductFailure());
        }
    };
}
