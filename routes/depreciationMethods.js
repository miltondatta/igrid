const express = require('express')
const DepreciationMethods = require('../models/asset/depreciation_methods')

const route = express.Router()

// Read
route.get('/depreciation-methods', (req,res,next) => {
    DepreciationMethods.findAll({attributes: ['id', 'method_name', 'depreciation_code', 'description']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/depreciation-methods/update/:id', (req,res,next) => {
    const {method_name,depreciation_code,description} = req.body
    if (method_name !== '' && depreciation_code !== "" && description !== "") {
        DepreciationMethods.findAll({where: {id: req.params.id}})
            .then(resData => {
                if(resData[0].dataValues.depreciation_code === depreciation_code) {
                    DepreciationMethods.update({method_name, depreciation_code, description}, {where: {id: req.params.id}})
                        .then(resData => {
                            res.status(200).json(resData)
                        })
                        .catch(err => {
                            res.status(200).json({message: 'Something went wrong'})
                        })
                } else {
                    res.status(200).json({message: 'Method Code Exist'})
                }
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Create
route.post('/depreciation-methods/entry', (req,res,next) => {
    const {method_name,depreciation_code,description} = req.body
    if (method_name !== '' && depreciation_code !== "" && description !== "") {
        DepreciationMethods.findAll({where: {depreciation_code}})
            .then(resData => {
                if (resData.length === 0) {
                    DepreciationMethods.create(req.body)
                        .then(resData => {
                            res.status(200).json(resData)
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(200).json({message: 'Something went wrong', err})
                        })
                } else {
                    res.status(200).json({message: 'Method Code Exist'})
                }
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Delete
route.delete('/depreciation-methods/delete', (req,res,next) => {
    DepreciationMethods.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {

            res.status(200).json({message: 'DepreciationMethods Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route