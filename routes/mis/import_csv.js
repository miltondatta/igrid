const db = require('../../config/db')
const {Op} = require('sequelize')
const multer = require('multer')
const express = require('express')
const csv     = require('csv-parser')
const fs      = require('fs')
const { uuid } = require('uuidv4');
const mis_indicator_datas     = require('../../models/mis_imported_data')
const mis_indicatordetail   = require('../../models/mis_indicatordetail')
const Locations             = require('../../models/locations')

const route = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/mis')
    },
    filename: function (req, file, cb) {
        cb(null, uuid() + '-' + file.originalname )
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
}).single('file')


// Create
route.post('/mis/import/csv', (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        let uploaded_file_path = 'public/mis/' + req.file.filename;  

        //Get location table data in code(key) and id(value) pair, similary indicator table data
        let location_datas  = [];
        let indicator_datas = [];
        Locations.findAll({
            attributes: ['id', 'location_code']
          }).then(records => {
            records.map(function (record) {
                location_datas[record.location_code] = record.id;
            });
            mis_indicatordetail.findAll({
                attributes: ['id', 'item_no']
            }).then(records => {
                records.map(function (record) {
                    indicator_datas[record.item_no] = record.id;    
                });

                let results = [];
                let imported_datas = [];
                fs.createReadStream(uploaded_file_path)
                    .pipe(csv())
                    .on('data', (data) => results.push(data))
                    .on('end', () => {
                        let insertedDatas = [];
                        results.forEach((item, index) => {
                            let item_row = Object.keys(item).map(key => item[key]);
                            let single_row = {
                                data_date: item_row[2],
                                location_id: location_datas[item_row[0]] ? location_datas[item_row[0]] : '00',
                                indicatordetails_id: indicator_datas[item_row[1]] ? indicator_datas[item_row[1]] : '00',
                                data_value: item_row[3]
                            };
                            insertedDatas.push(single_row);
                        });
                        console.log(insertedDatas);
                    });
                return res.status(200).json({ message: 'Data Uploaded Successfully' })


            });
          });

        


        
    });
})

module.exports = route