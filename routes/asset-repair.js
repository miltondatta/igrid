const express = require('express');
const router = express.Router();
const AssetRepairController = require('../controllers/assets/AssetRepairController');

/*
    @route          POST api/v1/asset-repair/store
    @desc           Save New Asset Repair & Maintenance Data
    @access         Private
 */
router.post('/store', AssetRepairController.store);

module.exports = router;