import { body, validationResult } from "express-validator";
import HttpStatusCode from "../Errors/HttpStatusCode.js";
async function getAllStudents(req, res) {
  res.status(HttpStatusCode.OK).json({
    message: "GET ALL STUDENTS SUCCESSFULLY!",
    data: [
      {
        name: "Nguyen Van A",
        email: "nguyenvanA@gmail.com",
        age: 20,
        address: "Ha Noi",
      },
      {
        name: "Nguyen Van B",
        email: "nguyenvanB@gmail.com",
        age: 20,
        address: "Ha Noi",
      },
      {
        name: "Nguyen Van C",
        email: "nguyenvanC@gmail.com",
        age: 20,
        address: "Ha Noi",
      },
    ],
  });
  // res.status(500).json({ message: "cannot get student!" });
}

async function getStudentById(req, res) {}

async function updateStudent(req, res) {}

async function deleteStudent(req, res) {}

async function insertStudent(req, res) {}
//Export all functions
export default {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  insertStudent,
};
