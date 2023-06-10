import { body, validationResult } from "express-validator";
import { userRepository, studentRepository } from "../repositories/index.js";
import { EventEmitter } from "node:events";
// login function
import HttpStatusCode from "../Errors/HttpStatusCode.js";
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
  await userRepository.login({ email, password });
  res.status(HttpStatusCode.OK).json({
    message: "Login Successfull",
  });
};
//register function
const register = async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;
  await userRepository.register({
    name,
    email,
    password,
    phoneNumber,
    address,
  });
  //event emitter
  myEvent.emit("event.register.user", { email, phoneNumber });
  res.status(HttpStatusCode.CREATED).json({ message: "Register Successfully" });
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
