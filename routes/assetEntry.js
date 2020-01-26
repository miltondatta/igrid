const multer = require('multer')
const express = require('express')
const Challan = require('../models/asset/challan')

const route = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
})
let upload = multer({ storage: storage }).single('file')

// Read
route.get('/asset-entry', (req,res,next) => {
    Challan.findAll()
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Create
route.post('/asset-entry/entry', (req,res,next) => {
    Challan.create(req.body)
        .then(resData => {
                res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

// Create
route.post('/asset-entry/file', (req,res,next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        Challan.create(req.body)
            .then(resData => {
                res.status(200).json(resData)
            })
            .catch(err => {
                console.log(err)
                res.status(404).json({message: 'Something went wrong', err})
            })
    })
})

// Delete
route.delete('/asset-entry/delete', (req,res,next) => {
    Challan.destroy({
        where: {
            id: req.body.id
        }
    })
    .then(resData => {
        console.log(resData)
        res.status(200).json({message: 'Challan Has Been Deleted'})
    })
    .catch(err => {
        console.log(err)
        res.status(404).json({message: 'Something went wrong', err})
    })
})

module.exports = route