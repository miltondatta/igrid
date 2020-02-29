const db = require('../config/db')
const {Op} = require('sequelize')
const multer = require('multer')
const express = require('express')
const LostAsset = require('../models/lost_asset')

const route = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/lostAssets')
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


route.get('/lost-assets', (req,res,next) => {
    LostAsset.findAll({attributes: ['id', 'incident_type', 'police_station', 'gd_no', 'gd_date', 'incident_date', 'incident_time']})
        .then(resData => {
            res.status(200).json({res: resData, status: true})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Get Lost Assets Incident Type
route.post('/lost-assets/incident_type', (req,res,next) => {
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

// Create
route.post('/lost-assets/entry', (req,res,next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        const {parent_id, asset_id, police_station, incident_time, gd_no, gd_date} = req.body
        if (asset_id !== '' && parent_id !== '' && incident_time !== '' && police_station !== '' && gd_no !== '' && gd_date !== '') {
            LostAsset.create({...req.body, gd_other_file: req.file.filename ? req.file.filename : null})
                .then(resData => {
                    res.status(200).json({message: 'Data Saved Successfully', status: true})
                })
                .catch(err => {
                    console.log(err)
                    res.status(200).json({message: 'Something went wrong', err})
                })
        } else {
            res.status(200).json({message: 'All fields required!'})
        }
    })
})

module.exports = route