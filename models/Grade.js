const mongoose = require("mongoose");

const GradeSchema = new mongoose.Schema(
  {
    gradeId: {
      type: String,
      required: true,
      unique: true,
    },
    grade: {
      type: String,
      default: null,
    },
    userId: {
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

const Grade = mongoose.model("Grade", GradeSchema);
module.exports = Grade;
