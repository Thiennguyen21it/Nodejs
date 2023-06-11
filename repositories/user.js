import { print, OutputType } from "../helpers/print.js";
import User from "../Model/userModel.js";
import Exception from "../Errors/Exception.js";
import bcrypt from "bcrypt";
const login = async ({ email, password }) => {
  print("Login user in repositories", OutputType.INFORMATION);
};

const register = async ({ name, email, password, phoneNumber, address }) => {
  // validation allready

  debugger;
  const existingUser = await User.findOne({ email }).exec();
  if (!!existingUser) {
    throw new Exception(Exception.USER_EXIST);
  }
  const hashPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUND)
  );
  // insert to database
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    phoneNumber,
    address,
  });
  return {
    ...newUser._doc,
    password: "Not Show",
  };

  // print(
  //   "register with : name : " +
  //     name +
  //     " email : " +
  //     email +
  //     " password : " +
  //     password +
  //     " phoneNumber : " +
  //     phoneNumber +
  //     " address : " +
  //     address,
  //   OutputType.INFORMATION
  // );
};

export default { login, register };
