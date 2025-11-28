const { addUser } = require("../models/userModel.js");

const signup = async (request,response) => {
    try {
        response.status(200).render("signup.ejs");
    }
    catch(err) {
        console.log("error in rendering signup",err);
    }
};

const login = async (request,response) => {
    try {
        response.status(200).render("login.ejs");
    }
    catch(err) {
        console.log("error in rendering login",err);
    }
};

const addNewUser = async (request,response) => {
    try {
        let result = addUser(request.body);
        response.redirect("/login");
    }
    catch(err) {
        console.log("error in signing up, pls try again", err);
    }
};

module.exports = { signup, login, addNewUser };