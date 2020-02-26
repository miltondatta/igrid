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

    /*
    let role_id         = req.query.role_id;
    let user_id         = req.query.id;

    //check if this role id exist in approval_levels table 
    const [approval_levels, approval_levels_meta] = await db.query(`
        SELECT * from approval_levels
            WHERE approval_levels.role_id = ${role_id}`);
    if(!approval_levels.length) {
        res.status(200).json({ message: "No Data Found" })
    }

    //If role id exist then check if this entry has child element or not
    let approval_level_id = approval_levels[0].id;
    const [approval_levels_parent, approval_levels_parent_meta] = await db.query(`
        SELECT * from approval_levels
            WHERE approval_levels.parent_id = ${approval_level_id}`);
    if(!approval_levels_parent.length) {
        res.status(200).json({ message: "No Data Found" })
    }

    //If this role has child element then find all location under this location

    
    return res.status(200).json({message: "check data pattern"});   */



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
route.get('/requisition-details/delivery', async (req,res,next) => {
    let reqId = []
    const [resultsMain, metadataMain] = await db.query(`
        SELECT requisition_approves.requisition_details_id from requisition_approves
            WHERE requisition_approves.delivery_to IS NULL
    `)
    resultsMain.length > 0 && resultsMain.forEach(item => {
        reqId.push(item.requisition_details_id)
    })
    console.log(resultsMain, 63)
    const [results, metadata] = await db.query(`
        SELECT DISTINCT ON(requisition_details.requisition_id) requisition_details.id, Concat(users."firstName", ' ', users."lastName") as requestBy, requisition_details.requisition_id
            FROM requisition_details
                 Join requisition_masters ON requisition_details.requisition_id = requisition_masters.id
                 Join users ON requisition_masters.request_by = users.id`)

    let payLoad = results.filter(item => reqId.includes(item.id))
        if (results.length > 0) {
            res.status(200).json(payLoad)
        } else {
            res.status(200).json({message: "No Data Found"})
        }
})

// Read
route.get('/requisition-details/status/:id', async (req,res,next) => {
    const [data, master] = await db.query(`
        SELECT requisition_details.id, asset_categories.category_name, asset_sub_categories.sub_category_name, CONCAT('REQ_NO_', requisition_masters.requisition_no) as requisition_no,
               requisition_details.brand, requisition_details.model, requisition_approves.update_quantity, statuses.status_name FROM requisition_details 
        JOIN requisition_masters ON requisition_details.requisition_id = requisition_masters.id
        JOIN requisition_approves ON requisition_approves.requisition_id = requisition_masters.id
        JOIN asset_categories ON requisition_details.asset_category = asset_categories.id
        JOIN asset_sub_categories ON requisition_details.asset_sub_category = asset_sub_categories.id
        JOIN statuses ON requisition_approves.status = statuses.id
        WHERE requisition_masters.request_by = ${req.params.id}
    `)
    if (data.length > 0) {
        res.status(200).json(data)
    } else {
        res.status(200).json()
    }
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