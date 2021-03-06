const {Op} = require("sequelize");
const DocumentList = require('../../models/document_list');
const DocumentCategory = require('../../models/document_category');
const DocumentSubCategory = require('../../models/document_sub_category');
const {capitalize} = require('../../utility/custom');
const multer = require('multer');
const fs = require('fs');
const db = require('../../config/db');
const moment = require('moment');
const keywordExtractor = require('keyword-extractor');
const dir = './public/document';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/document')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname)
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

exports.index = async (req, res) => {
    try {
        const data = await DocumentList.findAll(
            {
                attributes: ["id", "category_id", "sub_category_id", "content_type", "title", "circular_no", "description", "keyword", "file_name", "document_date",
                    "display_notice", "status"],
                order: [['id', 'ASC']],
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
            console.log(err);
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
            } else if (err) {
                return res.status(500).json(err);
            }

            file_name = req.file.filename;
            const {category_id, sub_category_id, content_type, title, circular_no, description, document_date, display_notice, status} = req.body;

            const keyword_options = {
                language: 'english',
                remove_digits: true,
                return_changed_case: true,
                remove_duplicates: true
            };

            const extraction_result = ',' + keywordExtractor.extract((title + ' ' + description), keyword_options).filter(value => !value.includes("'")).join() + ',';
            const newDocumentList = {
                category_id: category_id,
                sub_category_id: sub_category_id,
                content_type: content_type,
                title: title,
                circular_no: circular_no,
                description: description,
                keyword: extraction_result,
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
                file_name = req.file ? req.file.filename : resData.file_name;
                const keyword_options = {
                    language: 'english',
                    remove_digits: true,
                    return_changed_case: true,
                    remove_duplicates: true
                };

                const extraction_result = ',' + keywordExtractor.extract((title + ' ' + description), keyword_options).filter(value => !value.includes("'")).join() + ',';
                const updateDocumentList = {
                    category_id,
                    sub_category_id,
                    content_type,
                    title,
                    circular_no,
                    description,
                    keyword: extraction_result,
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

        if (fs.existsSync('public/document/' + status.file_name)) {
            fs.unlink('public/document/' + status.file_name, (err) => {
                if (err) throw err;
                console.log('successfully deleted ' + status.file_name);
            });
        }

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
        let queryObj = {
            content_type: 1,
            display_notice: true
        };

        if (req.params.date) {
            const document_date = {
                document_date: {
                    [Op.gte]: req.params.date
                }
            };
            Object.assign(queryObj, document_date);
        }

        const data = await DocumentList.findAll(
            {
                attributes: ["id", "category_id", "sub_category_id", "content_type", "title", "circular_no", "description", "file_name", "document_date",
                    "display_notice", "status"],
                where: queryObj,
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
        const {category_id, sub_category_id, content_type, title, circular_no, from_date, to_date, keyword} = req.body;

        let queryText = '';
        if (category_id) queryText = 'and document_lists.category_id = ' + category_id;
        if (sub_category_id) queryText += ' and document_lists.sub_category_id = ' + sub_category_id;
        if (content_type) queryText += ' and document_lists.content_type = ' + content_type;
        if (title) queryText += ' and document_lists.title = ' + "\'" + title + "\'";
        if (circular_no) queryText += ' and document_lists.circular_no = ' + "\'" + circular_no + "\'";

        if (keyword && keyword.length > 0) {
            keyword.forEach((value, index) => {
                const operator = index === 0 ? ' and (' : ' or ';
                const close_parenthesis = (index === keyword.length -1 ) ? ')' : '';
                queryText += operator + 'document_lists.keyword ilike ' + "\'%," + value + ",%\'" + close_parenthesis;
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
                                       document_categories.category_name,
                                       document_sub_categories.sub_category_name
                                FROM document_lists
                                         JOIN document_categories ON document_lists.category_id = document_categories.id
                                         JOIN document_sub_categories ON document_lists.sub_category_id = document_sub_categories.id
                                where document_lists.document_date >= '${from_date}' and 
                                document_lists.document_date <= '${to_date}' ${queryText}`);

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({err});
    }
};

exports.documentListFileDownload = async (req, res) => {
    try {
        let file_path = 'public/document/' + req.params.file_name;
        if (!fs.existsSync(file_path)) return res.status(400).json({
            msg: `File didn\'t found!`,
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

exports.documentListDetailsPdf = async (req, res) => {
    try {
        let file_path = 'public/document/' + req.params.file_name;
        if (!fs.existsSync(file_path)) return res.status(400).json({
            msg: `${req.params.file_name} File didn\'t found!`,
            error: true
        });

        let file = fs.createReadStream("public/document/" + req.params.file_name);
        return file.pipe(res);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
};

exports.documentListKeywordByCategoryAndSubCategory = async (req, res) => {
    try {
        const {category_id, sub_category_id} = req.body;

        let queryText = '';
        if (category_id) queryText = 'where document_lists.category_id = ' + category_id;
        if (sub_category_id) queryText += ' and document_lists.sub_category_id = ' + sub_category_id;

        const data = await db.query(`SELECT document_lists.keyword
                                FROM document_lists ${queryText}`);

        return res.status(200).json(data[0]);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({err});
    }
};
