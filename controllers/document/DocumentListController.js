const {Op} = require("sequelize");
const DocumentList = require('../../models/document_list');
const {capitalize} = require('../../utility/custom');
const multer = require('multer');
const fs = require('fs');

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
}).single('file_name');

exports.index = async (req, res) => {
    try {
        const data = await DocumentList.findAll(
            {
                attributes: ["id", "category_id", "sub_category_id", "content_type", "title", "circular_no", "description", "file_name", "document_date",
                    "display_notice", "status"],
                order: [['id', 'DESC']]
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
                    if (!resCreate) return res.status(400).json({msg: 'Please try again with full information!', error: true});
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

            file_name = req.file.originalname;
            const {id, category_id, sub_category_id, content_type, title, circular_no, description, document_date, display_notice, status} = req.body;

            const updateDocumentList = {
                category_id,
                sub_category_id,
                content_type,
                title,
                circular_no,
                description,
                file_name,
                document_date,
                display_notice,
                status
            };

            DocumentList.findOne({where: {id}}).then(resData => {
                if (fs.existsSync('public/document/' + resData.file_name) && (file_name != resData.file_name)) {
                    fs.unlink('public/document/' + resData.file_name, (err) => {
                        if (err) throw err;
                        console.log('successfully deleted /document/file_name');
                    });
                }

                if (!resData) return res.status(400).json({msg: 'This Document List didn\'t found!', error: true});

                DocumentList.update(updateDocumentList, {where: {id}}).then(resUpdate => {
                    if (!resUpdate) return res.status(400).json({msg: 'Please try again with full information!', error: true});
                    return res.status(200).json({msg: 'Document List Information updated successfully.', success: true});
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
        return res.status(500).json({msg: 'Server Error!'});
    }
};
