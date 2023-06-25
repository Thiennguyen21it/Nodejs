import { print, OutputType } from "../helpers/print.js";

export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password";
  static WRONG_CONNECTION_STRING = "Wrong connection string";
  static CANNOT_CONNECT_TO_DATABASE = "Can not connect to database";
  static USER_EXIST = "User already exists";
  static CANNOT_REGISTER_USER = "Can not register user";
  static WRONG_EMAIL_PASSWORD = "Wrong email and password";
  static CANNOT_INSERT_STUDENT = "Can not insert student";
  static VALIDATION_ERROR = "Validation error";
  constructor(message, validationErrors = {}) {
    super(message);
    print(message, OutputType.ERROR);
    this.validationErrors = validationErrors;
  }
}
