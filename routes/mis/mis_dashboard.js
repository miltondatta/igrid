const db = require('../../config/db')
const express = require('express')

const route = express.Router()

route.get('/mis-dashboard/info', async (req,res, nexy) => {
    try{
        const [rolesData, rolesMetadata] = await db.query(`
        SELECT user_roles.role_name, user_roles.id, COUNT(user_associate_roles.role_id) cnt FROM user_associate_roles
            JOIN user_roles on user_associate_roles.role_id = user_roles.id
            GROUP BY user_roles.role_name, user_roles.id
            ORDER BY user_roles.id
    `)
        const [locationData, locationMetadata] = await db.query(`
        SELECT location_hierarchies.hierarchy_name, location_hierarchies.id, COUNT(locations.hierarchy) cnt FROM location_hierarchies
            JOIN locations on locations.hierarchy = location_hierarchies.id
            GROUP BY location_hierarchies.hierarchy_name,  location_hierarchies.id
            ORDER BY location_hierarchies.id
    `)
        let payload = {
            roles: rolesData,
            locations: locationData
        }

        res.status(200).json({payload, status: true})
    }
    catch(err) {
        res.status(200).json({message: 'Something Went Wrong'})
    }
})

module.exports = route