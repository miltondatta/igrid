const db = require('../config/db')
const {Op} = require('sequelize')
const multer = require('multer')
const express = require('express')
const LostAsset = require('../models/lost_asset')
const LostAssetFeedback = require('../models/lost_asset_feedback')
const Location = require('../models/locations');

const route = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/lostAssets')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|doc|docx|pdf|xlsx)$/)) {
            return cb(new Error('Only .png, .jpg, .jpeg, .doc, .docx, .pdf, .xlsx format allowed!'));

        }
        cb(null, true);
    }
}).single('file')


// Get Lost Assets
route.get('/lost-assets', (req, res, next) => {
    LostAsset.findAll({attributes: ['id', 'incident_type', 'police_station', 'gd_no', 'gd_date', 'incident_date', 'incident_time']})
        .then(resData => {
            res.status(200).json({res: resData, status: true})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Get Lost Assets
route.get('/lost-asset/feedback/:id', async (req, res, next) => {
    const [data, metaData] = await db.query(`
        SELECT lost_assets.id, CONCAT(users."firstName", '_', users."lastName") as feedback_by, user_roles.role_name as designation, locations.location_name as location,
            lost_asset_feedbacks.feedback_details as feedback FROM lost_asset_feedbacks
            JOIN lost_assets ON lost_assets.id = lost_asset_feedbacks.lost_asset_id
            JOIN users ON lost_asset_feedbacks.feedback_by = users.id
            JOIN user_roles ON lost_assets.role_id = user_roles.id
            JOIN locations ON locations.id = lost_assets.location_id
            WHERE lost_asset_feedbacks.lost_asset_id = ${req.params.id}
    `)

    if (data.length > 0) {
        res.status(200).json({status: true, data})
    } else {
        res.status(200).json({message: 'No Data Found'})
    }
})

// Get Lost Assets Incident Type
route.post('/lost-assets/incident_type', (req, res, next) => {
    let {incident_type} = req.body
    if (incident_type.length >= 3) {
        LostAsset.findAll({
            attributes: ['incident_type'],
            group: ['incident_type']
        })
            .then(resData => {
                let output = resData.filter(item => item.incident_type.toLowerCase().includes(incident_type.toLowerCase()))
                res.status(200).json({output, status: true})
            })
            .catch(err => {
                console.log(err, 140)
            })
    }
});

// Post Lost Assets Feedback
route.post('/lost-assets/feedback', (req, res, next) => {
    let {feedback_details, lost_asset_id} = req.body
    if (feedback_details !== '' && lost_asset_id !== '') {
        LostAssetFeedback.create(req.body)
            .then(resData => {
                res.status(200).json({status: true, message: 'Feedback Saved'})
            })
            .catch(err => {
                res.status(200).json({message: 'Something Blew Up'})
            })
    }
});

// Lost Assets Report
route.post('/lost-assets/report', async (req, res, next) => {
    const {date_from, date_to, user_id} = req.body
    const [data, metaData] = await db.query(`
        SELECT lost_assets.id, CONCAT(users."firstName", ' ', users."lastName") as reported_by, user_roles.role_name as designation,
               locations.location_name as location, lost_assets.incident_type, lost_assets.incident_date, lost_assets.incident_time, lost_assets.police_station,
               lost_assets.gd_no, lost_assets.gd_date FROM lost_assets
        JOIN user_roles ON user_roles.id = lost_assets.role_id
        JOIN users ON users.id = lost_assets.added_by
        JOIN locations ON locations.id = lost_assets.location_id
        WHERE lost_assets."createdAt" BETWEEN '${date_from}' AND '${date_to}' AND lost_assets.added_by = ${user_id}
    `)

    if (data.length > 0) {
        res.status(200).json({data, status: true})
    } else {
        res.status(200).json({message: 'No Data Found'})
    }
});

// Create
route.post('/lost-assets/entry', (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        Location.findOne({where: {id: req.body.location_id}})
            .then(resData => {
                const {parent_id, asset_id, police_station, incident_time, gd_no, gd_date, role_id, added_by, incident_type, incident_date} = req.body;
                if (asset_id !== '' && parent_id !== '' && incident_time !== '' && police_station !== '' && gd_no !== '' && gd_date !== '') {
                    const newLostAsset = {
                        location_id: resData.id,
                        role_id,
                        added_by,
                        asset_id,
                        incident_type,
                        incident_date,
                        incident_time,
                        police_station,
                        gd_no,
                        gd_date,
                        gd_other_file: req.file ? req.file.filename : null
                    };

                    LostAsset.create(newLostAsset)
                        .then(() => {
                            res.status(200).json({message: 'Data Saved Successfully', status: true});
                        })
                        .catch(err => {
                            res.status(200).json({message: 'Something went wrong', err});
                        })
                } else {
                    res.status(200).json({message: 'All fields required!'});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({message: 'Something went wrong', err})
            });
    })
});

module.exports = route
