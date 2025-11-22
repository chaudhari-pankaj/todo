const express = require('express');
const Router = express.Router();
const { createTableController } = require('../controllers/createTable.js');
const { userTableController } = require('../controllers/userTable.js');

Router.get('/create-table',createTableController);
Router.get('/create-usertable',userTableController);

module.exports = { Router };