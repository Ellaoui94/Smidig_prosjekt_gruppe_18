import mongoose from "mongoose";
import Joi from "joi";

/*
  Here we create a schema.
  This is all the different attributes we can put in the database.
  If you want to add more attributes to the database, just add it below.
 */

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: false },
    date: { type: Date, required: false, default: Date.now() },
    courseTitle: { type: String, required: false },
    location: { type: String, required: false },
    address: { type: String, required: false },
    todos: [
      {
        todo: { type: String, required: false },
        checked: { type: Boolean, required: false, default: false },
      },
    ],
    studyStatus: { type: String, required: false },
    evaluation: { type: String, required: false },
    focus: { type: String, required: false },
    comment: { type: String, required: false },
    stage: { type: String, required: false },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    position: {
      lat: { type: Number, required: false },
      lng: { type: Number, required: false },
      required: false,
    },
    userName: { type: String, required: false },
    profileImg: { type: String, required: false },
  },
  { timestamps: true }
);

//We use this in routes so that we can put the different values in the right schema
const Session = mongoose.model("session", userSchema);

/*
  In this const we change the values that already is are in the database.
  Remember in the frontend part to have the same label name,
  if there is a different label name then what is written below then it wont work.
  Joi is used with schemas and mongoose. Remember to add if it is a string og int
 */
const updateValidateStudySession = (data) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    evaluation: Joi.string().label("evaluation"),
    focus: Joi.string().label("focus"),
    comment: Joi.string().label("comment"),
    stage: Joi.string(),
    endDate: Joi.string(),
  });
  return schema.validate(data);
};

const todoValidate = (data) => {
  const schema = Joi.object({
    todo: Joi.string().required().label("Gjøremål"),
  });
  return schema.validate(data);
};

const updateStageValidate = (data) => {
  const schema = Joi.object({
    stage: Joi.string().required().label("stage"),
  });
  return schema.validate(data);
};

//Here we export the consts. We use them in routes.
export {
  Session,
  updateValidateStudySession,
  todoValidate,
  updateStageValidate,
};
