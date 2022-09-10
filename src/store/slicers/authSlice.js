import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    userInfos: null,
  },
  reducers: {
    SET_LOGGED_STATUS: (state, action) => {
      state.isLogged = action.payload;
    },
    SET_USERS_INFOS: (state, action) => {
      state.userInfos = action.payload;
    },
  },
});

export const { SET_USERS_INFOS, SET_LOGGED_STATUS } = authSlice.actions;

export default authSlice.reducer;
