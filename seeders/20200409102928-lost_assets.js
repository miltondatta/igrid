'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('lost_assets',[
            {
                "location_id": 8,
                "role_id": 6,
                "added_by": 7,
                "asset_id": 4,
                "incident_type": "Stolen",
                "incident_date": "09-04-10",
                "incident_time": "12:12:00",
                "police_station": "Khilgaon",
                "gd_no": "GD3456789",
                "gd_date": "09-04-10",
                "gd_other_file": ""
            }
        ] , {});
    },
    
    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('lost_assets', null, {});
    }
};
