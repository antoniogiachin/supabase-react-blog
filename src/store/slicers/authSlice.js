import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    isAuthor: false,
    userInfos: null,
  },
  reducers: {
    SET_LOGGED_STATUS: (state, action) => {
      state.isLogged = action.payload;
    },
    SET_USERS_INFOS: (state, action) => {
      state.userInfos = action.payload;
    },
    SET_AUTHOR_STATUS: (state, action) => {
      state.isAuthor = action.payload;
    },
  },
});

export const { SET_USERS_INFOS, SET_LOGGED_STATUS, SET_AUTHOR_STATUS } =
  authSlice.actions;

export default authSlice.reducer;
