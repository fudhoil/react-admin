import { configureStore, createSlice } from "@reduxjs/toolkit";
import loginReducer from "src/slices/login";
import sidebarReducer from "src/slices/sidebar";

export default configureStore({
  reducer: {
    login: loginReducer,
    sidebar: sidebarReducer,
  },
});

// import { configureStore } from "@reduxjs/toolkit";
// import loginReducer from "src/slices/login";

// const initialState = {
//   sidebarShow: true,
// };

// export default configureStore({
//   reducer: {
//     login: loginReducer,
//   },
// });
