const express = require("express");
const router = express.Router();
const {
  getMentors,
  createMentor,
  assignStudent,
  getAllStudents,
} = require("../controllers/mentorController");

router.get("/", getMentors);
router.post("/create-mentor", createMentor);
router.post("/assign-student", assignStudent);
router.get("/get-allstudents", getAllStudents);
module.exports = router;
