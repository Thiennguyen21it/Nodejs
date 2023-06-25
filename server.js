import express from "express";
import * as dotenv from "dotenv";
dotenv.config(); //must have
import { usersRouter, studentRouter } from "./routes/indexRoute.js";
import connect from "./database/database.js";
//authentication middleware
import checkToken from "./Auth/auth.js";
const app = express();
app.use(express.json()); //must have
app.use(checkToken); //shield
const port = process.env.PORT ?? 3000;

//router
app.use("/users", usersRouter);
app.use("/students", studentRouter);

app.get("/", (req, res) => {
  res.send("Hello world 1111!");
});

app.listen(port, async () => {
  await connect();
  console.log(`Example app listening at http://localhost:${port}`);
}); //
