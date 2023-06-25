import express from "express";
import studentControllers from "../controllers/studentControllers.js";

const router = express.Router();
router.get("/", studentControllers.getAllStudents);

//get student by id

router.get("/:id", studentControllers.getStudentById);

router.patch("/", studentControllers.updateStudent);

router.post("/insert", studentControllers.insertStudent);
router.post("/generaterFakeStudent", studentControllers.generateFakeStudent);

export default router;
