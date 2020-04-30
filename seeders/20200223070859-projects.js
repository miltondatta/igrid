'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('projects', [{
            project_name : 'Election Management System',
            project_code : 10,
            description  : 'TAB Based election management system',
            createdAt    : new Date(),
            updatedAt    : new Date()
        }, {
            project_name : 'Rural Development Academy',
            project_code : 11,
            description  : 'Collect data from rural people by TAB and generate different kinds of report on web portal',
            createdAt    : new Date(),
            updatedAt    : new Date()
        }, {
            project_name : 'Travel Management Project',
            project_code : 12,
            description  : 'Ticketing System for agents',
            createdAt    : new Date(),
            updatedAt    : new Date()
        }, {
            project_name : 'Network Project',
            project_code : 13,
            description  : 'Managing System Network',
            createdAt    : new Date(),
            updatedAt    : new Date()
        }, {
            project_name : 'System Application Project',
            project_code : 14,
            description  : 'Managing Full System',
            createdAt    : new Date(),
            updatedAt    : new Date()
        }], {});
    },
    
    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('projects', null, {});
    }
};
