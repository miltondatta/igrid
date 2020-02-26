const {Op} = require("sequelize");
const MisIndicatorMaster = require('../../models/mis_indicatormaster');
const Locations = require('../../models/locations');
const MisIndicatorDetail = require('../../models/mis_indicatordetail');
const {capitalize} = require('../../utility/custom');

exports.index = async (req, res) => {
    try {
        const data = await MisIndicatorDetail.findAll(
            {
                attributes: ["id", "item_no", "indicator_name", "indicatormaster_id", "parent_location_id", "order_by", "is_default"],
                include: [
                    {
                        model: MisIndicatorMaster,
                        attributes: ["indicatormaster_name"]
                    },
                    {
                        model: Locations,
                        attributes: ["location_name"]
                    }],
                order: [['id', 'ASC']]
            }
        );

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
};

exports.store = async (req, res) => {
    try {
        const {item_no, indicator_name, indicatormaster_id, parent_location_id, order_by, is_default} = req.body;
        const newMisIndicatorDetail = {
            item_no,
            indicator_name,
            indicatormaster_id,
            parent_location_id,
            order_by,
            is_default
        };

        const mis_indicator_sub_category_exist_name = await MisIndicatorDetail.findAll({
            where: {
                indicatormaster_id: indicatormaster_id,
                [Op.or]: [
                    {indicator_name: indicator_name},
                    {indicator_name: indicator_name.toLowerCase()},
                    {indicator_name: indicator_name.toUpperCase()},
                    {indicator_name: capitalize(indicator_name)}
                ]
            }
        });

        if (mis_indicator_sub_category_exist_name.length) return res.status(400).json({
            msg: 'This MIS Indicator Name is already exist!',
            error: true
        });

        const mis_indicator_sub_category_exist_item_no = await MisIndicatorDetail.findAll({
            where: {
                indicatormaster_id: indicatormaster_id,
                item_no: item_no
            }
        });

        if (mis_indicator_sub_category_exist_item_no.length) return res.status(400).json({
            msg: 'This MIS Indicator Item No is already exist!',
            error: true
        });

        const status = await MisIndicatorDetail.create(newMisIndicatorDetail);
        if (!status) return res.status(400).json({msg: 'Please try again with full information!', error: true});

        return res.status(200).json({msg: 'New MIS Indicator saved successfully.', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
};

exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const mis_indicator_sub_category = await MisIndicatorDetail.findOne({where: {id}});
        if (!mis_indicator_sub_category) return res.status(400).json({
            msg: 'MIS Indicator didn\'t found!',
            error: true
        });

        return res.status(200).json(mis_indicator_sub_category);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
};

exports.update = async (req, res) => {
    try {
        const {id, item_no, indicator_name, indicatormaster_id, parent_location_id, order_by, is_default} = req.body;
        const updateMisIndicatorDetail = {
            item_no,
            indicator_name,
            indicatormaster_id,
            parent_location_id,
            order_by,
            is_default
        };

        const status = await MisIndicatorDetail.findOne({where: {id}});
        if (!status) return res.status(400).json({msg: 'This MIS Indicator didn\'t found!', error: true});

        const mis_indicator_sub_category = await MisIndicatorDetail.update(updateMisIndicatorDetail, {where: {id}});
        if (!mis_indicator_sub_category) return res.status(400).json({
            msg: 'Please try again with full information!',
            error: true
        });

        return res.status(200).json({
            msg: 'MIS Indicator Information updated successfully.',
            success: true
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
};

exports.delete = async (req, res) => {
    try {
        const {id} = req.body;

        const status = await MisIndicatorDetail.findOne({where: {id}});
        if (!status) return res.status(400).json({msg: 'This MIS Indicator didn\'t found!', error: true});

        const mis_indicator_sub_category = await MisIndicatorDetail.destroy({where: {id}});
        if (!mis_indicator_sub_category) return res.status(400).json({msg: 'Please try again!', error: true});

        return res.status(200).json({msg: 'One MIS Indicator deleted successfully!', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
};

exports.subCategoryByCategoryId = async (req, res) => {
    try {
        const indicatormaster_id = req.params.indicatormaster_id;

        const mis_indicator_sub_category = await MisIndicatorDetail.findAll({where: {indicatormaster_id}});
        return res.status(200).json(mis_indicator_sub_category);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
};
