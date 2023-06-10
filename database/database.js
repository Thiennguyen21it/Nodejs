import mongoose from "mongoose";
import Exception from "../Errors/Exception.js";
import { print, OutputType } from "../helpers/print.js";

async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    print("Connect to mongoDB database successfully!", OutputType.SUCCESS);
    return connection;
  } catch (error) {
    //error hadling
    const { code } = error;
    debugger;
    if (error.code == 8000) {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    } else if (error.code == "ENOTFOUND") {
      throw new Exception(Exception.WRONG_CONNECTION_STRING);
    }
    debugger;
    throw new Exception(Exception.CANNOT_CONNECT_TO_DATABASE);
  }
}

export default connect;
//test locally
