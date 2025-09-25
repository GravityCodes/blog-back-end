const bcrypt = require("bcrypt");

const hashPassword = async (password, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const checkPassword = async (password, hash) => {
  try {
    const result = await bcrypt.compare(password, hash);

    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  hashPassword,
  checkPassword,
};
