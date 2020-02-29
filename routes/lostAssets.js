const db = require('../config/db')
const {Op} = require('sequelize')
const express = require('express')
const lost_asset = require('../models/lost_asset')

const route = express.Router()

// Read
// route.get('/locations', async (req,res,next) => {
//     const [data, naster] = await db.query(`
//         SELECT locations.id, locations.location_name, location_hierarchies.hierarchy_name, location_hierarchies.id as hierarchy, locations.location_code, locations.parent_id FROM locations
//             JOIN location_hierarchies ON locations.hierarchy = location_hierarchies.id
//     `)
//     if(data.length > 0) {
//         res.status(200).json(data)
//     } else {
//         res.status(200).json()
//     }
// })

// Create
route.post('/lost-assets/entry', (req,res,next) => {
    const {parent_id,asset_id,police_station,incident_time, gd_no, gd_date} = req.body
    if (asset_id !== '' && parent_id !== '' && incident_time !== '' && police_station !== '' && gd_no !== '' && gd_date !== '') {
        lost_asset.create(req.body)
            .then(resData => {
                res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
            })
            .catch(err => {
                console.log(err)
                res.status(200).json({message: 'Something went wrong', err})
            })
    }  else {
        res.status(200).json({message: 'All fields required!'})
    }
})

module.exports = route