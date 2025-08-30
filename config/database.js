const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/university_db";

    console.log(`🔍 MongoDB 연결 시도 중...`);
    console.log(`📍 연결 URI: ${mongoURI}`);

    if (!process.env.MONGODB_URI) {
      console.log(
        "⚠️  MONGODB_URI 환경 변수가 설정되지 않았습니다. 기본값을 사용합니다."
      );
      console.log("💡 .env 파일을 생성하고 MONGODB_URI를 설정하세요.");
    }

    const conn = await mongoose.connect(mongoURI);

    console.log(`🍃 MongoDB 연결 성공: ${conn.connection.host}`);
    console.log(`📦 데이터베이스: ${conn.connection.name}`);

    // 연결 이벤트 리스너
    mongoose.connection.on("connected", () => {
      console.log("✅ Mongoose가 MongoDB에 연결되었습니다.");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB 연결 오류:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("🔌 MongoDB 연결이 끊어졌습니다.");
    });

    // 프로세스 종료 시 연결 해제
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("🔌 애플리케이션 종료로 인해 MongoDB 연결을 해제했습니다.");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ MongoDB 연결 실패:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
