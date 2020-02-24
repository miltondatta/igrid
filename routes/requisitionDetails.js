const multer = require('multer')
const db = require('../config/db')
const express = require('express')
const RequisitionDetails = require('../models/requisitiondetails')

const route = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/requisition')
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
route.get('/requisition-details', async (req,res,next) => {
    let reqId = []
    const [resultsMain, metadataMain] = await db.query(`
        SELECT requisition_approves.requisition_details_id from requisition_approves
            WHERE requisition_approves.delivery_to IS NOT NULL
    `)
    resultsMain.length > 0 && resultsMain.forEach(item => {
        reqId.push(item.requisition_details_id)
    })
    const [results, metadata] = await db.query(`
        SELECT DISTINCT ON(requisition_details.requisition_id) requisition_details.id, Concat(users."firstName", ' ', users."lastName") as requestBy, requisition_details.requisition_id
            FROM requisition_details
                 Join requisition_masters ON requisition_details.requisition_id = requisition_masters.id
                 Join users ON requisition_masters.request_by = users.id`)

    let payLoad = results.filter(item => !reqId.includes(item.id))
        if (results.length > 0) {
            res.status(200).json(payLoad)
        } else {
            res.status(200).json({message: "No Data Found"})
        }
})

// Read
route.get('/requisition-details/status/:id', async (req,res,next) => {
    const [data, master] = await db.query(`
        SELECT * FROM requisition_details 
        JOIN requisition_masters ON requisition_details.requisition_id = requisition_masters.id
        JOIN requisition_approves ON requisition_approves.requisition_id = requisition_masters.id
        WHERE requisition_masters.request_by = ${req.params.id}
    `)
    RequisitionMaster.findAll({attributes: ['id', 'mobile', 'email', 'location_id', 'role_id', 'request_by', 'request_date', 'delivery_date', 'status', 'requisition_no']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Read
route.get('/requisition-details/details/:id', async (req,res,next) => {
    let reqId = []
    const [resultsMain, metadataMain] = await db.query(`
        SELECT requisition_approves.requisition_details_id from requisition_approves
            WHERE requisition_approves.delivery_to IS NOT NULL
    `)
    resultsMain.length > 0 && resultsMain.forEach(item => {
        reqId.push(item.requisition_details_id)
    })
    const [results, metadata] = await db.query(`
        SELECT requisition_details.id, asset_categories.category_name, asset_sub_categories.sub_category_name, requisition_details.quantity
        FROM requisition_details
                 Join requisition_masters ON requisition_details.requisition_id = requisition_masters.id
                 Join users ON requisition_masters.request_by = users.id
                 Join asset_categories ON requisition_details.asset_category = asset_categories.id
                 Join asset_sub_categories ON requisition_details.asset_sub_category = asset_sub_categories.id
                    WHERE requisition_details.requisition_id = ${req.params.id}`)

        let payLoad = results.filter(item => !reqId.includes(item.id))
        if (results.length > 0) {
            res.status(200).json(payLoad)
        } else {
            res.status(200).json({message: "No Data Found"})
        }
})

// Update
route.put('/requisition-details/update/:id', (req,res,next) => {
    const {requisition_id, asset_category, asset_sub_category, quantity} = req.body
    if(requisition_id !== '' || asset_category !== '' || asset_sub_category !== '' || quantity !== '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        RequisitionDetails.update({requisition_id, asset_category, asset_sub_category, quantity}, {where: {id: req.params.id}})
            .then(resData => {
                res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
            })
            .catch(err => {
                res.status(200).json({message: 'Something went wrong'})
            })
    }
})

// Create
route.post('/requisition-details/entry', (req,res,next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        let response = []
        if (req.body.requisition_id === '' || req.body.asset_category === '' || req.body.asset_sub_category === '' || req.body.quantity === '' || req.body.reason === '') {
            res.status(200).json({message: 'All fields required!'})
        } else {
            RequisitionDetails.create({...req.body, file: req.file ? req.file.filename : null})
                .then(resData => {
                    response.push(res.status(200).json({resData, message: 'Data Saved Successfully', status: true}))
                })
                .catch(err => {
                    res.status(200).json({message: 'Something went wrong', err})
                })
        }
    })
})

// Delete
route.delete('/requisition-details/delete', (req,res,next) => {
    RequisitionDetails.destroy({
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