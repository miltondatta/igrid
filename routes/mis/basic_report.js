const db                    = require('../../config/db')
const express               = require('express')
const moment                = require('moment');  
const mis_imported_data     = require('../../models/mis_imported_data')
const mis_indicatordetail   = require('../../models/mis_indicatordetail')
const Locations             = require('../../models/locations')
  


const route = express.Router();

route.get('/mis/basic/report/daily', async(req, res) => { 
    let location_id = req.query.location_id;
    let date_from   = req.query.date_from;
    let date_to     = req.query.date_to;
    let dateArray   =   [];

    var start_date  = moment(date_from);
    var end_date    = moment(date_to);
    while (start_date <= end_date) {
        dateArray.push(moment(start_date).format('YYYY-MM-DD'))
        start_date = moment(start_date).add(1, 'days');
    }

    let columnsString = "";
    dateArray.forEach((item) => {
        columnsString += moment(item).format('MMM_Do') + " FLOAT,";    
    });
    columnsString       =   columnsString.slice(0, -1);
    let child_locations = [];

    //Get all last child of this location, including this id
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

      locations.forEach((item, index) => {
          child_locations.push(item.id);
      });  
      child_locations   =   child_locations.join(",");

    const [results, metadata] = await db.query(`SELECT * FROM
        crosstab ( 
        $$
        SELECT mis_indicatordetails.indicator_name, data_date, SUM(data_value) as data_value
        FROM mis_indicatordetails LEFT JOIN mis_imported_datas ON mis_indicatordetails.id = mis_imported_datas.indicatordetails_id 
        WHERE (data_date BETWEEN '${date_from}' AND '${date_to}') AND location_id IN (${child_locations})  OR data_date IS NULL
        GROUP BY mis_indicatordetails.indicator_name, data_date order by 1,2 
        $$
        ) AS ct ( indicator VARCHAR, ${columnsString})`)
        if (results.length > 0) {
            res.status(200).json(results)
        } else {
            res.status(200).json({message: "No Data Found"})
        }
    });

module.exports = route