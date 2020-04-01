const db = require('../config/db')
const express = require('express')
const Approval_levels = require('../models/approval_level')

const route = express.Router()

// Read
route.get('/approval_level/options', async (req,res,next) => {
    const [data, metaData] = await db.query(`
       SELECT approval_levels.id, CONCAT(location_hierarchies.hierarchy_name, '_' ,user_roles.role_name) as approval_name FROM approval_levels
        JOIN location_hierarchies ON approval_levels.location_heirarchy_id = location_hierarchies.id
        JOIN user_roles ON approval_levels.role_id = user_roles.id
    `)
    if (data.length > 0) {
        res.status(200).json(data)
    } else {
        res.status(200).json()
    }
})

// Read
route.get('/approval_level', async (req,res,next) => {
    const [data, metaData] = await db.query(`
        SELECT approval_levels.id, location_hierarchies.hierarchy_name, location_hierarchies.id as location_heirarchy_id, user_roles.id as role_id, user_roles.role_name, approval_levels.parent_id FROM approval_levels
            JOIN location_hierarchies ON approval_levels.location_heirarchy_id = location_hierarchies.id
            JOIN user_roles ON approval_levels.role_id = user_roles.id
    `)
    if (data.length > 0) {
        res.status(200).json(data)
    } else {
        res.status(200).json()
    }
})

// Update
route.put('/approval_level/update/:id', (req,res,next) => {
    const {location_heirarchy_id,role_id,parent_id} = req.body
    if(location_heirarchy_id !== '' && role_id !== '' && parent_id !== '') {
        Approval_levels.update({location_heirarchy_id,role_id,parent_id}, {where: {id: req.params.id}})
            .then(resData => {
                res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
            })
            .catch(err => {
                res.status(200).json({message: 'Something went wrong'})
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Create
route.post('/approval_level/entry', (req,res,next) => {
    const {location_heirarchy_id,role_id,parent_id} = req.body
    if(location_heirarchy_id !== '' && role_id !== '' && parent_id !== '') {
        Approval_levels.create(req.body)
            .then(resData => {
                res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
            })
            .catch(err => {
                console.log(err)
                res.status(200).json({message: 'Something went wrong', err})
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Delete
route.delete('/approval_level/delete', (req,res,next) => {
    Approval_levels.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {

            res.status(200).json({message: 'Approval_levels Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route