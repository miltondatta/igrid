const express = require('express');
const router = express.Router();
const documentCategoryController = require('../../controllers/document/DocumentCategoryController');

/*
    @route          GET api/v1/document/category/all/
    @desc           Get All Document Categories Data
    @access         Private
 */
router.get('/all', documentCategoryController.index);

/*
    @route          POST api/v1/document/category/store/
    @desc           Save New Document Category Data
    @access         Private
 */
router.post('/store', documentCategoryController.store);

/*
    @route          get api/v1/document/category/edit/:id
    @desc           Get Document Category By ID
    @access         Private
 */

router.get('/edit/:id', documentCategoryController.edit);

/*
    @route          POST api/v1/document/category/update/
    @desc           Update Document Category Data
    @access         Private
 */

router.post('/update', documentCategoryController.update);

/*
    @route          POST api/v1/document/category/delete/
    @desc           Delete Document Category
    @access         Private
 */
router.delete('/delete', documentCategoryController.delete);

module.exports = router;