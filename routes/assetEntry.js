const multer = require('multer')
const express = require('express')
const db = require('../config/db');
const {Op} = require("sequelize");
const Vendors = require('../models/asset/vendors')
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
        cb(null, Date.now() + '-' + file.originalname)
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



// Get Total Assets
route.get('/total/assets', (req,res,next) => {
    Assets.count({
        distinct: true,
        col: 'id'
    })
        .then(resData => {
            res.status(200).json({total: resData, status: true})
        })
        .catch(err => {
            console.log(err, 15)
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Read challans
route.get('/assets-entry/challan', async (req, res, next) => {
    const [results, metadata] = await db.query(`
        SELECT challans.id,challans.challan_date,challans.challan_no, challans.challan_no,challans.received_by,CONCAT(users."firstName", ' ', users."lastName") as added_by,vendors.vendor_name FROM challans
            JOIN vendors ON challans.vendor_id = vendors.id
            JOIN users ON challans.added_by = users.id
                WHERE challans.is_closed = FALSE
    `)
    res.status(200).json(results)
})

// Read Specific challans
route.get('/assets-entry/specific-challan/:id', (req, res, next) => {
    Challan.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong'})
        })
})

// Read Assets Of challans
route.get('/assets-entry/assets/:id', async (req, res, next) => {
    console.log(req.params.id, 38)
    const [results, metadata] = await db.query(`
            SELECT assets.id,assets.product_serial, depreciation_methods.method_name,conditions.condition_type,asset_types.type_name,asset_categories.category_name as category,asset_sub_categories.sub_category_name as sub_category,projects.project_name as project From assets
            Left JOIN challans ON assets.challan_id = challans.id
            Left JOIN projects ON assets.project_id = projects.id
            Left JOIN asset_categories ON assets.asset_category = asset_categories.id
            Left JOIN asset_sub_categories ON assets.asset_sub_category = asset_sub_categories.id
            Left JOIN asset_types ON assets.asset_type = asset_types.id
            Left JOIN conditions ON assets.condition = conditions.id
            Left JOIN depreciation_methods ON assets.depreciation_method = depreciation_methods.id
            WHERE assets.challan_id = ${req.params.id}  
            ORDER BY asset_categories.category_name
        `)

    if (results.length > 0) {
        res.status(200).json({data: results, status: true})
    } else {
        res.status(200).json({message: 'No Assets Found'})
    }
})

// Read All Assets
route.get('/assets-entry/specific-assets/:id', (req, res, next) => {
    Assets.findAll({attributes: {exclude: ['createdAt', 'updatedAt', 'ChallanId']}, where: {id: req.params.id}})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong'})
        })
})

