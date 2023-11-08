const { Router } = require("express");
const { userHandlerLogin, userHandlerPost } = require("../handlers");
const { validateUser, validateUserLogin } = require("../middlewares/");

const userRouter = Router();

//usuarios
userRouter.post("/login", validateUserLogin, userHandlerLogin);
userRouter.post("/register", validateUser, userHandlerPost);

// userRouter.get("/login",  userHandlerLogin);
// userRouter.post("/register",  userHandlerPost);

module.exports = userRouter;