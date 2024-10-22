const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authentication",
        status: "ERROR",
      });
    }
    const { payload } = user;
    if (payload?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "Khong co quyen truy cap",
        status: "ERROR",
      });
    }
  });
};
// const authMiddleWare = (req, res, next) => {
//   const authHeader = req.headers.token;

//   // Kiểm tra xem token có tồn tại không
//   if (!authHeader) {
//     return res.status(401).json({
//       message: "Token xác thực bị thiếu",
//       status: "ERROR",
//     });
//   }

//   // Tách token ra từ header
//   const token = authHeader.split(" ")[1]; // Giả định là 'Bearer <token>'

//   // Kiểm tra xem token có được cung cấp không
//   if (!token) {
//     return res.status(401).json({
//       message: "Token không hợp lệ",
//       status: "ERROR",
//     });
//   }

//   // Xác thực token
//   jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
//     if (err) {
//       console.error("Lỗi xác thực JWT:", err); // Ghi lại lỗi để gỡ lỗi
//       return res.status(401).json({
//         message: "Token xác thực không hợp lệ",
//         status: "ERROR",
//       });
//     }

//     // Kiểm tra payload và trường isAdmin
//     if (user && user.isAdmin) {
//       next();
//     } else {
//       return res.status(403).json({
//         message: "Bạn không có quyền truy cập",
//         status: "ERROR",
//       });
//     }
//   });
// };

const authUserMiddleWare = (req, res, next) => {
  // console.log('checktoken',req.headers.token)
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authentication",
        status: "ERROR",
      });
    }
    const { payload } = user;
    if (payload?.isAdmin || payload?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        message: "The authentication",
        status: "ERROR",
      });
    }
  });
};

module.exports = {
  authMiddleWare,
  authUserMiddleWare,
};
