const fs = require('fs');
const multer = require('multer')
const express = require('express')
const Modules = require('../models/modules')

const route = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/modules')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
})
let upload =  multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|doc|docx|pdf)$/)) {
            return cb(new Error('Only .png, .jpg, .jpeg, .doc, .docx, .pdf format allowed!'));

        }
        cb(null, true);
    }
}).single('file')

// Read
route.get('/modules', (req,res,next) => {
    Modules.findAll({attributes: ['id', 'module_name', 'initial_link']})
        .then(resData => {
            console.log(resData, 31)
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/modules/update/:id', (req,res,next) => {
    upload(req, res , () => {
        const {module_name, initial_link, order_by} = req.body
        const image_name = req.file ? req.file.filename : req.body.image_name
        if (module_name === '' || image_name === '' || initial_link === '' || order_by === '') {
            res.status(200).json({message: 'All fields required!'})
        } else {
            Modules.findAll({where: {id: req.params.id}})
                .then(data => {
                    console.log(data, 48)
                    if (fs.existsSync('public/modules/' + data[0].dataValues.image_name)) {
                        if (data[0].dataValues.image_name === (req.file && req.file.filename)) {
                            fs.unlink('public/modules/' + data[0].dataValues.image_name, (err) => {
                                if (err) throw err;
                                console.log('successfully deleted /tmp/hello');
                            });
                        }
                    }

                    Modules.update({module_name, image_name, initial_link, order_by}, {where: {id: req.params.id}})
                        .then(resData => {
                            res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
                        })
                        .catch(err => {
                            res.status(200).json({message: 'Something went wrong'})
                        })
                })
        }
    })
})

// Create
route.post('/modules/entry', (req,res,next) => {
    upload(req, res , () => {
        const {module_name, initial_link, order_by} = req.body
        const image_name = req.file.filename
        if(module_name === '' || image_name === '' || initial_link === '' || order_by === '') {
            res.status(200).json({message: 'All fields required!'})
        } else {
            Modules.create({module_name, initial_link, order_by, image_name})
                .then(resData => {
                    res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
                })
                .catch(err => {
                    res.status(200).json({message: 'Something went wrong', err})
                })
        }
    })
})

// Delete
route.delete('/modules/delete', (req,res,next) => {
    Modules.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            res.status(200).json({message: 'Requisition Master Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route