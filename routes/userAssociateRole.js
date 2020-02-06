const express = require('express')
const db = require('../config/db')
const UserAssociateRoles = require('../models/userassociaterole')

const route = express.Router()

// Read
route.get('/user-associate-roles', async (req,res,next) => {
    const [results, metadata] = await db.query(`
        SELECT "UserAssociateRoles"."id",CONCAT("Users"."firstName", ' ', "Users"."lastName") as user_name, "Modules"."module_name", "Locations"."location_name", "UserRoles"."role_name" FROM "UserAssociateRoles"
        JOIN "Users" ON "Users"."id" = "UserAssociateRoles"."user_id"
        JOIN "Modules" ON "Modules"."id" = "UserAssociateRoles"."module_id"
        JOIN "Locations" ON "Locations"."id" = "UserAssociateRoles"."location_id"
        JOIN "UserRoles" ON "UserRoles"."id" = "UserAssociateRoles"."role_id"
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