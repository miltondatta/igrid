const express = require('express')
const DepreciationMethods = require('../models/asset/depreciation_methods')

const route = express.Router()

// Read
route.get('/depreciation-methods', (req,res,next) => {
    DepreciationMethods.findAll()
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/depreciation-methods/update/:id', (req,res,next) => {
    const {method_name,depreciation_code,description} = req.body
    DepreciationMethods.update({method_name,depreciation_code,description}, {where: {id: req.params.id}})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something went wrong'})
        })
})

// Create
route.post('/depreciation-methods/entry', (req,res,next) => {
    DepreciationMethods.create(req.body)
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

// Delete
route.delete('/depreciation-methods/delete', (req,res,next) => {
    DepreciationMethods.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            console.log(resData)
            res.status(200).json({message: 'DepreciationMethods Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route