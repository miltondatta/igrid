const fs = require('fs');
const multer = require('multer')
const express = require('express')
const Vendors = require('../models/asset/vendors')

const route = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/vendor')
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
route.get('/vendors', (req,res,next) => {
    Vendors.findAll({attributes: ['id', 'vendor_name', 'enlisted', 'description', 'file_name']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Create
route.post('/vendors/entry', (req,res,next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        const {vendor_name,description} = req.body
        const file_name = req.file.filename
        if (vendor_name === '' || file_name === '' || description === '') {
            res.status(200).json({message: 'All fields required!'})
        } else {
            let data = {vendor_name,description,file_name}
            Vendors.create(data)
                .then(resData => {
                    res.status(200).json(resData)
                })
                .catch(err => {
                    console.log(err)
                    res.status(404).json({message: 'Something went wrong', err})
                })
        }
    })
})

// Update
route.put('/vendors/update/:id', (req,res,next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        Vendors.findAll({where: {id: req.params.id}})
            .then(data => {
                console.log(data[0].dataValues.file_name, 75)
                if (fs.existsSync('public/vendor/' + data[0].dataValues.file_name)) {
                    fs.unlink('public/vendor/' + data[0].dataValues.file_name, (err) => {
                        if (err) throw err;
                        console.log('successfully deleted /tmp/hello');
                    });
                }
                const {vendor_name, enlisted, description} = req.body
                const file_name = req.file.filename
                Vendors.update({vendor_name, enlisted, description, file_name}, {where: {id: req.params.id}})
                    .then(resData => {
                        res.status(200).json(resData)
                    })
                    .catch(err => {
                        res.status(404).json({message: 'Something went wrong'})
                    })
            })
    })
})

// Delete
route.delete('/vendors/delete', (req,res,next) => {
    Vendors.findAll({where: {id: req.body.id}})
        .then(data => {
            if (fs.existsSync('public/vendor/' + data[0].dataValues.file_name)) {
                fs.unlink('public/vendor/' + data[0].dataValues.file_name, (err) => {
                    if (err) throw err;
                    console.log('successfully deleted /tmp/hello');
                });
            }
            Vendors.destroy({
                where: {
                    id: req.body.id
                }
            })
                .then(resData => {

                    res.status(200).json({message: 'Vendors Has Been Deleted'})
                })
                .catch(err => {
                    console.log(err)
                    res.status(404).json({message: 'Something went wrong', err})
                })
        })
})

module.exports = route