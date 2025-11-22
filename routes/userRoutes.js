const express = require('express');
const userRouter = express.Router();

const { signup, login, addNewUser} = require('../controllers/userController.js');

userRouter.use(express.urlencoded({extended : true}));

userRouter.get("/todo/signup",signup);
userRouter.post("/todo/signup",addNewUser);
userRouter.get("/todo/login",login);
// userRouter.post("/todo/login",authenticateUser);

module.exports = { userRouter };