const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  // PK : postId
  _id: {
    type: String,
    required: true,
  },
  // 게시글 내용
  title: {
    type: String,
    required: [true, "제목을 입력해주세요"],
    maxlength: 200,
  },
  content: {
    type: String,
    required: [true, "내용을 입력해주세요"],
  },
  category: {
    type: String,
    required: [true, "카테고리를 선택해주세요"],
    enum: ["자유", "질문", "정보", "스터디", "취업"],
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  // FK : 작성자
  userId: {
    type: String,
    required: true,
    ref: "User",
    index: true,
  },
});

// 유효성 검증
PostSchema.path("userId").validate({
  validator: async function (val) {
    const User = mongoose.model("User");
    return !!(await User.exists({ _id: val }));
  },
  message: "userId not found",
});

module.exports = mongoose.model("Post", PostSchema);
