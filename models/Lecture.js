const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  // PK : lectureId
  _id: {
    type: String,
    required: true,
  },
  // 강의 정보
  lectureName: {
    type: String,
    required: [true, "강의명을 입력해주세요"],
  },
  professor: {
    type: String,
    required: [true, "교수명을 입력해주세요"],
  },
  credit: {
    type: Number,
    required: [true, "학점을 입력해주세요"],
    min: 0.5,
    max: 6,
  },
  department: {
    type: String,
    required: [true, "개설학과를 입력해주세요"],
  },
  // FK : 강의를 등록한 사용자
  userId: {
    type: String,
    required: true,
    ref: "User",
    index: true,
  },
});

// 유효성 검증
LectureSchema.path("userId").validate({
  validator: async function (val) {
    const User = mongoose.model("User");
    return !!(await User.exists({ _id: val }));
  },
  message: "userId not found",
});

module.exports = mongoose.model("Lecture", LectureSchema);
