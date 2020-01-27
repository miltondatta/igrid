const express = require('express')
const AssetSubCategory = require('../models/asset/assetSubCategory')

const route = express.Router()

// Read
route.get('/asset-sub-category', (req,res,next) => {
    AssetSubCategory.findAll({attributes: ['id', 'sub_category_name', 'category_id','sub_category_code','description']})
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
    if (category_id !== '' && sub_category_name !== '' && sub_category_code !== '' && description !== '') {
        AssetSubCategory.findAll({where: {id: req.params.id}})
            .then(resData => {
                if (resData[0].dataValues.sub_category_code === sub_category_code) {
                    AssetSubCategory.update({category_id,sub_category_name,sub_category_code,description}, {where: {id: req.params.id}})
                        .then(resData => {
                            res.status(200).json(resData)
                        })
                        .catch(err => {
                            res.status(404).json({message: 'Something went wrong'})
                        })
                } else {
                    res.status(200).json({message: 'Sub Category Code Exist'})
                }
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Create
route.post('/asset-sub-category/entry', (req,res,next) => {
    const {category_id,sub_category_name,sub_category_code,description} = req.body
    if (category_id !== '' && sub_category_name !== '' && sub_category_code !== '' && description !== '') {
        AssetSubCategory.findAll({where: {sub_category_code}})
            .then(resData => {
                console.log(resData.length, 46)
                if (resData.length === 0) {
                    AssetSubCategory.create(req.body)
                        .then(resData => {
                            res.status(200).json(resData)
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(404).json({message: 'Something went wrong', err})
                        })
                }  else {
                    res.status(200).json({message: 'Sub Category Code Exist'})
                }
            })
    }  else {
        res.status(200).json({message: 'All fields required!'})
    }
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