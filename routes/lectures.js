const express = require("express");
const router = express.Router();
const lectureCtrl = require("../controllers/lectureController");

/**
 * @swagger
 * tags:
 *   name: Lectures
 *   description: 강의 관리 API
 */

/**
 * @swagger
 * /api/lectures:
 *   post:
 *     summary: 새 강의 생성
 *     tags: [Lectures]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 description: 강의 제목
 *               description:
 *                 type: string
 *                 description: 강의 설명
 *               instructor:
 *                 type: string
 *                 description: 강사명
 *     responses:
 *       201:
 *         description: 강의 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lecture'
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", lectureCtrl.createLecture);

/**
 * @swagger
 * /api/lectures:
 *   get:
 *     summary: 모든 강의 조회
 *     tags: [Lectures]
 *     responses:
 *       200:
 *         description: 강의 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lecture'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", lectureCtrl.getLectures);

/**
 * @swagger
 * /api/lectures/{id}:
 *   get:
 *     summary: 특정 강의 조회
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 강의 ID
 *     responses:
 *       200:
 *         description: 강의 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lecture'
 *       404:
 *         description: 강의를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", lectureCtrl.getLectureById);

/**
 * @swagger
 * /api/lectures/{lectureId}/comments:
 *   post:
 *     summary: 강의에 댓글 추가
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: lectureId
 *         schema:
 *           type: string
 *         required: true
 *         description: 강의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - author
 *             properties:
 *               content:
 *                 type: string
 *                 description: 댓글 내용
 *               author:
 *                 type: string
 *                 description: 작성자
 *     responses:
 *       201:
 *         description: 댓글 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/:lectureId/comments", lectureCtrl.createLectureComment);

/**
 * @swagger
 * /api/lectures/{lectureId}/comments:
 *   get:
 *     summary: 강의의 모든 댓글 조회
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: lectureId
 *         schema:
 *           type: string
 *         required: true
 *         description: 강의 ID
 *     responses:
 *       200:
 *         description: 댓글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:lectureId/comments", lectureCtrl.getLectureComments);

module.exports = router;
