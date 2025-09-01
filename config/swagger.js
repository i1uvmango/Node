const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js Express API",
      version: "1.0.0",
      description: "Node.js Express 백엔드 API 문서",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["username", "email"],
          properties: {
            id: {
              type: "string",
              description: "사용자 ID",
            },
            username: {
              type: "string",
              description: "사용자 이름",
            },
            email: {
              type: "string",
              format: "email",
              description: "이메일 주소",
            },
            password: {
              type: "string",
              description: "비밀번호",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "생성일시",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "수정일시",
            },
          },
        },
        Lecture: {
          type: "object",
          required: ["title", "description"],
          properties: {
            id: {
              type: "string",
              description: "강의 ID",
            },
            title: {
              type: "string",
              description: "강의 제목",
            },
            description: {
              type: "string",
              description: "강의 설명",
            },
            instructor: {
              type: "string",
              description: "강사명",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "생성일시",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "수정일시",
            },
          },
        },
        Grade: {
          type: "object",
          required: ["userId", "lectureId", "score"],
          properties: {
            id: {
              type: "string",
              description: "성적 ID",
            },
            userId: {
              type: "string",
              description: "사용자 ID",
            },
            lectureId: {
              type: "string",
              description: "강의 ID",
            },
            score: {
              type: "number",
              minimum: 0,
              maximum: 100,
              description: "점수",
            },
            grade: {
              type: "string",
              description: "등급",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "생성일시",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "수정일시",
            },
          },
        },
        Comment: {
          type: "object",
          required: ["content", "author"],
          properties: {
            id: {
              type: "string",
              description: "댓글 ID",
            },
            content: {
              type: "string",
              description: "댓글 내용",
            },
            author: {
              type: "string",
              description: "작성자",
            },
            lectureId: {
              type: "string",
              description: "강의 ID",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "생성일시",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "수정일시",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "오류 메시지",
            },
            message: {
              type: "string",
              description: "상세 메시지",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js", "./src/app.js"], // Swagger 주석이 있는 파일들의 경로
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
