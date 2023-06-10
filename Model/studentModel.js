// import { ObjectId } from "mongodb";
import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isemail";
export default mongoose.model(
  "User",
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
    password: {
      //hash
      type: String,
      required: true,
      //validate
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
  })
);
