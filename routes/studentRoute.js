const express = require("express");
const router = express.Router();
const {
  getStudents,
  createStudent,
  assignOrChangeMentor,
} = require("../controllers/studentController");

router.get("/", getStudents);
router.post("/create-student", createStudent);
router.post("/change-mentor", assignOrChangeMentor);

module.exports = router;
