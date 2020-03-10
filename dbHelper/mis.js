const db                    = require('../config/db')
const express               = require('express')

const getChildLocations = async (location_id) => {
    let child_locations = [];
    const [locations, metadata_location] = await db.query(`with recursive cte (id, hierarchy, parent_id) as (
        SELECT     id,
                   hierarchy,
                   parent_id
        FROM       locations
        WHERE      id = ${location_id}
        UNION ALL
        SELECT     l.id,
                   l.hierarchy,	
                   l.parent_id
        FROM       locations l
        INNER JOIN cte
                ON l.parent_id = cte.id			
      )
      select id from cte WHERE hierarchy = (SELECT MAX(location_hierarchies.id) FROM location_hierarchies)`);
      if(locations.length) {
        locations.forEach((item, index) => {
            child_locations.push(item.id);
        });  
        child_locations   =   child_locations.join(",");
     }
    return child_locations;
}; 


const getMasterComponent = async () => {
    let masterComponents = [];
    const [components, metadata_location] = await db.query(`SELECT * FROM mis_indicatormasters`);
      if(components.length) {
        components.forEach((item, index) => {
            masterComponents.push(item);
        });  
     }
    return masterComponents;
}; 

const getDetailsComponent = async () => {
    let detailsComponent = [];
    const [components, metadata_location] = await db.query(`SELECT * FROM mis_indicatordetails`);
      if(components.length) {
        components.forEach((item, index) => {
            detailsComponent.push(item);
        });  
     }
    return detailsComponent;
};


module.exports = {
    getChildLocations, getMasterComponent, getDetailsComponent 
};