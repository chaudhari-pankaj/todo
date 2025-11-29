const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const mysqlstore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');
const csrf = require('tiny-csrf');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
require('dotenv').config();

const {pool} = require('./database/connect_db.js');
const { Router }  = require('./routes/route.js');
const  { todoRouter } = require('./routes/todoRoutes.js');
const { userRouter } = require('./routes/userRoutes.js');

app.set('view-engine','ejs');
app.set('views',path.join(__dirname,"/views"));

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser("cookie-parser-secret"));

const sessionStore = new mysqlstore({},pool);

app.use(session({
    secret : process.env.session_secret,
    store : sessionStore,
    resave : false,
    rolling : true,
    saveUninitialized : false,
    cookie : {
        maxAge : 10 * 60 * 1000 //10 minutes
    }
}));

app.use(flash());
app.use((request, response, next) => {
  response.locals.flash = request.flash();
  next();
});

app.use(csrf(
    process.env.csrf_secret,
    ["POST","PATCH","DELETE","PUT"]
));// must be 32 characters long

app.use(passport.initialize());
app.use(passport.session());

const customFields = {
    usernameFields : "username",
    passwordFields : "passowrd"
};

const strategy = new localStrategy(async (username,password,done) => {
    //get the user having username
    const userSql = 'select * from user where username = ?';
    const placeHolder = [username];
    try {
        const [result] = await pool.query(userSql,placeHolder);
        if(result.length) {
            try {
                const isValid = await bcrypt.compare(password,result[0].password);
                if(isValid) {
                    return done(null,result[0]);
                }
                else{
                    return done(null,false,{message : "incorrect password"});
                }
            }
            catch(err) {
                throw err;
            }
        }
        else{
            return done(null,false,{message : "username does not exist"});
        }
    }
    catch(err) {
        console.log("error in localStrategy",err);
    }

});

passport.use(strategy);
passport.serializeUser((user,done) => {
    done(null,user.userID);
});

passport.deserializeUser(async (userId,done) => {
    const userSql = 'select * from user where userID = ?';
    const placeHolder = [userId];
    try {
        const [result] = await pool.query(userSql,placeHolder);
        if(result.length) {
            done(null,result[0]);
        }
        else {
            done(null,false);
        }
    }
    catch(err) {
        done(err);
    }
});


const isAuth = (request,response,next) => {
    if(!request.isAuthenticated())
        response.send("you are not authenticated for this route");
    else
        next();
};

app.use("/todo",isAuth);

app.use(Router);
app.use(userRouter);
app.use(todoRouter);
app.get("/",(request,response) => {
    response.render("home.ejs");
});

app.listen(process.env.port,(request,response) => {
    console.log(`server is listening to port ${process.env.port}`);
});

module.exports = { isAuth };