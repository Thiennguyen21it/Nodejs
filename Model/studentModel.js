// import { ObjectId } from "mongodb";
import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isemail";

const Student = mongoose.model(
  "Student",
  new Schema(
    {
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
      language: {
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
      password: {
        //hash
        type: String,
        required: true,
        //validate
      },
      phoneNumber: {
        type: String,
        required: true,
        validate: {
          validator: (phoneNumber) => phoneNumber.length > 5,
          message: "Phone number must be at least 5 characters",
        },
      },
      address: {
        type: String,
        required: false,
      },
    },
    {
      autoCreate: false,
      autoIndex: true,
    }
  )
);
export default Student;
