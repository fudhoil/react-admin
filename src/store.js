import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "src/slices/login";
import sidebarReducer from "src/slices/sidebar";
import submissionsReducer from "src/slices/submissions";
import registersReducer from "src/slices/registers";

export default configureStore({
  reducer: {
    login: loginReducer,
    sidebar: sidebarReducer,
    submissions: submissionsReducer,
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
