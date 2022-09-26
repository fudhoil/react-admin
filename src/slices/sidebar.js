import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebarShow: (state) => {
      state.sidebarShow = !state.sidebarShow;
    },
    setSidebarUnfoldable: (state) => {
      state.sidebarUnfoldable = !state.sidebarUnfoldable;
    },
  },
});

export const { setSidebarShow, setSidebarUnfoldable } = sidebarSlice.actions;
export default sidebarSlice.reducer;
