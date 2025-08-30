const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // PK : userId
  _id: {
    type: String,
    required: true,
  },
  // 사용자 ID (중복 방지용)
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  // 사용자 정보
  userName: {
    type: String,
    required: [true, "사용자명을 입력해주세요"],
  },
  password: {
    type: String,
    required: [true, "비밀번호를 기입해 주세요."],
  },
  nickname: {
    type: String,
    required: [true, "닉네임을 입력해주세요"],
  },
  // 소속 학교
  schoolName: {
    type: String,
    required: [true, "소속 학교를 기입해 주세요."],
  },
  // 포인트
  points: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", UserSchema);
