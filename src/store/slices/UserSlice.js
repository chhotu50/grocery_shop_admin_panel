import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: [],
    currentUserData: {},
    toggle: false,
    loader: false,
    profileToggle: true,
};

const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        getUsers(state) {},
        getCurrentUser(state) {},
        setToggle(state) {
            state.toggle = !state.toggle;
        },
        setProfileToggle() {},
    },
});

export const userActions = UserSlice.actions;

export default UserSlice.reducer;
