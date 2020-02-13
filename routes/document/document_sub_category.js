const express = require('express');
const router = express.Router();
const documentSubCategoryController = require('../../controllers/document/DocumentSubCategoryController');

/*
    @route          GET api/v1/document/sub/category/all/
    @desc           Get All Document Sub Category Data
    @access         Private
 */
router.get('/all', documentSubCategoryController.index);

/*
    @route          POST api/v1/document/sub/category/store/
    @desc           Save New Document Sub Category Data
    @access         Private
 */
router.post('/store', documentSubCategoryController.store);

/*
    @route          get api/v1/document/sub/category/edit/:id
    @desc           Get Document Sub Category By ID
    @access         Private
 */

router.get('/edit/:id', documentSubCategoryController.edit);

/*
    @route          POST api/v1/document/sub/category/update/
    @desc           Update Document Sub Category Data
    @access         Private
 */

router.post('/update', documentSubCategoryController.update);

/*
    @route          POST api/v1/document/sub/category/delete/
    @desc           Delete Document Sub Category
    @access         Private
 */
router.delete('/delete', documentSubCategoryController.delete);

/*
    @route          get api/v1/document/sub/category/by/category/:category_id
    @desc           Get Document Sub Category By Category ID
    @access         Private
 */

router.get('/by/category/:category_id', documentSubCategoryController.subCategoryByCategoryId);

module.exports = router;