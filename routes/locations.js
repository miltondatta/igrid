const db = require('../config/db')
const express = require('express')
const Locations = require('../models/locations')

const route = express.Router()

// Read
route.get('/locations', async (req,res,next) => {
    const [data, naster] = await db.query(`
        SELECT locations.id, locations.location_name, location_hierarchies.hierarchy_name, locations.location_code, locations.parent_id FROM locations
            JOIN location_hierarchies ON locations.hierarchy = location_hierarchies.id
    `)
    if(data.length > 0) {
        res.status(200).json(data)
    } else {
        res.status(200).json()
    }
})

// Read Specific Location
route.get('/locations/:id', (req,res,next) => {
    Locations.findAll({attributes: ['id', 'location_name', 'location_code','parent_id','hierarchy'], where: {parent_id: req.params.id}})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/locations/update/:id', (req,res,next) => {
    const {location_name,parent_id,location_code,hierarchy} = req.body
    if (parent_id !== '' && location_name !== '' && location_code !== '' && hierarchy !== '') {
        Locations.findAll({where: {id: req.params.id}})
            .then(resData => {
                if (resData[0].dataValues.location_code === location_code) {
                    Locations.update({parent_id,location_name,location_code,hierarchy}, {where: {id: req.params.id}})
                        .then(resData => {
                            res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
                        })
                        .catch(err => {
                            res.status(200).json({message: 'Something went wrong'})
                        })
                } else {
                    res.status(200).json({message: 'Sub Category Code Exist'})
                }
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Create
route.post('/locations/entry', (req,res,next) => {
    const {parent_id,location_name,location_code,hierarchy} = req.body
    if (location_name !== '' && location_code !== '' && hierarchy !== '') {
        Locations.findAll({where: {location_code}})
            .then(resData => {
                console.log(resData.length, 46)
                if (resData.length === 0) {
                    Locations.create(req.body)
                        .then(resData => {
                            res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(200).json({message: 'Something went wrong', err})
                        })
                }  else {
                    res.status(200).json({message: 'Sub Category Code Exist'})
                }
            })
    }  else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Delete
route.delete('/locations/delete', (req,res,next) => {
    Locations.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {

            res.status(200).json({message: 'Locations Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route