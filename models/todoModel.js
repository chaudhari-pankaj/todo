const { pool } = require('../database/connect_db');
const { randomUUID } = require('crypto');

const createTable = async () => {
    const createTableSQL = `CREATE TABLE IF NOT EXISTS todo (
        todoID varchar(50) PRIMARY KEY,
        userID varchar(50),
        dueDate DATE,
        task varchar(30),
        completed BOOL
        ADD CONSTRAINT FOREIGN KEY (userID) REFERENCES user(userID);
        );`;
    try {
        let [result] = await pool.query(createTableSQL);
        return result;
    }
    catch(err) {
        console.log("error creating todo table");
        throw err;
    }
};

const showAllTodos = async () => {
    const showAllTodosSQL = 'SELECT * FROM todo ORDER BY completed,dueDate ASC;';
    try {
        let [result] = await pool.query(showAllTodosSQL);
        return result;
    }
    catch(err) {
        console.log("error while retrieving all todos", err);
    }
}

const addTodo = async (newTodo) => {
    const addTodoSQL = `INSERT INTO todo
        (todoID,userId,dueDate,task,completed)
        VALUES
        (?,?,?,?,?);`
    let placeholder = [randomUUID(),'userid',newTodo.dueDate,newTodo.task,0];
    try {
        let [result] = await pool.query(addTodoSQL,placeholder);
        return result;
    }
    catch(err) {
        console.log("error in adding todo task",err);
    }
};

const deleteTodo = async (todo) => {
    const deleteTodoSQL = `DELETE
        FROM todo
        WHERE todoID = ?;`;
    let placeholder = [todo.todoID];
    try {
        let result = await pool.query(deleteTodoSQL,placeholder);
        return result;
    }
    catch(err) {
        console.log("an error occured during deletion",err);
    }
};

const completedTodo = async (todo) => {
    let completedTodoSQL = `UPDATE todo SET completed = 1 WHERE todoID = ?`;
    let placeholder = [todo.todoID];
    try {
        let result = pool.query(completedTodoSQL,placeholder);
        return result;
    }
    catch(err){
        console.log("error while marking as compeleted",err);
    }
};

module.exports = { createTable, showAllTodos , addTodo , deleteTodo, completedTodo };