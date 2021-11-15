import { createSlice } from "@reduxjs/toolkit";
import User from "src/apis/User";

const initialState = {
    userData: [],
    loader: false,
    profileToggle: true,
    hasErrors: false,
};

const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        getUsers(state) {
            state.loader = false;
        },
        getUsersSuccess(state, { payload }) {
            state.userData = payload;
            state.loader = true;
            state.hasErrors = false;
        },
        getUsersFailure(state) {
            state.loader = true;
            state.hasErrors = true;
        },
        addUser(state) {
            state.loader = false;
        },
        addUserSuccess(state, { payload }) {
            state.userData.push(payload);
            state.loader = true;
            state.hasErrors = false;
        },
        addUserFailure(state) {
            state.loader = true;
            state.hasErrors = true;
        },
    },
});

export const {
    getUsers,
    getUsersSuccess,
    getUsersFailure,
    addUser,
    addUserSuccess,
    addUserFailure,
} = UserSlice.actions;

export default UserSlice.reducer;

export function fetchUserData() {
    return async (dispatch) => {
        dispatch(getUsers());

        try {
            User.list().then((res) => {
                if (res.data.status === true) dispatch(getUsersSuccess(res.data.data));
            });
        } catch (err) {
            dispatch(getUsersFailure());
        }
    };
}

export function newUser(data) {
    return async (dispatch) => {
        dispatch(addUser());

        try {
            User.add(data).then((res) => {
                console.log(res);
                if (res.data.status === true) dispatch(addUserSuccess(res.data.data));
            });
        } catch (err) {
            dispatch(addUserFailure());
        }
    };
}
