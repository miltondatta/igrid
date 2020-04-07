const express = require('express');
const router = express.Router();
const fs = require('fs');
const dir = './public/complaint_feedbacks';
const db = require('../config/db');
const multer = require('multer');
const ComplaintFeedback = require('../models/complaint_feedback');
const Complaint = require('../models/complaints');

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
           concat(users."firstName", ' ', users."lastName") feedback_by,
               complaint_feedbacks."createdAt"
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
                // status = In Progress
                Complaint.update({status: 7}, {where: {id: complaint_id}})
                    .then(resUpdate => {
                        if(!resUpdate) res.status(400).json({msg: 'Please try again with full information!', error: true});
                        return res.status(200).json({msg: 'New Complaint Feedback saved successfully.', success: true});
                    }).catch(err => {
                    console.error(err.message);
                    return res.status(500).json({msg: err});
                });
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
    @route          GET api/v1/complaint/feedback/download/:file_name
    @desc           Download Complaint Feedback File
    @access         Private
 */
router.get('/download/:file_name', async (req, res) => {
    try {
        let file_path = 'public/complaint_feedbacks/' + req.params.file_name;
        if (!fs.existsSync(file_path)) return res.status(400).json({msg: `File didn\'t found!`, error: true});

        return res.download(file_path);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
});

module.exports = router;