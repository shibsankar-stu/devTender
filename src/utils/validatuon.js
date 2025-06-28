var validator = require("validator");
const validateUserInput = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required");
  }
  if (validator.isEmail(email) === false) {
    throw new Error("Invalid email");
  }
  if (validator.isStrongPassword(password) === false) {
    throw new Error(
      "Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }
};
module.exports = { validateUserInput };
