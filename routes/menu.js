const db                    = require('../config/db')
const express               = require('express')
const menu                  = require('../models/menu')
const { getMenuByParent, getAllSubMenu }   = require('../dbHelper/admin');

const route = express.Router();

route.get('/menu/get', async(req, res) => {
    let role_id = 1;
    
    let mainMenus    =   await getMenuByParent(0);
    let subMenu      =   await getAllSubMenu()
    let allMenus     = [];
    mainMenus.forEach(element => {
        allMenus[element.module_id]  = [];
    });

    mainMenus.forEach(element =>{
        element.categories  =   [];
        allMenus[element.module_id].push(element);
    });

    subMenu.forEach(element => {
        let menuIndex     =   allMenus[element.module_id].findIndex(d => d.id === element.parent_id);
        allMenus[element.module_id][menuIndex].categories.push(element);
    });
    return res.status(200).json(allMenus);
});


module.exports = route;