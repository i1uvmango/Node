const express = require("express");
const {
    getAllPost,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require("../controllers/postController");
const router = express.Router();


// GET /post - 모든 게시물 조회
router.get("/",getAllPost);

// GET /post/:postId - 특정 게시물 조회
router.get("/:id",getPostById);

// POST /post/:postId - 새 게시물 생성
router.post("/",createPost);

// PUT /post/:postId - 게시물 수정
router.put("/:id",updatePost);

// DELETE /post/:postId - 게시물 삭제
router.delete("/:id",deletePost);