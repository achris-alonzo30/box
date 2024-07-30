import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { isSidebarCollapsed: boolean} = {
    isSidebarCollapsed: false
}

// reducers.state takes in the keys of the initial state
// reducers.actions takes in the upcoming values received from the reducer
export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setIsSideBarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapsed = action.payload;
        },
    }
});

export const { setIsSideBarCollapsed } = globalSlice.actions;

export default globalSlice.reducer