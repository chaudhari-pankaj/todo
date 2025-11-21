const { showAllTodos, addTodo, deleteTodo } = require('../models/todoModel.js');


const getTodos = async (request,response) => {
    try {
        let todos = await showAllTodos();
        response.status(200).render("todo.ejs",{ todos });
    }
    catch(err) {
        response.status(500).send("couldn't retrieve all the todos");
    }
}

const addNewTodo = async (request,response) => {
    try {
        let result = await addTodo(request.body);
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

module.exports = { getTodos , addNewTodo, deleteChosenTodo };