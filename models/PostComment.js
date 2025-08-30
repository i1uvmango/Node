const mongoose = require("mongoose");

const PostCommentSchema = new mongoose.Schema({
  // PK : commentId
  _id: {
    type: String,
    required: true,
  },
  // 댓글 내용
  content: {
    type: String,
    required: [true, "댓글 내용을 입력해주세요"],
    maxlength: 500,
  },
  // FK : 댓글 작성자
  userId: {
    type: String,
    required: true,
    ref: "User",
    index: true,
  },
  // FK : 댓글이 달린 게시글
  postId: {
    type: String,
    required: true,
    ref: "Post",
    index: true,
  },
});

// 유효성 검증
PostCommentSchema.path("userId").validate({
  validator: async function (val) {
    const User = mongoose.model("User");
    return !!(await User.exists({ _id: val }));
  },
  message: "userId not found",
});

PostCommentSchema.path("postId").validate({
  validator: async function (val) {
    const Post = mongoose.model("Post");
    return !!(await Post.exists({ _id: val }));
  },
  message: "postId not found",
});

module.exports = mongoose.model("PostComment", PostCommentSchema);
