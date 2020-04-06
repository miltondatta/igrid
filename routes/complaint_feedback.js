const express = require('express');
const router = express.Router();
const fs = require('fs');
const dir = './public/complaint_feedbacks';
const db = require('../config/db');
const multer = require('multer');
const Complaint = require('../models/complaints');
const ComplaintFeedback = require('../models/complaint_feedback');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/complaint_feedbacks');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|doc|docx|pdf|xlsx)$/)) {
            return cb(new Error('Only .png, .jpg, .jpeg, .doc, .docx, .pdf, .xlsx format allowed!'));
        }
        cb(null, true);
    }
}).single('file');

/*
    @route          GET api/v1/complaint/feedback/all/by/credential
    @desc           Get All Complaint Feedback Data
    @access         Private
 */
router.post('/all/by/credential', async (req, res) => {
    try {
        const {complaint_id} = req.body;

        const [data] = await db.query(`
        select complaint_feedbacks.id,
           complaint_feedbacks.feedback,
           complaint_feedbacks.file_name,
           "comCategories".complaint_name,
           "comSubCategories".sub_complaint_name,
           concat(users."firstName", ' ', users."lastName") feedback_by
        from complaint_feedbacks
        inner join complaints on complaint_feedbacks.complaint_id = complaints.id
        inner join "comCategories" on complaints.complaint_category = "comCategories".id
        inner join "comSubCategories" on complaints.complaint_sub_category = "comSubCategories".id
        inner join users on complaint_feedbacks.feedback_by = users.id
        where complaint_feedbacks.complaint_id = ${complaint_id}
        `);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});

/*
    @route          POST api/v1/complaint/feedback/store/
    @desc           Save New Complaint Feedback Data
    @access         Private
 */
router.post('/store', async (req, res) => {
    try {
        let file_name = '';
        upload(req, res, (err) => {
            console.log(err);
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
            } else if (err) {
                return res.status(500).json(err);
            }

            file_name = req.file && req.file.filename;
            const {complaint_id, feedback, feedback_by} = req.body;
            const newFeedback = {
                complaint_id,
                feedback,
                feedback_by,
                file_name
            };

            ComplaintFeedback.create(newFeedback).then(resCreate => {
                if (!resCreate) return res.status(400).json({msg: 'Please try again with full information!', error: true});
                return res.status(200).json({msg: 'New Complaint Feedback saved successfully.', success: true});
            }).catch(err => {
                console.error(err.message);
                return res.status(500).json({msg: err});
            });
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});

/*
    @route          get api/v1/complaint/feedback/edit/:id
    @desc           Get Complaint Feedback By ID
    @access         Private
 */
/*router.get('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const complaint_mapping = await ComplaintFeedback.findOne({include: [{model: UserRole, attributes: ["role_name"]}, {model: ComplaintCategory, attributes: ["complaint_name"]}], where: {id}});
        if (!complaint_mapping) return res.status(400).json({msg: 'Complaint Feedback didn\'t found!', error: true});

        return res.status(200).json(complaint_mapping);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});*/

/*
    @route          POST api/v1/complaint/feedback/update/
    @desc           Update Complaint Feedback Data
    @access         Private
 */
/*router.post('/update', async (req, res) => {
    try {
        const {id, role_id, cat_id} = req.body;
        const updateComplaintMapping = {role_id, cat_id};

        const status = await ComplaintFeedback.findOne({where: {id}});
        if (!status) return res.status(400).json({msg: 'This Complaint Feedback didn\'t found!', error: true});

        const complaint_mapping_exist = await ComplaintFeedback.findAll({where: {role_id, cat_id}});
        if (complaint_mapping_exist.length > 0) return res.status(400).json({msg: 'This Complaint Feedback is already exist!', error: true});

        const complaint_mapping = await ComplaintFeedback.update(updateComplaintMapping, {where: {id}});
        if (!complaint_mapping) return res.status(400).json({msg: 'Please try again with full information!', error: true});

        return res.status(200).json({msg: 'Complaint Feedback Information updated successfully.', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});*/

/*
    @route          get api/v1/complaint/feedback/by/:role_id
    @desc           Get Complaint Feedback By Role ID
    @access         Private
 */
/*router.get('/by/:role_id', async (req, res) => {
    try {
        const role_id = req.params.role_id;

        const complaint_mapping = await ComplaintFeedback.findAll({attributes: [], include: [{model: ComplaintCategory, attributes: ["id", "complaint_name"]}], where: {role_id: role_id}});
        if (!complaint_mapping) return res.status(400).json({msg: 'Complaint Feedback didn\'t found!', error: true});

        return res.status(200).json(complaint_mapping);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});*/

/*
    @route          POST api/v1/complaint/feedback/delete/
    @desc           Delete Complaint Feedback
    @access         Private
 */
/*router.delete('/delete', async (req, res) => {
    try {
        const {id} = req.body;

        const status = await ComplaintFeedback.findOne({where: {id}});
        if (!status) return res.status(400).json({msg: 'This Complaint Feedback didn\'t found!', error: true});

        const complaint_mapping = await ComplaintFeedback.destroy({where: {id}});
        if (!complaint_mapping) return res.status(400).json({msg: 'Please try again!', error: true});

        return res.status(200).json({msg: 'One Complaint Feedback deleted successfully!', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});*/

module.exports = router;