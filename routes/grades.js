const express = require("express");
const router = express.Router();
const gradeCtrl = require("../controllers/gradeController");

/**
 * @swagger
 * tags:
 *   name: Grades
 *   description: 성적 관리 API
 */

/**
 * @swagger
 * /api/grades:
 *   post:
 *     summary: 새 성적 생성
 *     tags: [Grades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - lectureId
 *               - score
 *             properties:
 *               userId:
 *                 type: string
 *                 description: 사용자 ID
 *               lectureId:
 *                 type: string
 *                 description: 강의 ID
 *               score:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *                 description: 점수
 *               grade:
 *                 type: string
 *                 description: 등급
 *     responses:
 *       201:
 *         description: 성적 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", gradeCtrl.createGrade);

/**
 * @swagger
 * /api/grades:
 *   get:
 *     summary: 모든 성적 조회
 *     tags: [Grades]
 *     responses:
 *       200:
 *         description: 성적 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", gradeCtrl.getGrades);

/**
 * @swagger
 * /api/grades/{id}:
 *   get:
 *     summary: 특정 성적 조회
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 성적 ID
 *     responses:
 *       200:
 *         description: 성적 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       404:
 *         description: 성적을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", gradeCtrl.getGradeById);

/**
 * @swagger
 * /api/grades/{id}:
 *   put:
 *     summary: 성적 정보 수정
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 성적 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *                 description: 점수
 *               grade:
 *                 type: string
 *                 description: 등급
 *     responses:
 *       200:
 *         description: 성적 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       404:
 *         description: 성적을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", gradeCtrl.updateGrade);

/**
 * @swagger
 * /api/grades/{id}:
 *   delete:
 *     summary: 성적 삭제
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 성적 ID
 *     responses:
 *       200:
 *         description: 성적 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *       404:
 *         description: 성적을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", gradeCtrl.deleteGrade);

module.exports = router;
