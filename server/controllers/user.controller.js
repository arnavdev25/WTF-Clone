const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = 12;
const passwordRegex = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?=.{8,})"
);
module.exports.registerUser = async (req, res, next) => {
  const { first_name, last_name, email, mobile, password, role, status } =
    req.body;
  if (
    !first_name ||
    !email ||
    !password ||
    !last_name ||
    !mobile ||
    !role ||
    !status
  ) {
    return res
      .status(501)
      .json({ message: "Please fill all the fields properly" });
  }
  checkEmail = await User.findOne({ email: email });
  checkMobile = await User.findOne({ mobile: mobile });
  if (checkEmail && checkMobile) {
    return res
      .status(501)
      .json({ message: "Email and Mobile Number already exists" });
  } else if (checkEmail) {
    return res.status(501).json({ message: "Email already exists" });
  } else if (checkMobile) {
    return res.status(501).json({ message: "Mobile Number already exists" });
  } else {
    if (mobile.toString().length === 10) {
      if (password.match(passwordRegex)) {
        const hashPassword = await bcrypt.hash(password, saltRounds);

        await User.create({ ...req.body, password: hashPassword })
          .then(() => {
            return res
              .status(200)
              .json({ message: "Account successfully created" });
          })
          .catch((err) => {
            return res.status(501).send(err);
          });
      } else {
        return res.status(501).json({
          message:
            "Password must have minimum 8 characters with at least one special character, one lowercase character and one uppercase character.",
        });
      }
    } else {
      return res
        .status(501)
        .json({ message: "Please enter a valid mobile number" });
    }
  }
};

module.exports.loginUser = async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res
      .status(501)
      .json({ message: "Please fill the details properly" });
  }
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(501).json({message: "User not found" });
  } else {
    if (user.role === role) {
      await bcrypt
        .compare(password, user.password)
        .then((r) => {
          if (r) {
            let token = jwt.sign(
              {
                id: user._id,
                email: user.email,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "30 days",
              }
            );

            return res.json({
              status: 200,
              message: "Logged in successfully",
              data: user,
              token,
            });
          } else {
            return res.status(501).send("Invalid Password");
          }
        })
        .catch((err) => {
          return res.status(501).next(err);
        });
    } else {
      return res.status(501).send("Role doesn't belong to you.");
    }
  }
};

module.exports.userData = async (req, res, next) => {
  const { token } = req.body;
  try {
    let decoded_token = jwt.decode(token, process.env.JWT_SECRET);
    let user = await User.findOne({ _id: decoded_token.id });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(501).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token or Expired Token" });
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  const { name, email, mobile, status, role } = req.query;
  let user = await User.find({
    $or: [{ first_name: name }, { email }, { mobile }, { status }, { role }],
  });
  if (user) {
    return res.status(200).json(user);
  } else {
    return res.status(501).json({ message: "User not found" });
  }
};
