const express = require('express');
const Router = express.Router();
const db = require('../config/db');
const {Op} = require("sequelize");
const Menu_Assign = require('../models/menuassign');
const Menu = require('../models/menu');

// Get All Menu Assign Data
Router.get('/menu/assign/data', async (req, res) => {
    try {
        const [data] = await db.query(` select menu_assigns.id as id,
                               menus.id menus_id,
                               menus.parent_id,
                               menus.module_id,
                               user_roles.role_name,
                               modules.module_name,
                               CASE
                                   WHEN menus.parent_id = 0 THEN menus.name
                                   ELSE ''
                                   END
                                   AS menu_name,
                               CASE
                                   WHEN menus.parent_id > 0 THEN menus.name
                                   ELSE ''
                                   END
                                   AS sub_menu
                        from menu_assigns
                                 inner join user_roles on menu_assigns.role_id = user_roles.id
                                 inner join menus on menu_assigns.menu_id = menus.id
                                 left join modules on menus.module_id = modules.id`);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err.message});
    }
});

Router.post('/menu/assign/entry', async (req, res) => {
    try {
        const {role_id, menu_id} = req.body;

        const newMenuAssign = {
            role_id,
            menu_id
        };

        const menu_assign = await Menu_Assign.findAll({
            where: {
                role_id: role_id,
                menu_id: menu_id
            }
        });

        if (menu_assign.length > 0) return res.status(400).json({
            msg: `This Menu is already assigned!`,
            error: true
        });

        const status = await Menu_Assign.create(newMenuAssign);
        if (!status) return res.status(400).json({
            msg: 'Please try again with full information!',
            error: true
        });

        return res.status(200).json({
            msg: `New Menu assigned successfully.`,
            success: true
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({err: err});
    }
});

Router.post('/menu/assign/update', async (req, res) => {
    try {
        const {id, role_id, menu_id} = req.body;

        const updateMenuAssign = {
            id,
            role_id,
            menu_id
        };

        const status = await Menu_Assign.findOne({where: {id}});
        if (!status) return res.status(400).json({
            msg: `This Menu didn\'t found!`,
            error: true
        });

        const menu_assign = await Menu_Assign.update(updateMenuAssign, {where: {id}});
        if (!menu_assign) return res.status(400).json({
            msg: 'Please try again with full information!',
            error: true
        });

        return res.status(200).json({
            msg: `Menu Information updated successfully.`,
            success: true
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({err: err});
    }
});

Router.delete('/menu/assign/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const status = await Menu_Assign.findOne({where: {id}});
        if (!status) return res.status(400).json({
            msg: `This Menu didn\'t found!`,
            error: true
        });

        const menu_assign = await Menu.findAll({
            where: {parent_id: status.menu_id}
        });
        if (menu_assign.length > 0) return res.status(400).json({
            msg: 'This Menu has Sub Menu! So Delete First Sub Menu!.',
            error: true
        });

        const menu = await Menu_Assign.destroy({where: {id}});
        if (!menu) return res.status(400).json({msg: 'Please try again!', error: true});

        return res.status(200).json({
            msg: `One Menu deleted successfully!`,
            success: true
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err.message});
    }
});

module.exports = Router;