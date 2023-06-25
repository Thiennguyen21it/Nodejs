import Student from "../Model/studentModel.js";
import Exception from "../Errors/Exception.js";
import { faker } from "@faker-js/faker";
const getAllStudents = async ({ page, size, searchString }) => {
  // console.log("get all students with paging");
  //aggregate data function
  page = parseInt(page);
  size = parseInt(size);
  // searchString
  let fillteredStudents = await Student.aggregate([
    {
      $match: {
        $or: [
          {
            name: { $regex: `.*${searchString}.*`, $options: "i" },
          },
          {
            email: { $regex: `.*${searchString}.*`, $options: "i" },
          },
          {
            address: { $regex: `.*${searchString}.*`, $options: "i" },
          },
        ],
      },
    },
    {
      $skip: (page - 1) * size,
    },
    {
      $limit: size,
    },
  ]);
  return fillteredStudents;
};

const getStudentById = async (id) => {
  const student = await Student.findById(id);
  if (!student) throw new Exception("Student not found with id : " + id);
  return student;
};

const insertStudent = async ({
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  // console.log("insert student in student repository");
  try {
    const newStudent = await Student.create({
      name,
      email,
      languages,
      gender,
      phoneNumber,
      address,
    });
    // debugger;
    return newStudent;
  } catch (exception) {
    if (exception.errors) {
      //error from validationp
      throw new Exception("Input Error", exception.errors);
    }
  }
};
const updateStudent = async ({
  id,
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  // debugger;
  const student = await Student.findById(id);
  student.name = name ?? student.name;
  student.email = email ?? student.email;
  student.languages = languages ?? student.languages;
  student.gender = gender ?? student.gender;
  student.phoneNumber = phoneNumber ?? student.phoneNumber;
  student.address = address ?? student.address;
  await student.save();
  return student;
};
async function generateFakeStudent() {
  [...Array(100).keys()].forEach(async (index) => {
    let fakeStudent = {
      name: `${faker.name.fullName()}-fake`,
      email: faker.internet.email(),
      languages: [
        faker.helpers.arrayElement(["English", "Vietnamese", "Japanese"]),
        faker.helpers.arrayElement(["French", "Chinese", "indi"]),
      ],
      gender: faker.helpers.arrayElement(["male", "female"]),
      phoneNumber: faker.phone.number(),
      address: faker.address.streetAddress(),
    };
    await Student.create(fakeStudent);
    // print(`insert student with name ${fakeStudent.name.fullName()}`, OutputType.SUCCESS);
  });
}

export default {
  getAllStudents,
  getStudentById,
  insertStudent,
  updateStudent,
  generateFakeStudent,
};
