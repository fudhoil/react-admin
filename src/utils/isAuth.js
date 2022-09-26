import { getCookie } from "src/services/cookies";

const isAuth = () => {
  if (getCookie("user")) {
    return true;
  } else {
    return false;
  }
};

export default isAuth;
