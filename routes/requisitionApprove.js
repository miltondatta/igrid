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
route.get('/requisition-approve/specific', async (req,res,next) => {
    let requisition_id = req.query.requisition_id;
    let role_id = req.query.role_id;
    let user_id = req.query.id;
    let location_id = req.query.location_id;

    const [results, metadata] = await db.query(`
        SELECT requisition_approves.id, CONCAT(users."firstName", ' ', users."lastName") as username, requisition_details.brand, 
               requisition_details.model, requisition_approves.requisition_id, requisition_masters.requisition_no, 
               requisition_approves.requisition_details_id,requisition_approves.role_id, requisition_approves.status,
               requisition_approves.location_id, requisition_details.asset_sub_category, requisition_details.asset_category, 
               asset_categories.category_name, asset_sub_categories.sub_category_name, user_roles.role_name, locations.location_name,
               requisition_approves.update_quantity, requisition_masters.request_by as delivery_to from requisition_approves
            JOIN requisition_details ON requisition_approves.requisition_details_id = requisition_details.id
            JOIN requisition_masters ON requisition_approves.requisition_id = requisition_masters.id
            JOIN asset_categories ON requisition_details.asset_category = asset_categories.id
            JOIN asset_sub_categories ON requisition_details.asset_category = asset_sub_categories.id
            JOIN user_roles ON requisition_approves.role_id = user_roles.id
            JOIN users ON requisition_masters.request_by = users.id
            JOIN locations ON requisition_approves.location_id = locations.id
            WHERE requisition_approves.requisition_id = ${requisition_id} AND requisition_approves.role_id = '${role_id}' AND requisition_approves.update_by = '${user_id}' AND requisition_approves.delivery_to IS NULL
        `)
    if (results.length > 0) {
        res.status(200).json(results)
    } else {
        res.status(200).json({message: "No Data Found"})
    }

})

