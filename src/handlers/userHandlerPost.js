const { userPost } = require("../controllers");

const userHandlerPost =   async (req, res) => {
  try {
    const { eMail, password, fullName } = req.body;
    
    const user = await userPost(fullName, eMail, password);
    
    if (user) {
      // hago el login.
      const token = await userLogin(eMail, password);      
      res.status(201).json({ token });
    }
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  userHandlerPost,
};
