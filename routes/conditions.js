const express = require('express')
const Conditions = require('../models/asset/conditions')

const route = express.Router()

// Read
route.get('/conditions', (req,res,next) => {
    Conditions.findAll({attributes: ['id', 'condition_type']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/conditions/update/:id', (req,res,next) => {
    const {condition_type} = req.body
    if (condition_type !== '') {
        Conditions.update({condition_type}, {where: {id: req.params.id}})
            .then(resData => {
                res.status(200).json(resData)
            })
            .catch(err => {
                res.status(200).json({message: 'Something went wrong'})
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Create
route.post('/conditions/entry', (req,res,next) => {
    const {condition_type} = req.body
    if (condition_type !== '') {
        Conditions.create(req.body)
            .then(resData => {
                res.status(200).json(resData)
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
route.delete('/conditions/delete', (req,res,next) => {
    Conditions.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {

            res.status(200).json({message: 'Conditions Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route