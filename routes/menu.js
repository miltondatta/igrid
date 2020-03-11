const db                    = require('../config/db')
const express               = require('express')
const menu                  = require('../models/menu')

const route = express.Router();

route.get('/menu/get', async(req, res) => {
    let role_id = 1;
    
   


});


module.exports = route;