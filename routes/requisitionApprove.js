const db = require('../config/db')
const express = require('express')
const Assets = require('../models/asset/assets')
const AssetHistory = require('../models/asset/asset_history')
const RequisitionApproves = require('../models/requisitionapprove')

const route = express.Router()

// Read
route.get('/requisition-approve', async (req,res,next) => {
    let reqId = []
    const [resultsMain, metadataMain] = await db.query(`
        SELECT requisition_approves.id, requisition_approves.requisition_id from requisition_approves
               JOIN requisition_masters ON requisition_approves.requisition_id = requisition_masters.id
        WHERE requisition_approves.delivery_to IS NOT NULL
    `)
    resultsMain.length > 0 && resultsMain.forEach(item => {
        reqId.push(item.requisition_id)
    })
    const [results, metadata] = await db.query(`
        SELECT requisition_approves.id, requisition_approves.requisition_id, requisition_approves.requisition_details_id,requisition_approves.role_id, requisition_approves.status,
               requisition_approves.location_id, requisition_details.asset_sub_category, requisition_details.asset_category, asset_categories.category_name, asset_sub_categories.sub_category_name,
               user_roles.role_name, locations.location_name,requisition_approves.update_quantity, requisition_masters.request_by as delivery_to from requisition_approves
            JOIN requisition_details ON requisition_approves.requisition_details_id = requisition_details.id
            JOIN requisition_masters ON requisition_approves.requisition_id = requisition_masters.id
            JOIN asset_categories ON requisition_details.asset_category = asset_categories.id
            JOIN asset_sub_categories ON requisition_details.asset_category = asset_sub_categories.id
            JOIN user_roles ON requisition_approves.role_id = user_roles.id
            JOIN locations ON requisition_approves.location_id = locations.id
        `)
    let payLoad = results.filter(item => !reqId.includes(item.requisition_id))
    if (results.length > 0) {
        res.status(200).json(payLoad)
    } else {
        res.status(200).json({message: "No Data Found"})
    }

})

// Read
route.get('/requisition-approve/specific/:id', async (req,res,next) => {
    const [results, metadata] = await db.query(`
        SELECT requisition_approves.id, CONCAT(users."firstName", ' ', users."lastName") as username, requisition_details.brand, requisition_details.model, requisition_approves.requisition_id, requisition_masters.requisition_no, requisition_approves.requisition_details_id,requisition_approves.role_id, requisition_approves.status,
               requisition_approves.location_id, requisition_details.asset_sub_category, requisition_details.asset_category, asset_categories.category_name, asset_sub_categories.sub_category_name,
               user_roles.role_name, locations.location_name,requisition_approves.update_quantity, requisition_masters.request_by as delivery_to from requisition_approves
            JOIN requisition_details ON requisition_approves.requisition_details_id = requisition_details.id
            JOIN requisition_masters ON requisition_approves.requisition_id = requisition_masters.id
            JOIN asset_categories ON requisition_details.asset_category = asset_categories.id
            JOIN asset_sub_categories ON requisition_details.asset_category = asset_sub_categories.id
            JOIN user_roles ON requisition_approves.role_id = user_roles.id
            JOIN users ON requisition_masters.request_by = users.id
            JOIN locations ON requisition_approves.location_id = locations.id
            WHERE requisition_approves.requisition_id = ${req.params.id}
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
                res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
            })
            .catch(err => {
                res.status(200).json({message: 'Something went wrong'})
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
        } else {
            RequisitionApproves.create(item)
                .then(resData => {
                    res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
                })
                .catch(err => {
                    res.status(200).json({message: 'Something went wrong', err})
                })
        }
    })
})

// Create
route.post('/requisition-approve/delivery', (req,res,next) => {
    req.body.delivery.forEach(item => {
        if(item.requisition_id === '' || item.role_id === '' || item.location_id === '' || item.delivery_to === '' ||
            item.requisition_details_id === '' || item.update_quantity === '' || item.status === '') {
            res.status(200).json({message: 'All fields required!'})
            return null;
        } else {
            RequisitionApproves.create(item)
                .then(resData => {
                    res.status(200).json(resData)
                })
                .catch(err => {
                    res.status(200).json({message: 'Something went wrong', err})
                })
        }
    })
    req.body.products.forEach(item => {
        Assets.update({assign_to: item.assignTo}, {where: {id: item.assetId}})
            .then(resAssets => {
                AssetHistory.create({asset_id: item.assetId, assign_to: item.assignTo})
                    .then(resHistory => {
                    })
            })
            .catch(err => {
                console.log('Something Went Wrong',err)
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
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route