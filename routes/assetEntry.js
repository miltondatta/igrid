const multer = require('multer')
const express = require('express')
const db = require('../config/db');
const Challan = require('../models/asset/challan')
const Vendors = require('../models/asset/vendors')
const Assets = require('../models/asset/assets')

const route = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/asset')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
})
let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|doc|docx|pdf)$/)) {
            return cb(new Error('Only .png, .jpg, .jpeg, .doc, .docx, .pdf format allowed!'));

        }
        cb(null, true);
    }
}).single('file')


// Read Challans
route.get('/asset-entry/challan', async (req,res,next) => {
    const [results, metadata] = await db.query('SELECT "Challans"."id","Challans"."challan_no","Challans"."challan_name","Challans"."received_by","Challans"."added_by","Vendors"."vendor_name" FROM "Challans"  JOIN "Vendors" ON "Challans"."vendor_id" = "Vendors"."id"')
    res.status(200).json(results)
})

// Read Assets Of Challans
route.get('/asset-entry/assets/:id', async (req,res,next) => {
    console.log(req.params.id , 38)
    const [results, metadata] = await db.query(`
            SELECT "Assets"."product_serial","Challans"."challan_name", "Depreciation_methods"."method_name","Conditions"."condition_type","Asset_types"."type_name","Asset_categories"."category_name","Asset_sub_categories"."sub_category_name","Projects"."project_name" From "Assets"
            JOIN "Challans" ON "Assets"."challan_id" = "Challans"."id"
            JOIN "Projects" ON "Assets"."project_id" = "Projects"."id"
            JOIN "Asset_categories" ON "Assets"."asset_category" = "Asset_categories"."id"
            JOIN "Asset_sub_categories" ON "Assets"."asset_sub_category" = "Asset_sub_categories"."id"
            JOIN "Asset_types" ON "Assets"."asset_type" = "Asset_types"."id"
            JOIN "Conditions" ON "Assets"."condition" = "Conditions"."id"
            JOIN "Depreciation_methods" ON "Assets"."depreciation_method" = "Depreciation_methods"."id"
            WHERE "Assets"."challan_id" = ${req.params.id}  
            ORDER BY "Asset_categories"."category_name"
        `)
    res.status(200).json(results)
})

// Asset Entry
route.post('/asset-entry/challan/entry', (req,res,next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        const {challan_no, challan_name, challan_description, purchase_order_no, purchase_order_date, vendor_id, received_by, added_by, challanComments} = req.body
        if (challan_no === '' || challan_name === '' || challan_description === '' || purchase_order_no === '' || purchase_order_date === '' || vendor_id === '' || received_by === '' || added_by === '' || challanComments === '') {
            res.status(200).json({message: 'All fields required!'})
        } else {
            let data = {
                attachment: req.file.filename,
                challan_no,
                challan_name,
                challan_description,
                purchase_order_no,
                purchase_order_date,
                vendor_id,
                received_by,
                added_by,
                comments: challanComments,
            }
            Challan.create(data)
                .then(resData => {
                    res.status(200).json(resData.id)
                })
                .catch(err => {
                    console.log(err)
                    res.status(404).json({message: 'Something went wrong', err})
                })
        }
    })
})

// Asset Entry
route.post('/asset-entry/entry', (req,res,next) => {
    req.body.map(item => {
        console.log(item, 73)
        Assets.create(item)
            .then(resData => {
                if (item.product_serial === '') {
                    Assets.update({product_serial: resData.id},{where: {id: resData.id}})
                        .then(upd => {
                            console.log('Successfully Updated Product Serial', 78)
                        })
                }
                res.status(200).json({message: 'Product Stored'})
            })
            .catch(err => {
                console.log(err)
                res.status(404).json({message: 'Something went wrong', err})
            })
    })
})

// Delete
route.delete('/asset-entry/delete', (req,res,next) => {
    Challan.destroy({
        where: {
            id: req.body.id
        }
    })
    .then(resData => {
        console.log(resData)
        res.status(200).json({message: 'Challan Has Been Deleted'})
    })
    .catch(err => {
        console.log(err)
        res.status(404).json({message: 'Something went wrong', err})
    })
})

module.exports = route