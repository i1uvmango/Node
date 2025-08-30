const mongoose = require("mongoose");
require("dotenv").config();

const checkMongoConnection = async () => {
  try {
    console.log("🔍 MongoDB 연결 상태 확인 중...");
    console.log("🔍 환경 변수 MONGODB_URI:", process.env.MONGODB_URI);

    const uri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/university_db";
    console.log(`📍 연결 URI: ${uri}`);

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // 5초 타임아웃
      socketTimeoutMS: 45000, // 45초 소켓 타임아웃
    });

    console.log("✅ MongoDB 연결 성공!");
    console.log(`📦 데이터베이스: ${mongoose.connection.name}`);
    console.log(`🖥️  호스트: ${mongoose.connection.host}`);
    console.log(`🔌 포트: ${mongoose.connection.port}`);

    await mongoose.connection.close();
    console.log("🔌 연결을 안전하게 종료했습니다.");
  } catch (error) {
    console.error("❌ MongoDB 연결 실패:");
    console.error(`   오류 메시지: ${error.message}`);

    if (error.message.includes("ECONNREFUSED")) {
      console.error(
        "   💡 해결책: MongoDB 서비스가 실행되고 있는지 확인하세요."
      );
      console.error("   Windows: MongoDB Compass 또는 MongoDB 서비스 확인");
      console.error("   명령어: net start MongoDB");
    } else if (error.message.includes("authentication")) {
      console.error("   💡 해결책: MongoDB 인증 정보를 확인하세요.");
    } else if (error.message.includes("timeout")) {
      console.error(
        "   💡 해결책: 네트워크 연결 또는 방화벽 설정을 확인하세요."
      );
    }

    process.exit(1);
  }
};

checkMongoConnection();
