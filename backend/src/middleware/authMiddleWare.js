const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "Token is missing",
      status: "ERROR",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!process.env.ACCESS_TOKEN) {
    return res.status(500).json({
      message: "Khóa bí mật không được cung cấp",
      status: "ERROR",
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid or expired token",
        status: "ERROR",
      });
    }

    const { payload } = user;
    if (!payload?.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        message: "Access denied",
        status: "ERROR",
      });
    }
  });
};

const authUserMiddleWare = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader) {
    return res.status(401).json({
      message: "Token is missing",
      status: "ERROR",
    });
  }

  const token = authHeader.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid or expired token",
        status: "ERROR",
      });
    }

    const { payload } = user;
    if (payload?.isAdmin || payload?.id === userId) {
      next();
    } else {
      return res.status(403).json({
        message: "Access denied",
        status: "ERROR",
      });
    }
  });
};

module.exports = {
  authMiddleWare,
  authUserMiddleWare,
};
