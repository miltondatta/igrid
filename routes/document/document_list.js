const express = require('express');
const router = express.Router();
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

module.exports = router;