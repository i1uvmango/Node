const mongoose = require("mongoose");

const GradeSchema = new mongoose.Schema({
  //PK : gradeId
  _id: {
    type: String,
    required: true,
  },
  //FK
  userId: {
    type: String,
    required: true,
    ref: "User",
    index: true,
  },
  lectureId: {
    type: String,
    required: true,
    ref: "Lecture",
    index: true,
  },
  //column
  grade: {
    type: String,
    required: [true, "성적을 입력해주세요"],
  },
});

PostSchema.path("userId").validate({
  validator: async function (val) {
    const User = mongoose.model("User");
    return !!(await User.exists({ _id: val }));
  },
  message: "userId not found",
});
PostSchema.path("lectureId").validate({
  validator: async function (val) {
    const Lecture = mongoose.model("Lecture");
    return !!(await Lecture.exists({ _id: val }));
  },
  message: "lectureId not found",
});

module.exports = mongoose.model("Grade", GradeSchema);
