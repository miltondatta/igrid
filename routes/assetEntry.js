const multer = require('multer')
const express = require('express')
const db = require('../config/db');
const { Op } = require("sequelize");
const Vendors  = require('../models/asset/vendors')
const Challan = require('../models/asset/challan')
const Assets = require('../models/asset/assets')
const AssetHistory = require('../models/asset/asset_history')

const route = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets')
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


// Read challans
route.get('/assets-entry/challan', async (req,res,next) => {
    const [results, metadata] = await db.query('SELECT challans.id,challans.challan_no,challans.challan_no,challans.received_by,challans.added_by,vendors.vendor_name FROM challans JOIN vendors ON challans.vendor_id = vendors.id')
    res.status(200).json(results)
})

// Read Specific challans
route.get('/assets-entry/specific-challan/:id', (req,res,next) => {
    Challan.findAll({attributes: {exclude: ['createdAt','updatedAt']}})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong'})
        })
})

// Read Assets Of challans
route.get('/assets-entry/assets/:id', async (req,res,next) => {
    console.log(req.params.id , 38)
    const [results, metadata] = await db.query(`
            SELECT assets.id,assets.product_serial,challans.challan_name, depreciation_methods.method_name,conditions.condition_type,asset_types.type_name,asset_categories.category_name,asset_sub_categories.sub_category_name,projects.project_name From assets
            JOIN challans ON assets.challan_id = challans.id
            JOIN projects ON assets.project_id = projects.id
            JOIN asset_categories ON assets.asset_category = asset_categories.id
            JOIN asset_sub_categories ON assets.asset_sub_category = asset_sub_categories.id
            JOIN asset_types ON assets.asset_type = asset_types.id
            JOIN conditions ON assets.condition = conditions.id
            JOIN depreciation_methods ON assets.depreciation_method = depreciation_methods.id
            WHERE assets.challan_id = ${req.params.id}  
            ORDER BY asset_categories.category_name
        `)
    res.status(200).json(results)
})

// Read All Assets
route.get('/assets-entry/specific-assets/:id', (req,res,next) => {
    Assets.findAll({attributes: {exclude: ['createdAt','updatedAt', 'ChallanId']}, where: {id: req.params.id}})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong'})
        })
})

// Read All Assets
route.get('/assets-entry/sub-assets/:id', async (req,res,next) => {
    const [data, metaData] = await db.query(`
        SELECT assets.id, CONCAT(assets.product_serial, '_' ,products.product_name) as products, assets.assign_to, assets.asset_sub_category , assets.asset_category from assets
            JOIN products ON assets.product_id = products.id
            WHERE assets.assign_to = ${req.params.id}
    `)
    if (data.length > 0) {
        res.status(200).json(data)
    } else {
        res.status(200).json({message: "No Data Found"})
    }
})

// Challan Entry
route.post('/assets-entry/challan/entry', (req,res,next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        const {challan_no, challan_date, challan_name, challan_description, purchase_order_no, purchase_order_date, vendor_id, received_by, added_by, challanComments} = req.body
        if (challan_no === '' || challan_date === '' || challan_name === '' || challan_description === '' || purchase_order_no === '' || purchase_order_date === '' || vendor_id === '' || received_by === '' || added_by === '' || challanComments === '') {
            res.status(200).json({message: 'All fields required!'})
        } else {
            let data = {
                attachment: req.file.filename,
                challan_no,
                challan_date,
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
                    Vendors.findAll({attributes: ['vendor_name'], where: {id: resData.dataValues.vendor_id}})
                        .then(resDataInner => {
                            res.status(200).json({resId: resData.id, vendorName: resDataInner[0].dataValues.vendor_name, message: 'Challan Added Successfully!'})
                        })
                })
                .catch(err => {
                    console.log(err)
                    res.status(200).json({message: 'Something went wrong', err})
                })
        }
    })
})

// Get Challan Receiver
route.post('/challan-receiver', async (req,res,next) => {
    let {receiverName} = req.body
    if (receiverName.length >= 3) {
        Challan.findAll({
            attributes: ['received_by'],
            group: ['received_by']
        })
            .then(resData => {
                let output = resData.filter(item => item.received_by.toLowerCase().includes(receiverName.toLowerCase()))
                res.status(200).json(output)
            })
            .catch(err => {
                console.log(err, 140)
            })
    }
})

// Asset Entry
route.post('/assets-entry/entry', (req,res,next) => {
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
                AssetHistory.create({asset_id: resData.id, assign_to: resData.assign_to})
                    .then(resHistory => {
                    })
                res.status(200).json({message: 'Product Stored', status: true})
            })
            .catch(err => {
                console.log(err)
                res.status(200).json({message: 'Something went wrong', err})
            })
    })
})

//Update Specific Asset
route.put('/assets-entry/assets/update/:id', (req, res, next) => {
    const {project_id, asset_category, asset_sub_category, cost_of_purchase, installation_cost, carrying_cost,
        other_cost, asset_type, depreciation_method, rate, effective_date, book_value, salvage_value,
        useful_life, last_effective_date, warranty, last_warranty_date, condition, comments, barcode} = req.body

    if (project_id !== '' && asset_category !== '' && asset_sub_category !== '' && cost_of_purchase !== '' && installation_cost !== '' && carrying_cost !== '',
        other_cost !== '' && asset_type !== '' && depreciation_method !== '' && rate !== '' && effective_date !== '' && book_value !== '' && salvage_value !== '' &&
        useful_life !== '' && last_effective_date !== '' && warranty !== '' && last_warranty_date !== '' && condition !== '' && comments !== '' && barcode !== '') {
            Assets.update({...req.body}, {where: {id: req.params.id}})
                .then(() => {
                    res.status(200).json({message: 'Asset has been updated'})
                })
                .catch(err => {
                    res.status(200).json({message: 'Something went wrong'})
                })
    } else {
        res.status(200).json({message: 'All fields required'})
    }
})

//Update Specific Asset
route.put('/assets-entry/challan-update/:id', (req, res, next) => {
    const {challan_no, challan_name, challan_description, purchase_order_no, purchase_order_date, vendor_id, attachment, received_by, challanComments, added_by} = req.body
    if (challan_no !== '' && challan_name !== '' && challan_description !== '' && purchase_order_no !== '' && purchase_order_date !== '' && vendor_id !== '' &&
        attachment !== '' && received_by !== '' && challanComments !== '' && added_by !== '') {
        Challan.update({...req.body}, {where: {id: req.params.id}})
            .then(() => {
                res.status(200).json({message: 'Challan has been updated'})
            })
            .catch(err => {
                res.status(200).json({message: 'Something went wrong'})
            })
    }  else {
        res.status(200).json({message: 'All fields required'})
    }
})

// Delete
route.delete('/assets-entry/delete', (req,res,next) => {
    Assets.destroy({
        where: {
            id: req.body.id
        }
    })
    .then(resData => {

        res.status(200).json({message: 'Challan Has Been Deleted'})
    })
    .catch(err => {
        console.log(err)
        res.status(200).json({message: 'Something went wrong', err})
    })
})

module.exports = route