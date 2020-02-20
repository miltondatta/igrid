const {Op} = require("sequelize");
const DocumentList = require('../../models/document_list');
const DocumentCategory = require('../../models/document_category');
const DocumentSubCategory = require('../../models/document_sub_category');
const {capitalize} = require('../../utility/custom');
const multer = require('multer');
const fs = require('fs');
const db = require('../../config/db');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/document')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|doc|docx|pdf)$/)) {
            return cb(new Error('Only .png, .jpg, .jpeg, .doc, .docx, .pdf format allowed!'));
        }
        cb(null, true);
    }
}).single('file');

exports.index = async (req, res) => {
    try {
        const data = await DocumentList.findAll(
            {
                attributes: ["id", "category_id", "sub_category_id", "content_type", "title", "circular_no", "description", "file_name", "document_date",
                    "display_notice", "status"],
                include: [{
                    model: DocumentCategory,
                    attributes: ["category_name"]
                }, {
                    model: DocumentSubCategory,
                    attributes: ["sub_category_name"]
                }
                ]
            }
        );

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.store = (req, res) => {
    try {
        let file_name = '';
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
            } else if (err) {
                return res.status(500).json(err);
            }

            file_name = req.file.originalname;
            const {category_id, sub_category_id, content_type, title, circular_no, description, document_date, display_notice, status} = req.body;

            const newDocumentList = {
                category_id: category_id,
                sub_category_id: sub_category_id,
                content_type: content_type,
                title: title,
                circular_no: circular_no,
                description: description,
                file_name: file_name,
                document_date: document_date,
                display_notice: display_notice,
                status: status
            };

            DocumentList.findAll({
                where: {
                    category_id: category_id,
                    sub_category_id: sub_category_id,
                    [Op.or]: [
                        {title: title},
                        {title: title.toLowerCase()},
                        {title: title.toUpperCase()},
                        {title: capitalize(title)}
                    ]
                }
            }).then(resData => {
                if (resData.length > 0) {
                    return res.status(400).json({msg: 'This Document List is already exist!', error: true});
                }

                DocumentList.create(newDocumentList).then(resCreate => {
                    if (!resCreate) return res.status(400).json({
                        msg: 'Please try again with full information!',
                        error: true
                    });
                    return res.status(200).json({msg: 'New Document List saved successfully.', success: true});
                }).catch(err => {
                    console.error(err.message);
                    return res.status(500).json({msg: 'Server Error!'});
                });
            }).catch(err => {
                console.error(err.message);
                return res.status(500).json({msg: 'Server Error!'});
            });
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const document_list = await DocumentList.findOne({where: {id}});
        if (!document_list) return res.status(400).json({msg: 'Document List didn\'t found!', error: true});

        return res.status(200).json(document_list);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.update = (req, res) => {
    try {
        let file_name = '';
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
            } else if (err) {
                return res.status(500).json(err);
            }

            const {id, category_id, sub_category_id, content_type, title, circular_no, description, document_date, display_notice, status} = req.body;

            DocumentList.findOne({where: {id}}).then(resData => {
                file_name = req.file ? req.file.originalname : resData.file_name;

                const updateDocumentList = {
                    category_id,
                    sub_category_id,
                    content_type,
                    title,
                    circular_no,
                    description: description,
                    file_name,
                    document_date,
                    display_notice,
                    status
                };

                if (fs.existsSync('public/document/' + resData.file_name) && (file_name !== resData.file_name)) {
                    fs.unlink('public/document/' + resData.file_name, (err) => {
                        if (err) throw err;
                        console.log('successfully deleted /document/file_name');
                    });
                }

                if (!resData) return res.status(400).json({msg: 'This Document List didn\'t found!', error: true});

                DocumentList.update(updateDocumentList, {where: {id}}).then(resUpdate => {
                    if (!resUpdate) return res.status(400).json({
                        msg: 'Please try again with full information!',
                        error: true
                    });
                    return res.status(200).json({
                        msg: 'Document List Information updated successfully.',
                        success: true
                    });
                }).catch(err => {
                    console.error(err.message);
                    return res.status(500).json({msg: 'Server Error!'});
                });
            }).catch(err => {
                console.error(err.message);
                return res.status(500).json({msg: 'Server Error!'});
            });
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.delete = async (req, res) => {
    try {
        const {id} = req.body;

        const status = await DocumentList.findOne({where: {id}});
        if (!status) return res.status(400).json({msg: 'This Document List didn\'t found!', error: true});

        const document_list = await DocumentList.destroy({where: {id}});
        if (!document_list) return res.status(400).json({msg: 'Please try again!', error: true});

        return res.status(200).json({msg: 'One Document List deleted successfully!', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            msg: 'Please try again!',
            error: true,
            fullError: err
        });
    }
};

exports.documentActiveListData = async (req, res) => {
    try {
        const data = await DocumentList.findAll(
            {
                attributes: ["id", "category_id", "sub_category_id", "content_type", "title", "circular_no", "description", "file_name", "document_date",
                    "display_notice", "status"],
                where: {
                    display_notice: true
                },
                order: [['id', 'DESC']]
            }
        );

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.documentListDataByNotice = async (req, res) => {
    try {
        const data = await DocumentList.findAll(
            {
                attributes: ["id", "category_id", "sub_category_id", "content_type", "title", "circular_no", "description", "file_name", "document_date",
                    "display_notice", "status"],
                where: {
                    content_type: 1,
                    display_notice: true
                },
                order: [['id', 'DESC']]
            }
        );

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.documentListDataByCircular = async (req, res) => {
    try {
        const data = await DocumentList.findAll(
            {
                attributes: ["id", "category_id", "sub_category_id", "content_type", "title", "circular_no", "description", "file_name", "document_date",
                    "display_notice", "status"],
                where: {
                    content_type: 2,
                    display_notice: true
                },
                order: [['id', 'DESC']]
            }
        );

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.documentListDataByCategorySubCategory = async (req, res) => {
    try {
        const {category_id, sub_category_id} = req.body;
        if (!category_id) return res.status(400).json({msg: 'Category Field is required!', error: true});

        let queryObj = {
            category_id
        };

        if (sub_category_id) queryObj.sub_category_id = sub_category_id;

        const data = await DocumentList.findAll(
            {
                attributes: ["id", "category_id", "sub_category_id", "content_type", "title", "circular_no", "description", "file_name", "document_date",
                    "display_notice", "status"],
                where: queryObj
            }
        );

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.documentListSearch = async (req, res) => {
    try {
        const {category_id, sub_category_id, content_type, title, circular_no, keyword} = req.body;
        if (!category_id) return res.status(400).json({msg: 'Category Field is required!', error: true});

        var queryText = '';
        if (category_id) queryText = 'document_lists.category_id = ' + category_id;
        if (sub_category_id) queryText += ' and document_lists.sub_category_id = ' + sub_category_id;
        if (content_type) queryText += ' and document_lists.content_type = ' + content_type;
        if (title) queryText += ' and document_lists.title = ' + "\'" + title + "\'";
        if (circular_no) queryText += ' and document_lists.circular_no = ' + "\'" + circular_no + "\'";

        if (keyword.length > 0) {
            keyword.forEach((value) => {
                queryText += ' or document_lists.title ilike ' + "\'%" + value + "%\'";
                queryText += ' or document_lists.description ilike ' + "\'%" + value + "%\'";
            });
        }

        const data = await db.query(`SELECT document_lists.id,
                                       document_lists.category_id,
                                       document_lists.sub_category_id,
                                       document_lists.content_type,
                                       document_lists.title,
                                       document_lists.circular_no,
                                       document_lists.description,
                                       document_lists.file_name,
                                       document_lists.document_date,
                                       document_lists.display_notice,
                                       document_lists.status,
                                       document_categories.id,
                                       document_categories.category_name,
                                       document_sub_categories.id,
                                       document_sub_categories.sub_category_name
                                FROM document_lists
                                         JOIN document_categories ON document_lists.category_id = document_categories.id
                                         JOIN document_sub_categories ON document_lists.sub_category_id = document_sub_categories.id
                                where ${queryText}`);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.documentListFileDownload = async (req, res) => {
    try {
        let file_path = 'public/document/' + req.params.file_name;
        if (!fs.existsSync(file_path)) return res.status(400).json({
            msg: `${req.params.file_name} File didn\'t found!`,
            error: true
        });

        return res.download(file_path);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.documentListDetailsById = async (req, res) => {
    try {
        const document_list = await DocumentList.findOne({
            where: {id: req.params.id},
            include: [{
                model: DocumentCategory,
                attributes: ["category_name"]
            }, {
                model: DocumentSubCategory,
                attributes: ["sub_category_name"]
            }
            ]
        });
        if (!document_list) return res.status(400).json({msg: 'Document List didn\'t found!', error: true});

        return res.status(200).json(document_list);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};
