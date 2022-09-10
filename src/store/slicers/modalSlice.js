import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "auth",
  initialState: {
    show: false,
  },
  reducers: {
    SET_SHOW_MODAL: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const { SET_SHOW_MODAL } = modalSlice.actions;

export default modalSlice.reducer;
