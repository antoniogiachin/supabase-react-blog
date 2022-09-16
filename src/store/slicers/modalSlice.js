import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    show: false,
    id: 0,
    data: null,
  },
  reducers: {
    SET_SHOW_MODAL: (state, action) => {
      state.show = action.payload.show;
      state.id = action.payload.id;
      state.data = action.payload.data || {};
    },
  },
});

export const { SET_SHOW_MODAL } = modalSlice.actions;

export default modalSlice.reducer;
