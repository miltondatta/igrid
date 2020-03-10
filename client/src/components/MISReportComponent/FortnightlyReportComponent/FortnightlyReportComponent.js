import React, {Component} from 'react';
import Axios from "axios";
import {apiUrl} from "../../../utility/constant";
import LocationsWithHOptions from "../../../utility/component/locationWithHierarchy";
import ReactExcelExport from "../../../module/react-excel-export/reactExcelExport";
import TablePdfViewer from "../../../module/table-pdf-viewer/tablePdfViewer";

class FortnightlyReportComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parentID: 0,
            date_to: '',
            date_from: '',
            dailyReport: {},
            hierarchies: [],
        }
    }

    componentDidMount() {
        this.getHierarchies()
    }

    getHierarchies = () => {
        Axios.get(apiUrl() + 'locHierarchies')
            .then(res => {
                this.setState({
                    hierarchies: res.data
                })
            })
    }

    handleChange = (e, nam) => {
        const {name, value} = e.target
        this.setState({
            [name]: value,
            [nam]: value
        })
    }

    handleSubmit = () => {
        const {parentID, date_to, date_from} = this.state
        const data = {
            date_to,
            date_from,
            location_id: parentID,
        }
        Axios.get(apiUrl() + 'mis/basic/report/daily' , {params: data})
            .then(res => {
                console.log(res.data)
                this.setState({
                    dailyReport: res.data
                })
            })
    }

    render() {
        const {hierarchies, parentID, date_from, date_to, dailyReport, pdf, optionDropDown} = this.state
        const locations = hierarchies.length > 0 && hierarchies.map(item => {
            return(
                <div className={'position-relative'}>
                    <label htmlFor="" className={'ui-custom-label'}>{item.hierarchy_name}</label>
                    <select name={'parentID'} value={this.state[item.hierarchy_name]} onChange={(e) => this.handleChange(e, item.hierarchy_name)} className={'ui-custom-input'}>
                        <option>{item.hierarchy_name}</option>
                        <LocationsWithHOptions parentID={parentID} hierarchyID={item.id} />
                    </select>
                </div>
            )
        })
        const reportHeader = dailyReport[Object.keys(dailyReport)[0]] && (dailyReport[Object.keys(dailyReport)[0]].length > 0 && Object.keys(dailyReport[Object.keys(dailyReport)[0]][0]).map(item => {
            return(
                <div>
                    {item.replace('_', ' ')}
                </div>
            )
        }))
        const reportBody = dailyReport[Object.keys(dailyReport)[0]] && Object.keys(dailyReport).map((main, index) => {
            return (
                <>
                    <div className={'ui-report-title'}>
                        <div>
                            {main}
                        </div>
                        {
                            Object.keys(dailyReport[main][0]).map((data, index2) => {
                                return(
                                    <div key={index2}>

                                    </div>
                                )
                            })
                        }
                    </div>
                    {dailyReport[main].map((mainData, index3) => {
                        return (
                            <div key={index} className="ui-report-header">
                                {
                                    Object.keys(dailyReport[main][0]).map((data, index2) => {
                                        return(
                                            <div key={index2}>
                                                {mainData[data] ? mainData[data] : '0'}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )})}
                </>
            )})

        console.log(dailyReport, 101)

        return (
            <>
                <div className="ui-mis-report">
                    <div className="ui-top-container">
                        <div className={'ui-selects-container'}>
                            {locations}
                            <div>
                                <label className={'ui-custom-label'}>Date From</label>
                                <input type="date"
                                       name={'date_from'}
                                       value={date_from}
                                       onChange={this.handleChange}
                                       className={`ui-custom-input w-100`}/>
                            </div>
                            <div>
                                <label className={'ui-custom-label'}>Date To</label>
                                <input type="date"
                                       name={'date_to'}
                                       value={date_to}
                                       onChange={this.handleChange}
                                       className={`ui-custom-input w-100`}/>
                            </div>
                        </div>
                        <div className="ui-btn-container rounded">
                            <button onClick={this.handleSubmit} className={'mx-2 report-submit-btn'}>Submit</button>
                            <button className={'mx-2 report-reset-btn'}>Reset</button>
                            <div className={'position-relative'}>
                                <button onClick={() => {this.setState((prevState) => ({optionDropDown: !prevState.optionDropDown}))}} className={'mx-2 report-export-btn'}>Export</button>
                                {optionDropDown && <div className={'ui-dropdown-btn'}>
                                    <button className={`${typeof dailyReport !== 'undefined' && (dailyReport[Object.keys(dailyReport)[0]] ? 'p-0' : null)}`}>{(typeof dailyReport !== 'undefined' && (dailyReport[Object.keys(dailyReport)[0]]) ? <ReactExcelExport misReport excelData={dailyReport} /> : 'Excel')}</button>
                                    <button onClick={this.pdfViewr}>PDF</button>
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div className="ui-report-container">
                        <div className="ui-report-header">
                            {reportHeader}
                        </div>
                        {reportBody}
                    </div>
                </div>

                {pdf && <TablePdfViewer pdfViewr={this.pdfViewr} reportTitle={'Delivery Report'}  tableData={dailyReport} />}
            </>
        );
    }
}

export default FortnightlyReportComponent;