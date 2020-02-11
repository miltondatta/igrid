const express = require('express')
const RequisitionDetails = require('../models/requisitionapprove')

const route = express.Router()

// Read
route.get('/requisition-details', (req,res,next) => {
    RequisitionDetails.findAll({attributes: ['id', 'requisition_id']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/requisition-details/update/:id', (req,res,next) => {
    const {requisition_id} = req.body
    if(requisition_id !== '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        RequisitionDetails.update({requisition_id}, {where: {id: req.params.id}})
            .then(resData => {
                res.status(200).json(resData)
            })
            .catch(err => {
                res.status(404).json({message: 'Something went wrong'})
            })
    }
})

// Create
route.post('/requisition-details/entry', (req,res,next) => {
    const {requisition_id} = req.body
    if(requisition_id !== '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        RequisitionDetails.create(req.body)
            .then(resData => {
                res.status(200).json(resData)
            })
            .catch(err => {
                res.status(404).json({message: 'Something went wrong', err})
            })
    }
})

// Delete
route.delete('/requisition-details/delete', (req,res,next) =>   {
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
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route