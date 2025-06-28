const mongoose = require("mongoose");
var validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, maxLength: 30 },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter strong password");
        }
      },
    },
    gender:{
      type: String,
      enum:{
        values:['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender'
      }
    },
    age: { type: Number, required: true },
    bio: { type: String, required: true },
    skills: [{ type: String }],
    image: { type: String, default: "default.jpg" },
    tokens: [{ token: { type: String, required: true } }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
