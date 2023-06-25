import { body, validationResult } from "express-validator";
import userRepository from "../repositories/userRepository.js";
import studentRepository from "../repositories/studentRepository.js";
import { EventEmitter } from "node:events";
// login function
import HttpStatusCode from "../Errors/HttpStatusCode.js";
import Exception from "../Errors/Exception.js";
const myEvent = new EventEmitter();
myEvent.on("event.register.user", async (data) => {
  console.log(`they talk about : ${JSON.stringify(data)}`);
});

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  //call repository
  try {
    let existingUser = await userRepository.login({ email, password });
    res.status(HttpStatusCode.OK).json({
      message: "Login Successfull",
      //data : "detail user information here"
      data: existingUser,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};
//register function
const register = async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;
  //event emitter
  myEvent.emit("event.register.user", { email, phoneNumber });
  try {
    // debugger;
    let user = await userRepository.register({
      name,
      email,
      password,
      phoneNumber,
      address,
    });
    res.status(HttpStatusCode.CREATED).json({
      message: "Register Successfull",
      data: user,
    });
  } catch (exception) {
    // debugger;
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
    // throw new Exception(Exception.CANNOT_REGISTER_USER);
  }
};
//get all users
const getAllUsers = async (req, res) => {
  res.send("GET ALL USERS!");
};
//get detail user

const getDetailUser = async (req, res) => {
  res.send("GET DETAIL USER!");
};
// Export all functions
export default { login, register, getDetailUser, getAllUsers };
