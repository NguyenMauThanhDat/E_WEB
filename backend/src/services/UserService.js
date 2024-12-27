const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken } = require("./JwtService");
const { generalRefreshToken } = require("./JwtService");
const nodemailer = require("nodemailer");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;

    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser != null) {
        resolve({
          status: "ERR",
          message: "User already exists",
        });
      }
      const reg = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    const isCheckEmail = reg.test(email);
    if ( !email || !password || !confirmPassword) {
      resolve({
        status: "ERR",
        message: "The input is required",
      });
    }

    if (!isCheckEmail) {
      resolve ({
        status: "ERR",
        message: "The input is email",
      });
    }

    if (password !== confirmPassword) {
      resolve({
        status: "ERR",
        message: "The password is equal confirmPassword",
      });
    }
      const hash = bcrypt.hashSync(password, 10);
      console.log(hash);
      const createUser = await User.create({
        name,
        email,
        password: hash,
        phone,
      });
      if (createUser) {
        resolve({
          status: "OK",
          message: "Success",
          data: createUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "User is not defined",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password or user is incorrect",
        });
      }

      const access_token = await generalAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin
      });

      const refresh_token = await generalRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin
      });

      resolve({
        status: "OK",
        message: "Success",
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });
      if (checkUser === null) {
        return resolve({
          status: "OK",
          message: "User is not defined",
        });
      }

      // if (!data || Object.keys(data).length === 0) {
      //   return resolve({
      //     status: "Error",
      //     message: "No data provided for update",
      //   });
      // }

      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      console.log(updatedUser);

      resolve({
        status: "OK",
        message: "Success",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });
      if (checkUser === null) {
        return resolve({
          status: "OK",
          message: "User is not defined",
        });
      }

      await User.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
      resolve({
        status: "OK",
        message: "Success",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: id });
      if (user === null) {
        return resolve({
          status: "OK",
          message: "User is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "Success",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyUser = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.deleteMany({_id:ids});

      resolve({
        status: "OK",
        message: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};
const saveResetToken = async (userId, token, expires) => {
  const hashToken = bcrypt.hashSync(token, 10);
  await User.findByIdAndUpdate(userId, {
    resetPasswordToken: hashToken,
    resetPasswordExpires: expires,
  });
};
const sendForgotPasswordEmail = async (email, resetUrl) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Bạn có thể đổi sang SMTP hoặc dịch vụ khác
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Reset Your Password",
    html: `
      <h1>Reset Your Password</h1>
      <p>Click the link below to reset your password. This link is valid for 15 minutes.</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  deleteManyUser,
  findUserByEmail,
  saveResetToken,
  sendForgotPasswordEmail
};
