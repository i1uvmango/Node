const express = require("express");
const router = express.Router();
const lectureCtrl = require("../controllers/lectureController");

router.post("/", lectureCtrl.createLecture);
router.get("/", lectureCtrl.getLectures);
router.get("/:id", lectureCtrl.getLectureById);
router.post("/:lectureId/comments", lectureCtrl.createLectureComment);
router.get("/:lectureId/comments", lectureCtrl.getLectureComments);

module.exports = router;