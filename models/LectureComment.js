const mongoose = require("mongoose");

const LectureCommentSchema = new mongoose.Schema({
  // PK : lectureEvaluationId
  _id: {
    type: String,
    required: true,
  },
  // 강의 평가 내용
  evaluationContent: {
    type: String,
    required: [true, "평가 내용을 입력해주세요"],
  },
  // 평점
  rating: {
    type: Number,
    required: [true, "평점을 입력해주세요"],
    min: 1,
    max: 5,
  },
  // 학기
  semester: {
    type: String,
    required: [true, "학기를 입력해주세요"],
  },
  // FK : 평가 작성자
  author: {
    type: String,
    required: true,
    ref: "User",
    index: true,
  },
  // FK : 평가 대상 강의
  lectureId: {
    type: String,
    required: true,
    ref: "Lecture",
    index: true,
  },
});

// 유효성 검증
LectureCommentSchema.path("author").validate({
  validator: async function (val) {
    const User = mongoose.model("User");
    return !!(await User.exists({ _id: val }));
  },
  message: "author not found",
});

LectureCommentSchema.path("lectureId").validate({
  validator: async function (val) {
    const Lecture = mongoose.model("Lecture");
    return !!(await Lecture.exists({ _id: val }));
  },
  message: "lectureId not found",
});

module.exports = mongoose.model("LectureComment", LectureCommentSchema);
