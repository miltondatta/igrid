const MisIndicatorMaster = require('../../models/mis_indicatormaster');

exports.index = async (req, res) => {
    try {
        const data = await MisIndicatorMaster.findAll(
            {
                attributes: ["id", "indicatormaster_code", "indicatormaster_name", "description", "is_default"],
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
        const {indicatormaster_code, indicatormaster_name, description, is_default} = req.body;
        const newMisIndicatorMaster = {
            indicatormaster_code: indicatormaster_code,
            indicatormaster_name: indicatormaster_name,
            description: description,
            is_default: is_default
        };

        const mis_indicator_category = await MisIndicatorMaster.findOne({where: {indicatormaster_code}});
        if (mis_indicator_category) return res.status(400).json({
            msg: 'This MIS Indicator Master Code is already exist!',
            error: true
        });

        const status = await MisIndicatorMaster.create(newMisIndicatorMaster);
        if (!status) return res.status(400).json({
            msg: 'Please try again with full information!',
            error: true
        });

        return res.status(200).json({msg: 'New MIS Indicator Category saved successfully.', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
};

exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const mis_indicator_category = await MisIndicatorMaster.findOne({where: {id}});
        if (!mis_indicator_category) return res.status(400).json({
            msg: 'MIS Indicator Category didn\'t found!',
            error: true
        });

        return res.status(200).json(mis_indicator_category);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({msg: err});
    }
};

exports.update = async (req, res) => {
    try {
        const {id, indicatormaster_code, indicatormaster_name, description, is_default} = req.body;

        const updateMisIndicatorMaster = {
            indicatormaster_code,
            indicatormaster_name,
            description,
            is_default
        };

        const status = await MisIndicatorMaster.findOne({where: {id}});
        if (!status) return res.status(400).json({
            msg: 'This MIS Indicator Category didn\'t found!',
            error: true
        });

        const mis_indicator_category = await MisIndicatorMaster.update(updateMisIndicatorMaster, {where: {id}});
        if (!mis_indicator_category) return res.status(400).json({
            msg: 'Please try again with full information!',
            error: true
        });

        return res.status(200).json({
            msg: 'MIS Indicator Category Information updated successfully.',
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

        const status = await MisIndicatorMaster.findOne({where: {id}});
        if (!status) return res.status(400).json({msg: 'This MIS Indicator Category didn\'t found!', error: true});

        const mis_indicator_category = await MisIndicatorMaster.destroy({where: {id}});
        if (!mis_indicator_category) return res.status(400).json({msg: 'Please try again!', error: true});

        return res.status(200).json({msg: 'One MIS Indicator Category deleted successfully!', success: true});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            msg: 'This Indicator Category has sub category. So delete first sub category!',
            error: true,
            fullError: err
        });
    }
};
