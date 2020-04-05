const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const Complaint = require('../models/complaints');
const ComplaintCategory = require('../models/comcategory');
const UserRole = require('../models/userroles');
const fs = require('fs');
const dir = './public/complaints';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/complaints');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname);
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
    @route          GET api/v1/complaint/mapping/all/
    @desc           Get All Complaint Mapping Data
    @access         Private
 */
/*router.get('/all', async (req, res) => {
    try {
        const data = await Complaint.findAll({
            attributes: ["id", "role_id", "cat_id"],
            include: [{model: UserRole, attributes: ["role_name"]}, {model: ComplaintCategory, attributes: ["complaint_name"]}]
        });

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});*/

/*
    @route          POST api/v1/complaint/mapping/store/
    @desc           Save New Complaint Mapping Data
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
            const {created_by, location_id, role_id, complaint_category, complaint_sub_category, problem_details, asset_id} = req.body;

            db.query(`select complaint_no from complaints where id = (select max(id) from complaints)`)
                .then(resCom => {
                    let complaint_no = '';
                    complaint_no = resCom[0].length > 0 && resCom[0][0].complaint_no;
                    if (complaint_no && complaint_no !== "undefined") {
                        complaint_no = 'c-' + (parseInt(complaint_no.split("-")[1]) + 1);
                    } else {
                        complaint_no = 'c-' + 1001;
                    }

                    const newComplaint = {
                        complaint_no,
                        created_by,
                        location_id,
                        role_id,
                        complaint_category,
                        complaint_sub_category,
                        problem_details,
                        asset_id: asset_id ? asset_id : null,
                        file_name,
                        status: 6 // Pending status
                    };

                    Complaint.create(newComplaint).then(resCreate => {
                        if (!resCreate) return res.status(400).json({msg: 'Please try again with full information!', error: true});
                        return res.status(200).json({msg: 'New Complaint saved successfully.', success: true});
                    }).catch(err => {
                        console.error(err.message);
                        return res.status(500).json({msg: err});
                    });
                })
                .catch(err => {
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
    @route          get api/v1/complaint/mapping/edit/:id
    @desc           Get Complaint Mapping By ID
    @access         Private
 */
/*router.get('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const complaint_mapping = await Complaint.findOne({include: [{model: UserRole, attributes: ["role_name"]}, {model: ComplaintCategory, attributes: ["complaint_name"]}], where: {id}});
        if (!complaint_mapping) return res.status(400).json({msg: 'Complaint Mapping didn\'t found!', error: true});

        return res.status(200).json(complaint_mapping);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});*/

/*
    @route          POST api/v1/complaint/mapping/update/
    @desc           Update Complaint Mapping Data
    @access         Private
 */
/*router.post('/update', async (req, res) => {
    try {
        const {id, role_id, cat_id} = req.body;
        const updateComplaintMapping = {role_id, cat_id};

        const status = await Complaint.findOne({where: {id}});
        if (!status) return res.status(400).json({msg: 'This Complaint Mapping didn\'t found!', error: true});

        const complaint_mapping_exist = await Complaint.findAll({where: {role_id, cat_id}});
        if (complaint_mapping_exist.length > 0) return res.status(400).json({msg: 'This Complaint Mapping is already exist!', error: true});

        const complaint_mapping = await Complaint.update(updateComplaintMapping, {where: {id}});
        if (!complaint_mapping) return res.status(400).json({msg: 'Please try again with full information!', error: true});

        return res.status(200).json({msg: 'Complaint Mapping Information updated successfully.', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});*/

/*
    @route          POST api/v1/complaint/mapping/delete/
    @desc           Delete Complaint Mapping
    @access         Private
 */
/*router.delete('/delete', async (req, res) => {
    try {
        const {id} = req.body;

        const status = await Complaint.findOne({where: {id}});
        if (!status) return res.status(400).json({msg: 'This Complaint Mapping didn\'t found!', error: true});

        const complaint_mapping = await Complaint.destroy({where: {id}});
        if (!complaint_mapping) return res.status(400).json({msg: 'Please try again!', error: true});

        return res.status(200).json({msg: 'One Complaint Mapping deleted successfully!', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});*/

module.exports = router;