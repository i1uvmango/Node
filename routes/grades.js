const express = require("express");
const router = express.Router();
const gradeCtrl = require("../controllers/gradeController"); 

router.post("/", gradeCtrl.createGrade);
router.get("/", gradeCtrl.getGrades);
router.get("/:id", gradeCtrl.getGradeById);
router.put("/:id", gradeCtrl.updateGrade);
router.delete("/:id", gradeCtrl.deleteGrade);

module.exports = router;