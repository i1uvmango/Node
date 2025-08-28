const mongoose = require("mongoose");


const FriendSchema = new mongoose.Schema({
  //PK : friendId
  _id: {
    type: String,
    required: true,
  },
  //FK 사용자 아이디, 사용자의 친구 아이디
  userId: {
    type: String,
    ref: 'User',
    required: true,
    index: true
  },
  user_friendId: {
    type: String,
    ref: 'User',
    required: true,
    index: true
  },
});

PostSchema.path('userId').validate({
  validator: async function (val) {
    const User = mongoose.model('User');
    const exists = await User.exists({ _id: val });
    return !!exists;
  },
  message: 'userId not found',
});

module.exports = mongoose.model("Friend", FriendSchema);