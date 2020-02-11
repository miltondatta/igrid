const express = require('express')
const UserRoles = require('../models/userroles')

const route = express.Router()

// Read
route.get('/user-roles', (req,res,next) => {
    UserRoles.findAll({attributes: ['id', 'role_name', 'role_desc', 'module_id']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/user-roles/update/:id', (req,res,next) => {
    const {role_name,role_desc,module_id} = req.body
    if(role_desc === '' || role_name === '' || module_id === '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        UserRoles.findAll({where: {id: req.params.id}})
            .then(resData => {
                UserRoles.update({role_name,role_desc,module_id}, {where: {id: req.params.id}})
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
route.post('/user-roles/entry', (req,res,next) => {
    const {role_desc, role_name, module_id} = req.body
    if(role_desc === '' || role_name === '' || module_id === '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        UserRoles.findAll({where: {role_desc}})
            .then(resData => {
                if(resData.length === 0) {
                    UserRoles.create(req.body)
                        .then(resData => {
                            res.status(200).json(resData)
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(404).json({message: 'Something went wrong', err})
                        })
                } else {
                    res.status(200).json({message: 'UserRoles Code Exist'})
                }
            })
    }
})

// Delete
route.delete('/user-roles/delete', (req,res,next) => {
    UserRoles.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            res.status(200).json({message: 'UserRoles Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route