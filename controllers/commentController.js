// controllers/commentsController.js
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const Comment = require("../models/PostComment");

//POSt
const createComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.session?.user?._id; // 로그인 세션에서 유저 ID

  if (!userId) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }
  if (!content || !content.trim()) {
    return res.status(400).json({ message: "댓글 내용을 입력해주세요." });
  }

  const newComment = await Comment.create({
    _id: uuidv4(),            // String PK 생성 (UUID v4)
    content: content.trim(),
    userId: String(userId),   // 스키마 String 형식
    postId: String(postId),
  });

  return res.status(201).json({
    message: "댓글이 작성되었습니다.",
    comment: newComment,
  });
});


//DELETE
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.session?.user?._id;

  if (!commentId) {
    return res.status(400).json({ message: "commentId가 필요합니다." });
  }
  if (!userId) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  const comment = await Comment.findById(String(commentId));
  if (!comment) {
    return res.status(404).json({ message: "삭제할 댓글을 찾을 수 없습니다." });
  }

  // 본인만 삭제 가능 
  if (String(comment.userId) !== String(userId)) {
    return res.status(403).json({ message: "본인 댓글만 삭제할 수 있습니다." });
  }

  await Comment.findByIdAndDelete(String(commentId));

  
  return res.status(200).json({ message: "댓글이 삭제되었습니다." });
});

module.exports = {
  createComment,
  deleteComment,
};
