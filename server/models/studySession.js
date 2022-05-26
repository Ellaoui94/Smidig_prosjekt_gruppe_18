import mongoose from "mongoose";

//Don't know what this is.
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  courseTitle: [
    { type: String, required: false },
    { type: String, required: false },
  ],
  location: { type: String, required: false },
  studyStatus: { type: String, required: false },
  evaluation: { type: String, required: false },
  focus: { type: String, required: false },
  other: { type: String, required: false },
  finished: { type: Boolean, required: false },
});

const Session = mongoose.model("session", userSchema);

export { Session };
