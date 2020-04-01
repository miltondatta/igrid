const express = require('express')
const ComCategory = require('../models/comcategory')

const route = express.Router()

// Read
route.get('/com-category', (req,res,next) => {
    ComCategory.findAll({attributes: ['id', 'complaint_name','status']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Read
route.get('/com-category-options', (req,res,next) => {
    ComCategory.findAll({attributes: ['id', 'complaint_name']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/com-category/update/:id', (req,res,next) => {
    const {category_name,category_code,description} = req.body
    if(category_name !== '' && category_code !== '') {
        ComCategory.findAll({where: {id: req.params.id}})
            .then(resData => {
                if(resData[0].dataValues.category_code === category_code) {
                    ComCategory.update({category_name,category_code,description}, {where: {id: req.params.id}})
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
route.post('/com-category/entry', (req,res,next) => {
    console.log(req.body, 44 )
    const {complaint_name, status} = req.body
    if(complaint_name !== '') {
        ComCategory.create(req.body)
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
route.delete('/com-category/delete', (req,res,next) => {
    ComCategory.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {

            res.status(200).json({message: 'ComCategory Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route