const express = require("express");
const loginController = require("../controllers/loginController");
const router = express.Router();

// POST /api/auth/login - 로그인
router.post("/login", loginController.loginUser);

// POST /api/auth/register - 회원가입
router.post("/register", loginController.registerUser);

// GET /api/auth/login - 로그인 페이지 (렌더링용)
router.get("/login", loginController.getLogin);

// GET /api/auth/register - 회원가입 페이지 (렌더링용)
router.get("/register", loginController.getRegister);

module.exports = router;
