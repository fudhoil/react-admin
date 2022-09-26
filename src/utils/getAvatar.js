const { getCookie } = require("src/services/cookies");

const user = getCookie("userProfile");
const getAvatar = "https://gxoib8zz.directus.app/assets/" + user.data[0].avatar;

export default getAvatar;
