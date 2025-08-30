const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    boardId: {
      type: String,
      required: true,
      unique: true,
    },
    boardName: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Board = mongoose.model("Board", BoardSchema);
module.exports = Board;
