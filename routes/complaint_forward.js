const express = require('express');
const router = express.Router();
const db = require('../config/db');
const ComplaintForward = require('../models/complaint_forward');
const Complaint = require('../models/complaints');

/*
    @route          GET api/v1/complaint/forward/all/by/credential
    @desc           Get All Complaint Forward Data
    @access         Private
 */
router.post('/all/by/credential', async (req, res) => {
    try {
        const {complaint_id} = req.body;

        const [forward_to_data] = await db.query(`
            select concat(users."firstName", ' ', users."lastName") forward_to
            from complaint_forwards
                     inner join users on complaint_forwards.fw_to = users.id
            where complaint_forwards.complaint_id = ${complaint_id}
        `);

        const [data] = await db.query(`
            select "comCategories".complaint_name,
                "comSubCategories".sub_complaint_name,
                concat(users."firstName", ' ', users."lastName") forward_by,
                complaint_forwards.fw_by,
                complaint_forwards."createdAt"
            from complaint_forwards
                     inner join complaints on complaint_forwards.complaint_id = complaints.id
                     inner join "comCategories" on complaints.complaint_category = "comCategories".id
                     inner join "comSubCategories" on complaints.complaint_sub_category = "comSubCategories".id
                     inner join users on complaint_forwards.fw_by = users.id
            where complaint_forwards.complaint_id = ${complaint_id}
        `);

        let result = data.length > 0 && data.map((item, index) => {
            return {
                complaint_name: item.complaint_name,
                sub_complaint_name: item.sub_complaint_name,
                forward_by: item.forward_by,
                forward_to: forward_to_data[index].forward_to,
                fw_by: item.fw_by,
                createdAt: item.createdAt
            }
        });
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});

/*
    @route          POST api/v1/complaint/forward/store
    @desc           Save New Complaint Forward Data
    @access         Private
 */
router.post('/store', async (req, res) => {
    try {
        const {complaint_id, fw_by, fw_to} = req.body;
        const newForward = {
            complaint_id,
            fw_by,
            fw_to
        };

        const status = await ComplaintForward.create(newForward);
        if(!status) res.status(400).json({msg: 'Please try again with full information!', error: true});

        // status = In Progress
        const complaint_status_update = Complaint.update({assign_to: fw_to, status: 7}, {where: {id: complaint_id}});
        if(!complaint_status_update) res.status(400).json({msg: 'Please try again with full information!', error: true});

        return res.status(200).json({msg: 'Complaint Forwarded successfully.', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});

module.exports = router;