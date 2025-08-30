const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema(
  {
    friendId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    friendUserId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Friend = mongoose.model("Friend", FriendSchema);
module.exports = Friend;
