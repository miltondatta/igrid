const db                    = require('../../config/db')
const express               = require('express')
const moment                = require('moment');  
const mis_imported_data     = require('../../models/mis_imported_data')
const mis_indicatordetail   = require('../../models/mis_indicatordetail')
const route                 = express.Router();


route.get('/mis/dashboard/graph/data', async(req, res) => { 
    let indicatordetails_id = req.query.indicatordetails_id;
    var end_date            = moment().endOf('month').format('YYYY-MM-DD');
    var start_date          = moment(end_date).subtract(1, 'M').endOf('month').format('YYYY-MM-DD');
    let columnsString       = "";

    console.log(start_date, 15);

    while (start_date <= end_date) {
        columnsString           += " SUM(case when data_date ='" + start_date + "' then data_value else 0 end) AS " + moment(start_date).format('MMM_YY') + ","; 
        start_date               = moment(start_date).subtract(1, 'M').endOf('month').format('YYYY-MM-DD');
    }
    columnsString               =  columnsString.slice(0, -1);

    return res.status(200).json({ message: columnsString })


    while (start_date1 <= end_date) {
        monthArray.push(start_date);
        columnsString           += " SUM(case when data_date ='" + start_date1 + "' then data_value else 0 end) AS " + moment(start_date1).format('MMM_YY') + ","; 
        start_date1              = moment(start_date1).add(1, 'M').endOf('month').format('YYYY-MM-DD');
    }
    


    return res.status(200).json({ message: end_date })


    let date_from   = req.query.date_from;
    let date_to     = req.query.date_to;
    let dateArray   =   [];

    var start_date      = moment(date_from);
    var end_date        = moment(date_to);
    

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

module.exports = route