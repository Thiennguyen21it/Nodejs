import { print, OutputType } from "../helpers/print.js";

export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password";
  static WRONG_CONNECTION_STRING = "Wrong connection string";
  static CANNOT_CONNECT_TO_DATABASE = "Can not connect to database";
  static USER_EXIST = "User already exists";
  static CANNOT_REGISTER_USER = "Can not register user";
  constructor(message) {
    super(message);
    print(message, OutputType.ERROR);
  }
}
