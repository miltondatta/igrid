const express = require('express')
const Models = require('../models/asset/models')

const route = express.Router()

// Read
route.get('/models', (req,res,next) => {
    Models.findAll({attributes: ['id', 'model']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/models/update/:id', (req,res,next) => {
    const {model} = req.body
    if (model === '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        Models.update({model}, {where: {id: req.params.id}})
            .then(resData => {
                res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
            })
            .catch(err => {
                res.status(200).json({message: 'Something went wrong'})
            })
    }
})

// Create
route.post('/models/entry', (req,res,next) => {
    const {model} = req.body
    if (model === '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        Models.create(req.body)
            .then(resData => {
                res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
            })
            .catch(err =>   {
                console.log(err)
                res.status(200).json({message: 'Something went wrong', err})
            })
    }
})

// Delete
route.delete('/models/delete', (req,res,next) => {
    Models.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {

            res.status(200).json({message: 'Models Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route