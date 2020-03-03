const db = require('../config/db');
const Sequelize = require('sequelize');
const locations = require('./locations');
const userroles = require('./userroles');
const user = require('./user');
const assets = require('./asset/assets');

const repair_maintenance = db.define('repair_maintenance', {
    location_id: {
        type: Sequelize.INTEGER,
        references: {
            model: locations,
            key: 'id'
        }
    },
    role_id: {
        type: Sequelize.INTEGER,
        references: {
            model: userroles,
            key: 'id'
        }
    },
    added_by: {
        type: Sequelize.INTEGER,
        references: {
            model: user,
            key: 'id'
        }
    },
    asset_id: {
        type: Sequelize.INTEGER,
        references: {
            model: assets,
            key: 'id'
        }
    },
    estimated_cost: Sequelize.DOUBLE,
    details: Sequelize.STRING,
    file_name: Sequelize.STRING
});

repair_maintenance.belongsTo(locations, {foreignKey: 'location_id'});
repair_maintenance.belongsTo(userroles, {foreignKey: 'role_id'});
repair_maintenance.belongsTo(user, {foreignKey: 'added_by'});
repair_maintenance.belongsTo(assets, {foreignKey: 'asset_id'});

module.exports = repair_maintenance;