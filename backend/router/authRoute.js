const express = require("express");
const {
  signup,
  signin,
  getUser,
  logout,
} = require("../controller/authController");
const jwtAuth = require("../middleware/jwtAuth");

const authRouter = express.Router(); //1

authRouter.post("/signup", signup); //2

authRouter.post("/signin", signin); //14

authRouter.get("/user", jwtAuth, getUser); //18

authRouter.get("/logout", jwtAuth, logout); //21

module.exports = authRouter; //3
