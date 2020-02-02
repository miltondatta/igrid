const express = require('express')
const AssetType = require('../models/asset/asset_types')

const route = express.Router()

// Read
route.get('/asset-types', (req,res,next) => {
    AssetType.findAll({attributes: ['id', 'type_name', 'asset_code', 'description']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/asset-types/update/:id', (req,res,next) => {
    const {type_name,asset_code,description} = req.body
    if(type_name !== '' && asset_code !== '' && description !== '') {
        AssetType.findAll({where: {id: req.params.id}})
            .then(resData => {
                if(resData[0].dataValues.asset_code === asset_code) {
                    AssetType.update({type_name,asset_code,description}, {where: {id: req.params.id}})
                        .then(resData => {
                            res.status(200).json(resData)
                        })
                        .catch(err => {
                            res.status(404).json({message: 'Something went wrong'})
                        })
                } else {
                    res.status(200).json({message: 'Asset Code Exist'})
                }
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Create
route.post('/asset-types/entry', (req,res,next) => {
    const {type_name,asset_code,description} = req.body
    if(type_name !== '' && asset_code !== '' && description !== '') {
        AssetType.findAll({where: {asset_code}})
            .then(resData => {
                if (resData.length === 0) {
                    AssetType.create(req.body)
                        .then(resData => {
                            res.status(200).json(resData)
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(404).json({message: 'Something went wrong', err})
                        })
                } else {
                    res.status(200).json({message: 'Asset Code Exist'})
                }
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Delete
route.delete('/asset-types/delete', (req,res,next) => {
    AssetType.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {

            res.status(200).json({message: 'AssetType Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route