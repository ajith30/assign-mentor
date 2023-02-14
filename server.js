const express = require("express");
const app = express();
const colors = require("colors"); // this npm package to show console.log in color in cmd
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

//Connecting to mongoDB
connectDB();

const PORT = process.env.PORT || 3000;

//To render static content
app.use(express.static("public"));

// body parser middleware to accept body data in the form of json and urlencoded.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/students", require("./routes/studentRoute"));
app.use("/api/mentors", require("./routes/mentorRoute"));

//Using our own errorHandler by overiding default express error handler
app.use(errorHandler);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
  console.log(`Server started and running on port: ${PORT}`);
});
