const login = async ({ email, password }) => {
  console.log("login user in user repository!!!");
};

const register = async ({ name, email, password, phoneNumber, address }) => {
  // validation allready
  console.log(
    "register with : name : " +
      name +
      " email : " +
      email +
      " password : " +
      password +
      " phoneNumber : " +
      phoneNumber +
      " address : " +
      address
  );
};

export default { login, register };
