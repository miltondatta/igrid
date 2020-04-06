const db                    = require('../../config/db')
const express               = require('express')
const moment                = require('moment');  
const mis_imported_data     = require('../../models/mis_imported_data')
const mis_indicatordetail   = require('../../models/mis_indicatordetail')
const route                 = express.Router();


route.get('/mis/dashboard/graph/data', async(req, res) => { 
    let indicatordetails_id = req.query.indicatordetails_id;
    var end_date            = moment().endOf('month').format('YYYY-MM-DD');
    var start_date          = moment().subtract(12, 'months').endOf('month').format('YYYY-MM-DD');
    let columnsString       = "";
    let graphLabels         = [];          

    while (start_date < end_date) {
        graphLabels.push(moment(start_date).format('MMM_YY'));
        columnsString           += " SUM(case when data_date ='" + start_date + "' then data_value else 0 end) AS " + moment(start_date).format('MMM_YY') + ","; 
        start_date               = moment(start_date).add(1, 'M').endOf('month').format('YYYY-MM-DD');
    }
    columnsString               =  columnsString.slice(0, -1);

    const [results, metadata] = await db.query(`SELECT ${columnsString}
    FROM mis_imported_datas 
    WHERE indicatordetails_id = '${indicatordetails_id}'
    GROUP BY indicatordetails_id`);

    let graphData = Object.values(results[0]);

    const [resultsLabel, metadataLabel] = await db.query(`SELECT indicator_name
    FROM mis_indicatordetails 
    WHERE id = '${indicatordetails_id}'`);

    let indicator_name = resultsLabel[0].indicator_name;

    let finalResult = {
        graphLabels: graphLabels,
        graphDatas: graphData,
        label: indicator_name,
        status: true
    };
    return res.status(200).json(finalResult);
});

module.exports = route