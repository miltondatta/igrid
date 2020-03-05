const multer = require('multer')
const db = require('../config/db')
const express = require('express')
const RequisitionDetails = require('../models/requisitiondetails')

const route = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/requisition')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
})
let upload =  multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|doc|docx|pdf)$/)) {
            return cb(new Error('Only .png, .jpg, .jpeg, .doc, .docx, .pdf format allowed!'));

        }
        cb(null, true);
    }
}).single('file')


// Read
route.get('/requisition-details', async (req,res,next) => {
    let role_id         = req.query.role_id;
    let user_id         = req.query.id;
    let location_id     = req.query.location_id;

    //check if this role id exist in approval_levels table 
    //We can skip this step if we want
    const [approval_levels, approval_levels_meta] = await db.query(`
        SELECT * from approval_levels
            WHERE approval_levels.role_id = ${role_id}`);
    if(!approval_levels.length) {
        res.status(200).json({ message: "No Data Found" })
    }

    //If role id exist then check if this entry has child element or not
    //We can skip this step if we want
    let approval_level_id = approval_levels[0].id;
    const [approval_levels_parent, approval_levels_parent_meta] = await db.query(`
        SELECT * from approval_levels
            WHERE approval_levels.parent_id = ${approval_level_id}`);
    if(!approval_levels_parent.length) {
        res.status(200).json({ message: "No Data Found" })
    }

    //If this role has child element, then find all location under this location
    const [locations, locations_meta] = await db.query(`
    SELECT id from locations
        WHERE parent_id = '${location_id}'`);
    if(!locations.length) {
        res.status(200).json({ message: "No Data Found" })
    }
    let location_ids = [];
    locations.forEach(item => {
        location_ids.push(item.id);
    });
    location_ids    =   location_ids.join(",");
    console.log(location_ids);

    //Get update/approve requistion by child user to display for this user 
    let child_approve_reqId = []
    if (location_ids) {
        const [resultsChildMain, metadataChildMain] = await db.query(`
            SELECT requisition_approves.requisition_details_id from requisition_approves
                WHERE location_id IN (${location_ids})  
        `)
        resultsChildMain.length > 0 && resultsChildMain.forEach(item => {
            child_approve_reqId.push(item.requisition_details_id)
        });
    }
    console.log(child_approve_reqId);

    //Get new created requistion by child user to display for this user 
    let child_created_reqId = []
    if (location_ids) {
        const [resultsChildCreated, metadataChildCreated] = await db.query(`
        SELECT requisition_details.id AS requisition_details_id FROM requisition_masters JOIN requisition_details ON requisition_masters.id = requisition_details.requisition_id
         WHERE requisition_masters.location_id IN (${location_ids}) 
        `);
        resultsChildCreated.length > 0 && resultsChildCreated.forEach(item => {
            child_created_reqId.push(item.requisition_details_id)
        });
    }
    console.log(child_created_reqId);

     //Get update requistion by login user to subtract those request 
     let updated_reqId = []
     const [resultsMain, metadataMain] = await db.query(`
         SELECT requisition_approves.requisition_details_id from requisition_approves
             WHERE update_by = '${user_id}'  
     `)
     resultsMain.length > 0 && resultsMain.forEach(item => {
         updated_reqId.push(item.requisition_details_id)
     });
     console.log(updated_reqId);

    let pending_requisition_details_id =  [...child_approve_reqId, ...child_created_reqId];
    if(updated_reqId.length) {
        pending_requisition_details_id     =   pending_requisition_details_id.filter(item => !updated_reqId.includes(item));
    }
    console.log(pending_requisition_details_id);   

    let results = [];
    if (pending_requisition_details_id.length) {
        pending_requisition_details_id = pending_requisition_details_id.join(",");
        const [results, metadata] = await db.query(`SELECT DISTINCT ON
        ( requisition_details.requisition_id ) requisition_details.id,
        concat(location_hierarchies.hierarchy_name, '-', locations.location_name) as location_name,
        Concat ( users."firstName", ' ', users."lastName" ) AS request_by,
        user_roles.role_name as role_name,
        requisition_masters.requisition_no,
        requisition_details.requisition_id 
    FROM
        requisition_details
        JOIN requisition_masters ON requisition_details.requisition_id = requisition_masters.id 
        JOIN users ON requisition_masters.request_by = users.id 
        JOIN user_roles ON user_roles.id = requisition_masters.role_id
        JOIN locations ON requisition_masters.location_id = locations.id
        JOIN location_hierarchies ON location_hierarchies.id = locations.hierarchy
    WHERE requisition_details.id IN (${pending_requisition_details_id})
                    `);
        res.status(200).json(results)
    } else {
        res.status(200).json({ message: "No Data Found" })
    }    
    
})

