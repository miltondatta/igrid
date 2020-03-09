const db                    = require('../../config/db')
const express               = require('express')
const moment                = require('moment');  
const mis_imported_data     = require('../../models/mis_imported_data')
const mis_indicatordetail   = require('../../models/mis_indicatordetail')
const Locations             = require('../../models/locations')
const { getChildLocations, getMasterComponent, getDetailsComponent } = require('../../dbHelper/mis');

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
    columnsString       =  columnsString.slice(0, -1);
    let child_locations =  await getChildLocations(location_id);
    const [results, metadata] = await db.query(`SELECT * FROM
        crosstab ( 
        $$
        SELECT indicatordetails_id, data_date, SUM(data_value) as data_value
        FROM mis_imported_datas 
        WHERE (data_date BETWEEN '${date_from}' AND '${date_to}') AND location_id IN (${child_locations}) 
        GROUP BY indicatordetails_id, data_date order by 1,2 
        $$
        ) AS ct ( indicatordetails_id INT, ${columnsString})`);

       //Get Only Master Component
       let masterComponents     =  await getMasterComponent();     
       let detailsComponents    =  await getDetailsComponent(); 

       let finalResults = {};
       masterComponents.forEach((item) => {
        finalResults[item.indicatormaster_name] = [];
       })     


        if (results.length > 0) {
            results.forEach((item, index) => {
                let detailsObj = detailsComponents.find(d => d.id === item.indicatordetails_id);
                let masterObj  = masterComponents.find(m => m.id === detailsObj.indicatormaster_id);
                item.indicatordetails_id = detailsObj.indicator_name;
                finalResults[masterObj.indicatormaster_name].push(item);
            }); 
            return res.status(200).json(finalResults);
        } else {
            return res.status(200).json({message: "No Data Found"})
        }
    });


    route.get('/mis/basic/report/weekly', async(req, res) => { 
        let location_id = req.query.location_id;
        let date_from   = req.query.date_from;
        let date_to     = req.query.date_to;
        let weekArray   =   [];
    
        var start_date  = moment(date_from);
        var end_date    = moment(date_to);


        console.log(start_date);
        
        while (start_date <= end_date) {
            var weeknumber = moment(start_date, "MM-DD-YYYY").week();
            weekArray["Week" + weeknumber] = moment(start_date).format('YYYY-MM-DD');
            start_date = moment(start_date).add(1, 'days');
        }

    
        let columnsString = "";
        weekArray.forEach((item) => {
            console.log(item);
            columnsString += moment(item).format('MMM_Do') + " FLOAT,";    
        });
        columnsString       =  columnsString.slice(0, -1);
        console.log(columnsString);

        let child_locations =  await getChildLocations(location_id);
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
