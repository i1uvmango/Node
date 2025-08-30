const User = require("../models/User");
const bcrypt = require("bcrypt");

// 모든 사용자 조회
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "사용자 목록을 가져오는데 실패했습니다.",
      details: error.message,
    });
  }
};

// 특정 사용자 조회
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    // _id로 검색 (userId와 동일한 값)
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "사용자를 찾을 수 없습니다.",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "사용자 정보를 가져오는데 실패했습니다.",
      details: error.message,
    });
  }
};

// 새 사용자 생성
const createUser = async (req, res) => {
  try {
    const { userId, userName, password, nickname, schoolName, points } =
      req.body;

    // 간단한 유효성 검사
    if (!userId || !userName) {
      return res.status(400).json({
        success: false,
        error: "사용자 ID와 이름은 필수 항목입니다.",
      });
    }

    // 중복 사용자 확인
    const existingUser = await User.findById(userId);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "이미 존재하는 사용자 ID입니다.",
      });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새 사용자 생성
    const newUser = new User({
      _id: userId, // _id 필드를 userId와 동일하게 설정
      userId,
      userName,
      password: hashedPassword, // 해싱된 비밀번호 사용
      nickname,
      schoolName,
      points,
      createdDate: new Date().toISOString(),
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      data: savedUser,
      message: "사용자가 성공적으로 생성되었습니다.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "사용자 생성에 실패했습니다.",
      details: error.message,
    });
  }
};

// 사용자 정보 수정
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: "사용자를 찾을 수 없습니다.",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "사용자 정보가 성공적으로 수정되었습니다.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "사용자 정보 수정에 실패했습니다.",
      details: error.message,
    });
  }
};

// 사용자 삭제
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        error: "사용자를 찾을 수 없습니다.",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedUser,
      message: "사용자가 성공적으로 삭제되었습니다.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "사용자 삭제에 실패했습니다.",
      details: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
