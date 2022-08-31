const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const randome = require("random-string-generator");
const { isEmail } = require("validator");
const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [isEmail, "invalid email address"],
  },
  mobile: { required: true, type: Number, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["trainer", "member", "admin"] },
  status: { type: String, required: true, enum: ["active", "inactive"] },
  u_id: { type: String, default: randome(13, "lower") },
});
const User = model("user", userSchema);
module.exports = User;
