const { getCookie } = require("src/services/cookies");

const user = getCookie("userProfile");
const getAvatar = user
  ? "https://gxoib8zz.directus.app/assets/" + user.data[0].avatar
  : "src/assets/images/avatars/5.jpg";

export default getAvatar;
