const {Op} = require("sequelize");
const RepairMaintenance = require('../../models/repair_maintenance');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/repair-assets')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|doc|docx|pdf|xlsx)$/)) {
            return cb(new Error('Only .png, .jpg, .jpeg, .doc, .docx, .pdf, .xlsx format allowed!'));
        }
        cb(null, true);
    }
}).array('file');

exports.index = async (req, res) => {
    try {
        const {added_by} = req.body;

        let queryText = '';
        if (added_by) queryText = 'where repair_maintenances.added_by = ' + added_by;

        const data = await db.query(`select distinct on (repair_maintenances.id) repair_maintenances.id,
                                            locations.location_name,
                                            user_roles.role_name,
                                            concat(users."firstName", ' ', users."lastName") added_by,
                                            repair_maintenances.estimated_cost,
                                            repair_maintenances.details,
                                            repair_maintenances.file_name,
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
                                            assets.comments,
                                            assets.disposal_reason
                                    from repair_maintenances
                                             inner join assets on repair_maintenances.asset_id = assets.id
                                             inner join products on assets.product_id = products.id
                                             inner join asset_categories on assets.asset_category = asset_categories.id
                                             inner join asset_sub_categories on asset_categories.id = asset_sub_categories.category_id
                                             inner join conditions on assets.condition = conditions.id
                                             inner join locations on repair_maintenances.location_id = locations.id
                                             inner join user_roles on repair_maintenances.role_id = user_roles.id
                                             inner join users on repair_maintenances.added_by = users.id 
                                    ${queryText}`);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(err);
    }
};

exports.store = (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
            } else if (err) {
                return res.status(500).json(err);
            }

            let file_name_list = [];
            req.files.length && req.files.map(item => {
                file_name_list.push(item.filename);
            });

            const {jsonData} = req.body;
            const assetDataList = JSON.parse(jsonData);

            assetDataList.length && assetDataList.map((item, index) => {
                const newAssetRepair = {
                    location_id: item.location_id,
                    role_id: item.role_id,
                    added_by: item.user_id,
                    asset_id: item.asset_id,
                    estimated_cost: item.estimated_cost,
                    details: item.details,
                    file_name: file_name_list[index]
                };

                RepairMaintenance.create(newAssetRepair).then(resCreate => {
                    if (!resCreate) return res.status(400).json({msg: 'Please try again with full information!', error: true});
                    return res.status(200).json({msg: 'New Asset added in Repair & Maintenance successfully.', success: true});
                }).catch(err => {
                    console.error(err.message);
                    return res.status(500).json({msg: err});
                });
            });
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
};
