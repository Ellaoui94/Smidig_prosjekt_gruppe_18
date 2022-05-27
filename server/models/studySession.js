import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";

//Don't know what this is.
const userSchema = new mongoose.Schema({
  email: { type: String, required: false },
  courseTitle: [
    { type: String, required: false },
    { type: String, required: false },
  ],
  location: { type: String, required: false },
  studySessionTitle: { type: String, requires: false },
  studyStatus: { type: String, required: false },
  evaluation: { type: String, required: false },
  focus: { type: String, required: false },
  other: { type: String, required: false },
  finished: { type: Boolean, required: false },
});

const Session = mongoose.model("session", userSchema);

const validateStudySession = (data) => {
  const shema = Joi.object({
    studyStatus: Joi.string().required().label("Study Status"),
    evaluation: Joi.string().required().label("Evaluation"),
    focus: Joi.string().required().label("Focus"),
    other: Joi.string().required().label("Other"),
  });
};

const updateValidateStudySession = (data) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    evaluation: Joi.string().label("evaluation"),
    focus: Joi.string().label("focus"),
    other: Joi.string().label("other"),
    finished: Joi.boolean(),
  });
  return schema.validate(data);
};

export { Session, updateValidateStudySession };
