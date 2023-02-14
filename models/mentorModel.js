const mongoose = require("mongoose");

//creating metorSchema
const mentorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the Mentor name"],
    },
    email: {
      type: String,
      required: [true, "Please add the Mentor email"],
    },
    phone: {
      type: Number,
      required: [true, "Please add the Mentor phone number"],
    },
    location: {
      type: String,
    },
    batch: {
      type: String,
    },
    students: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

//creating Mentor model using mentorSchema
const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
