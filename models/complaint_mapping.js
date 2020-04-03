const db = require('../config/db');
const Sequelize = require('sequelize');
const comcategory = require('./comcategory');
const userroles = require('./userroles');

const complaint_mapping = db.define('complaint_mapping', {
    role_id: {
        type: Sequelize.INTEGER,
        references: {
            model: userroles,
            key: 'id'
        }
    },
    cat_id: {
        type: Sequelize.INTEGER,
        references: {
            model: comcategory,
            key: 'id'
        }
    }
});

complaint_mapping.belongsTo(userroles, {foreignKey: 'role_id'});
complaint_mapping.belongsTo(comcategory, {foreignKey: 'cat_id'});

module.exports = complaint_mapping;