const db = require('../config/db')
const express = require('express')
const RequisitionDetails = require('../models/requisitiondetails')

const route = express.Router()

// Read
route.get('/requisition-details', async (req,res,next) => {
    const [results, metadata] = await db.query(`
        SELECT "RequisitionDetails"."id", "Asset_categories"."category_name", "Asset_sub_categories"."sub_category_name", "RequisitionDetails"."quantity"
            FROM "RequisitionDetails"
                 Join "Asset_categories" ON "RequisitionDetails"."asset_category" = "Asset_categories"."id"
                 Join "Asset_sub_categories" ON "RequisitionDetails"."asset_sub_category" = "Asset_sub_categories"."id"`)

        if (results.length > 0) {
            res.status(200).json(results)
        } else {
            res.status(200).json({message: "No Data Found"})
        }
})

// Read
route.get('/requisition-details/details/:id', async (req,res,next) => {
    const [results, metadata] = await db.query(`
        SELECT "RequisitionDetails"."id", Concat("Users"."firstName", ' ', "Users"."lastName") as userName, "Asset_categories"."category_name", "Asset_sub_categories"."sub_category_name", "RequisitionDetails"."quantity", "RequisitionMasters"."email", "RequisitionMasters"."mobile"
        FROM "RequisitionDetails"
                 Join "RequisitionMasters" ON "RequisitionDetails"."requisition_id" = "RequisitionMasters"."id"
                 Join "Users" ON "RequisitionMasters"."request_by" = "Users"."id"
                 Join "Asset_categories" ON "RequisitionDetails"."asset_category" = "Asset_categories"."id"
                 Join "Asset_sub_categories" ON "RequisitionDetails"."asset_sub_category" = "Asset_sub_categories"."id"
                    WHERE "RequisitionDetails"."id" = ${req.params.id}`)

        if (results.length > 0) {
            res.status(200).json(results)
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
                res.status(200).json(resData)
            })
            .catch(err => {
                res.status(404).json({message: 'Something went wrong'})
            })
    }
})

// Create
route.post('/requisition-details/entry', (req,res,next) => {
        let response = []
        req.body.forEach(item => {
            if(item.requisition_id === '' || item.asset_category === '' || item.asset_sub_category === '' || item.quantity === '') {
                res.status(200).json({message: 'All fields required!'})
            } else {
                RequisitionDetails.create(item)
                    .then(resData => {
                        response.push(res.status(200).json(resData))
                    })
                    .catch(err => {
                        res.status(404).json({message: 'Something went wrong', err})
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
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route