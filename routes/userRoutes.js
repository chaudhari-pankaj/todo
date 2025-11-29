const express = require('express');
const userRouter = express.Router();
const passport = require('passport');

const { signup, login, addNewUser} = require('../controllers/userController.js');


userRouter.post("/login",passport.authenticate('local',{ successRedirect : "/todo", failureRedirect: "/login", failureFlash : true}));
userRouter.get("/signup",signup);
userRouter.post("/signup",addNewUser);
userRouter.get("/login",login);
userRouter.get("/logout",(request,response) => {
    request.logout((err) => {
        if(err)
            throw(err);
    });
    response.render("logout.ejs");
});

module.exports = { userRouter };