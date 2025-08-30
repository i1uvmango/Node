const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    nickname: {
      type: String,
      default: null,
    },
    createdDate: {
      type: String,
      default: null,
    },
    schoolName: {
      type: String,
      default: null,
    },
    points: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
