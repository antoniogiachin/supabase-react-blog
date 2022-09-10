import { configureStore } from "@reduxjs/toolkit";

// * import reducers
import authReducer from "./slicers/authSlice";
import modalReducer from "./slicers/modalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
});
