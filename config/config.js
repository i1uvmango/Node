require("dotenv").config();

const config = {
  // 서버 설정
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",

  // MongoDB 설정
  database: {
    mongoUri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // JWT 설정 (필요시 사용)
  jwt: {
    secret: process.env.JWT_SECRET || "your_jwt_secret_key",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },

  // API 설정
  api: {
    prefix: "/api",
    version: "v1",
  },
};

module.exports = config;
