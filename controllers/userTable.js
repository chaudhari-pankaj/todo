const { createUserTable } = require('../models/userModel.js');

const userTableController = async (request,response) => {
    try {
        let result = await createUserTable();
        response.status(200).send(result);
    }
    catch(err) {
        console.log(err);
        response.status(500).send("there was a problem in creating user table");
    }
};

module.exports = { userTableController };