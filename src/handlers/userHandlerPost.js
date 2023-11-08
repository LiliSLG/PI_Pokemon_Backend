const { userPost } = require("../controllers");

const userHandlerPost = async (req, res) => {
  try {
    const { eMail, password, fullName } = req.body;
    const user = await userPost(fullName, eMail, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    //{ message: 'An error occurred while registering the user' }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
    userHandlerPost,
};