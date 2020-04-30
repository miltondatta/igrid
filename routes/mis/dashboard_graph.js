const db                    = require('../../config/db')
const express               = require('express')
const moment                = require('moment');  
const mis_imported_data     = require('../../models/mis_imported_data')
const mis_indicatordetail   = require('../../models/mis_indicatordetail')
const { getChildLocations } = require('../../dbHelper/mis');
const route                 = express.Router();


route.get('/mis/dashboard/graph/data', async(req, res) => { 
    let indicatordetails_id = req.query.indicatordetails_id;
    var end_date            = moment().endOf('month').format('YYYY-MM-DD');
    var start_date          = moment().subtract(12, 'months').endOf('month').format('YYYY-MM-DD');
    let columnsString       = "";
    let graphLabels         = [];          

    while (start_date < end_date) {
        graphLabels.push(moment(start_date).format('MMM YY'));
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

route.get('/mis/extended-dashboard/indicator/:id', async (req, res, next) => {
    const [data, metaData] = await db.query(`
        select id, indicator_name from mis_indicatordetails where parent_location_id = ${req.params.id}
    `)
    if (data.length > 0) {
        res.status(200).json({data, status: true})
    } else {
        res.status(200).json({message: 'No Data Found'})
    }
});


route.post('/mis/extended/dashboard/graph/data', async(req, res) => { 
    
    let location_id         = req.body.parentID;
    let date_from           = req.body.date_from;
    let date_to             = req.body.date_to;
    let indicator_ids       = req.body.indicator_ids;

    let child_locations     = await getChildLocations(location_id);
    let end_date            = moment(date_to).endOf('month').format('YYYY-MM-DD');
    let start_date          = moment(date_from).subtract(12, 'months').endOf('month').format('YYYY-MM-DD');

    let columnsString       = "";
    let graphLabels         = [];          

    while (start_date <= end_date) {
        graphLabels.push(moment(start_date).format('MMM YY'));
        columnsString       += " SUM(case when data_date ='" + start_date + "' then data_value else 0 end) AS " + moment(start_date).format('MMM_YY') + ","; 
        start_date           = moment(start_date).add(1, 'M').endOf('month').format('YYYY-MM-DD');
    }
    columnsString            = columnsString.slice(0, -1);
    start_date               = moment(date_from).subtract(12, 'months').endOf('month').format('YYYY-MM-DD');
    let finalResult = [];

    indicator_ids = indicator_ids.join(",");
    console.log(indicator_ids);

    const [indicatorDatas, metadata] = await db.query(`SELECT ${columnsString}
        FROM mis_imported_datas 
        WHERE indicatordetails_id IN (${indicator_ids})
        GROUP BY indicatordetails_id ORDER BY indicatordetails_id`);

    const [resultsLabel, metadataLabel] = await db.query(`SELECT indicator_name
        FROM mis_indicatordetails 
        WHERE id IN (${indicator_ids}) ORDER BY id`);      

    indicatorDatas.forEach((value, index) => {
        let graphData       = Object.values(value);
        let indicator_name  = resultsLabel[index].indicator_name;
        
        let indicatorGraphData = {
            graphLabels: graphLabels,
            graphDatas: graphData,
            label: indicator_name,
        };
        finalResult.push(indicatorGraphData);
    });

    return res.status(200).json(finalResult);
});

module.exports = route