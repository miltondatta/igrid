const db = require('../config/db')
const express = require('express')
const ComSubCategory = require('../models/comsubcategory')

const route = express.Router()

// Read
route.get('/com-sub-category', async (req,res,next) => {
    try {
        const [data, metaData] = await db.query(`
        select "comSubCategories".id, sub_complaint_name, complain_id, "comCategories".complaint_name as complaint from "comSubCategories"
            join "comCategories" on "comSubCategories".complain_id = "comCategories".id
    `)
        if (data.length > 0) {
            res.status(200).json(data)
        } else {
            res.status(200).json({message: 'No Data Available'})
        }
    }
    catch (err) {
        console.log(err, 21)
        res.status(200).json({message: 'Something Went Wrong', err})
    }
})

// Read
route.get('/com-sub-category-options', (req,res,next) => {
    ComSubCategory.findAll({attributes: ['id', 'sub_complaint_name', 'complain_id']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/com-sub-category/update/:id', (req,res,next) => {
    const {sub_complaint_name,complain_id} = req.body
    if(sub_complaint_name !== '' && complain_id !== '') {
        ComSubCategory.update({sub_complaint_name,complain_id}, {where: {id: req.params.id}})
            .then(resData => {
                res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
            })
            .catch(err => {
                res.status(200).json({message: 'Something went wrong'})
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Create
route.post('/com-sub-category/entry', (req,res,next) => {
    const {sub_complaint_name,complain_id,status} = req.body
    if(sub_complaint_name !== '' || complain_id !== '') {
        ComSubCategory.create(req.body)
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
route.delete('/com-sub-category/delete', (req,res,next) => {
    ComSubCategory.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {

            res.status(200).json({message: 'ComSubCategory Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route