const multer = require('multer')
const express = require('express')
const db = require('../config/db');
const { Op } = require("sequelize");
const Vendors  = require('../models/asset/vendors')
const Challan = require('../models/asset/challan')
const Assets = require('../models/asset/assets')
const AssetHistory = require('../models/asset/asset_history')
const UserAssociateRole = require('../models/userassociaterole')
const moment = require('moment');

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
    const [results, metadata] = await db.query(`
        SELECT challans.id,challans.challan_no,challans.challan_no,challans.received_by,CONCAT(users."firstName", ' ', users."lastName") as added_by,vendors.vendor_name FROM challans
            JOIN vendors ON challans.vendor_id = vendors.id
            JOIN users ON challans.added_by = users.id
    `)
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
            SELECT assets.id,assets.product_serial, depreciation_methods.method_name,conditions.condition_type,asset_types.type_name,asset_categories.category_name,asset_sub_categories.sub_category_name,projects.project_name From assets
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

// Read All Assets By User Id
route.get('/assets/user/options/:id', async (req,res,next) => {
    const [data, metaData] = await db.query(`
        SELECT assets.id, CONCAT(assets.product_serial, '_' ,products.product_name) as products from assets
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
        Assets.create(item)
            .then(resData => {
                if (item.product_serial === '') {
                    Assets.update({product_serial: resData.id},{where: {id: resData.id}})
                        .then(upd => {
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
                res.status(200).json({message: 'Challan has been updated', status: true})
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

// Assets Entry Data By User ID
route.post('/assets-entry/all/by/credentials', async (req, res) => {
    try {
        const {user_id, category_id, sub_category_id, product_id, product_serial, is_disposal} = req.body;

        let queryText = '';
        if (user_id) queryText = 'where assets.assign_to = ' + user_id;
        if (category_id) queryText += ' and assets.asset_category = ' + category_id;
        if (sub_category_id) queryText += ' and assets.asset_sub_category = ' + sub_category_id;
        if (product_id) queryText += ' and assets.product_id = ' + product_id;
        if (product_serial) queryText += ' and assets.product_serial = ' + "\'" + product_serial + "\'";
        if (typeof(is_disposal) === "boolean") queryText += ' and assets.is_disposal = ' + is_disposal;

        const data = await db.query(`select distinct on(assets.product_serial) product_serial, 
                               assets.id,
                               products.product_name,
                               asset_categories.category_name,
                               asset_sub_categories.sub_category_name,
                               assets.product_serial,
                               assets.cost_of_purchase,
                               assets.installation_cost,
                               assets.carrying_cost,
                               assets.other_cost,
                               assets.rate,
                               assets.effective_date,
                               assets.book_value,
                               assets.salvage_value,
                               assets.useful_life,
                               assets.last_effective_date,
                               assets.warranty,
                               assets.last_warranty_date,
                               conditions.condition_type,
                               assets.comments
                        from assets
                                 join products on assets.product_id = products.id
                                 join asset_categories on assets.asset_category = asset_categories.id
                                 join asset_sub_categories on assets.asset_sub_category = asset_sub_categories.id
                                 join conditions on assets.condition = conditions.id
                        ${queryText} order by assets.product_serial`);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
});

// Assets Category List By User Id
route.get('/assets-category/all/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const data = await db.query(`select distinct asset_categories.id, asset_categories.category_name
                        from assets
                                 join asset_categories on assets.asset_category = asset_categories.id
                        where assign_to = ${user_id}`);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
});

// Assets Sub Category List By User ID and Category ID
route.get('/assets-sub-category/all/:user_id/:category_id', async (req, res) => {
    try {
        const {user_id, category_id} = req.params;
        const data = await db.query(`select distinct asset_sub_categories.id, asset_sub_categories.sub_category_name
                        from assets
                                 join asset_categories on assets.asset_category = asset_categories.id
                                 join asset_sub_categories on assets.asset_sub_category = asset_sub_categories.id
                        where assets.assign_to = ${user_id} and assets.asset_category = ${category_id}`);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
});

// Assets Product List By User, Category and Sub Category ID
route.get('/assets-product/all/:user_id/:category_id/:sub_category_id', async (req, res) => {
    try {
        const {user_id, category_id, sub_category_id} = req.params;
        const data = await db.query(`select distinct products.id, products.product_name
                        from assets
                                 join asset_categories on assets.asset_category = asset_categories.id
                                 join asset_sub_categories on assets.asset_sub_category = asset_sub_categories.id
                                 join products on asset_categories.id = products.category_id
                        where assets.assign_to = ${user_id} and assets.asset_category = ${category_id} 
                        and assets.asset_sub_category = ${sub_category_id}`);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
});

// Get Assets By User, Category, Sub Category and Product ID
route.post('/get/assets/by/credentials', async (req, res) => {
    try {
        const {user_id, category_id, sub_category_id, product_id} = req.body;
        const data = await db.query(`select distinct on (product_serial) product_serial, * from assets
                        where assign_to = ${user_id} and asset_category = ${category_id} 
                        and asset_sub_category = ${sub_category_id} and product_id = ${product_id} order by product_serial`);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
});

// Dispose Asset by Id List
route.post('/asset-disposal/by/credentials', async (req, res) => {
    try{
        const {disposalCredential} = req.body;
        if (!disposalCredential.length) return res.status(400).json({error: true, msg: 'No credential found!'});

        const user_associate_info = await UserAssociateRole.findOne({attributes: ["location_id", "role_id"], where: {user_id: disposalCredential[0].user_id}});
        if (!user_associate_info) return res.status(400).json({error: true, msg: 'User Associate Info didn\'t found!'});

        disposalCredential.map((item, index) => {
            const updateAsset = {
                is_disposal: true,
                disposal_by_location: user_associate_info.location_id,
                disposal_by_role_id: user_associate_info.role_id,
                disposal_by: item.user_id,
                disposal_date: moment().format('YYYY-MM-DD'),
                disposal_reason: item.disposal_reason
            };

            Assets.update(updateAsset, {where: {id: item.id}})
                .then(() => {
                    if (disposalCredential.length === index + 1) return res.status(200).json({success: true, msg: 'Asset Disposal Info saved successfully!'});
                })
                .catch(err => {
                    console.error(err.message);
                    return res.status(500).json(err);
                })
        });
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
});

module.exports = route;