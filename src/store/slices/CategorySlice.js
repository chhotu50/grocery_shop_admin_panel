import { createSlice } from "@reduxjs/toolkit";
import Category from "src/apis/Category";
import { toast } from "react-toastify";

const initialState = { loader: false, categoryData: [], hasErrors: false };

const CategorySlice = createSlice({
    name: "Category",
    initialState,
    reducers: {
        getCategories(state) {
            state.loader = false;
        },
        getCategoriesSuccess: (state, { payload }) => {
            state.categoryData = payload;
            state.loader = true;
            state.hasErrors = false;
        },
        getCategoriesFailure: (state) => {
            state.loader = true;
            state.hasErrors = true;
        },
        addCategory(state) {
            state.loader = false;
        },
        addCategorySuccess(state, { payload }) {
            state.loader = true;
            state.hasErrors = false;
            state.categoryData.push(payload);
        },
        addCategoryFailure(state) {
            state.loader = true;
            state.hasErrors = true;
        },
        deleteCategory(state) {
            state.loader = false;
        },
        deleteCategorySuccess(state, { payload }) {
            state.categoryData = state.categoryData.filter((element) => element._id !== payload);
            state.loader = true;
            state.hasErrors = false;
        },
        deleteCategoryFailure(state) {
            state.loader = true;
            state.hasErrors = true;
        },
    },
});

export const {
    getCategories,
    getCategoriesSuccess,
    getCategoriesFailure,
    addCategory,
    addCategorySuccess,
    addCategoryFailure,
    deleteCategory,
    deleteCategorySuccess,
    deleteCategoryFailure,
} = CategorySlice.actions;

export default CategorySlice.reducer;

export function fetchCategoryData() {
    return async (dispatch) => {
        dispatch(getCategories());

        try {
            Category.list().then((res) => {
                if (res.data.status === true) dispatch(getCategoriesSuccess(res.data.data));
            });
        } catch (err) {
            dispatch(getCategoriesFailure());
        }
    };
}

export function newCategory(data) {
    return async (dispatch) => {
        dispatch(addCategory());

        try {
            Category.add(data).then((res) => {
                if (res.data.status === true) {
                    dispatch(addCategorySuccess(res.data.data));
                    toast.success(res.data.message, { position: "top-center" });
                } else if (res.data.status === false) {
                    toast.error(res.data.messages, { position: "top-center" });
                }
            });
        } catch (err) {
            dispatch(addCategoryFailure());
        }
    };
}

export function removeCategory(id, data) {
    return async (dispatch) => {
        dispatch(deleteCategory());
        try {
            Category.remove(id).then((res) => {
                if (res.data.status === true) {
                    dispatch(deleteCategorySuccess(id));
                    toast.success(res.data.message, { position: "top-center" });
                } else if (res.data.status === false) {
                    dispatch(deleteCategoryFailure());
                    toast.error(res.data.messages, { position: "top-center" });
                }
            });
        } catch (err) {
            dispatch(deleteCategoryFailure());
        }
    };
}
