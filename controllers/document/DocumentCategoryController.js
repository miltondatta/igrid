const {Op} = require("sequelize");
const DocumentCategory = require('../../models/document_category');
const {capitalize} = require('../../utility/custom');

exports.index = async (req, res) => {
    try {
        const data = await DocumentCategory.findAll(
            {
                attributes: ["id", "category_name"],
                order: [['id', 'ASC']]
            }
        );

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.store = async (req, res) => {
    try {
        const {category_name} = req.body;
        const newDocumentCategory = {
            category_name: category_name
        };

        const document_category = await DocumentCategory.findAll({
            where: {
                [Op.or]: [
                    {category_name: category_name},
                    {category_name: category_name.toLowerCase()},
                    {category_name: category_name.toUpperCase()},
                    {category_name: capitalize(category_name)}
                ]
            }
        });
        if (document_category.length > 0) return res.status(400).json({
            msg: 'This Document Category is already exist!',
            error: true
        });

        const status = await DocumentCategory.create(newDocumentCategory);
        if (!status) return res.status(400).json({
            msg: 'Please try again with full information!',
            error: true
        });

        return res.status(200).json({msg: 'New Document Category saved successfully.', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const document_category = await DocumentCategory.findOne({where: {id}});
        if (!document_category) return res.status(400).json({msg: 'Document Category didn\'t found!', error: true});

        return res.status(200).json(document_category);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.update = async (req, res) => {
    try {
        const {id, category_name} = req.body;

        const updateDocumentCategory = {
            category_name: category_name
        };

        const status = await DocumentCategory.findOne({where: {id}});
        if (!status) return res.status(400).json({
            msg: 'This Document Category didn\'t found!',
            error: true
        });

        const document_category = await DocumentCategory.update(updateDocumentCategory, {where: {id}});
        if (!document_category) return res.status(400).json({
            msg: 'Please try again with full information!',
            error: true
        });

        return res.status(200).json({
            msg: 'Document Category Information updated successfully.',
            success: true
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.delete = async (req, res) => {
    try {
        const {id} = req.body;

        const status = await DocumentCategory.findOne({where: {id}});
        if (!status) return res.status(400).json({msg: 'This Document Category didn\'t found!', error: true});

        const document_category = await DocumentCategory.destroy({where: {id}});
        if (!document_category) return res.status(400).json({msg: 'Please try again!', error: true});

        return res.status(200).json({msg: 'One Document Category deleted successfully!', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            msg: 'This Category has sub category. So delete first sub category!',
            error: true,
            fullError: err
        });
    }
};
