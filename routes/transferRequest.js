const express = require('express')
const { Op } = require("sequelize");
const TransferRequest = require('../models/transferrequest')

const route = express.Router()

// Read
route.get('/transfer-request', (req,res,next) => {
    TransferRequest.findAll({attributes: ['id', 'status_name'], where: {id: {[Op.ne]: 3}}})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/transfer-request/update/:id', (req,res,next) => {
    const {status_name} = req.body
    if(status_name === '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        TransferRequest.update({status_name}, {where: {id: req.params.id}})
            .then(resData => {
                res.status(200).json(resData)
            })
            .catch(err => {
                res.status(200).json({message: 'Something went wrong'})
            })
    }
})

// Create
route.post('/transfer-request/entry', (req,res,next) => {
    console.log(req.body, 37)
    if (req.body.length > 0) {
        req.body.forEach(item => {
            const {details, request_from, request_to, category_id, sub_category_id} = item
            if(details === '' || request_from === '' || request_to === '' || category_id === '' || sub_category_id === '') {
                res.status(200).json({message: 'All fields required!'})
            } else {
                TransferRequest.create(item)
                    .then(resData => {
                        res.status(200).json({message: 'Request Sent Successfully!', status: true})
                    })
                    .catch(err => {
                        console.log(err, 48)
                        res.status(200).json({message: 'Something went wrong', err})
                    })
            }
        })
    }
})

// Delete
route.delete('/transfer-request/delete', (req,res,next) => {
    TransferRequest.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            res.status(200).json({message: 'TransferRequest Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route