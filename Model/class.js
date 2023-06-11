// import { ObjectId } from "mongodb";
import e from "express";
import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isemail";

const Class = mongoose.model(
  "Class",
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
  })
);
export default Class;
