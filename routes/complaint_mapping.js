const express = require('express');
const router = express.Router();
const ComplaintMapping = require('../models/complaint_mapping');
const ComplaintCategory = require('../models/comcategory');
const UserRole = require('../models/userroles');

/*
    @route          GET api/v1/complaint/mapping/all/
    @desc           Get All Complaint Mapping Data
    @access         Private
 */
router.get('/all', async (req, res) => {
    try {
        const data = await ComplaintMapping.findAll({
                attributes: ["id", "role_id", "cat_id"],
                include: [{model: UserRole, attributes: ["role_name"]}, {model: ComplaintCategory, attributes: ["complaint_name"]}]
            });

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});

/*
    @route          POST api/v1/complaint/mapping/store/
    @desc           Save New Complaint Mapping Data
    @access         Private
 */
router.post('/store', async (req, res) => {
    try {
        const {role_id, cat_id} = req.body;
        const newComplaintMapping = {role_id, cat_id};

        const complaint_mapping = await ComplaintMapping.findAll({where: {role_id, cat_id}});
        if (complaint_mapping.length > 0) return res.status(400).json({msg: 'This Complaint Mapping is already exist!', error: true});

        const status = await ComplaintMapping.create(newComplaintMapping);
        if (!status) return res.status(400).json({msg: 'Please try again with full information!', error: true});

        return res.status(200).json({msg: 'New Complaint Mapping saved successfully.', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});

/*
    @route          get api/v1/complaint/mapping/edit/:id
    @desc           Get Complaint Mapping By ID
    @access         Private
 */
router.get('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const complaint_mapping = await ComplaintMapping.findOne({include: [{model: UserRole, attributes: ["role_name"]}, {model: ComplaintCategory, attributes: ["complaint_name"]}], where: {id}});
        if (!complaint_mapping) return res.status(400).json({msg: 'Complaint Mapping didn\'t found!', error: true});

        return res.status(200).json(complaint_mapping);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});

/*
    @route          POST api/v1/complaint/mapping/update/
    @desc           Update Complaint Mapping Data
    @access         Private
 */
router.post('/update', async (req, res) => {
    try {
        const {id, role_id, cat_id} = req.body;
        const updateComplaintMapping = {role_id, cat_id};

        const status = await ComplaintMapping.findOne({where: {id}});
        if (!status) return res.status(400).json({msg: 'This Complaint Mapping didn\'t found!', error: true});

        const complaint_mapping_exist = await ComplaintMapping.findAll({where: {role_id, cat_id}});
        if (complaint_mapping_exist.length > 0) return res.status(400).json({msg: 'This Complaint Mapping is already exist!', error: true});

        const complaint_mapping = await ComplaintMapping.update(updateComplaintMapping, {where: {id}});
        if (!complaint_mapping) return res.status(400).json({msg: 'Please try again with full information!', error: true});

        return res.status(200).json({msg: 'Complaint Mapping Information updated successfully.', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});

/*
    @route          POST api/v1/complaint/mapping/delete/
    @desc           Delete Complaint Mapping
    @access         Private
 */
router.delete('/delete', async (req, res) => {
    try {
        const {id} = req.body;

        const status = await ComplaintMapping.findOne({where: {id}});
        if (!status) return res.status(400).json({msg: 'This Complaint Mapping didn\'t found!', error: true});

        const complaint_mapping = await ComplaintMapping.destroy({where: {id}});
        if (!complaint_mapping) return res.status(400).json({msg: 'Please try again!', error: true});

        return res.status(200).json({msg: 'One Complaint Mapping deleted successfully!', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});

module.exports = router;