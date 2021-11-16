import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarShow: "responsive",
};

const SidebarSlice = createSlice({
    name: "sidebarSlice",
    initialState,
    reducers: {
        changeState(state, { ...rest }) {
            return { ...state, ...rest };
        },
    },
});

export const { changeState } = SidebarSlice.actions;

export default SidebarSlice.reducer;
