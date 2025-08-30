const mongoose = require("mongoose");

const LectureCommentSchema = new mongoose.Schema(
  {
    lectureEvaluationId: {
      type: String,
      required: true,
      unique: true,
    },
    evaluationContent: {
      type: String,
      default: null,
    },
    rating: {
      type: String,
      default: null,
    },
    semester: {
      type: String,
      default: null,
    },
    author: {
      type: String,
      required: true,
    },
    lectureNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LectureComment = mongoose.model("LectureComment", LectureCommentSchema);
module.exports = LectureComment;
