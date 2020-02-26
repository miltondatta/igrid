const express = require('express');
const router = express.Router();
const indicatorCategoryController = require('../../controllers/mis/IndicatorCategoryController');

/*
    @route          GET api/v1/mis/indicator/category/all/
    @desc           Get All Mis Indicator Categories Data
    @access         Private
 */
router.get('/all', indicatorCategoryController.index);

/*
    @route          POST api/v1/mis/indicator/category/store/
    @desc           Save New Mis Indicator Category Data
    @access         Private
 */
router.post('/store', indicatorCategoryController.store);

/*
    @route          get api/v1/mis/indicator/category/edit/:id
    @desc           Get Mis Indicator Category By ID
    @access         Private
 */

router.get('/edit/:id', indicatorCategoryController.edit);

/*
    @route          POST api/v1/mis/indicator/category/update/
    @desc           Update Mis Indicator Category Data
    @access         Private
 */

router.post('/update', indicatorCategoryController.update);

/*
    @route          POST api/v1/mis/indicator/category/delete/
    @desc           Delete Mis Indicator Category
    @access         Private
 */
router.delete('/delete', indicatorCategoryController.delete);

module.exports = router;