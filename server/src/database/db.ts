import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  try {
    console.log(process.env.DB_URL);
    mongoose.connect(process.env.DB_URL as string);
    console.log("DB connected successfully");
  } catch (e) {
    console.error("Connection to db failed: ", e);
  }
})();

export default mongoose.connection;
