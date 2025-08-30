const mongoose = require("mongoose");

const TimeSchema = new mongoose.Schema(
  {
    lectureTimeId: {
      type: String,
      required: true,
      unique: true,
    },
    startTime: {
      type: String,
      default: null,
    },
    endTime: {
      type: String,
      default: null,
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

const Time = mongoose.model("Time", TimeSchema);
module.exports = Time;
