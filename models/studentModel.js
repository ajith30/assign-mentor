const mongoose = require("mongoose");

//creating stusentSchema
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the Student name"],
    },
    email: {
      type: String,
      required: [true, "Please add the Student email"],
    },
    phone: {
      type: Number,
      required: [true, "Please add the Student phone number"],
    },
    location: {
      type: String,
    },
    batch: {
      type: String,
    },
    mentor: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//creating Student model using studentSchema
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
