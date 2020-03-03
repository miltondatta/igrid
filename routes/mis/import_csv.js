const db = require('../../config/db')
const {Op} = require('sequelize')
const multer = require('multer')
const express = require('express')
const csv     = require('csv-parser')
const fs      = require('fs')
const mis_imported_data     = require('../../models/mis_imported_data')
const mis_indicatordetail   = require('../../models/mis_indicatordetail')
const locations             = require('../../models/locations')

const route = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/mis')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname )
    }
})
let upload =  multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(csv)$/)) {
            return cb(new Error('Only .csv format allowed!'));

        }
        cb(null, true);
    }
}).array('file')


/*
outer.post('/upload-images', upload.array('imgCollection', 6), (req, res, next) => {
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/public/' + req.files[i].filename)
    } */



// Create
route.post('/mis/import/csv', (req, res) => {
    upload(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        return;
        let uploaded_file_path = 'public/mis/' + req.file.filename;  
        fs.createReadStream(uploaded_file_path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log(results);
                // [
                //   { NAME: 'Daffy Duck', AGE: '24' },
                //   { NAME: 'Bugs Bunny', AGE: '22' }
                // ]
            });

        
        
        return res.status(200).json({ message: uploaded_file_path})

        
    })

    //return res.status(200).json({ message: 'success'})
})

module.exports = route