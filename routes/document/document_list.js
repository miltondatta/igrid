const express = require('express');
const router = express.Router();
const fs = require('fs');
const documentListController = require('../../controllers/document/DocumentListController');

/*
    @route          GET api/v1/document/list/all/
    @desc           Get All Document List Data
    @access         Private
 */
router.get('/all', documentListController.index);

/*
    @route          POST api/v1/document/list/store/
    @desc           Save New Document List Data
    @access         Private
 */
router.post('/store', documentListController.store);

/*
    @route          get api/v1/document/list/edit/:id
    @desc           Get Document List By ID
    @access         Private
 */

router.get('/edit/:id', documentListController.edit);

/*
    @route          POST api/v1/document/list/update/
    @desc           Update Document List Data
    @access         Private
 */

router.post('/update', documentListController.update);

/*
    @route          POST api/v1/document/list/delete/
    @desc           Delete Document List
    @access         Private
 */
router.delete('/delete', documentListController.delete);

/*
    @route          GET api/v1/document/list/active
    @desc           Get All Active Document List Data
    @access         Private
 */
router.get('/active', documentListController.documentActiveListData);

/*
    @route          GET api/v1/document/list/by/notice
    @desc           Get All Document List Data By Notice
    @access         Private
 */
router.get('/by/notice', documentListController.documentListDataByNotice);

/*
    @route          GET api/v1/document/list/by/circular
    @desc           Get All Document List Data By Circular
    @access         Private
 */
router.get('/by/circular', documentListController.documentListDataByCircular);

/*
    @route          GET api/v1/document/list/by/category/sub/category
    @desc           Get All Document List Data By Category Sub Category
    @access         Private
 */
router.post('/by/category/sub/category', documentListController.documentListDataByCategorySubCategory);

/*
    @route          GET api/v1/document/list/search
    @desc           Search Document list data
    @access         Private
 */
router.post('/search', documentListController.documentListSearch);

/*
    @route          GET api/v1/document/list/download/:file_name
    @desc           Download Document List File
    @access         Private
 */
router.get('/download/:file_name', documentListController.documentListFileDownload);

/*
    @route          GET api/v1/document/list/details/:id
    @desc           Download Document List Details By Id
    @access         Private
 */
router.get('/details/:id', documentListController.documentListDetailsById);

/*
    @route          GET api/v1/document/list/pdf/:file_name
    @desc           Serve Pdf file as Blob Data
    @access         Private
 */
router.get("/pdf/:file_name", documentListController.documentListDetailsPdf);

/*
    @route          GET api/v1/document/list/keyword/by/category/sub/category
    @desc           Document List Keyword By Category And Sub Category
    @access         Private
 */
router.post("/keyword/by/category/sub/category", documentListController.documentListKeywordByCategoryAndSubCategory);

module.exports = router;