const express = require('express');
const todoRouter = express.Router();

const { getTodos,addNewTodo } = require('../controllers/todoController.js');

todoRouter.get("/todo",getTodos);
todoRouter.post("/todo",addNewTodo);
module.exports = { todoRouter };