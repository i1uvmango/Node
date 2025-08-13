// 예시 사용자 데이터 (실제 프로젝트에서는 데이터베이스 사용)
let users = [
  { id: 1, name: "김철수", email: "kim@example.com", age: 25 },
  { id: 2, name: "이영희", email: "lee@example.com", age: 30 },
  { id: 3, name: "박민수", email: "park@example.com", age: 28 },
];

// 모든 사용자 조회
const getAllUsers = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "사용자 목록을 가져오는데 실패했습니다.",
    });
  }
};

// 특정 사용자 조회
const getUserById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);

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
    });
  }
};

// 새 사용자 생성
const createUser = (req, res) => {
  try {
    const { name, email, age } = req.body;

    // 간단한 유효성 검사
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "이름과 이메일은 필수 항목입니다.",
      });
    }

    // 새 사용자 생성
    const newUser = {
      id: users.length + 1,
      name,
      email,
      age: age || null,
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      data: newUser,
      message: "사용자가 성공적으로 생성되었습니다.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "사용자 생성에 실패했습니다.",
    });
  }
};

// 사용자 정보 수정
const updateUser = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, age } = req.body;

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "사용자를 찾을 수 없습니다.",
      });
    }

    // 사용자 정보 업데이트
    users[userIndex] = {
      ...users[userIndex],
      ...(name && { name }),
      ...(email && { email }),
      ...(age && { age }),
    };

    res.status(200).json({
      success: true,
      data: users[userIndex],
      message: "사용자 정보가 성공적으로 수정되었습니다.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "사용자 정보 수정에 실패했습니다.",
    });
  }
};

// 사용자 삭제
const deleteUser = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "사용자를 찾을 수 없습니다.",
      });
    }

    const deletedUser = users.splice(userIndex, 1)[0];

    res.status(200).json({
      success: true,
      data: deletedUser,
      message: "사용자가 성공적으로 삭제되었습니다.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "사용자 삭제에 실패했습니다.",
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
