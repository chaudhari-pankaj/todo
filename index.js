const express = require('express');
const app = express();
const path = require('path');

const { Router }  = require('./routes/route.js');
const  { todoRouter } = require('./routes/todoRoutes.js');
const { userRouter } = require('./routes/userRoutes.js');

app.set('view-engine','ejs');
app.set('views',path.join(__dirname,"/views"));

app.use(Router);
app.use(userRouter);
app.use(todoRouter);

app.listen(3000,(request,response) => {
    console.log("server is listening to port 3000");
});