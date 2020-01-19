const express = require('express')
const Vendors = require('../models/asset/vendors')

const route = express.Router()

// Read
route.get('/vendors', (req,res,next) => {
    Vendors.findAll()
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Create
route.post('/vendors/entry', (req,res,next) => {
    Vendors.create(req.body)
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

// Update
route.put('/vendors/update/:id', (req,res,next) => {
    const {vendor_name,enlisted,description,file_name} = req.body
    Vendors.update({vendor_name,enlisted,description,file_name}, {where: {id: req.params.id}})
          .then(resData => {
            res.status(200).json(resData)
        })
          .catch(err => {
            res.status(404).json({message: 'Something went wrong'})
        })

})

// Delete
route.delete('/vendors/delete', (req,res,next) => {
    Vendors.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            console.log(resData)
            res.status(200).json({message: 'Vendors Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route