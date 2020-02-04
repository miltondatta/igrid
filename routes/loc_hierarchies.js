const express = require('express')
const Location_hierarchies = require('../models/location_hierarchies')

const route = express.Router()

// Read
route.get('/locHierarchies', (req,res,next) => {
    Location_hierarchies.findAll({attributes: ['id', 'hierarchy_name']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/locHierarchies/update/:id', (req,res,next) => {
    const {hierarchy_name} = req.body
    if (hierarchy_name !== '') {
        Location_hierarchies.update({hierarchy_name}, {where: {id: req.params.id}})
            .then(resData => {
                res.status(200).json(resData)
            })
            .catch(err => {
                res.status(404).json({message: 'Something went wrong'})
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Create
route.post('/locHierarchies/entry', (req,res,next) => {
    const {hierarchy_name} = req.body
    if (hierarchy_name !== '') {
        Location_hierarchies.create(req.body)
            .then(resData => {
                res.status(200).json(resData)
            })
            .catch(err => {
                console.log(err)
                res.status(404).json({message: 'Something went wrong', err})
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Delete
route.delete('/locHierarchies/delete', (req,res,next) => {
    Location_hierarchies.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            res.status(200).json({message: 'Location_hierarchies Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route