const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema(
  {
    lectureNumber: {
      type: String,
      required: true,
      unique: true,
    },
    lectureName: {
      type: String,
      default: null,
    },
    professor: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lecture = mongoose.model("Lecture", LectureSchema);
module.exports = Lecture;
