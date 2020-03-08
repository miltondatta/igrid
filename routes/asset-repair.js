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
router.post('/asset-maintenance/report' , async (req, res, next) => {
    const {date_from, date_to, user_id} = req.body
    const [ data, metaData] = await db.query(`
        
    `)
})

module.exports = router;