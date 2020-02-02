const express = require('express')
const AssetCategory = require('../models/asset/assetCategory')

const route = express.Router()

// Read
route.get('/asset-category', (req,res,next) => {
    AssetCategory.findAll({attributes: ['id', 'category_name','category_code','description']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/asset-category/update/:id', (req,res,next) => {
    const {category_name,category_code,description} = req.body
    if(category_name !== '' && category_code !== '' && description !== '') {
        AssetCategory.findAll({where: {id: req.params.id}})
            .then(resData => {
                if(resData[0].dataValues.category_code === category_code) {
                    AssetCategory.update({category_name,category_code,description}, {where: {id: req.params.id}})
                        .then(resData => {
                            res.status(200).json(resData)
                        })
                        .catch(err => {
                            res.status(404).json({message: 'Something went wrong'})
                        })
                } else {
                    res.status(200).json({message: 'Category Code Exist'})
                }
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Create
route.post('/asset-category/entry', (req,res,next) => {
    const {category_name,category_code,description} = req.body
    if(category_name !== '' && category_code !== '' && description !== '') {
        AssetCategory.findAll({where: {category_code}})
            .then(resData => {
                if(resData.length === 0) {
                    AssetCategory.create(req.body)
                        .then(resData => {
                            res.status(200).json(resData)
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(404).json({message: 'Something went wrong', err})
                        })
                } else {
                    res.status(200).json({message: 'Category Code Exist'})
                }
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Delete
route.delete('/asset-category/delete', (req,res,next) => {
    AssetCategory.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {

            res.status(200).json({message: 'AssetCategory Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route