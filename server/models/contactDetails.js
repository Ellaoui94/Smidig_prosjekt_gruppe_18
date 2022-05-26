import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const userSchema = new mongoose.Schema({
  _id:{ type: ObjectId, required: true },
  faceBook: { type: String, required: false },
  discord: { type: String, required: false },
  schoolMail: { type: String, required: false },
  bio: { type: String, required: false },
});

const ContactDetails = mongoose.model("ContactDetails", userSchema);


export { ContactDetails };
