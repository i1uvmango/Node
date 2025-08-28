const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "아이디를 기입해 주세요."],
    },
    userName: {
      type: String,
      required: [true, "이름을 기입해 주세요."],
    },
    nickname: {
      type: String,
      required: [true, "닉네임을 기입해 주세요."],
    },
    password: {
      type: String,
      [true, "비밀번호를 기입해 주세요."],
    },
    univ: {
      type: String,
      [true, "소속 학교를 기입해 주세요."],
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("User", UserSchema);
module.exports = User;

// module.exports = mongoose.model("Contact", contactSchema);