// 인증 미들웨어 (예시)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "접근 토큰이 필요합니다.",
    });
  }

  // 실제 프로젝트에서는 JWT 토큰 검증 로직 추가
  // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //   if (err) return res.sendStatus(403);
  //   req.user = user;
  //   next();
  // });

  // 현재는 예시로 간단한 토큰 체크
  if (token === "valid-token") {
    req.user = { id: 1, username: "testuser" };
    next();
  } else {
    res.status(403).json({
      success: false,
      error: "유효하지 않은 토큰입니다.",
    });
  }
};

// 로깅 미들웨어 (예시)
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
};

// 요청 제한 미들웨어 (예시)
const rateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!requests.has(ip)) {
      requests.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    const requestData = requests.get(ip);

    if (now > requestData.resetTime) {
      requestData.count = 1;
      requestData.resetTime = now + windowMs;
    } else {
      requestData.count++;
    }

    if (requestData.count > max) {
      return res.status(429).json({
        success: false,
        error: "요청 제한에 도달했습니다. 잠시 후 다시 시도해주세요.",
      });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  requestLogger,
  rateLimiter,
};
