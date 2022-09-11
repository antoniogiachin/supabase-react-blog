import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "auth",
  initialState: {
    show: false,
    id: 0,
  },
  reducers: {
    SET_SHOW_MODAL: (state, action) => {
      state.show = action.payload.show;
      state.id = action.payload.id;
    },
  },
});

export const { SET_SHOW_MODAL } = modalSlice.actions;

export default modalSlice.reducer;
