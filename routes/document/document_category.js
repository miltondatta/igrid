const express = require('express');
const router = express.Router();
const documentCategoryController = require('../../controllers/document/DocumentCategoryController');

/*
    @route          GET api/document/category/all/
    @desc           Get All Document Categories Data
    @access         Private
 */
router.get('/all', documentCategoryController.index);

/*
    @route          POST api/document/category/store/
    @desc           Save New Document Category Data
    @access         Private
 */
// router.post('/store', documentCategoryController.store);

/*
    @route          get api/document/category/edit/:id
    @desc           Get Document Category By ID
    @access         Private
 */

// router.get('/edit/:id', documentCategoryController.edit);

/*
    @route          POST api/document/category/update/
    @desc           Update Document Category Data
    @access         Private
 */

// router.post('/update', documentCategoryController.update);

/*
    @route          POST api/document/category/delete/
    @desc           Delete Document Category
    @access         Private
 */
// router.post('/delete', documentCategoryController.delete);

module.exports = router;