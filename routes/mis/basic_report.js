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
            let detailsObj = detailsComponents.find(d => d.id === item.indicator);
            let masterObj = masterComponents.find(m => m.id === detailsObj.indicatormaster_id);
            item.indicator = detailsObj.indicator_name;
            finalResults[masterObj.indicatormaster_name].push(item);
        });
    }
    Object.keys(finalResults).forEach(item => {
        if(finalResults[item].length === 0) {
            delete finalResults[item]
        }
    })
    return finalResults;
};


route.get('/mis/basic/report/daily', async(req, res) => { 
        let location_id = req.query.location_id;
        let date_from   = req.query.date_from;
        let date_to     = req.query.date_to;
        let dateArray   =   [];

        var start_date      = moment(date_from);
        var end_date        = moment(date_to);
        let columnsString   = "";

        while (start_date <= end_date) {
            columnsString  +=" SUM(case when data_date ='" + moment(start_date).format('YYYY-MM-DD') + "' then data_value else 0 end) AS " + moment(start_date).format('MMM_Do') + ","; 
            start_date = moment(start_date).add(1, 'days');
        }

        columnsString       =  columnsString.slice(0, -1);

        start_date          = moment(date_from).format('YYYY-MM-DD');
        end_date            = moment(date_to).format('YYYY-MM-DD');
        let child_locations =  await getChildLocations(location_id);

        const [results, metadata] = await db.query(`SELECT indicatordetails_id as indicator, ${columnsString}
        FROM mis_imported_datas 
        WHERE (data_date BETWEEN '${start_date}' AND '${end_date}') AND location_id IN (${child_locations}) 
        GROUP BY indicatordetails_id ORDER BY indicatordetails_id`);
    
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
    
        var start_date  = start_date1 = moment(date_from);
        var end_date    = moment(date_to);
        
        while (start_date1 <= end_date) {
            var weeknumber          = moment(start_date1, "MM-DD-YYYY").week();
            weekArray[weeknumber]   = moment(start_date1).format('YYYY-MM-DD');
            start_date1              = moment(start_date1).add(1, 'days');
        }

        start_date  = moment(date_from).format('YYYY-MM-DD');
        end_date    = moment(date_to).format('YYYY-MM-DD');
    
        let columnsString   = "";
        weekArray.forEach((item, index) => {
            console.log(item);
            columnsString +=" SUM(case when data_date ='" + item + "' then data_value else 0 end) AS " + "Week_" + index + "_" + moment(item).format('MMM') + ",";     
        });
        columnsString               =  columnsString.slice(0, -1);

        let child_locations         =  await getChildLocations(location_id);
        const [results, metadata]   =  await db.query(`SELECT indicatordetails_id as indicator, ${columnsString}
            FROM mis_imported_datas 
            WHERE (data_date BETWEEN '${start_date}' AND '${end_date}') AND location_id IN (${child_locations}) 
            GROUP BY indicatordetails_id ORDER BY indicatordetails_id`);

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
    
        var start_date =  start_date1  = moment(date_from).endOf('month').format('YYYY-MM-DD');
        var end_date    = moment(date_to).endOf('month').format('YYYY-MM-DD');
        
        let columnsString   = "";
        let dateIn          = "";

        while (start_date1 <= end_date) {
            monthArray.push(start_date);
            columnsString           += " SUM(case when data_date ='" + start_date1 + "' then data_value else 0 end) AS " + moment(start_date1).format('MMM_YY') + ","; 
            start_date1              = moment(start_date1).add(1, 'M').endOf('month').format('YYYY-MM-DD');
        }
        columnsString               =  columnsString.slice(0, -1);

        let child_locations         =  await getChildLocations(location_id);

        const [results, metadata]   = await db.query(`SELECT indicatordetails_id as indicator, ${columnsString}
            FROM mis_imported_datas 
            WHERE (data_date BETWEEN '${start_date}' AND '${end_date}') AND location_id IN (${child_locations}) 
            GROUP BY indicatordetails_id ORDER BY indicatordetails_id`);
            if (results.length > 0) {
                let finalResults = await processFinalResult(results);
                return res.status(200).json(finalResults);
            } else {
                return res.status(200).json({ message: "No Data Found" })
            }
        });
module.exports = route
