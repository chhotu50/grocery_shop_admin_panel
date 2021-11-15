import { createSlice } from "@reduxjs/toolkit";
import Product from "src/apis/Product";

const initialState = { productData: [], toggle: false, loader: false, hasErrors: false };

const ProductSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {
        getProducts(state) {
            state.loader = false;
        },
        getProductsSuccess: (state, { payload }) => {
            state.productData = payload;
            state.loader = true;
            state.hasErrors = false;
        },
        getProductsFailure: (state) => {
            state.loader = true;
            state.hasErrors = true;
        },
        addProduct(state) {
            state.loader = false;
        },
        addProductSuccess(state, { payload }) {
            state.loader = true;
            state.hasErrors = false;
            state.productData.push(payload);
        },
        addProductFailure(state) {
            state.loader = true;
            state.hasErrors = true;
        },
        deleteProduct(state) {
            state.loader = false;
        },
        deleteProductSuccess(state, { payload }) {
            state.productData = state.productData.filter((element) => element._id !== payload);
            state.loader = true;
            state.hasErrors = false;
        },
        deleteProductFailure(state) {
            state.loader = true;
            state.hasErrors = true;
        },
        deleteMultiple(state) {
            state.loader = false;
        },
        deleteMultipleSuccess(state, { payload }) {
            state.loader = true;
            state.hasErrors = false;
        },
        deleteMultipleFailure(state) {
            state.loader = true;
            state.hasErrors = true;
        },
        updateProduct(state) {
            state.loader = false;
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
    deleteMultiple,
    deleteMultipleSuccess,
    deleteMultipleFailure,
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

export function removeMultiple(data) {
    return async (dispatch) => {
        dispatch(deleteMultiple());
        try {
            Product.removeMultiple(data).then((res) => {
                if (res.data.status === true) dispatch(deleteMultipleSuccess());
            });
        } catch (err) {
            dispatch(deleteMultipleFailure());
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
