const express = require('express')
const db = require('../config/db')
const UserAssociateRoles = require('../models/userassociaterole')

const route = express.Router()

// Read
route.get('/user-associate-roles', async (req,res,next) => {
    const [results, metadata] = await db.query(`
        SELECT user_associate_roles.id,CONCAT(users."firstName", ' ', users."lastName") as user_name, user_roles.id as role_id, users.id as user_id, locations.id as location_id, locations.location_name, user_roles.role_name FROM user_associate_roles
        JOIN users ON users.id = user_associate_roles.user_id
        JOIN locations ON locations.id = user_associate_roles.location_id
        JOIN user_roles ON user_roles.id = user_associate_roles.role_id
    `)
    if(results.length > 0) {
        res.status(200).json(results)
    } else {
        res.status(200).json()
    }
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
                        res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
                    })
                    .catch(err => {
                        res.status(200).json({message: 'Something went wrong'})
                    })
            })
    }
})

// Create
route.post('/user-associate-roles/entry', (req,res,next) => {
    const {user_id,location_id,module_id,role_id} = req.body
    if(user_id === '' || location_id === '' || role_id === '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        UserAssociateRoles.create(req.body)
            .then(resData => {
                res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
            })
            .catch(err => {
                console.log(err)
                res.status(200).json({message: 'Something went wrong', err})
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
            res.status(200).json({message: 'Something went wrong', err})
        })
});

// User info By Location Id
route.get('/user-info/by/location/:location_id', async (req, res) => {
    try {
        const location_id = req.params.location_id;
        const data = await db.query(`select users.id, concat(users."firstName", ' ', users."lastName") as name,  user_roles.role_name
                                    from user_associate_roles
                                             left join users on user_associate_roles.user_id = users.id
                                             left join user_roles on user_associate_roles.role_id = user_roles.id
                                    where user_associate_roles.location_id = ${location_id}`);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
});

module.exports = route;