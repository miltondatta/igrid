const express = require('express')
const AssetSubCategory = require('../models/asset/assetSubCategory')

const route = express.Router()

// Read
route.get('/asset-sub-category', (req,res,next) => {
    AssetSubCategory.findAll()
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/asset-sub-category/update/:id', (req,res,next) => {
    const {category_id,sub_category_name,sub_category_code,description} = req.body
    AssetSubCategory.update({category_id,sub_category_name,sub_category_code,description}, {where: {id: req.params.id}})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something went wrong'})
        })
})

// Create
route.post('/asset-sub-category/entry', (req,res,next) => {
    AssetSubCategory.create(req.body)
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

// Delete
route.delete('/asset-sub-category/delete', (req,res,next) => {
    AssetSubCategory.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            console.log(resData)
            res.status(200).json({message: 'AssetSubCategory Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route