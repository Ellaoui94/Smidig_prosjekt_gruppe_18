import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";


const locationSchema = new mongoose.Schema({
  lat: {type: Number, required: true},
  long: {type: Number, required: true}
})

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  subjectCode: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: {type: [locationSchema], required: false}
})

const friendsSchema = new mongoose.Schema({
  name: {type: String, required: true},
  photo: {type: String, required: true},
})


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImg: {type: String, required: false},
  subjects: { type: [subjectSchema], required: false},
  friends: { type: [friendsSchema], required: false},
});


//How long the token lasts.
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("users", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
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
    subjectName: Joi.string().required().label("Emne navn"),
    subjectCode: Joi.string().required().label("Emne kode"),
    startDate: Joi.date().required().label("Emne start"),
    endDate: Joi.date().required().label("Emne slutt"),
    location: Joi.object().optional().label("Lokasjon")
  });
  return schema.validate(data);
};

const friendValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Navn"),
    photo: Joi.string().required().label("Bilde"),
  });
  return schema.validate(data);
};


const pictureValidate = (data) => {
  const schema = Joi.object({
    profileImg: Joi.string().required().label("Bilde"),
  });
  return schema.validate(data);
};

export { User, validate, updateValidate, subjectValidate, friendValidate, pictureValidate };
