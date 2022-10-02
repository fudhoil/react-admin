import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "src/slices/login";
import sidebarReducer from "src/slices/sidebar";
import submitionsReducer from "src/slices/submitions";
import registersReducer from "src/slices/registers";

export default configureStore({
  reducer: {
    login: loginReducer,
    sidebar: sidebarReducer,
    submitions: submitionsReducer,
    registers: registersReducer,
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
