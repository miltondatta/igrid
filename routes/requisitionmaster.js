const db = require('../config/db')
const express = require('express')
const {Op} = require("sequelize");
const RequisitionMaster = require('../models/requisitionmaster')

const route = express.Router()

// Read
route.get('/requisition-master', (req,res,next) => {
    RequisitionMaster.findAll({attributes: ['id', 'mobile', 'email', 'location_id', 'role_id', 'request_by', 'request_date', 'delivery_date', 'status', 'requisition_no']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Pending/In-progress/Closed Requisition
route.get('/requisition/total/:id', async (req,res,next) => {
    try{
        const [data, metaData] = await db.query(`
            Select (Select COUNT(id) from requisition_masters WHERE status = 0 and request_by = ${req.params.id}) as pending,
                (Select COUNT(id) from requisition_masters WHERE status = 2 and request_by = ${req.params.id}) as in_progress,
                (Select COUNT(id) from requisition_masters WHERE status = 3 and request_by = ${req.params.id}) as closed,
                (Select COUNT(id) from assets) as registered_assets,
                (Select COUNT(id) from products) as total_products,
                (Select Distinct COUNT(category_name) from asset_categories) as total_category,
                (Select Distinct COUNT(sub_category_name) from asset_sub_categories) as total_sub_category,
                (Select Distinct COUNT(id) from lost_assets where added_by = ${req.params.id}) as totalLostAssets,
                (select  Distinct COUNT(id) from assets where is_disposal is true and assign_to = ${req.params.id}) as totalDisposal,
                (select  Distinct COUNT(id) from asset_histories where status = 4 and assign_from = '${req.params.id}') as totalTransfer
            from asset_categories
        `)
            if (data.length > 0) {
                res.status(200).json({total: data, status: true})
            } else {
                res.status(200).json({message: 'No Data Found'})
            }
    }
    catch(err) {
        console.log(err, 41)
        res.status(200).json({message: 'Something Went Wrong', err})
    }
})

// My Requisition
route.get('/requisition-master/my-req/:id', async (req,res,next) => {
    const [data, metaData] = await db.query(`
        SELECT DISTINCT ON ( requisition_masters.id ) requisition_masters.id, requisition_masters.request_date, CONCAT(users."firstName", ' ', users."lastName") as userName, locations.location_name, requisition_masters.requisition_no FROM requisition_masters
            JOIN users ON users.id = requisition_masters.request_by
            JOIN locations ON locations.id = requisition_masters.location_id
            JOIN requisition_details ON requisition_masters.id = requisition_details.requisition_id
            WHERE requisition_masters.request_by = ${req.params.id}
    `)
    if (data.length > 0) {
        res.status(200).json(data)
    } else {
        res.status(200).json()
    }
})

// Update
route.put('/requisition-master/update/:id', (req,res,next) => {
    const {mobile, email, location_id, role_id, request_by} = req.body
    if(mobile !== '' || email !== '' || location_id !== '' || role_id !== '' || request_by !== '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        RequisitionMaster.update({mobile, email, location_id, role_id, request_by, request_date, delivery_date, status, requisition_no}, {where: {id: req.params.id}})
            .then(resData => {
                res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
            })
            .catch(err => {
                res.status(200).json({message: 'Something went wrong'})
            })
    }
})

// Create
route.post('/requisition-master/entry', (req,res,next) => {
    const {mobile, email, location_id, role_id, request_by} = req.body
    const sendData = {
        mobile,
        email,
        location_id,
        role_id,
        request_by,
        requisition_no: null,
        delivery_date: null,
        status: 0,
        request_date: new Date().toLocaleDateString(),
    }
    if(mobile === '' || email === '' || location_id === '' || role_id === '' || request_by === '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        RequisitionMaster.create(sendData)
            .then(resData => {
                console.log(resData.dataValues.id, 52)
                RequisitionMaster.update({requisition_no: 'Req-' + resData.dataValues.id},{where: {id: resData.dataValues.id}})
                    .then(() => {
                        RequisitionMaster.findAll({attributes: ['id', 'mobile','email','request_date'],where: {id: resData.dataValues.id}})
                            .then(resData1 => {
                                res.status(200).json({resData1, message: 'Data Saved Successfully', status: true})
                            })
                            .catch(err => {
                                res.status(200).json({message: 'Something Went Wrong', err})
                            })
                    })
            })
            .catch(err => {
                res.status(200).json({message: 'Something went wrong', err})
            })
    }
})

// Delete
route.delete('/requisition-master/delete', (req,res,next) => {
    RequisitionMaster.destroy({
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