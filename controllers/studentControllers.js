import { body, validationResult } from "express-validator";
import HttpStatusCode from "../Errors/HttpStatusCode.js";
import studentRepository from "../repositories/studentRepository.js";
import { MAX_RECORDS } from "../Constants/constanst.js";
async function getAllStudents(req, res) {
  //http://localhost:3002/api/students?page=1&size=10&searchString=abc
  let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
  size > MAX_RECORDS ? (size = MAX_RECORDS) : (size = size);

  try {
    let fillteredStudents = await studentRepository.getAllStudents({
      page,
      size,
      searchString,
    });
    res.status(HttpStatusCode.OK).json({
      message: "GET ALL STUDENTS SUCCESSFULLY!",
      size: fillteredStudents.length,
      page,
      searchString,
      data: fillteredStudents,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Cannot get all students! " + exception,
    });
  }
}

async function getStudentById(req, res) {
  let studentId = req.params.id;
  try {
    let student = await studentRepository.getStudentById(studentId);
    res.status(HttpStatusCode.OK).json({
      message: "GET DETAIL  STUDENT SUCCESSFULLY!",
      data: student,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Cannot get student by id! " + exception,
    });
  }
}

async function updateStudent(req, res) {
  const { id, name, email, languages, gender, phoneNumber, address } = req.body;
  try {
    const updateStudent = await studentRepository.updateStudent(req.body);
    res.status(HttpStatusCode.OK).json({
      message: "Update student successfully!",
      data: updateStudent,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Cannot update student!" + exception,
      validationErrors: exception.validationErrors,
    });
  }
}

async function deleteStudent(req, res) {}

async function insertStudent(req, res) {
  try {
    // debugger;
    const student = await studentRepository.insertStudent(req.body);
    res.status(HttpStatusCode.CREATED).json({
      message: "Insert student successfully!",
      data: student,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Cannot insert student!" + exception,
      validationErrors: exception.validationErrors,
    });
    // debugger;
  }
}
async function generateFakeStudent(req, res) {
  try {
    const fakeStudent = await studentRepository.generateFakeStudent(req.body);
    res.status(HttpStatusCode.CREATED).json({
      message: "Generate fake student successfully!",
    });
  } catch (exception) {}
}

//Export all functions
export default {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  insertStudent,
  generateFakeStudent,
};
