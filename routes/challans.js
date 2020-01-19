const express = require('express')
const Challan = require('../models/asset/challan')

const route = express.Router()

// Read
route.get('/challan', (req,res,next) => {
    Challan.findAll()
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Create
route.post('/challan/entry', (req,res,next) => {
    Challan.create(req.body)
        .then(resData => {
                res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

// Delete
route.delete('/challan/delete', (req,res,next) => {
    Challan.destroy({
        where: {
            id: req.body.id
        }
    })
    .then(resData => {
        console.log(resData)
        res.status(200).json({message: 'Challan Has Been Deleted'})
    })
    .catch(err => {
        console.log(err)
        res.status(404).json({message: 'Something went wrong', err})
    })
})

module.exports = route