const express = require('express')
const db = require('../config/db');



const route = express.Router();


route.get('/asset/lifecycle/details/:id', async(req, res) => {  

    return res.status(200).json({ message: req.params.id })

});

module.exports = route