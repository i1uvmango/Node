const User = require("../models/User"); // 올바른 User 모델 사용
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret =
  process.env.JWT_SECRET ||
  "your_super_secret_jwt_key_here_change_this_in_production";

//Login Page 랜더링 (API 서버용으로 변경)
const getLogin = (req, res) => {
  res.json({
    message: "로그인 페이지 API 엔드포인트입니다.",
    usage: "POST /api/auth/login으로 로그인하세요.",
  });
};

//loginUser
const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body; // userId로 변경

    // 필수 필드 검증
    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        error: "사용자 ID와 비밀번호를 입력해주세요.",
      });
    }

    const user = await User.findById(userId); // _id로 검색 (userId와 동일한 값)
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "사용자 ID가 존재하지 않습니다.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password); //입력 비번 vs 해싱된 비번
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "비밀번호가 일치하지 않습니다.",
      });
    }

    //JWT토큰 발급
    const token = jwt.sign(
      {
        id: user._id,
        userId: user.userId,
        userName: user.userName,
      },
      jwtSecret,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      message: "로그인에 성공했습니다.",
      data: {
        user: {
          userId: user.userId,
          userName: user.userName,
          nickname: user.nickname,
          schoolName: user.schoolName,
          points: user.points,
        },
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "로그인 처리 중 오류가 발생했습니다.",
      details: error.message,
    });
  }
};

//회원가입 랜더링 (API 서버용으로 변경)
const getRegister = (req, res) => {
  res.json({
    message: "회원가입 페이지 API 엔드포인트입니다.",
    usage: "POST /api/auth/register으로 회원가입하세요.",
  });
};

//회원가입 //POST 경로
const registerUser = async (req, res) => {
  try {
    const { userId, userName, password, nickname, schoolName } = req.body;

    // 필수 필드 검증
    if (!userId || !userName || !password || !nickname || !schoolName) {
      return res.status(400).json({
        success: false,
        error: "모든 필수 필드를 입력해주세요.",
      });
    }

    // 중복 사용자 확인
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "이미 존재하는 사용자 ID입니다.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); //해싱

    const user = await User.create({
      _id: userId,
      userId,
      userName,
      password: hashedPassword,
      nickname,
      schoolName,
      points: 0,
      createdDate: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: "회원가입에 성공했습니다.",
      data: {
        userId: user.userId,
        userName: user.userName,
        nickname: user.nickname,
        schoolName: user.schoolName,
        points: user.points,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "회원가입 처리 중 오류가 발생했습니다.",
      details: error.message,
    });
  }
};

module.exports = { getLogin, loginUser, getRegister, registerUser };
