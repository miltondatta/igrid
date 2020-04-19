const db = require('../config/db')
const express = require('express')
const { Op } = require("sequelize");
const TransferRequest = require('../models/transferrequest')

const route = express.Router()

// Read
route.get('/transfer-request/:id', async (req,res,next) => {
    try{
        const [data, mestaData] = await db.query(`
        select transfer_requests.id, req_from.id as req_user_id, CONCAT(req_from."firstName" , ' ' ,req_from."lastName") as request_from, asset_categories.category_name as category, asset_sub_categories.sub_category_name as sub_category, transfer_requests.details, transfer_requests.quantity,
               transfer_requests.category_id, sub_category_id
        from transfer_requests
        JOIN users as req_from on transfer_requests.request_from = req_from.id
        JOIN asset_categories on transfer_requests.category_id = asset_categories.id
        JOIN asset_sub_categories on transfer_requests.sub_category_id = asset_sub_categories.id
        WHERE request_to = ${req.params.id} AND status = 6
    `)
        if (data.length > 0) {
            res.status(200).json({payload: data, status: true})
        } else {
            res.status(200).json()
        }
    } catch(err) {
        console.log(err, 22)
        res.status(200).json({message: 'Something Went Wrong!'})
    }
})

// Read
route.post('/transfer-request/unavailable/:id/:status', async (req,res,next) => {
    TransferRequest.update({status: req.params.status}, {where: {id: req.params.id}})
        .then(resData => {
            res.status(200).json({resData, message: 'Transfer Request Rejected', status: true})
        })
        .catch(err => {
            res.status(200).json({message: 'Something went wrong'})
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