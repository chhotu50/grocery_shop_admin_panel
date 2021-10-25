import {
    LIST_PRODUCTS,
    LIST_PRODUCTS_SUCCESS,
    LIST_PRODUCTS_FAILURE,
    CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILURE,
    SHOW_PRODUCT,
    SHOW_PRODUCT_SUCCESS,
    SHOW_PRODUCT_FAILURE,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    SET_PRODUCT_DEFAULTS,
    HANDLE_PRODUCT_TITLE,
    LIST_ALL_PRODUCTS,
    RESET_FIELDS,
} from "../actionTypes/ProductTypes";

import Product from "../../apis/Product";

// function handleProductTitle(title)
// {
//     return function (dispatch, getState) {

//         dispatch({
//             type: HANDLE_PRODUCT_TITLE,
//             data: title
//         })
//     }
// }

function handleProductTitle(field, value) {
    return function (dispatch, getState) {
        dispatch({
            type: HANDLE_PRODUCT_TITLE,
            data: value,
            field,
        });
    };
}

function setProductDefaults() {
    return function (dispatch, getState) {
        dispatch({
            type: SET_PRODUCT_DEFAULTS,
        });
    };
}

/**
 * list PRODUCTS action
 */
function listProducts(page = 1) {
    return function (dispatch, getState) {
        // start sending request (first dispatch)
        dispatch({
            type: LIST_PRODUCTS,
        });
        // async call must dispatch action whether on success or failure
        Product.list(page)
            .then((response) => {
                dispatch({
                    type: LIST_PRODUCTS_SUCCESS,
                    data: response.data.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: LIST_PRODUCTS_FAILURE,
                    error: error.response,
                });
            });
    };
}

/**
 * list all PRODUCTS action
 * this function used as a helper action for example to populate dropdowns
 * in other forms
 */
function listAllProducts() {
    return function (dispatch, getState) {
        // async call
        Product.listAll().then((response) => {
            dispatch({
                type: LIST_ALL_PRODUCTS,
                data: response.data.data,
            });
        });
    };
}

/**
 * add category action
 */
function addProduct(title, cb) {
    return function (dispatch, getState) {
        // start creation show spinner
        dispatch({
            type: CREATE_PRODUCT,
        });

        // async call must dispatch action whether on success or failure
        Product.add(title)
            .then((response) => {
                dispatch({
                    type: CREATE_PRODUCT_SUCCESS,
                    data: response.data,
                });

                cb();
            })
            .catch((error) => {
                dispatch({
                    type: CREATE_PRODUCT_FAILURE,
                    error: error.response.data,
                });
            });
    };
}

/**
 * show category action
 */
function showProduct(id) {
    return function (dispatch, getState) {
        // start creation show spinner
        dispatch({
            type: SHOW_PRODUCT,
        });

        // async call must dispatch action whether on success or failure
        Product.showOne(id)
            .then((response) => {
                dispatch({
                    type: SHOW_PRODUCT_SUCCESS,
                    data: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: SHOW_PRODUCT_FAILURE,
                    error: error.response.data,
                });
            });
    };
}

/**
 * edit category action
 */
function editProduct(title, id, cb) {
    return function (dispatch, getState) {
        // start creation show spinner
        dispatch({
            type: EDIT_PRODUCT,
        });

        // async call must dispatch action whether on success or failure
        Product.edit(title, id)
            .then((response) => {
                dispatch({
                    type: EDIT_PRODUCT_SUCCESS,
                    data: response.data,
                });

                cb();
            })
            .catch((error) => {
                dispatch({
                    type: EDIT_PRODUCT_FAILURE,
                    error: error.response.data,
                });
            });
    };
}

/**
 * delete category action
 */
function deleteProduct(id) {
    return function (dispatch, getState) {
        // start creation show spinner
        dispatch({
            type: DELETE_PRODUCT,
        });

        // async call must dispatch action whether on success or failure
        Product.remove(id)
            .then((response) => {
                dispatch({
                    type: DELETE_PRODUCT_SUCCESS,
                    message: response.data.message,
                    id: id,
                });
            })
            .catch((error) => {
                dispatch({
                    type: DELETE_PRODUCT_FAILURE,
                    error: error.response.data,
                });
            });
    };
}

function parmanentDeleteProduct(id) {
    return function (dispatch, getState) {
        // start creation show spinner
        dispatch({
            type: DELETE_PRODUCT,
        });

        // async call must dispatch action whether on success or failure
        Product.removeTrash(id)
            .then((response) => {
                dispatch({
                    type: DELETE_PRODUCT_SUCCESS,
                    message: response.data.message,
                    id: id,
                });
            })
            .catch((error) => {
                dispatch({
                    type: DELETE_PRODUCT_FAILURE,
                    error: error.response.data,
                });
            });
    };
}

function resetFields() {
    return function (dispatch, getState) {
        dispatch({
            type: RESET_FIELDS,
        });
    };
}

export {
    listProducts,
    handleProductTitle,
    addProduct,
    showProduct,
    editProduct,
    deleteProduct,
    parmanentDeleteProduct,
    setProductDefaults,
    listAllProducts,
    resetFields,
};
