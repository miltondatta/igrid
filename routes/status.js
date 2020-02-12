const express = require('express')
const Status = require('../models/status')

const route = express.Router()

// Read
route.get('/status', (req,res,next) => {
    Status.findAll({attributes: ['id', 'status_name']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/status/update/:id', (req,res,next) => {
    const {status_name} = req.body
    if(status_name === '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        Status.update({status_name}, {where: {id: req.params.id}})
            .then(resData => {
                res.status(200).json(resData)
            })
            .catch(err => {
                res.status(404).json({message: 'Something went wrong'})
            })
    }
})

// Create
route.post('/status/entry', (req,res,next) => {
    const {status_name} = req.body
    if(status_name === '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        Status.create(req.body)
            .then(resData => {
                res.status(200).json(resData)
            })
            .catch(err => {
                res.status(404).json({message: 'Something went wrong', err})
            })
    }
})

// Delete
route.delete('/status/delete', (req,res,next) => {
    Status.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            res.status(200).json({message: 'Status Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route