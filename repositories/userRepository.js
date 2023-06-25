import { print, OutputType } from "../helpers/print.js";
import User from "../Model/userModel.js";
import Exception from "../Errors/Exception.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const login = async ({ email, password }) => {
  // print("Login user in repositories", OutputType.INFORMATION);
  let existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    //not encrypt password !
    let isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      //create jwt token
      const token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET,
        {
          // expiresIn: "60", //1 minute
          expiresIn: "30 days",
        }
      );

      return {
        ...existingUser.toObject(),
        password: "Not Show",
        token: token,
      };
    } else {
      throw new Exception(Exception.WRONG_EMAIL_PASSWORD);
    }
  } else {
    throw new Exception(Exception.WRONG_EMAIL_PASSWORD);
  }
};

const register = async ({ name, email, password, phoneNumber, address }) => {
  // validation allready

  // debugger;
  const existingUser = await User.findOne({ email }).exec();
  if (!!existingUser) {
    throw new Exception(Exception.USER_EXIST);
  }
  const hashPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUND)
  );
  // insert to Database
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