// Read
route.get('/requisition-approve/count-req/:id', async (req,res,next) => {
    const [results, metadata] = await db.query(`
        SELECT * FROM requisition_approves
              JOIN requisition_masters ON requisition_masters.id = requisition_approves.requisition_id
                WHERE requisition_masters.request_by = ${req.params.id}
        `)
    if (results.length > 0) {
        res.status(200).json(results.length)
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

// Delivery Report
route.post('/requisition-approve/delivery/between', async (req,res,next) => {
    try{
        const {date_from, date_to, user_id} = req.body
        const [data, masterData] = await db.query(`
    SELECT requisition_approves.id, concat(requisition_details.brand, '_', requisition_details.model, '_' , asset_sub_categories.sub_category_name) as item_name,
     requisition_masters.delivery_date, requisition_approves.update_quantity as quantity,
      concat(users."firstName",' ',users."lastName") as delivery_to, user_roles.role_name as designation,
       locations.location_name as location, requisition_approves."createdAt" as date FROM requisition_approves
        JOIN requisition_details ON requisition_approves.requisition_details_id = requisition_details.id
        JOIN requisition_masters ON requisition_masters.id = requisition_approves.requisition_id
        JOIN users ON users.id = requisition_masters.request_by
        JOIN user_associate_roles ON users.id = user_associate_roles.user_id
        JOIN asset_sub_categories ON asset_sub_categories.id = requisition_details.asset_sub_category
        JOIN user_roles ON user_roles.id = user_associate_roles.role_id
        JOIN locations ON locations.id = requisition_approves.location_id
             WHERE requisition_approves."createdAt" BETWEEN '${date_from}' AND '${date_to}' 
               AND requisition_approves.delivery_to IS NOT NULL 
               AND requisition_approves.update_by = ${user_id}
    `)

        if(data.length > 0) {
            res.status(200).json({data, status: true})
        } else {
            res.status(200).json({message: 'No Data Found'})
        }
    } catch(err) {
        console.log(err, 178)
    }
})

// Delivery Report For All User
route.post('/requisition-approve/delivery/all', async (req,res,next) => {
    try{
        const {date_from, date_to, location_id} = req.body
        const [data, masterData] = await db.query(`
                        SELECT concat(requisition_details.brand, '_', requisition_details.model, '_' , asset_sub_categories.sub_category_name) as item_name,
                               requisition_approves."createdAt" as delivery_date, requisition_approves.update_quantity as quantity,
                               concat(delivery_to."firstName",' ',delivery_to."lastName") as delivery_to, concat(delivered_by."firstName",' ',delivered_by."lastName") as delivered_by,
                               user_roles.role_name as receivers_designation,
                               locations.location_name as location FROM requisition_approves
                        JOIN requisition_details ON requisition_approves.requisition_details_id = requisition_details.id
                        JOIN requisition_masters ON requisition_masters.id = requisition_approves.requisition_id
                        JOIN users delivery_to ON delivery_to.id = requisition_approves.delivery_to
                        JOIN users delivered_by ON delivered_by.id = requisition_approves.update_by
                        JOIN user_associate_roles ON delivery_to.id = user_associate_roles.user_id
                        JOIN asset_sub_categories ON asset_sub_categories.id = requisition_details.asset_sub_category
                        JOIN user_roles ON user_roles.id = user_associate_roles.role_id
                        JOIN locations ON locations.id = requisition_approves.location_id
                    WHERE requisition_approves."createdAt" BETWEEN '${date_from}' AND '${date_to}' 
                      AND requisition_approves.delivery_to IS NOT NULL
                      AND requisition_approves.location_id = ${location_id}
    `)

        if(data.length > 0) {
            res.status(200).json({data, status: true})
        } else {
            res.status(200).json({message: 'No Data Found'})
        }
    } catch(err) {
        console.log(err, 178)
    }
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

// Get Logged User Requisition List
route.post('/my-requisition/by/credentials', async (req,res) =>   {
    try {
        const {user_id} = req.body;

        let queryText = '';
        if (user_id) queryText = 'and requisition_approves.update_by = ' + user_id;

        const [data, metaData] = await db.query(`select requisition_masters.id,
                                     requisition_masters.requisition_no,
                                     locations.location_name, 
                                     requisition_masters.request_date,
                                     user_roles.role_name,
                                     concat(users."firstName", ' ',  users."lastName") request_by
                                    from requisition_masters
                                             inner join requisition_approves on requisition_masters.id = requisition_approves.requisition_id
                                             inner join locations on requisition_masters.location_id = locations.id
                                             inner join user_roles on requisition_masters.role_id = user_roles.id
                                             inner join users on requisition_masters.request_by = users.id
                                    where requisition_approves.delivery_to is not null
                                      ${queryText}`);

        return res.status(200).json({resData: data});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
});


// Get Logged User Requisition Details List
route.post('/my-requisition-details/by/credentials', async (req,res) =>   {
    try {
        const {user_id} = req.body;

        let queryText = '';
        if (user_id) queryText = 'and requisition_approves.update_by = ' + user_id;

        const [data, metaData] = await db.query(`select
                    asset_categories.category_name,
                    asset_sub_categories.sub_category_name,
                    user_roles.role_name,
                    locations.location_name,
                    requisition_approves.update_quantity,
                    requisition_masters.requisition_no,
                    requisition_details.brand,
                    requisition_details.model
                from requisition_approves
                         inner join requisition_masters on requisition_approves.requisition_id = requisition_masters.id
                         inner join requisition_details on requisition_approves.requisition_details_id = requisition_details.id
                         inner join asset_categories on requisition_details.asset_category = asset_categories.id
                         inner join asset_sub_categories on requisition_details.asset_sub_category = asset_sub_categories.id
                         inner join users on requisition_approves.update_by = users.id
                         inner join user_roles on requisition_approves.role_id = user_roles.id
                         inner join locations on requisition_approves.location_id = locations.id
                where delivery_to is not null
                  ${queryText}`);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
});

// Get Logged User Delivery Received List
route.post('/my-received-requisition/by/credentials', async (req,res) =>   {
    try {
        const {user_id} = req.body;

        let queryText = '';
        if (user_id) queryText = 'where requisition_approves.delivery_to = ' + user_id;

        const [data, metadata] = await db.query(`select requisition_masters.id,
                                     requisition_masters.requisition_no,
                                     locations.location_name, 
                                     requisition_masters.request_date,
                                     user_roles.role_name,
                                     concat(users."firstName", ' ',  users."lastName") request_by
                                    from requisition_masters
                                             inner join requisition_approves on requisition_masters.id = requisition_approves.requisition_id
                                             inner join locations on requisition_masters.location_id = locations.id
                                             inner join user_roles on requisition_masters.role_id = user_roles.id
                                             inner join users on requisition_masters.request_by = users.id
                                      ${queryText}`);

        return res.status(200).json({resData: data});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
});

// Get Logged User Delivery Received Details List
route.post('/my-received-requisition-details/by/credentials', async (req,res) =>   {
    try {
        const {user_id} = req.body;

        let queryText = '';
        if (user_id) queryText = 'where requisition_approves.delivery_to = ' + user_id;

        const [data, metaData] = await db.query(`select
                                asset_categories.category_name,
                                asset_sub_categories.sub_category_name,
                                user_roles.role_name,
                                locations.location_name,
                                requisition_approves.update_quantity,
                                requisition_masters.requisition_no,
                                requisition_details.brand,
                                requisition_details.model
                            from requisition_approves
                                     inner join requisition_masters on requisition_approves.requisition_id = requisition_masters.id
                                     inner join requisition_details on requisition_approves.requisition_details_id = requisition_details.id
                                     inner join asset_categories on requisition_details.asset_category = asset_categories.id
                                     inner join asset_sub_categories on requisition_details.asset_sub_category = asset_sub_categories.id
                                     inner join users on requisition_approves.update_by = users.id
                                     inner join user_roles on requisition_approves.role_id = user_roles.id
                                     inner join locations on requisition_approves.location_id = locations.id
                              ${queryText}`);

        return res.status(200).json({resData: data});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
});


module.exports = route