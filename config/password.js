const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json("A server error has occured. Please try again later.");
  }
};

const checkPassword = async (password, hash) => {
  try {
    const result = await bcrypt.compare(password, hash);

    return result;
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json("A server error has occured. Please try again later.");
  }
};

module.exports = {
  hashPassword,
  checkPassword,
};
