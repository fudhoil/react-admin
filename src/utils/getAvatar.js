const { getCookie } = require("src/services/cookies");

const user = getCookie("userProfile")?.data[0];
const getAvatar = user
  ? "https://gxoib8zz.directus.app/assets/" + user.avatar
  : "src/assets/images/avatars/5.jpg";

export default getAvatar;
