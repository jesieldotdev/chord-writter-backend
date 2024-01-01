import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI

const db = async () => {
  try {
    const con = await mongoose.connect(
      MONGO_URI || ''
    );
    console.log(`mongodb connected: ${con.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};


export default db