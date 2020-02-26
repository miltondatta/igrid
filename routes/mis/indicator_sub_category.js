const express = require('express');
const router = express.Router();
const indicatorSubCategoryController = require('../../controllers/mis/IndicatorSubCategoryController');

/*
    @route          GET api/v1/mis/indicator/sub/category/all
    @desc           Get All Indicator Sub Category Data
    @access         Private
 */
router.get('/all', indicatorSubCategoryController.index);

/*
    @route          POST api/v1/mis/indicator/sub/category/store
    @desc           Save New Indicator Sub Category Data
    @access         Private
 */
router.post('/store', indicatorSubCategoryController.store);

/*
    @route          get api/v1/mis/indicator/sub/category/edit/:id
    @desc           Get Indicator Sub Category By ID
    @access         Private
 */

router.get('/edit/:id', indicatorSubCategoryController.edit);

/*
    @route          POST api/v1/mis/indicator/sub/category/update
    @desc           Update Indicator Sub Category Data
    @access         Private
 */

router.post('/update', indicatorSubCategoryController.update);

/*
    @route          POST api/v1/mis/indicator/sub/category/delete
    @desc           Delete Indicator Sub Category
    @access         Private
 */
router.delete('/delete', indicatorSubCategoryController.delete);

/*
    @route          get api/v1/mis/indicator/sub/category/by/category/:indicatormaster_id
    @desc           Get Indicator Sub Category By Category ID
    @access         Private
 */

router.get('/by/category/:indicatormaster_id', indicatorSubCategoryController.subCategoryByCategoryId);

module.exports = router;