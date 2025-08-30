const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("../config/database");
require("dotenv").config();

// MongoDB 연결
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(helmet()); // 보안 헤더 설정
app.use(cors()); // CORS 설정
app.use(morgan("combined")); // 로깅
app.use(express.json({ limit: "10mb" })); // JSON 파싱
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // URL 인코딩 파싱

// 정적 파일 제공 (선택사항)
app.use("/public", express.static("public"));

// 기본 라우터
app.get("/", (req, res) => {
  res.json({
    message: "Express 서버가 정상적으로 실행되고 있습니다!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API 라우터
app.use("/api/users", require("../routes/users"));
// app.use('/api/auth', require('../routes/auth')); // 추후 추가 예정

// 404 에러 핸들링
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `경로 ${req.originalUrl}을 찾을 수 없습니다.`,
  });
});

// 글로벌 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`📍 환경: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
});

module.exports = app;