// Read All Assets
route.get('/assets-entry/sub-assets/:id', async (req, res, next) => {
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
route.get('/assets/user/options/:id', async (req, res, next) => {
    const [data, metaData] = await db.query(`
        SELECT assets.id, CONCAT(assets.product_serial, '_' ,products.product_name) as products from assets
            JOIN products ON assets.product_id = products.id
            WHERE assets.assign_to = ${req.params.id} and is_disposal = false  
    `)
    if (data.length > 0) {
        res.status(200).json(data)
    } else {
        res.status(200).json({message: "No Data Found"})
    }
})

// Challan Entry
route.post('/assets-entry/challan/entry', (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        const {challan_no, challan_date, challan_name, challan_description, purchase_order_no, purchase_order_date, vendor_id, received_by, added_by, challanComments} = req.body
        if (challan_no === '' || challan_date === '' || challan_name === '' || purchase_order_no === '' || purchase_order_date === '' || vendor_id === '' || received_by === '' ||
            added_by === '') {
            res.status(200).json({message: 'All fields required!'})
        } else {
            let data = {
                attachment: req.file ? req.file.filename : null,
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
            console.log(data, 229)
            Challan.findAll({where: {vendor_id, challan_no}})
                .then(resChallan => {
                    if (resChallan.length > 0) {
                        res.status(200).json({message: 'Challan No Exists', err})
                    } else {
                        Challan.create(data)
                            .then(resData => {
                                Vendors.findAll({
                                    attributes: ['vendor_name'],
                                    where: {id: resData.dataValues.vendor_id}
                                })
                                    .then(resDataInner => {
                                        res.status(200).json({
                                            resId: resData.id,
                                            status: true,
                                            vendorName: resDataInner[0].dataValues.vendor_name,
                                            message: 'Challan Added Successfully!'
                                        })
                                    })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(200).json({message: 'Something went wrong', err})
                            })
                    }
                })
        }
    })
})

// Get Challan Receiver
route.post('/challan-receiver', async (req, res, next) => {
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
route.post('/assets-entry/entry', (req, res, next) => {
    req.body.map(item => {
        Assets.create(item)
            .then(resData => {
                if (item.product_serial === '') {
                    Assets.update({product_serial: 'prod_serial_' + resData.id}, {where: {id: resData.id}})
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
                res.status(500).json({message: 'Something went wrong', err})
            })
    })
})

// Asset Disposal Report
route.post('/assets-disposal/report', async (req, res, next) => {
    const {date_from, date_to, user_id} = req.body
    const [data, metaData] = await db.query(`
        SELECT assets.id, assets."createdAt"::timestamp::date as date, CONCAT(users."firstName", ' ', users."lastName") as disposal_by, user_roles.role_name as designation,
               locations.location_name as location, products.product_name, assets.product_serial, assets.disposal_date::timestamp::date, assets.disposal_reason FROM assets
        JOIN user_roles ON user_roles.id = assets.disposal_by_role_id
        JOIN users ON users.id = assets.disposal_by
        JOIN products ON products.id = assets.product_id
        JOIN locations ON locations.id = assets.disposal_by_location
        WHERE assets."createdAt" BETWEEN '${date_from}' AND '${date_to}'  AND assets.disposal_by = ${user_id}
    `)

    if (data.length > 0) {
        res.status(200).json({data, status: true})
    } else {
        res.status(200).json({message: 'No Data Found'})
    }
})

//Update Specific Asset
route.put('/assets-entry/assets/update/:id', (req, res, next) => {
    const {
        project_id, asset_category, asset_sub_category, cost_of_purchase, installation_cost, carrying_cost,
        other_cost, asset_type, depreciation_method, rate, effective_date, book_value, salvage_value,
        useful_life, last_effective_date, warranty, last_warranty_date, condition, comments, barcode
    } = req.body

    if (project_id !== '' && asset_category !== '' && asset_sub_category !== '' && cost_of_purchase !== '' && installation_cost !== '' && carrying_cost !== '',
    other_cost !== '' && asset_type !== '' && depreciation_method !== '' && rate !== '' && effective_date !== '' && book_value !== '' && salvage_value !== '' &&
    useful_life !== '' && last_effective_date !== '' && warranty !== '' && last_warranty_date !== '' && condition !== '' && barcode !== '') {
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
    if (challan_no !== '' && challan_name !== '' && purchase_order_no !== '' && purchase_order_date !== '' && vendor_id !== '' && received_by !== '' && added_by !== '') {
        Challan.update({...req.body}, {where: {id: req.params.id}})
            .then(() => {
                res.status(200).json({message: 'Challan has been updated', status: true})
            })
            .catch(err => {
                res.status(200).json({message: 'Something went wrong'})
            })
    } else {
        res.status(200).json({message: 'All fields required'})
    }
})

// Delete
route.delete('/assets-entry/delete', (req, res, next) => {
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
        if (typeof (is_disposal) === "boolean") queryText += ' and assets.is_disposal = ' + is_disposal;

        const data = await db.query(`select 
                               assets.id,
                               products.product_name,
                               asset_categories.category_name as category,
                               asset_sub_categories.sub_category_name  as sub_category,
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
                               assets.comments,
                               assets.disposal_reason
                        from assets
                                 join products on assets.product_id = products.id
                                 join asset_categories on assets.asset_category = asset_categories.id
                                 join asset_sub_categories on assets.asset_sub_category = asset_sub_categories.id
                                 left join conditions on assets.condition = conditions.id
                        ${queryText}`);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
});

// Assets Own Stock Data By User ID
route.post('/assets-own-stock/all/by/credentials', async (req, res) => {
    try {
        const {user_id, category_id, sub_category_id} = req.body;

        let queryText = '';
        if (user_id) queryText = 'where assets.assign_to = ' + user_id;
        if (category_id) queryText += ' and assets.asset_category = ' + category_id;
        if (sub_category_id) queryText += ' and assets.asset_sub_category = ' + sub_category_id;

        const data = await db.query(`select asset_categories.category_name,
                                       asset_sub_categories.sub_category_name,
                                       products.product_name,
                                       count(distinct assets.id) as quantity
                                from assets
                                         join asset_categories on assets.asset_category = asset_categories.id
                                         join asset_sub_categories on assets.asset_sub_category = asset_sub_categories.id
                                         join products on assets.product_id = products.id
                                ${queryText} 
                                group by asset_categories.category_name, asset_sub_categories.sub_category_name, products.product_name`);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
});

// Assets Own Stock And Details
route.post('/assets/all/by/id', async (req, res) => {
    try {
        const {user_id, category_id, sub_category_id} = req.body;

        let queryText = '';
        if (user_id) queryText = 'where assets.assign_to = ' + user_id;
        if (category_id) queryText += ' and assets.asset_category = ' + category_id;
        if (sub_category_id) queryText += ' and assets.asset_sub_category = ' + sub_category_id;

        const [data, metadata] = await db.query(`select
                                       assets.id,
                                       products.product_name as product,
                                       asset_categories.category_name as category,
                                       asset_sub_categories.sub_category_name as sub_category,
                                       assets.product_serial,
                                       assets.cost_of_purchase as purchase_cost,
                                       assets.installation_cost,
                                       assets.carrying_cost,
                                       assets.other_cost,
                                       assets.rate,
                                       assets.effective_date,
                                       assets.book_value,
                                       assets.salvage_value,
                                       assets.useful_life,
                                       assets.warranty,
                                       conditions.condition_type,
                                       assets.comments,
                                       count(distinct assets.id) as quantity
                                from assets
                                         left join asset_categories on assets.asset_category = asset_categories.id
                                         left join asset_sub_categories on assets.asset_sub_category = asset_sub_categories.id
                                         left join products on assets.product_id = products.id
                                         left join conditions on assets.condition = conditions.id
                                ${queryText} 
                                group by assets.id, conditions.condition_type, products.product_name, asset_categories.category_name,
                                            asset_sub_categories.sub_category_name`);

        if (data.length > 0) {
            return res.status(200).json({response: data, status: true });
        } else {
            return res.status(200).json({message: "No Data Found"});
        }
    } catch (err) {
        console.error(err.message);
        return res.status(200).json({message: err.message});
    }
});

// Assets Own Stock Data By User
route.post('/assets-report/all', async (req, res) => {
    try {
        // const [proData, proMetaData] = await db.query(`
        //     SELECT distinct on (products.id) products.product_name FROM products
        // `)
        //
        // let columnsString = "";
        // let dataSet = []
        //
        // proData.length > 0 && proData.forEach(item => {
        //     dataSet.push(item.product_name)
        // })
        //
        // dataSet.forEach((item) => {
        //     columnsString += '"' + item + '"' + " bigint,";
        // });
        //
        // columnsString       =  columnsString.slice(0, -1);


        const {location_id} = req.body;

        // const [data, metadata] = await db.query(`SELECT * FROM
        //         crosstab (
        //         $$
        //           select CONCAT(users."firstName", ' ',users."lastName") as user_name, products.id, count(distinct assets.id) as quantity from assets
        //                         left join products on assets.product_id = products.id
        //                         join users on users.id = assets.assign_to
        //                         join user_associate_roles on users.id = user_associate_roles.user_id
        //                         join locations on locations.id = user_associate_roles.location_id
        //                 WHERE (locations.id = '${location_id}')
        //                 GROUP BY products.id, user_name
        //                 ORDER BY 1,2
        //         $$
        //         ) AS ct ( user_name text , ${columnsString})`);
        //
        // console.log(data, 404)

        const [data, metadata] = await db.query(`SELECT CONCAT(users."firstName", ' ',users."lastName") as user_name,
                                                asset_categories.category_name, asset_sub_categories.sub_category_name,
                                                 products.product_name, count(distinct assets.id) as quantity from assets
                                            join asset_categories on assets.asset_category = asset_categories.id
                                            join asset_sub_categories on assets.asset_sub_category = asset_sub_categories.id
                                            join products on assets.product_id = products.id
                                            join users on users.id = assets.assign_to
                                            join user_associate_roles on users.id = user_associate_roles.user_id
                                            join locations on locations.id = user_associate_roles.location_id
                                    where locations.id = ${location_id}
                                    group by asset_categories.category_name, asset_sub_categories.sub_category_name, products.product_name, users."firstName", users."lastName"`);

        if (data.length > 0) {
            return res.status(200).json({data, status: true});
        }
    } catch (err) {
        console.error(err.message);
        return res.status(200).json({message: "Something Blew Up!"});
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
                                 join products on assets.product_id = products.id
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
        const data = await db.query(`select * from assets
                        where assign_to = ${user_id} and asset_category = ${category_id} 
                        and asset_sub_category = ${sub_category_id} and product_id = ${product_id} and assets.is_disposal = false`);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
});

// Dispose Asset by Id List
route.post('/asset-disposal/by/credentials', async (req, res) => {
    try {
        const {disposalCredential} = req.body;
        if (!disposalCredential.length) return res.status(400).json({error: true, msg: 'No credential found!'});

        const user_associate_info = await UserAssociateRole.findOne({
            attributes: ["location_id", "role_id"],
            where: {user_id: disposalCredential[0].user_id}
        });
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
                    if (disposalCredential.length === index + 1) return res.status(200).json({
                        success: true,
                        msg: 'Asset Disposal Info saved successfully!'
                    });
                })
                .catch(err => {
                    console.error(err.message);
                    return res.status(500).json(err);
                })
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
});

// Transfer Asset by Id List
route.post('/asset-transfer/by/credentials', async (req, res) => {
    try {
        const {transferCredential} = req.body;
        if (!transferCredential.length) return res.status(400).json({error: true, msg: 'No credential found!'});

        transferCredential.map((item, index) => {
            Assets.update({assign_to: item.assign_to}, {where: {id: item.id}})
                .then(() => {
                    AssetHistory.create({asset_id: item.id, assign_to: item.assign_to, status: 4, assign_from:  item.user_id})
                        .then(() => {
                            if (transferCredential.length === index + 1) return res.status(200).json({
                                success: true,
                                msg: 'Asset Transfer Info saved successfully!'
                            });
                        })
                        .catch(err => {
                            console.error(err.message);
                            return res.status(500).json(err);
                        });
                })
                .catch(err => {
                    console.error(err.message);
                    return res.status(500).json(err);
                })
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
});

module.exports = route;