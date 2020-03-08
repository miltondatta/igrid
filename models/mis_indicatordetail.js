const db = require('../config/db');
const Sequelize = require('sequelize');
const locations = require('./locations');

const mis_indicatordetail = db.define('mis_indicatordetail', {
    item_no: Sequelize.STRING,
    indicator_name: Sequelize.STRING,
    indicatormaster_id: {
        type: Sequelize.INTEGER
    },
    parent_location_id: {
      type: Sequelize.INTEGER,
      references: {
        model: locations,
        key: 'id'
      }
    },
    order_by: Sequelize.INTEGER,
    is_default: Sequelize.BOOLEAN
});

mis_indicatordetail.belongsTo(locations, {foreignKey: 'parent_location_id'});
module.exports = mis_indicatordetail;