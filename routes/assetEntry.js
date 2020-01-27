const multer = require('multer')
const express = require('express')
const Challan = require('../models/asset/challan')
const Assets = require('../models/asset/assets')

const route = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/asset')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
})
let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|doc|docx|pdf)$/)) {
            return cb(new Error('Only .png, .jpg, .jpeg, .doc, .docx, .pdf format allowed!'));

        }
        cb(null, true);
    }
}).single('file')

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

// Asset Entry
route.post('/asset-entry/challan/entry', (req,res,next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        const {challan_no, challan_name, challan_description, purchase_order_no, purchase_order_date, vendor_id, received_by, added_by, challanComments} = req.body
        let data = {
            attachment: req.file.filename,
            challan_no,
            challan_name,
            challan_description,
            purchase_order_no,
            purchase_order_date,
            vendor_id,
            received_by,
            added_by,
            comments: challanComments,
        }
        Challan.create(data)
            .then(resData => {
                res.status(200).json(resData.id)
            })
            .catch(err => {
                console.log(err)
                res.status(404).json({message: 'Something went wrong', err})
            })
    })
})

// Asset Entry
route.post('/asset-entry/entry', (req,res,next) => {
    req.body.map(item => {
        console.log(item, 73)
        Assets.create(item)
            .then(resData => {
                if (item.product_serial === '') {
                    Assets.update({product_serial: resData.id},{where: {id: resData.id}})
                        .then(upd => {
                            console.log('Successfully Updated Product Serial', 78)
                        })
                }
                res.status(200).json({message: 'Product Stored'})
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