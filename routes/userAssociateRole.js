const express = require('express')
const db = require('../config/db')
const UserAssociateRoles = require('../models/userassociaterole')

const route = express.Router()

// Read
route.get('/user-associate-roles', async (req,res,next) => {
    const [results, metadata] = await db.query(`
        SELECT user_associate_roles.id,CONCAT(users."firstName", ' ', users."lastName") as user_name, modules.module_name, locations.location_name, user_roles.role_name FROM user_associate_roles
        JOIN users ON users.id = user_associate_roles.user_id
        JOIN modules ON modules.id = user_associate_roles.module_id
        JOIN locations ON locations.id = user_associate_roles.location_id
        JOIN user_roles ON user_roles.id = user_associate_roles.role_id
    `)
    res.status(200).json(results)
})

// Update
route.put('/user-associate-roles/update/:id', (req,res,next) => {
    const {user_id,location_id,module_id,role_id} = req.body
    if(user_id === '' || location_id === '' || module_id === '' || role_id === '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        UserAssociateRoles.findAll({where: {id: req.params.id}})
            .then(resData => {
                UserAssociateRoles.update(req.body, {where: {id: req.params.id}})
                    .then(resData => {
                        res.status(200).json(resData)
                    })
                    .catch(err => {
                        res.status(404).json({message: 'Something went wrong'})
                    })
            })
    }
})

// Create
route.post('/user-associate-roles/entry', (req,res,next) => {
    const {user_id,location_id,module_id,role_id} = req.body
    if(user_id === '' || location_id === '' || module_id === '' || role_id === '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        UserAssociateRoles.create(req.body)
            .then(resData => {
                res.status(200).json(resData)
            })
            .catch(err => {
                console.log(err)
                res.status(404).json({message: 'Something went wrong', err})
            })
    }
})

// Delete
route.delete('/user-associate-roles/delete', (req,res,next) => {
    UserAssociateRoles.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            res.status(200).json({message: 'UserAssociateRoles Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route