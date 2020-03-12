const db                    = require('../../config/db')
const express               = require('express')
const moment                = require('moment');  
const mis_imported_data     = require('../../models/mis_imported_data')
const mis_indicatordetail   = require('../../models/mis_indicatordetail')
const Locations             = require('../../models/locations')
const { getChildLocations, getMasterComponent, getDetailsComponent } = require('../../dbHelper/mis');

const route = express.Router();


const processFinalResult = async (results) => {
    let masterComponents    = await getMasterComponent();
    let detailsComponents   = await getDetailsComponent();
    let finalResults = {};
    masterComponents.forEach((item) => {
        finalResults[item.indicatormaster_name] = [];
    })

    if (results.length > 0) {
        results.forEach((item, index) => {
            let detailsObj = detailsComponents.find(d => d.id === item.indicatordetails_id);
            let masterObj = masterComponents.find(m => m.id === detailsObj.indicatormaster_id);
            item.indicatordetails_id = detailsObj.indicator_name;
            finalResults[masterObj.indicatormaster_name].push(item);
        });
    }
    return finalResults;
};


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
    
        if (results.length > 0) {
            let finalResults = await processFinalResult(results);
            return res.status(200).json(finalResults);
        } else {
            return res.status(200).json({ message: "No Data Found" })
        }
    });


    route.get('/mis/basic/report/weekly', async(req, res) => { 
        let location_id = req.query.location_id;
        let date_from   = req.query.date_from;
        let date_to     = req.query.date_to;
        let weekArray   =   [];
    
        var start_date  = moment(date_from);
        var end_date    = moment(date_to);
        
        while (start_date <= end_date) {
            var weeknumber          = moment(start_date, "MM-DD-YYYY").week();
            weekArray[weeknumber]   = moment(start_date).format('YYYY-MM-DD');
            start_date              = moment(start_date).add(1, 'days');
        }
    
        let columnsString   = "";
        let dateIn          = "";
        weekArray.forEach((item, index) => {
            columnsString += "Week_" + index + "_" + moment(item).format('MMM')  + " FLOAT,";   
            dateIn        += "'" + item + "',";     
        });
        columnsString      =  columnsString.slice(0, -1);
        dateIn             =  dateIn.slice(0, -1);

        let child_locations         =  await getChildLocations(location_id);
        const [results, metadata]   =  await db.query(`SELECT * FROM
            crosstab ( 
            $$
            SELECT indicatordetails_id, data_date, SUM(data_value) as data_value
            FROM mis_imported_datas 
            WHERE data_date IN (${dateIn}) AND location_id IN (${child_locations}) 
            GROUP BY indicatordetails_id, data_date order by 1,2 
            $$
            ) AS ct ( indicatordetails_id INT, ${columnsString})`);
            
            if (results.length > 0) {
                let finalResults = await processFinalResult(results);
                return res.status(200).json(finalResults);
            } else {
                return res.status(200).json({ message: "No Data Found" })
            }
        });


    route.get('/mis/basic/report/monthly', async(req, res) => { 
        let location_id = req.query.location_id;
        let date_from   = req.query.date_from;
        let date_to     = req.query.date_to;
        let monthArray  =   [];
    
        var start_date  = moment(date_from).endOf('month').format('YYYY-MM-DD');
        var end_date    = moment(date_to).endOf('month').format('YYYY-MM-DD');
        
        while (start_date <= end_date) {
            monthArray.push(start_date);
            start_date              = moment(start_date).add(1, 'M').endOf('month').format('YYYY-MM-DD');
        }
    
        let columnsString   = "";
        let dateIn          = "";
        monthArray.forEach((item, index) => {
            columnsString +=  moment(item).format('MMM_YY') + " FLOAT,";
            dateIn        += "'" + item + "',";     
        });
        columnsString      =  columnsString.slice(0, -1);
        dateIn             =  dateIn.slice(0, -1);

        let child_locations         =  await getChildLocations(location_id);
        const [results, metadata]   = await db.query(`SELECT * FROM
            crosstab ( 
            $$
            SELECT indicatordetails_id, data_date, SUM(data_value) as data_value
            FROM mis_imported_datas 
            WHERE data_date IN (${dateIn}) AND location_id IN (${child_locations}) 
            GROUP BY indicatordetails_id, data_date order by 1,2 
            $$
            ) AS ct ( indicatordetails_id INT, ${columnsString})`);
            
            if (results.length > 0) {
                let finalResults = await processFinalResult(results);
                return res.status(200).json(finalResults);
            } else {
                return res.status(200).json({ message: "No Data Found" })
            }
        });

module.exports = route
