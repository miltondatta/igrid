const express = require('express')
const AssetHistory = require('../models/asset/asset_history')

const route = express.Router()

// Read
route.get('/asset-history', (req,res,next) => {
    AssetHistory.findAll()
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/asset-history/update/:id', (req,res,next) => {
    const {asset_id, assign_to} = req.body
    AssetHistory.update({asset_id, assign_to}, {where: {id: req.params.id}})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something went wrong'})
        })
})

// Create
route.post('/asset-history/entry', (req,res,next) => {
    AssetHistory.create(req.body)
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

// Delete
route.delete('/asset-history/delete', (req,res,next) => {
    AssetHistory.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            console.log(resData)
            res.status(200).json({message: 'AssetHistory Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route