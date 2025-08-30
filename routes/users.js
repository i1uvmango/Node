const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// GET /api/users - 모든 사용자 조회
router.get("/", userController.getAllUsers);

// GET /api/users/:userId - 특정 사용자 조회
router.get("/:userId", userController.getUserById);

// POST /api/users - 새 사용자 생성
router.post("/", userController.createUser);

// PUT /api/users/:userId - 사용자 정보 수정
router.put("/:userId", userController.updateUser);

// DELETE /api/users/:userId - 사용자 삭제
router.delete("/:userId", userController.deleteUser);

module.exports = router;
