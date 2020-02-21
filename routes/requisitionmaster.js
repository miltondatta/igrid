const express = require('express')
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

// Update
route.put('/requisition-master/update/:id', (req,res,next) => {
    const {mobile, email, location_id, role_id, request_by} = req.body
    if(mobile !== '' || email !== '' || location_id !== '' || role_id !== '' || request_by !== '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        RequisitionMaster.update({mobile, email, location_id, role_id, request_by, request_date, delivery_date, status, requisition_no}, {where: {id: req.params.id}})
            .then(resData => {
                res.status(200).json(resData)
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
                RequisitionMaster.update({requisition_no: resData.dataValues.id},{where: {id: resData.dataValues.id}})
                    .then(() => {
                        RequisitionMaster.findAll({attributes: ['id', 'mobile','email','request_date'],where: {id: resData.dataValues.id}})
                            .then(resData1 => {
                                res.status(200).json(resData1)
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