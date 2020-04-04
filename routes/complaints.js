const db = require('../config/db')
const express = require('express')
const Complaints = require('../models/complaints')

const route = express.Router()

// Read
route.get('/complaints/:id', async (req,res,next) => {
    const [data, metaData] = await db.query(`
        SELECT complaints.id, "comCategories".complaint_name, "comSubCategories".sub_complaint_name, "complaints"."status", "complaints"."solutionDetails" as solution FROM complaints
            JOIN "comCategories" ON "comCategories".id = complaints.complaint_category
            JOIN "comSubCategories" ON "comSubCategories".id = complaints.complaint_sub_category
            WHERE complaints."createdBy" = ${req.params.id}
    `)
    if (data.length > 0) {
        res.status(200).json(data)
    } else {
        res.status(200).json({})
    }
});

// Read
route.get('/complaints/list', async (req,res,next) => {
    const [data, metaData] = await db.query(`
        SELECT complaints.id, CONCAT(users."firstName", ' ', users."lastName") as username, "comCategories".complaint_name, "comSubCategories".sub_complaint_name,
               complaints."problemDetails" as problemDetails,"complaints"."solutionDetails" as solution FROM complaints
                 JOIN "comCategories" ON "comCategories".id = complaints.complaint_category
                 JOIN "comSubCategories" ON "comSubCategories".id = complaints.complaint_sub_category
                 JOIN users ON users.id = complaints."createdBy"
    `)
    if (data.length > 0) {
        res.status(200).json(data)
    } else {
        res.status(200).json({message: 'No Data Available'})
    }
})

// Read
route.get('/complaints-options', (req,res,next) => {
    Complaints.findAll({attributes: ['id', 'complaint_name']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/complaints/update/:id', (req,res,next) => {
    const {solutionDetails, status} = req.body
    if(solutionDetails) {
        Complaints.update({solutionDetails, status}, {where: {id: req.params.id}})
            .then(resData => {
                res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
            })
            .catch(err => {
                console.log(err)
                res.status(200).json({message: 'Something went wrong'})
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Create
route.post('/complaints/entry', (req,res,next) => {
    console.log(req.body, 44 )
    const {complaint_name, status} = req.body
    if(complaint_name !== '') {
        Complaints.create(req.body)
            .then(resData => {
                res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
            })
            .catch(err => {
                console.log(err)
                res.status(200).json({message: 'Something went wrong', err})
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Delete
route.delete('/complaints/delete', (req,res,next) => {
    Complaints.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {

            res.status(200).json({message: 'Complaints Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route