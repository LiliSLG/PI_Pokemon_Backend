const bcrypt = require("bcrypt");
const { User } = require("../db");
const userPost = async (fullName, eMail, password) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const [user, created] = await User.findOrCreate({
    where: { fullName, eMail, password: hashedPassword },
  });
  return user;
};

module.exports = { userPost };
