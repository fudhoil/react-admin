import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "src/slices/login";
import sidebarReducer from "src/slices/sidebar";
import submissionsReducer from "src/slices/submissions";

export default configureStore({
  reducer: {
    login: loginReducer,
    sidebar: sidebarReducer,
    submissions: submissionsReducer,
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
