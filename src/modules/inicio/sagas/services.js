import ax from "axios";

const URL = "https://www.ersoluciones.mx/funsal/YoutubeAL.php?op=search";

export const ytVideos = async (query) => {
  const GET_URL = `${URL}&qr=${encodeURI(query)}`;
  // console.log("GET_URL", GET_URL);
  return await ax.get(GET_URL).catch((err) => {
    if (err.response) {
      // client received an error response (5xx, 4xx)
      const resErr = err.response.data.error;
      const code = resErr.code;
      const errMess = resErr.message
        .replace(/[<][a].*["][>]/, "<b>")
        .replace(/[<][/][a][>]/, "</b>");
      const message = `${code} : ${errMess}`;
      const error = { code, message };
      throw error;
    } else if (err.request) {
      // client never received a response, or request never left
    } else {
      throw err;
    }
  });
};
