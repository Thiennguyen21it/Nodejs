import express from "express";
import { studentControllers } from "../controllers/index.js";

const router = express.Router();
router.get("/", studentControllers.getAllStudents);

//get student by id

router.get("/:id", studentControllers.getStudentById);

router.patch("/", studentControllers.updateStudent);

router.post("/", studentControllers.insertStudent);

export default router;
