import {
    LIST_PRODUCTS,
    LIST_PRODUCTS_SUCCESS,
    LIST_PRODUCTS_FAILURE,
    CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    SHOW_PRODUCT,
    SHOW_PRODUCT_SUCCESS,
    SHOW_PRODUCT_FAILURE,
    EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILURE,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    SET_PRODUCT_DEFAULTS,
    HANDLE_PRODUCT_TITLE,
    LIST_ALL_PRODUCTS,
    RESET_FIELDS,
} from "../actionTypes/ProductTypes";

const initialState = {
    products: {}, // used in listing page
    all_products: [], // used in dropdowns
    product: {
        id: "",
        title: "",
        slug: "",
        image: "",
    },
    success_message: "",
    error_message: "",
    validation_errors: null,
    list_spinner: false,
    create_update_spinner: false,
};

const productReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCT_DEFAULTS:
            return {
                ...state,
                product: { ...state.product },
                success_message: "",
                error_message: "",
                validation_errors: null,
                list_spinner: false,
                create_update_spinner: false,
            };
        case HANDLE_PRODUCT_TITLE:
            // return {
            //     ...state,
            //     product: {...state.product, title: action.data}
            // };
            return handleFieldChange(state, action);
        case LIST_PRODUCTS:
            return {
                ...state,
                list_spinner: true,
            };
        case LIST_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.data,
                list_spinner: false,
            };
        case LIST_PRODUCTS_FAILURE:
            return {
                ...state,
                error_message: action.error,
                list_spinner: false,
            };
        case LIST_ALL_PRODUCTS:
            return {
                ...state,
                all_products: action.data,
            };
        case CREATE_PRODUCT:
            return {
                ...state,
                create_update_spinner: true,
            };
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                product: action.data.data,
                success_message: action.data.message,
                error_message: "",
                validation_errors: null,
            };
        case CREATE_PRODUCT_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
                validation_errors: action.error.errors,
                success_message: "",
            };
        case SHOW_PRODUCT:
            return {
                ...state,
                create_update_spinner: true,
            };
        case SHOW_PRODUCT_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                product: action.data.data,
            };
        case SHOW_PRODUCT_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
            };
        case EDIT_PRODUCT:
            return {
                ...state,
                create_update_spinner: true,
            };
        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                product: action.data.data,
                success_message: action.data.message,
                error_message: "",
                validation_errors: null,
            };
        case EDIT_PRODUCT_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
                validation_errors: action.error.errors,
                success_message: "",
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                list_spinner: true,
            };
        case DELETE_PRODUCT_SUCCESS:
            let cats = state.products;
            cats.data = state.products.data.filter((item) => item.id !== action.id);

            return {
                ...state,
                list_spinner: false,
                products: cats,
                success_message: action.message,
                error_message: "",
            };
        case DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                list_spinner: false,
                error_message: action.error.message,
                success_message: "",
            };
        case RESET_FIELDS:
            return {
                ...state,
                product: {
                    id: "",
                    title: "",
                    slug: "",
                    image: "",
                },
            };
        default:
            return state;
    }
};

function handleFieldChange(state, action) {
    if (action.field === "title" || action.field === "image") {
        return {
            ...state,
            product: { ...state.product, [action.field]: action.data },
        };
    }
}

export default productReducer;
