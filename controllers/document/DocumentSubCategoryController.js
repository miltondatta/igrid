const {Op} = require("sequelize");
const DocumentCategory = require('../../models/document_category');
const DocumentSubCategory = require('../../models/document_sub_category');
const {capitalize} = require('../../utility/custom');

exports.index = async (req, res) => {
    try {
        const data = await DocumentSubCategory.findAll(
            {
                attributes: ["id", "category_id", "sub_category_name"],
                include: [{
                    model: DocumentCategory,
                    attributes: ["category_name"]
                }],
                order: [['id', 'DESC']]
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
        const {category_id, sub_category_name} = req.body;
        const newDocumentSubCategory = {
            category_id: category_id,
            sub_category_name: sub_category_name
        };

        const document_sub_category = await DocumentSubCategory.findAll({
            where: {
                category_id: category_id,
                [Op.or]: [
                    {sub_category_name: sub_category_name},
                    {sub_category_name: sub_category_name.toLowerCase()},
                    {sub_category_name: sub_category_name.toUpperCase()},
                    {sub_category_name: capitalize(sub_category_name)}
                ]
            }
        });
        if (document_sub_category.length > 0) return res.status(400).json({msg: 'This Document Sub Category is already exist!', error: true});

        const status = await DocumentSubCategory.create(newDocumentSubCategory);
        if (!status) return res.status(400).json({msg: 'Please try again with full information!', error: true});

        return res.status(200).json({msg: 'New Document Sub Category saved successfully.', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const document_sub_category = await DocumentSubCategory.findOne({where: {id}});
        if (!document_sub_category) return res.status(400).json({msg: 'Document Sub Category didn\'t found!', error: true});

        return res.status(200).json(document_sub_category);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.update = async (req, res) => {
    try {
        const {id, category_id, sub_category_name} = req.body;

        const updateDocumentSubCategory = {
            category_id: category_id,
            sub_category_name: sub_category_name
        };

        const status = await DocumentSubCategory.findOne({where: {id}});
        if (!status) return res.status(400).json({msg: 'This Document Sub Category didn\'t found!', error: true});

        const document_sub_category = await DocumentSubCategory.update(updateDocumentSubCategory, {where: {id}});
        if (!document_sub_category) return res.status(400).json({msg: 'Please try again with full information!', error: true});

        return res.status(200).json({msg: 'Document Sub Category Information updated successfully.', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};

exports.delete = async (req, res) => {
    try {
        const {id} = req.body;

        const status = await DocumentSubCategory.findOne({where: {id}});
        if (!status) return res.status(400).json({msg: 'This Document Sub Category didn\'t found!', error: true});

        const document_sub_category = await DocumentSubCategory.destroy({where: {id}});
        if (!document_sub_category) return res.status(400).json({msg: 'Please try again!', error: true});

        return res.status(200).json({msg: 'One Document Sub Category deleted successfully!', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            msg: 'This Sub Category has document. So delete first document!',
            error: true,
            fullError: err
        });
    }
};

exports.subCategoryByCategoryId = async (req, res) => {
    try {
        const category_id = req.params.category_id;

        const document_sub_category = await DocumentSubCategory.findAll({where: {category_id}});
        return res.status(200).json(document_sub_category);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: 'Server Error!'});
    }
};
