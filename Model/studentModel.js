import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isemail.js";

const Student = mongoose.model(
  "Student",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (name) => name.length > 3,
        message: "Name must be longer than 3 characters",
      },
    },
    email: {
      type: String,
      validate: {
        validator: (email) => isEmail,
        message: "Invalid email",
      },
    },
    languages: {
      type: [String], //array , "english" , 'vietnam'
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not supported",
      },
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: (phoneNumber) =>
          phoneNumber.length > 10 && phoneNumber.length < 50,
        message: "Phone number must be at least 10 characters and less than 50",
      },
    },
    address: {
      type: String,
      required: false,
    },
  })
);
export default Student;
