const express = require('express');
const Menu = require('../models/menu');
const {Op} = require("sequelize");
const {getMenuByParent, getAllSubMenu} = require('../dbHelper/admin');
const {capitalize} = require('../utility/custom');
const db = require('../config/db');

const route = express.Router();

/* 
    All Modules ID
    0   =   Admin
    1   =   Asset Requisition & Tracking
    2   =   MIS Report
    3   =   Document & Notice
    4   =   Location Finder
*/

route.get('/menu/get', async (req, res) => {
    try {
        let mainMenus = await getMenuByParent(0);
        let subMenu = await getAllSubMenu();
        let allMenus = [];
        mainMenus.length > 0 && mainMenus.forEach(element => {
            allMenus[element.module_id] = [];
        });

        mainMenus.length > 0 && mainMenus.forEach(element => {
            element.submenus = [];
            allMenus[element.module_id].push(element);
        });

        subMenu.length > 0 && subMenu.forEach(element => {
            let menuIndex = allMenus[element.module_id].findIndex(d => d.id === element.parent_id);
            allMenus[element.module_id][menuIndex].submenus.push(element);
        });
        return res.status(200).json(allMenus);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err.message});
    }
});

route.post('/menu/entry', async (req, res) => {
    try {
        const {name, icon, sub_menu, link, parent_id, module_id, visible, order_by} = req.body;

        const newMenu = {
            name,
            icon,
            sub_menu,
            link,
            parent_id,
            module_id,
            visible,
            order_by : order_by ? order_by : null
        };

        const menus = await Menu.findAll({
            where: {
                module_id: module_id,
                parent_id: parent_id,
                [Op.or]: [
                    {name: name},
                    {name: name.toLowerCase()},
                    {name: name.toUpperCase()},
                    {name: capitalize(name)}
                ]
            }
        });

        if (menus.length > 0) return res.status(400).json({
            msg: `This ${parent_id === 0 ? 'Menu' : 'Sub Menu'} is already exist!`,
            error: true
        });

        const status = await Menu.create(newMenu);
        if (!status) return res.status(400).json({
            msg: 'Please try again with full information!',
            error: true
        });

        return res.status(200).json({
            msg: `New ${parent_id === 0 ? 'Menu' : 'Sub Menu'} saved successfully.`,
            success: true
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({err: err});
    }
});

route.post('/menu/update', async (req, res) => {
    try {
        const {id, name, icon, sub_menu, link, parent_id, module_id, visible, order_by} = req.body;

        const updateMenu = {
            id,
            name,
            icon,
            sub_menu,
            link,
            parent_id,
            module_id,
            visible,
            order_by : order_by ? order_by : null
        };

        const status = await Menu.findOne({where: {id}});
        if (!status) return res.status(400).json({
            msg: `This ${parent_id === 0 ? 'Menu' : 'Sub Menu'} didn\'t found!`,
            error: true
        });

        if (status.parent_id === 0 && status.parent_id !== parent_id) return res.status(400).json({
            msg: `This is Main Menu. It can't revert as Sub Menu!`,
            error: true
        });

        const menus = await Menu.update(updateMenu, {where: {id}});
        if (!menus) return res.status(400).json({
            msg: 'Please try again with full information!',
            error: true
        });

        return res.status(200).json({
            msg: `${parent_id === 0 ? 'Menu' : 'Sub Menu'} Information updated successfully.`,
            success: true
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({err: err});
    }
});

route.delete('/menu/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const status = await Menu.findOne({where: {id}});
        if (!status) return res.status(400).json({
            msg: `This ${status.parent_id === 0 ? 'Menu' : 'Sub Menu'} didn\'t found!`,
            error: true
        });

        if (status.parent_id === 0) {
            const menus = await Menu.findAll({
                where: {parent_id: id}
            });
            if (menus.length > 0) return res.status(400).json({
                msg: 'This Menu has Sub Menu! So Delete First Sub Menu!.',
                error: true
            });
        }

        const menu = await Menu.destroy({where: {id}});
        if (!menu) return res.status(400).json({msg: 'Please try again!', error: true});

        return res.status(200).json({
            msg: `One ${status.parent_id === 0 ? 'Menu' : 'Sub Menu'} deleted successfully!`,
            success: true
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err.message});
    }
});

// Get Menu By Credential
route.post('/menu/by/credential', async (req, res) => {
    try {
        const {module_id, parent_id, sub_menu, id} = req.body;

        let queryText = '';
        if (module_id || module_id === 0) queryText = 'where menus.module_id = ' + module_id;
        if (parent_id || parent_id === 0) queryText += ' and menus.parent_id = ' + parent_id;
        if (typeof (sub_menu) === "boolean") queryText += ' and menus.sub_menu = ' + sub_menu;

        const [data] = await db.query(`select * from menus ${queryText}`);
        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err.message});
    }
});


module.exports = route;