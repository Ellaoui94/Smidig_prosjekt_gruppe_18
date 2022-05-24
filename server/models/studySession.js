import mongoose from "mongoose";


//Don't know what this is.
const userSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  location: { type: String, required: true },
  studyStatus: { type: String, required: true },
  description: { type: String, required: false },
  focus: { type: String, required: false },
  other: { type: String, required: false },
  finished: { type: Boolean, required: false },
});


const Session = mongoose.model("session", userSchema);

//Don't understand what is going on here.


export { Session };
