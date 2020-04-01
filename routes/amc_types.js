const multer = require('multer')
const db = require('../config/db')
const express = require('express')
const Amc_Types = require('../models/amc_types')

const route = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/amc-type')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
})
let upload =  multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|doc|docx|pdf|xlsx)$/)) {
            return cb(new Error('Only .png, .jpg, .jpeg, .doc, .docx, .pdf format allowed!'));

        }
        cb(null, true);
    }
}).single('file')

// Read
route.get('/amc_types/options', async (req,res,next) => {
    const [data, metaData] = await db.query(`
       SELECT id,type_name FROM amc_types
    `)
    if (data.length > 0) {
        res.status(200).json(data)
    } else {
        res.status(200).json()
    }
})

// Read
route.get('/amc_types', async (req,res,next) => {
    const [data, metaData] = await db.query(`
            SELECT id, type_name, description FROM amc_types
        `)
    if (data.length > 0) {
        res.status(200).json(data)
    } else {
        res.status(200).json()
    }
})

// Update
route.put('/amc_types/update/:id', (req,res,next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        const {type_name, description} = req.body
        if (type_name !== '') {
            Amc_Types.update({type_name, description}, {where: {id: req.params.id}})
                .then(resData => {
                    res.status(200).json({resData, message: 'Data Updated Successfully', status: true})
                })
                .catch(err => {
                    res.status(200).json({message: 'Something went wrong'})
                })
        } else {
            res.status(200).json({message: 'All fields required!'})
        }
    })
})

// Create
route.post('/amc_types/entry', (req,res,next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        const {type_name, description} = req.body
        if (type_name !== '') {
            Amc_Types.create({type_name, description})
                .then(resData => {
                    res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
                })
                .catch(err => {
                    res.status(200).json({message: 'Something went wrong', err})
                })
        } else {
            res.status(200).json({message: 'All fields required!'})
        }
    })
})

// Delete
route.delete('/amc_types/delete', (req,res,next) => {
    Amc_Types.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            res.status(200).json({message: 'Amc_Types Has Been Deleted', status: true})
        })
        .catch(err => {
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route