const express = require('express');
const router = express.Router();
const { createTableController } = require('../controllers/createTable.js');
const { userTableController } = require('../controllers/userTable.js');

router.get('/create-table',createTableController);
router.get('/create-usertable',userTableController);

module.exports = router;