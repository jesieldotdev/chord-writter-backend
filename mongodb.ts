import mongoose from "mongoose";
import dotenv from "dotenv";
import Message from "./chords.model";
import verseSchema from "./chords.model";
import Verse from "./chords.model";

const MONGO_URI = process.env.MONGO_URI;

const db = async () => {
  try {
    const con = await mongoose.connect(
      "mongodb+srv://jesiel364:12458917@jesiel-db.9q7fa.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(`mongodb connected: ${con.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};


const getUsers = async () => {
 try {
   const users = await Verse.find({});
//    console.log(users);
   return users
 } catch (error) {
   console.log(error);
 }
};

getUsers()

export default db
export { getUsers };