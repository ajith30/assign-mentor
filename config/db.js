const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline); //  cyan.underline comes from colors npm package
  } catch (error) {
    console.log(error);
    process.exit(1); // Here we are closing/exiting process when failure. (1->Failure, 0->success)
  }
};

module.exports = connectDB;
