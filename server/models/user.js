import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";


const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  subjectCode: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
})

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  subjects: { type: [subjectSchema], required: false}
});


//How long the token lasts.
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("users", userSchema);

//Don't understand what is going on here.
const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    subjects: Joi.object().required().label("Subjects")
  });
  return schema.validate(data);
};

const updateValidate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
  });
  return schema.validate(data);
};

const subjectValidate = (data) => {
  const schema = Joi.object({
    subjects: Joi.object().required().label("Subjects")
  });
  return schema.validate(data);
};

export { User, validate, updateValidate, subjectValidate };
