const {Op} = require("sequelize");
const DocumentList = require('../../models/document_list');
const {capitalize} = require('../../utility/custom');

exports.index = async (req, res) => {
    try {
        const data = await DocumentList.findAll(
            {
                attributes: ["id", "category_id", "sub_category_id", "title", "circular_no", "description", "file_name", "document_date",
                    "display_notice", "status"],
                order: [['id', 'DESC']]
            }
        );
        if (!data) return res.status(400).json({msg: 'Something else! Please try again!'});

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.store = async (req, res) => {
    try {
        const {category_id, sub_category_id, title, circular_no, description, file_name, document_date, display_notice, status} = req.body;
        const newDocumentList = {
            category_id: category_id,
            sub_category_id: sub_category_id,
            title: title,
            circular_no: circular_no,
            description: description,
            file_name: file_name,
            document_date: document_date,
            display_notice: display_notice,
            status: status
        };

        const document_list = await DocumentList.findAll({
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
        });
        if (document_list.length > 0) return res.status(400).json({msg: 'This Document List is already exist!'});

        const create_status = await DocumentList.create(newDocumentList);
        if (!create_status) return res.status(400).json({msg: 'Please try again with full information!'});

        return res.status(200).json({msg: 'New Document List saved successfully.'});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const document_list = await DocumentList.findOne({where: {id}});
        if (!document_list) return res.status(400).json({msg: 'Document List didn\'t found!'});

        return res.status(200).json(document_list);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.update = async (req, res) => {
    try {
        const {id, category_id, sub_category_id, title, circular_no, description, file_name, document_date, display_notice, status} = req.body;

        const updateDocumentList = {
            category_id,
            sub_category_id,
            title,
            circular_no,
            description,
            file_name,
            document_date,
            display_notice,
            status
        };

        const update_status = await DocumentList.findOne({where: {id}});
        if (!update_status) return res.status(400).json({msg: 'This Document List didn\'t found!'});

        const document_list = await DocumentList.update(updateDocumentList, {where: {id}});
        if (!document_list) return res.status(400).json({msg: 'Please try again with full information!'});

        return res.status(200).json({msg: 'Document List Information updated successfully.'});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.delete = async (req, res) => {
    try {
        const {id} = req.body;

        const status = await DocumentList.findOne({where: {id}});
        if (!status) return res.status(400).json({msg: 'This Document List didn\'t found!'});

        const document_list = await DocumentList.destroy({where: {id}});
        if (!document_list) return res.status(400).json({msg: 'Please try again!'});

        return res.status(200).json({msg: 'One Document List deleted successfully!'});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};
