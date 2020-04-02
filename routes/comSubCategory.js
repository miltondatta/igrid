const express = require('express')
const ComSubCategory = require('../models/comsubcategory')

const route = express.Router()

// Read
route.get('/com-sub-category', (req,res,next) => {
    ComSubCategory.findAll({attributes: ['id', 'sub_complaint_name','complain_id']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Read
route.get('/com-sub-category-options', (req,res,next) => {
    ComSubCategory.findAll({attributes: ['id', 'sub_complaint_name', 'complain_id']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/com-sub-category/update/:id', (req,res,next) => {
    const {category_name,category_code,description} = req.body
    if(category_name !== '' && category_code !== '' && description !== '') {
        ComSubCategory.findAll({where: {id: req.params.id}})
            .then(resData => {
                if(resData[0].dataValues.category_code === category_code) {
                    ComSubCategory.update({category_name,category_code,description}, {where: {id: req.params.id}})
                        .then(resData => {
                            res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
                        })
                        .catch(err => {
                            res.status(200).json({message: 'Something went wrong'})
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
route.post('/com-sub-category/entry', (req,res,next) => {
    const {sub_complaint_name,complain_id,status} = req.body
    if(sub_complaint_name !== '' || complain_id !== '') {
        ComSubCategory.create(req.body)
            .then(resData => {
                res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
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
route.delete('/com-sub-category/delete', (req,res,next) => {
    ComSubCategory.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {

            res.status(200).json({message: 'ComSubCategory Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route