const validateUserLogin = (req, res, next) => {
  const { eMail, password, fullName } = req.body;
  
  if (!eMail) return res.status(400).json({ error: "Missing email" });
  if (!password) return res.status(400).json({ error: "Missing password" });

  next();
};

module.exports = {
  validateUserLogin,
};
