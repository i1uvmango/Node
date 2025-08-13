require("dotenv").config();

const config = {
  // 서버 설정
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",

  // 데이터베이스 설정 (필요시 사용)
  database: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || "your_database",
    user: process.env.DB_USER || "your_username",
    password: process.env.DB_PASSWORD || "your_password",
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
