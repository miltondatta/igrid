const express = require('express');
const router = express.Router();
const AssetRepairController = require('../controllers/assets/AssetRepairController');

/*
    @route          POST api/v1/asset-repair/all/by/credentials
    @desc           Save New Asset Repair & Maintenance Data
    @access         Private
 */
router.post('/all/by/credentials', AssetRepairController.index);

/*
    @route          POST api/v1/asset-repair/store
    @desc           Save New Asset Repair & Maintenance Data
    @access         Private
 */
router.post('/store', AssetRepairController.store);


// Maintenance Report
router.post('/asset-maintenance/report' , AssetRepairController.report);

/*
    @route          GET api/v1/asset-repair/download/:file_name
    @desc           Download Asset Repair File
    @access         Private
 */
router.get('/download/:file_name', AssetRepairController.assetRepairFileDownload);

module.exports = router;