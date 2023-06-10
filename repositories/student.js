const getAllStudents = async ({ page, size, searchString }) => {
  console.log("get all students with paging");
};

const insertStudent = async ({
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  console.log("insert student in student repository");
};

export default { getAllStudents, insertStudent };
