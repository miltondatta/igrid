const db = require('../config/db')
const express = require('express')
const AssetSubCategory = require('../models/asset/assetSubCategory')

const route = express.Router()


// Get Total Sub Assets
route.get('/total/asset-sub-category', (req,res,next) => {
    AssetSubCategory.count({
        distinct: true,
        col: 'sub_category_name'
    })
        .then(resData => {
            res.status(200).json({total: resData, status: true})
        })
        .catch(err => {
            console.log(err, 15)
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Read
route.get('/asset-sub-category', async (req,res,next) => {
    const [data, metaData] = await db.query(`
        SELECT asset_sub_categories.id, asset_categories.id as category_id, asset_sub_categories.sub_category_name, asset_categories.category_name, asset_sub_categories.sub_category_code, asset_sub_categories.description FROM asset_sub_categories
        JOIN asset_categories ON asset_categories.id = asset_sub_categories.category_id
    `)
    if (data.length > 0 ) {
        res.status(200).json(data)
    } else {
        res.status(200).json({message: 'Something Went Wrong'})
    }
})

// Read
route.get('/asset-sub-category/options', async (req,res,next) => {
    AssetSubCategory.findAll({attributes: ['id', 'sub_category_name', 'category_id','sub_category_code','description']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/asset-sub-category/update/:id', (req,res,next) => {
    const {category_id,sub_category_name,sub_category_code,description} = req.body
    if (category_id !== '' && sub_category_name !== '' && sub_category_code !== '') {
        AssetSubCategory.findAll({where: {id: req.params.id}})
            .then(resData => {
                if (resData[0].dataValues.sub_category_code === sub_category_code) {
                    AssetSubCategory.update({category_id,sub_category_name,sub_category_code,description}, {where: {id: req.params.id}})
                        .then(resData => {
                            res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
                        })
                        .catch(err => {
                            res.status(200).json({message: 'Something went wrong'})
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
    const {category_id,sub_category_name,sub_category_code} = req.body
    console.log(category_id, 73)
    if (category_id !== '' && sub_category_name !== '' && sub_category_code !== '') {
        AssetSubCategory.findAll({where: {sub_category_code}})
            .then(resData => {
                if (resData.length === 0) {
                    AssetSubCategory.create(req.body)
                        .then(resData => {
                            res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(200).json({message: 'Something went wrong', err})
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

            res.status(200).json({message: 'AssetSubCategory Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route