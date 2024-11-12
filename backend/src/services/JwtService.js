const jwt = require("jsonwebtoken");
require("dotenv").config();
const dotenv=require("dotenv");
dotenv.config()

const generalAccessToken = async (payload) => {
  const access_token = jwt.sign({ ...payload }, process.env.ACCESS_TOKEN, {
    expiresIn: "1h",
  });
  return access_token;
};

const generalRefreshToken = async (payload) => {
  const refresh_token = jwt.sign({ ...payload }, process.env.REFRESH_TOKEN, {
    expiresIn: "365d",
  });
  return refresh_token;
};

const refreshTokenService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("token", token);

      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          console.error("JWT Error:", err);
          return resolve({
            status: "ERROR",
            message: "Invalid or expired token",
          });
        }

        if (!user || !user.payload) {
          return resolve({
            status: "ERROR",
            message: "User data missing in token",
          });
        }

        //const { payload } = user;
        const access_token = await generalAccessToken({
          id: user.id,
          isAdmin: user.isAdmin,
        });
        
        resolve({
          status: "OK",
          message: "Success",
          access_token,
        });
      });
    } catch (e) {
      console.error("Service Error:", e);
      reject(e);
    }
  });
};


// const refreshTokenService = (token) => {
//   return new Promise((resolve, reject) => {
//     try {
//        console.log("token", token);
//         resolve({
//           status: "OK",
//           message: "Success",
//         });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };


module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenService,
};
