const Grade = require("../models/Grade");
const User = require("../models/User");
const Lecture = require("../models/Lecture");

exports.createGrade = async (req, res, next) => {
  try {
    const { _id, userId, lectureId, grade } = req.body;
    const [user, lecture] = await Promise.all([
      User.findById(userId).lean(),
      Lecture.findById(lectureId).lean(),
    ]);
    if (!user) return res.status(404).json({ ok: false, message: "User not found" });
    if (!lecture) return res.status(404).json({ ok: false, message: "Lecture not found" });

    const created = await Grade.create({ _id, userId, lectureId, grade });
    res.status(201).json({ ok: true, data: created });
  } catch (err) { next(err); }
};

exports.getGrades = async (req, res, next) => {
  try {
    const { userId, lectureId } = req.query;
    const filter = {};
    if (userId) filter.userId = userId;
    if (lectureId) filter.lectureId = lectureId;
    const grades = await Grade.find(filter).lean();
    res.json({ ok: true, data: grades, count: grades.length });
  } catch (err) { next(err); }
};

exports.getGradeById = async (req, res, next) => {
  try {
    const doc = await Grade.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ ok: false, message: "Grade not found" });
    res.json({ ok: true, data: doc });
  } catch (err) { next(err); }
};

exports.updateGrade = async (req, res, next) => {
  try {
    const { grade } = req.body;
    const updated = await Grade.findByIdAndUpdate(
      req.params.id,
      { $set: { grade } },
      { new: true, runValidators: true }
    ).lean();
    if (!updated) return res.status(404).json({ ok: false, message: "Grade not found" });
    res.json({ ok: true, data: updated });
  } catch (err) { next(err); }
};

exports.deleteGrade = async (req, res, next) => {
  try {
    const deleted = await Grade.findByIdAndDelete(req.params.id).lean();
    if (!deleted) return res.status(404).json({ ok: false, message: "Grade not found" });
    res.json({ ok: true, data: deleted });
  } catch (err) { next(err); }
};