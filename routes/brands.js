const express = require('express')
const Brands = require('../models/asset/brands')

const route = express.Router()

// Read
route.get('/brands', (req,res,next) => {
    Brands.findAll()
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Create
route.post('/brands/entry', (req,res,next) => {
    Brands.create(req.body)
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

// Update
route.put('/brands/update/:id', (req,res,next) => {
    const {brand} = req.body
    Brands.update({
        brand
    }, {where: {id: req.params.id}})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something went wrong'})
        })

})

// Delete
route.delete('/brands/delete', (req,res,next) => {
    Brands.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            console.log(resData)
            res.status(200).json({message: 'Brands Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route