const db = require('../config/db');
const Sequelize = require('sequelize');
const complaints = require('./complaints');

const complaint_feedback = db.define('complaint_feedback', {
    complaint_id: {
        type: Sequelize.INTEGER,
        references: {
            model: complaints,
            key: 'id'
        }
    },
    feedback: Sequelize.STRING,
    file_name: Sequelize.STRING,
    feedback_by: Sequelize.INTEGER
});

complaint_feedback.belongsTo(complaints, {foreignKey: 'complaint_id'});
module.exports = complaint_feedback;