const express = require('express')
const RequisitionApproves = require('../models/requisitionapprove')

const route = express.Router()

// Read
route.get('/requisition-approve', (req,res,next) => {
    RequisitionApproves.findAll({attributes: ['id', 'requisition_id']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/requisition-approve/update/:id', (req,res,next) => {
    const {requisition_id} = req.body
    if(requisition_id !== '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        RequisitionApproves.update({requisition_id}, {where: {id: req.params.id}})
            .then(resData => {
                res.status(200).json(resData)
            })
            .catch(err => {
                res.status(404).json({message: 'Something went wrong'})
            })
    }
})

// Create
route.post('/requisition-approve/entry', (req,res,next) => {
    req.body.forEach(item => {
        if(item.requisition_id === '' || item.role_id === '' || item.location_id === '' || item.delivery_to === '' ||
            item.requisition_details_id === '' || item.update_quantity === '' || item.status === '') {
            res.status(200).json({message: 'All fields required!'})
            return null;
        }
    })
    req.body.forEach(item => {
        RequisitionApproves.create(item)
            .then(resData => {
                res.status(200).json(resData)
            })
            .catch(err => {
                res.status(404).json({message: 'Something went wrong', err})
            })
    })
})

// Delete
route.delete('/requisition-approve/delete', (req,res,next) =>   {
    RequisitionApproves.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            res.status(200).json({message: 'Requisition Master Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route