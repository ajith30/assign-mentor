const asyncHandler = require("express-async-handler"); //This package to handle the Promise while intracting with mongoose
const Mentor = require("../models/mentorModel");
const Student = require("../models/studentModel");

//@desc  To get all data from Mentors collection
//@route  GET  api/mentors/create-mentor
const getMentors = asyncHandler(async (req, res) => {
  const mentors = await Mentor.find({});
  res.status(200).json(mentors);
});

//@desc  To creating Mentor
//@desc  POST api/mentors/create-mentor
const createMentor = asyncHandler(async (req, res) => {
  const { name, email, phone, location, batch } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please add all the required fields");
  }

  //check mentor exist
  const mentorExist = await Mentor.findOne({ email });
  if (mentorExist) {
    res.status(400);
    throw new Error("The Mentor already exists!");
  }

  //create mentor
  const mentor = await Mentor.create({
    name,
    email,
    phone,
    location,
    batch,
  });

  if (mentor) {
    res.status(201).json({ message: "Mentor created", data: mentor });
  } else {
    res.status(400);
    throw new Error("Invalid entered mentor data");
  }
});

//@desc To Assign Student to a Mentor
//@route  POST  api/menors/assign-student
const assignStudent = asyncHandler(async (req, res) => {
  const { studentName, mentorName } = req.body;

  if (!studentName || !mentorName) {
    res.status(400);
    throw new Error("Please add student name and mentor name!");
  }

  const mentorExist = await Student.findOne({ name: studentName }).findOne({
    mentor: mentorName,
  });

  //console.log(mentorExist);

  if (mentorExist !== null) {
    res.status(400);
    throw new Error(
      `The Mentor already exists for the Student: ${studentName} !`
    );
  }

  //pushing the entered student name to the mentioned mentor's students Array and updating that mentor document.

  const mentor = await Mentor.findOne({ name: mentorName });
  mentor.students.push(studentName);
  console.log(mentor.students);
  const updateMentor = await Mentor.updateOne(
    { name: mentorName },
    { $set: { students: mentor.students } }
  );

  //once the student assigned with the mentor, then updating the student with mentor name in that student document.
  const student = await Student.updateOne(
    { name: studentName },
    { $set: { mentor: mentorName } }
  );

  res.status(200).json({
    message: `The student:${studentName} assigned to the mentor: ${mentorName} successfully`,
    mentor,
  });
});

//@desc To Show all the students of a perticular mentor
//route  POST  /api/mentors/get-allstudents
const getAllStudents = asyncHandler(async (req, res) => {
  const { mentorName } = req.body;
  if (!mentorName) {
    res.status(400);
    throw new Error(
      "Please add the field of the perticular mentor to retrive all students!"
    );
  }

  const mentor = await Mentor.findOne({ name: mentorName });
  const allStudents = mentor.students;
  //console.log(allStudents);
  res.status(200).json({
    message: `Please find all the students assosiated to the mentor: ${mentorName}`,
    allStudents,
  });
});

module.exports = {
  getMentors,
  createMentor,
  assignStudent,
  getAllStudents,
};
