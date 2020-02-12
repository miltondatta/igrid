const db = require('../config/db')
const express = require('express')
const RequisitionApproves = require('../models/requisitionapprove')

const route = express.Router()

// Read
route.get('/requisition-approve', async (req,res,next) => {
    const [results, metadata] = await db.query(`
        SELECT requisition_approves.id, asset_categories.category_name, asset_sub_categories.sub_category_name,
               user_roles.role_name, locations.location_name,requisition_approves.update_quantity from requisition_approves
            JOIN requisition_details ON requisition_approves.requisition_details_id = requisition_details.id
            JOIN asset_categories ON requisition_details.asset_category = asset_categories.id
            JOIN asset_sub_categories ON requisition_details.asset_category = asset_sub_categories.id
            JOIN user_roles ON requisition_approves.role_id = user_roles.id
            JOIN locations ON requisition_approves.location_id = locations.id
        `)
    if (results.length > 0) {
        res.status(200).json(results)
    } else {
        res.status(200).json({message: "No Data Found"})
    }

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