// Read
route.get('/requisition-details/delivery', async (req, res, next) => {
    let role_id = req.query.role_id;
    let user_id = req.query.id;
    let location_id = req.query.location_id;
    let reqId = [];

    const [results, metadata] = await db.query(`SELECT DISTINCT ON
        (requisition_approves.requisition_id) requisition_approves.requisition_details_id,
        concat(location_hierarchies.hierarchy_name, '-', locations.location_name) as location_name,
        Concat ( users."firstName", ' ', users."lastName" ) AS request_by,
        user_roles.role_name as role_name,
        requisition_masters.requisition_no,
        requisition_approves.requisition_id 
    FROM
        requisition_approves
        JOIN requisition_masters ON requisition_approves.requisition_id = requisition_masters.id 
        JOIN users ON requisition_masters.request_by = users.id 
        JOIN user_roles ON user_roles.id = requisition_masters.role_id
        JOIN locations ON requisition_masters.location_id = locations.id
        JOIN location_hierarchies ON location_hierarchies.id = locations.hierarchy
    WHERE requisition_approves.location_id = '${location_id}' AND requisition_approves.role_id = '${role_id}' AND requisition_approves.update_by = '${user_id}' AND requisition_approves.delivery_to IS NULL
                    `);

    if (results.length > 0) {
        res.status(200).json(results)
    } else {
        res.status(200).json({ message: "No Data Found" })
    }
});

// Read
route.get('/requisition-details/status/:id', async (req,res,next) => {
    const [data, master] = await db.query(`
        SELECT requisition_details.id, CONCAT(users."firstName", ' ', users."lastName") as checked_by, asset_categories.category_name, asset_sub_categories.sub_category_name, CONCAT('REQ_NO_', requisition_masters.requisition_no) as requisition_no,
               requisition_details.brand, requisition_details.model, requisition_approves.update_quantity, statuses.status_name FROM requisition_details 
        JOIN requisition_masters ON requisition_details.requisition_id = requisition_masters.id
        JOIN requisition_approves ON requisition_approves.requisition_id = requisition_masters.id
        JOIN users ON requisition_approves.update_by = users.id
        JOIN asset_categories ON requisition_details.asset_category = asset_categories.id
        JOIN asset_sub_categories ON requisition_details.asset_sub_category = asset_sub_categories.id
        JOIN statuses ON requisition_approves.status = statuses.id
        WHERE requisition_masters.id = ${req.params.id}
    `)
    if (data.length > 0) {
        res.status(200).json(data)
    } else {
        res.status(200).json()
    }
})

// Read
route.get('/requisition-details/details', async (req,res,next) => {
    const {id, requisition_id}= req.query;
    let reqId = []
    const [resultsMain, metadataMain] = await db.query(`
        SELECT requisition_approves.requisition_details_id from requisition_approves
            WHERE requisition_approves.delivery_to IS NOT NULL
    `)
    resultsMain.length > 0 && resultsMain.forEach(item => {
        reqId.push(item.requisition_details_id)
    })
    const [results, metadata] = await db.query(`
        SELECT requisition_details.id, asset_categories.category_name, asset_sub_categories.sub_category_name,requisition_details.brand, requisition_details.model,
               requisition_details.reason,requisition_details.quantity
        FROM requisition_details
                 Join requisition_masters ON requisition_details.requisition_id = requisition_masters.id
                 Join users ON requisition_masters.request_by = users.id
                 Join asset_categories ON requisition_details.asset_category = asset_categories.id
                 Join asset_sub_categories ON requisition_details.asset_sub_category = asset_sub_categories.id
                    WHERE requisition_details.requisition_id = ${requisition_id}`)

        let payLoad = results.filter(item => !reqId.includes(item.id))
        if (results.length > 0) {
            res.status(200).json(payLoad)
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
                res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
            })
            .catch(err => {
                res.status(200).json({message: 'Something went wrong'})
            })
    }
})

// Create
route.post('/requisition-details/entry', (req,res,next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        let response = []
        if (req.body.requisition_id === '' || req.body.asset_category === '' || req.body.asset_sub_category === '' || req.body.quantity === '' || req.body.reason === '') {
            res.status(200).json({message: 'All fields required!'})
        } else {
            RequisitionDetails.create({...req.body, file: req.file ? req.file.filename : null})
                .then(resData => {
                    response.push(res.status(200).json({resData, message: 'Data Saved Successfully', status: true}))
                })
                .catch(err => {
                    res.status(200).json({message: 'Something went wrong', err})
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
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route