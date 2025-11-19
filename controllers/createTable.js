const { createTable } = require('../models/todoModel.js');

const createTableController = async (req,res) => {
    try {
        let result = await createTable();
        res.status(200).send(result);
    }
    catch(err) {
        res.status(500).send("error creating table");
    }
};

module.exports = { createTableController };