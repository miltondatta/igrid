const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const Complaint = require('../models/complaints');
const fs = require('fs');
const dir = './public/complaints';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/complaints');
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
    @route          GET api/v1/complaint/all/by/credentials
    @desc           Get All Complaint Data
    @access         Private
 */
router.post('/all/by/credentials', async (req, res) => {
    try {
        const {user_id, assign_to} = req.body;

        let queryText = '';
        if (user_id) queryText = 'where complaints.created_by = ' + user_id;
        if (assign_to) queryText = 'where complaints.assign_to = ' + assign_to;

        let join_text = '';
        if (user_id) join_text = 'left join users on complaints.assign_to = users.id';
        if (assign_to) join_text = 'left join users on complaints.created_by = users.id';

        const [data] = await db.query(`select complaints.id,
                                   concat(users."firstName", ' ', users."lastName") as assign_to,
                                   complaints.complaint_no,
                                   "comCategories".complaint_name,
                                   "comSubCategories".sub_complaint_name,
                                   complaints.problem_details,
                                   products.product_name,
                                   assets.product_serial,
                                   complaints.file_name,
                                   statuses.status_name,
                                   complaints."createdAt"
                            from complaints
                                     inner join "comCategories" on complaints.complaint_category = "comCategories".id
                                     inner join "comSubCategories" on complaints.complaint_sub_category = "comSubCategories".id
                                     inner join statuses on complaints.status = statuses.id
                                     left join assets on complaints.asset_id = assets.id
                                     left join products on assets.product_id = products.id
                                     ${join_text}
                                    ${queryText}`);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});

/*
    @route          POST api/v1/complaint/store/
    @desc           Save New Complaint Data
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

            db.query(`select complaint_no
                      from complaints
                      where id = (select max(id) from complaints)`)
                .then(resCom => {
                    let complaint_no = '';
                    complaint_no = resCom[0].length > 0 && resCom[0][0].complaint_no;
                    if (complaint_no && complaint_no !== "undefined") {
                        complaint_no = 'c-' + (parseInt(complaint_no.split("-")[1]) + 1);
                    } else {
                        complaint_no = 'c-' + 1001;
                    }

                    db.query(`
                        select user_id
                        from user_associate_roles
                        where role_id = (
                            select role_id
                            from complaint_mappings
                            where cat_id = ${complaint_category}
                            limit 1
                        ) limit 1`)
                        .then(resUser => {
                            const assign_to = resUser[0].length > 0 ? resUser[0][0].user_id : null;
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
                                assign_to,
                                status: 6 // Pending status
                            };

                            Complaint.create(newComplaint).then(resCreate => {
                                if (!resCreate) return res.status(400).json({
                                    msg: 'Please try again with full information!',
                                    error: true
                                });
                                return res.status(200).json({msg: 'New Complaint saved successfully.', success: true});
                            }).catch(err => {
                                console.error(err.message);
                                return res.status(500).json({msg: err});
                            });
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
    @route          get api/v1/complaint/details/:id
    @desc           Get Complaint By ID
    @access         Private
 */
router.get('/details/:id/:user_id', async (req, res) => {
    try {
        const {id, user_id} = req.params;
        let queryText, join_text, is_assign_to = '';
        queryText = 'where complaints.id = ' + id;

        const complaint = await Complaint.findOne({where: {id: id, created_by: user_id}});
        if (complaint) {
            queryText += ' and complaints.created_by = ' + user_id;
            join_text = 'left join users on complaints.assign_to = users.id';
            is_assign_to = true
        } else {
            queryText += ' and complaints.assign_to = ' + user_id;
            join_text = 'left join users on complaints.created_by = users.id';
            is_assign_to = false
        }

        const [data] = await db.query(`select complaints.id,
                                   concat(users."firstName", ' ', users."lastName") as assign_to,
                                   complaints.complaint_no,
                                   "comCategories".complaint_name,
                                   "comSubCategories".sub_complaint_name,
                                   complaints.problem_details,
                                   products.product_name,
                                   assets.product_serial,
                                   complaints.file_name,
                                   statuses.status_name,
                                   complaints.status,
                                   complaints."createdAt",
                                   ${is_assign_to}
                            from complaints
                                     inner join "comCategories" on complaints.complaint_category = "comCategories".id
                                     inner join "comSubCategories" on complaints.complaint_sub_category = "comSubCategories".id
                                     inner join statuses on complaints.status = statuses.id
                                     left join assets on complaints.asset_id = assets.id
                                     left join products on assets.product_id = products.id
                                     ${join_text}
                                    ${queryText}`);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});

/*
    @route          GET api/v1/complaint/pdf/:file_name
    @desc           Serve Pdf file as Blob Data
    @access         Private
 */
router.get("/pdf/:file_name", async (req, res) => {
    try {
        let file_path = 'public/complaints/' + req.params.file_name;
        if (!fs.existsSync(file_path)) return res.status(400).json({
            msg: `${req.params.file_name} File didn\'t found!`,
            error: true
        });

        let file = fs.createReadStream("public/complaints/" + req.params.file_name);
        return file.pipe(res);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});

/*
    @route          GET api/v1/complaint/download/:file_name
    @desc           Download Complaint File
    @access         Private
 */
router.get('/download/:file_name', async (req, res) => {
    try {
        let file_path = 'public/complaints/' + req.params.file_name;
        if (!fs.existsSync(file_path)) return res.status(400).json({msg: `File didn\'t found!`, error: true});

        return res.download(file_path);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
});

/*
    @route          POST api/v1/complaint/update/
    @desc           Update Complaint Data
    @access         Private
 */
router.post('/update', async (req, res) => {
    try {
        const {id, solution_details, solved_by} = req.body;
        const updateComplaint = {solution_details, solved_by, solved_at: new Date(), status: 8}; // status = Solved

        const status = await Complaint.findOne({where: {id}});
        if (!status) return res.status(400).json({msg: 'This Complaint didn\'t found!', error: true});

        const complaint = await Complaint.update(updateComplaint, {where: {id}});
        if (!complaint) return res.status(400).json({msg: 'Please try again with full information!', error: true});

        return res.status(200).json({msg: 'Complaint closed successfully.', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});

/*
    @route          POST api/v1/complaint/update/
    @desc           Update Complaint Data
    @access         Private
 */
router.post('/report/between', async (req, res) => {
    try {
        const {date_from, date_to, user_id} = req.body;
        const [data] = await db.query(`
            select complaints.complaint_no,
                   "comCategories".complaint_name,
                   "comSubCategories".sub_complaint_name,
                   products.product_name,
                   assets.product_serial,
                   statuses.status_name,
                   complaints.solved_by,
                   complaints.solved_at,
                   complaints."createdAt"
            from complaints
                     inner join "comCategories" on complaints.complaint_category = "comCategories".id
                     inner join "comSubCategories" on complaints.complaint_sub_category = "comSubCategories".id
                     inner join statuses on complaints.status = statuses.id
                     left join assets on complaints.asset_id = assets.id
                     left join products on assets.product_id = products.id
            where complaints."createdAt" >= '${date_from}' and 
                                complaints."createdAt" <= '${date_to}' 
            and complaints.created_by = ${user_id}
        `);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
});

module.exports = router;