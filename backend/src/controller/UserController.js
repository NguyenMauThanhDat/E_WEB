const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const createUser = async (req, res) => {
  try {
    //console.log(req.body);
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    const isCheckEmail = reg.test(email);
    if ( !email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    }

    if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is email",
      });
    }

    if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERROR",
        message: "The password is equal confirmPassword",
      });
    }
    console.log("isCheckEmail", isCheckEmail);
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    //console.log(req.body);
    const { email, password } = req.body;
    const reg = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is email",
      });
    } 
    console.log("isCheckEmail", isCheckEmail);
    const response = await UserService.loginUser(req.body);
    const {refresh_token, ...newResponse} = response
    res.cookie('refresh_token',refresh_token,{
      httpOnly: true,
      secure: false,
      sameSite: 'strict'
    });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "ERROR",
        message: "The userId is required",
      });
    }
    console.log(userId);
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; 
    if (!userId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The userId is required",
      });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The userId is required",
      });
    }
    const response = await UserService.getDetailUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const authHeader = req.cookies.refresh_token || req.headers.token;
    if (!authHeader) {
      return res.status(401).json({
        message: "Token is missing",
        status: "ERROR",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        status: "ERROR",
        message: "The token is required",
      });
    }
    const response = await JwtService.refreshTokenService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie('refresh_token');
    return res.status(200).json({
      status: 'OK',
      message: 'Logout Success'
    });
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids
    if (!ids) {
      return res.status(400).json({
        status: "ERROR",
        message: "The ids is required",
      });
    }
    const response = await UserService.deleteManyUser(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERROR",
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

const nodemailer = require("nodemailer");
const crypto = require("crypto");
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: "ERROR",
        message: "Email is required",
      });
    }

    // Kiểm tra người dùng có tồn tại
    const user = await UserService.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        status: "ERROR",
        message: "User not found",
      });
    }

    // Tạo token reset password
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = Date.now() + 15 * 60 * 1000; // Token có hiệu lực trong 15 phút

    // Lưu token vào user
    await UserService.saveResetToken(user._id, resetToken, resetTokenExpires);

    // Gửi email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await UserService.sendForgotPasswordEmail(email, resetUrl);

    return res.status(200).json({
      status: "OK",
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.error("ForgotPassword Error:", error);
    return res.status(500).json({
      status: "ERROR",
      message: "Internal Server Error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({
        status: "ERROR",
        message: "Password and confirmPassword are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "ERROR",
        message: "Passwords do not match",
      });
    }

    const user = await UserService.findUserByResetToken(token);
    if (!user || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        status: "ERROR",
        message: "Token is invalid or has expired",
      });
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    await User.findByIdAndUpdate(user._id, {
      password: hashPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    return res.status(200).json({
      status: "OK",
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.error("ResetPassword Error:", error);
    return res.status(500).json({
      status: "ERROR",
      message: "Internal Server Error",
    });
  }
};


module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  refreshToken,
  logoutUser,
  deleteMany,
  forgotPassword,
  resetPassword,
};
