/* eslint-disable no-undef */
const User = require("../models/user.js");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "You must enter an email address.",
      });
    }

    if (!name) {
      return res.status(400).json({
        error: "You must enter your name.",
      });
    }

    if (!password) {
      return res.status(400).json({
        error: "You must enter a password.",
      });
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        error: "That email address is already in use.",
      });
    }

    const user = new User({
      email: email,
      name: name,
      password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    });

    const registeredUser = await user.save();

    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, process.env.PASS_SEC, {
      expiresIn: process.env.SESSION_TIME,
    });

    res.status(200).json({
      success: true,
      token: `Bearer ${token}`,
      user: registeredUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Your request could not be processed. Please try again.",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "You must enter an email address.",
      });
    }

    if (!password) {
      return res.status(400).json({
        error: "You must enter a password.",
      });
    }

    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).send({
        error: "No user found for this email address.",
      });
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword != inputPassword) {
      return res.status(400).json({
        success: false,
        error: "Password Incorrect",
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, process.env.JWT_SEC, {
      expiresIn: process.env.SESSION_TIME,
    });

    if (!token) {
      throw new Error();
    }

    res.status(200).json({
      success: true,
      token: `Bearer ${token}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.idAdmin,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

module.exports = {
  register,
  login,
};
