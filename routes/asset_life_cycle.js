const express = require('express');
const db = require('../config/db');
const router = express.Router();
const Asset = require('../models/asset/assets');


router.get('/asset/lifecycle/details/:asset_id', async (req, res) => {
    const {asset_id} = req.params;

    const asset = await Asset.findOne({where: {id: asset_id}});
    if (!asset) return res.status(400).json({msg: 'No Asset Found!'});

    const [asset_deliver_from] = await db.query(`
        select concat(users."firstName", ' ', users."lastName") as assign_from
            from asset_histories
                     left join users on asset_histories.assign_from = users.id
            where asset_id = ${asset_id}
              and assign_to = ${asset.assign_to}
              and status = 3
    `);

    const [asset_transfer_from] = await db.query(`
        select concat(users."firstName", ' ', users."lastName") as assign_from
            from asset_histories
                     left join users on asset_histories.assign_from = users.id
            where asset_id = ${asset_id}
              and assign_to = ${asset.assign_to}
              and status = 4
    `);

    const [asset_transfer_to] = await db.query(`
        select concat(users."firstName", ' ', users."lastName") as assign_to
            from asset_histories
                     left join users on asset_histories.assign_to = users.id
            where asset_id = ${asset_id}
              and assign_to = ${asset.assign_to}
              and status = 4
    `);

    const [asset_data] = await db.query(`
        select cost_of_purchase,
               installation_cost,
               carrying_cost,
               other_cost,
               asset_types.type_name,
               depreciation_methods.method_name,
               rate,
               book_value,
               warranty,
               concat(users."firstName", ' ', users."lastName") as user_name
        from assets
                 left join asset_types on assets.asset_type = asset_types.id
                 left join depreciation_methods on assets.depreciation_method = depreciation_methods.id
                 left join users on assets.assign_to = users.id
        where assets.id = ${asset_id}
    `);

    const [asset_repair_maintenance] = await db.query(`
        select locations.location_name,
               user_roles.role_name,
               concat(users."firstName", ' ', users."lastName") as user,
               repair_maintenances.estimated_cost,
               repair_maintenances.details,
               repair_maintenances.file_name
        from repair_maintenances
                 left join locations on repair_maintenances.location_id = locations.id
                 left join user_roles on repair_maintenances.role_id = user_roles.id
                 left join users on repair_maintenances.added_by = users.id
        where repair_maintenances.asset_id = ${asset_id}
    `);

    const data = asset_data.length > 0 && asset_data.map((item, index) => {
        let obj, asset_transfer;
        obj = {
            cost_of_purchase: item.cost_of_purchase,
            installation_cost: item.installation_cost,
            carrying_cost: item.carrying_cost,
            other_cost: item.other_cost,
            asset_type: item.type_name,
            depreciation_method: item.method_name,
            rate: item.rate,
            book_value: item.book_value,
            book_value_after_depreciation: '',
            warranty: item.warranty,
            asset_delivery: {
                deliver_from: asset_deliver_from.length > 0 ? asset_deliver_from[index].assign_from : '',
                deliver_to: item.user_name
            }
        };

        asset_transfer = asset_transfer_from.length > 0 ? asset_transfer_from.map((val, key) => {
            return {
                transfer_from: val.assign_from,
                transfer_to: asset_transfer_to[key].assign_to
            };
        }) : [];

        obj.asset_transfer = asset_transfer;
        obj.asset_repair_maintenance = asset_repair_maintenance;
        return obj;
    });

    return res.status(200).json(data);
});

module.exports = router;