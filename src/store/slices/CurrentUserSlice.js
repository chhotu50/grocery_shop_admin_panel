import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import User from "src/apis/User";

const initialState = {
    currentUserData: {},
    loader: false,
    hasErrors: false,
};

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        getCurrentUser(state) {
            state.loader = false;
        },
        getCurrentUserSuccess(state, { payload }) {
            state.currentUserData = payload;
            state.loader = true;
            state.hasErrors = false;
        },
        getCurrentUserFailure(state) {
            state.loader = true;
            state.hasErrors = true;
        },
        changeAvatar(state) {
            state.loader = false;
        },
        changeAvatarSucess(state, { payload }) {
            state.currentUserData = { ...state.currentUserData, photo: payload };
            state.loader = true;
            state.hasErrors = false;
        },
        changeAvatarFailure(state) {
            state.loader = true;
            state.hasErrors = true;
        },
        updateDetails(state) {
            state.loader = false;
        },
        updateDetailsSuccess(state, { payload }) {
            state.currentUserData = { ...state.currentUserData, ...payload };
            state.loader = true;
            state.hasErrors = false;
        },
        updateDetailsFailure(state) {
            state.loader = true;
            state.hasErrors = true;
        },
    },
});

export const {
    getCurrentUser,
    getCurrentUserSuccess,
    getCurrentUserFailure,
    changeAvatar,
    changeAvatarSucess,
    changeAvatarFailure,
    updateDetails,
    updateDetailsSuccess,
    updateDetailsFailure,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;

export function fetchCurrentUser() {
    const data = JSON.parse(localStorage.getItem("user.data"));
    return async (dispatch) => {
        dispatch(getCurrentUser());

        try {
            User.showOne(data._id).then((res) => {
                if (res.data.status === true) dispatch(getCurrentUserSuccess(res.data.data));
            });
        } catch (err) {
            dispatch(getCurrentUserFailure());
        }
    };
}

export function changeProfileImg(data) {
    return async (dispatch) => {
        dispatch(changeAvatar());

        try {
            User.profilePhoto(data).then((res) => {
                if (res.data.status === true) {
                    dispatch(changeAvatarSucess(res.data.data.photo));
                    toast.success(res.data.message, { position: "top-center" });
                } else if (res.data.status === false) {
                    dispatch(changeAvatarFailure());
                    toast.error(res.data.messages, { position: "top-center" });
                }
            });
        } catch (err) {
            dispatch(changeAvatarFailure());
        }
    };
}

export function submitDetails(data, id) {
    return async (dispatch) => {
        dispatch(updateDetails());

        try {
            User.edit(data, id).then((res) => {
                if (res.data.status === true) {
                    dispatch(updateDetailsSuccess(data));
                    toast.success(res.data.message, { position: "top-center" });
                } else if (res.data.status === false) {
                    dispatch(updateDetailsFailure());
                    toast.error(res.data.messages, { position: "top-center" });
                }
            });
        } catch (err) {
            dispatch(updateDetailsFailure());
        }
    };
}
