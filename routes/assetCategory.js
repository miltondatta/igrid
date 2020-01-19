const express = require('express')
const AssetCategory = require('../models/asset/assetCategory')

const route = express.Router()

// Read
route.get('/asset-category', (req,res,next) => {
    AssetCategory.findAll()
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/asset-category/update/:id', (req,res,next) => {
    const {categoy_name,category_code,description} = req.body
    AssetCategory.update({categoy_name,category_code,description}, {where: {id: req.params.id}})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something went wrong'})
        })
})

// Create
route.post('/asset-category/entry', (req,res,next) => {
    AssetCategory.create(req.body)
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

// Delete
route.delete('/asset-category/delete', (req,res,next) => {
    AssetCategory.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            console.log(resData)
            res.status(200).json({message: 'AssetCategory Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route