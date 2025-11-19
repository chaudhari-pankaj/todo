const { showAllTodos } = require('../models/todoModel.js');
const { addTodo } = require('../models/todoModel.js');

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
        console.log(request);
        let result = await addTodo(request.body);
        response.status(200).redirect("http://localhost:3000/todo");
    }
    catch(err) {
        console.log(err);
        response.status(500).send("couldn't add a new todo, try later");
    }
};

module.exports = { getTodos , addNewTodo };