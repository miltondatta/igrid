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

exports.store = (req, res) => {
    try {
        let file_name = '';
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
