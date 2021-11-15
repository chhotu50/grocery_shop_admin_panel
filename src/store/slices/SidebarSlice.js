import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarShow: "responsive",
};

const SidebarSlice = createSlice({
    name: "sidebarSlice",
    initialState,
    reducers: {
        toggleSidebar(state, { rest }) {
            return { ...state, ...rest };
        },
    },
});

export const { toggleSidebar } = SidebarSlice.actions;

export default SidebarSlice.reducer;
