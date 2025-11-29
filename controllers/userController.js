const { addUser, usernameTaken } = require("../models/userModel.js");

const signup = async (request,response) => {
    try {
        const csrfToken = request.csrfToken();
        response.status(200).render("signup.ejs",{token :csrfToken});
    }
    catch(err) {
        console.log("error in rendering signup",err);
    }
};

const login = async (request,response) => {
    try {
        const csrfToken = request.csrfToken();
        response.status(200).render("login.ejs",{token : csrfToken});
    }
    catch(err) {
        console.log("error in rendering login",err);
    }
};

const addNewUser = async (request,response) => {
    let isTaken = await usernameTaken(request.body.username);
    if(!isTaken) {
        try {
            let result = await addUser(request.body);
            response.redirect("/login");
        }
        catch(err) {
            console.log("error in signing up, pls try again", err);
        }
    }
    else {
        request.flash("error","username is already taken");
        response.redirect("/signup");
    }
};

module.exports = { signup, login, addNewUser };