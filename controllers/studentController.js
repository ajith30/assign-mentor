const asyncHandler = require("express-async-handler"); //This package to handle the Promise while intracting with mongoose
const Student = require("../models/studentModel");

//@desc  To show all data from Students Collection
//@route  GET  /api/students/students/
const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({});
  res.status(200).json(students);
});

//@desc Create Student with or without Mentor name
//@route  POST /api/students/create-student
const createStudent = asyncHandler(async (req, res) => {
  const { name, email, phone, location, batch, mentor } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please add all the required fields");
  }

  //check student exist
  const studentExist = await Student.findOne({ email });
  if (studentExist) {
    res.status(400);
    throw new Error("The Student already exists!");
  }

  //create student
  const student = await Student.create({
    name,
    email,
    phone,
    location,
    batch,
    mentor,
  });

  if (student) {
    res.status(201).json({ message: "Student created", data: student });
  } else {
    res.status(400);
    throw new Error("Invalid entered student data");
  }
});

//@desc Asign or chage the Mentor to perticular Student
//route POST  /api/students/change-mentor
const assignOrChangeMentor = asyncHandler(async (req, res) => {
  const { studentName, mentorName } = req.body;
  if (!studentName || !mentorName) {
    res.status(400);
    throw new Error(
      "Please enter the student and mentor name in the respective Fields!"
    );
  }

  const student = await Student.updateOne(
    { name: studentName },
    { $set: { mentor: mentorName } }
  );

  const updatedStudent = await Student.findOne({ name: studentName });

  res.status(200).json({
    message: `The Mentor changed for the student: ${studentName} as ${mentorName}`,
    updatedStudent,
  });
});

module.exports = {
  getStudents,
  createStudent,
  assignOrChangeMentor,
};
