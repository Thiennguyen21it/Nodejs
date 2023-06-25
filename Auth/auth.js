import jwt from "jsonwebtoken";
import HttpStatusCode from "../Errors/HttpStatusCode.js";
export default function checkToken(req, res, next) {
  //bypass login , register
  if (
    req.url.toLowerCase().includes("login") ||
    req.url.toLowerCase().includes("register")
  ) {
    next();
    return;
  } else {
    //other request
    const token = req.headers?.authorization?.split(" ")[1];
    //verify token
    try {
      const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
      const isExpired = jwtObject.exp < Date.now() / 1000;
      if (isExpired) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          message: "Token Expired",
        });
        res.end();
      } else {
        next();
      }
      //  debugger
    } catch (exception) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: exception.toString(),
      });
    }
  }
  debugger;
}
