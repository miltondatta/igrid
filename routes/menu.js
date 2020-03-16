const express = require('express');
const Menu = require('../models/menu');
const {Op} = require("sequelize");
const {getMenuByParent, getAllSubMenu} = require('../dbHelper/admin');
const {capitalize} = require('../utility/custom');

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
        const {name, icon, subCat, link, parent_id, module_id, visible, order_by} = req.body;

        const newMenu = {
            name,
            icon,
            subCat,
            link,
            parent_id,
            module_id,
            visible,
            order_by
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
            msg: 'This MenuComponent is already exist!',
            error: true
        });

        const status = await Menu.create(newMenu);
        if (!status) return res.status(400).json({
            msg: 'Please try again with full information!',
            error: true
        });

        return res.status(200).json({msg: 'New MenuComponent saved successfully.', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({err: err});
    }
});

route.post('/menu/update', async (req, res) => {
    try {
        const {id, name, icon, subCat, link, parent_id, module_id, visible, order_by} = req.body;

        const updateMenu = {
            id,
            name,
            icon,
            subCat,
            link,
            parent_id,
            module_id,
            visible,
            order_by
        };

        const status = await Menu.findOne({where: {id}});
        if (!status) return res.status(400).json({
            msg: 'This MenuComponent didn\'t found!',
            error: true
        });

        const menus = await Menu.update(updateMenu, {where: {id}});
        if (!menus) return res.status(400).json({
            msg: 'Please try again with full information!',
            error: true
        });

        return res.status(200).json({
            msg: 'MenuComponent Information updated successfully.',
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
        if (!status) return res.status(400).json({msg: 'This MenuComponent didn\'t found!', error: true});

        if (status.parent_id === 0) {
            const menus = await Menu.findAll({
                where: {parent_id: id}
            });
            if (menus.length > 0) return res.status(400).json({
                msg: 'This MenuComponent has Sub MenuComponent! So Delete First Sub MenuComponent.',
                error: true
            });
        }

        const menu = await Menu.destroy({where: {id}});
        if (!menu) return res.status(400).json({msg: 'Please try again!', error: true});

        return res.status(200).json({msg: 'One MenuComponent deleted successfully!', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err.message});
    }
});


module.exports = route;