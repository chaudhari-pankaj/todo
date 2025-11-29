const { showAllTodos, addTodo, deleteTodo, completedTodo } = require('../models/todoModel.js');


const getTodos = async (request,response) => {
    try {
        let todos = await showAllTodos(request.user);
        response.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.status(200).render("todo.ejs",{ todos });
    }
    catch(err) {
        response.status(500).send("couldn't retrieve all the todos");
    }
}

const addNewTodo = async (request,response) => {
    try {
        let result = await addTodo(request.body,request.user);
        response.status(200).redirect("http://localhost:3000/todo");
    }
    catch(err) {
        console.log(err);
        response.status(500).send("couldn't add a new todo, try again later");
    }
};

const deleteChosenTodo = async (request,response) => {
    try {
        let result = await deleteTodo(request.params);
        response.status(200).json({redirectURL : "http://localhost:3000/todo"});
    }
    catch(err) {
        console.log(err);
        response.send(500).send("couldn't delete todo, try again later")
    }
};

const markCompleted = async (request,response) => {
    try {
        let result = await completedTodo(request.params);
        response.status(200).json({redirectURL : "http://localhost:3000/todo"});
    }
    catch(err) {
        response.status(500).send("couldn't mark as completed, try again later",err);
    }
}

module.exports = { getTodos , addNewTodo, deleteChosenTodo, markCompleted };