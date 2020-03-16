import React, {Component} from 'react';
import Axios from "axios";
import {apiUrl} from "../../utility/constant";
import ErrorModal from "../../utility/error/errorModal";
import ReactExcelExport from "../../module/react-excel-export/reactExcelExport";
import TablePdfViewer from "../../module/table-pdf-viewer/tablePdfViewer";
import jwt from "jsonwebtoken";
import SuccessModal from "../../utility/success/successModal";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import LocationsWithHOptions from "../../utility/component/locationWithHierarchy";

class AllDeliveryReportComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parentID: 0,
            date_to: '',
            error: false,
            date_from: '',
            haveData: false,
            errorMessage: '',
            assetReport: [],
            selectData: [],
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

    handleChange = (e, nam, hierarchies) => {
        const {name, value} = e.target
        if (name === 'parentID') {
            this.setState({
                [name]: value,
                [nam]: value
            }, () => {
                this.validate()
            })
        } else {
            this.setState({
                [name]: value,
                [nam]: value
            }, () => {
                this.validate()
            })
        }
    }

    handleSubmit = () => {
        console.log(this.validate(), 48)
        const {parentID, date_to, date_from} = this.state
        const data = {
            date_to,
            date_from,
            location_id: parentID,
        }
        if (date_from !== '' && date_to !== '' && parentID !== 0) {
            Axios.post(apiUrl() + 'requisition-approve/delivery/all' , data)
                .then(res => {
                    if (!res.data.status) {
                        this.setState({
                            haveData: false,
                            error: true,
                            errorMessage: res.data.message
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    error: false,
                                })
                            }, 2300)
                        })
                    } else {
                        this.setState({
                            haveData: true,
                            assetReport: res.data.data
                        })
                    }
                })
        }
    }

    validate = () => {
        const {date_from, date_to, parentID} = this.state
        let errorDict = {
            date_from: typeof date_from !== 'undefined' && date_from !== '' ,
            date_to: typeof date_to !== 'undefined' && date_to !== '' ,
            parentID: typeof parentID !== 'undefined' && parentID !== 0
        }
        this.setState({
            errorDict
        })
        return errorDict
    }

    render() {
        const {hierarchies, parentID, assetReport, pdf, optionDropDown, haveData, errorMessage, error, errorDict, dailyReport, date_to, date_from} = this.state

        const locations = hierarchies.length > 0 && hierarchies.map(item => {
            return(
                <div className={'position-relative'}>
                    <label htmlFor="" className={'ui-custom-label'}>{item.hierarchy_name}</label>
                    <select
                        name={'parentID'}
                        onChange={(e) => this.handleChange(e, item.hierarchy_name, item.id)}
                        className={`ui-custom-input ${errorDict && !errorDict.parentID && 'border-red'}`}>
                        <option>{item.hierarchy_name}</option>
                        <LocationsWithHOptions parentID={parentID} hierarchyID={item.id === parseInt(parentID, 10) + 1 ? item.id : null} />
                    </select>
                </div>
            )
        })
        const reportHeader = assetReport.length > 0 && Object.keys(assetReport[0]).map(item => {
            return(
                <div style={{flexBasis: '14.3%'}}>
                    {item.replace('_', ' ').replace("_", ' ')}
                </div>
            )
        })

        const reportBody = assetReport.length > 0 && assetReport.map((main, index) => {
            return (
                <div key={index} className="ui-report-header">
                    <div style={{flexBasis: '14.3%'}}>{main.item_name}</div>
                    <div style={{flexBasis: '14.3%'}}>{main.delivery_date}</div>
                    <div style={{flexBasis: '14.3%'}}>{main.quantity}</div>
                    <div style={{flexBasis: '14.3%'}}>{main.delivery_to}</div>
                    <div style={{flexBasis: '14.3%'}}>{main.delivered_by}</div>
                    <div style={{flexBasis: '14.3%'}}>{main.receivers_designation}</div>
                    <div style={{flexBasis: '14.3%'}}>{main.location}</div>
                </div>
            )})

        return (
            <>
                {error &&
                <ErrorModal ops errorMessage={errorMessage} />
                }
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
                                       className={`ui-custom-input w-100 ${errorDict && !errorDict.date_from && 'border-red'}`}/>
                            </div>
                            <div>
                                <label className={'ui-custom-label'}>Date To</label>
                                <input type="date"
                                       name={'date_to'}
                                       value={date_to}
                                       onChange={this.handleChange}
                                       className={`ui-custom-input w-100 ${errorDict && !errorDict.to && 'border-red'}`}/>
                            </div>
                        </div>
                        <div className="ui-btn-container rounded">
                            <button onClick={this.handleSubmit} className={'mx-2 report-submit-btn'}>Submit</button>
                            <button className={'mx-2 report-reset-btn'} onClick={() => {
                                this.setState({
                                    assetReport: [],
                                    date_to: '',
                                    date_from: '',
                                    parentID: 0
                                })
                            }}>Reset</button>
                            <div className={'position-relative'}>
                                <button onClick={() => {this.setState((prevState) => ({optionDropDown: !prevState.optionDropDown}))}} className={'mx-2 report-export-btn'}>Export</button>
                                {optionDropDown && <div className={'ui-dropdown-btn'}>
                                    <button className={`${typeof dailyReport !== 'undefined' && (dailyReport[Object.keys(dailyReport)[0]] ? 'p-0' : null)}`}>{(typeof dailyReport !== 'undefined' && (dailyReport[Object.keys(dailyReport)[0]]) ? <ReactExcelExport misReport excelData={dailyReport} /> : 'Excel')}</button>
                                    <button onClick={this.pdfViewr}>PDF</button>
                                </div>}
                            </div>
                        </div>
                    </div>

                    {!haveData ? <h4 className={'no-project px-2 mt-4'}><i className="icofont-exclamation-circle"></i> Currently There are No Data</h4> : <div className="ui-report-container">
                        <div className="ui-report-header">
                            {reportHeader}
                        </div>
                        {reportBody}
                    </div>}
                </div>

                {pdf && <TablePdfViewer pdfViewr={this.pdfViewr} reportTitle={'Delivery Report'}  tableData={dailyReport} />}
            </>
        );
    }
}

export default AllDeliveryReportComponent;