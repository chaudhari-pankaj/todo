const express = require('express');
const todoRouter = express.Router();

const { getTodos, addNewTodo, deleteChosenTodo, markCompleted} = require('../controllers/todoController.js');

todoRouter.use(express.urlencoded({extended : true}));

todoRouter.get("/todo",getTodos);
todoRouter.post("/todo",addNewTodo);
todoRouter.delete("/todo/:todoID",deleteChosenTodo);
todoRouter.patch("/todo/:todoID",markCompleted);

module.exports = { todoRouter };