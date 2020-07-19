import React, {Component} from 'react';
import Axios from "axios";
import {apiUrl} from "../../utility/constant";
import ErrorModal from "../../utility/error/errorModal";
import ReactExcelExport from "../../module/react-excel-export/reactExcelExport";
import TablePdfViewer from "../../module/table-pdf-viewer/tablePdfViewer";
import jwt from "jsonwebtoken";
import SuccessModal from "../../utility/success/successModal";

import LocationsWithHOptions from "../../utility/component/locationWithHierarchy";
import moment from "moment";
import DatePicker from "react-datepicker2";
import NodataFound from "../../utility/component/nodataFound";

moment.locale('en');

const disabledRanges = [{
    disabled: true,
    start: moment().add(1, 'day'),
    end: moment().add(50, 'year')
}];

class AllDeliveryReportComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parentID: 0,
            date_to: moment(),
            error: false,
            date_from: moment(),
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
            date_to: date_to.format('YYYY-MM-DD'),
            date_from: date_from.format('YYYY-MM-DD'),
            location_id: parentID,
        }
        if (date_from !== '' && date_to !== '' && parentID !== 0) {
            Axios.post(apiUrl() + 'requisition-approve/delivery/all', data)
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
            date_from: typeof date_from !== 'undefined' && date_from !== '',
            date_to: typeof date_to !== 'undefined' && date_to !== '',
            parentID: typeof parentID !== 'undefined' && parentID !== 0
        }
        this.setState({
            errorDict
        })
        return errorDict
    };


    pdfViewr = () => {
        const {assetReport} = this.state
        assetReport.length > 0 && this.setState((prevState) => ({pdf: !prevState.pdf, optionDropDown: false}))
    }

    render() {
        const {hierarchies, parentID, assetReport, pdf, optionDropDown, haveData, errorMessage, error, errorDict, dailyReport, date_to, date_from} = this.state

        const locations = hierarchies.length > 0 && hierarchies.map(item => {
            return (
                <div className={'position-relative'}>
                    <label htmlFor="" className={'ui-custom-label'}>{item.hierarchy_name}</label>
                    <select
                        name={'parentID'}
                        onChange={(e) => this.handleChange(e, item.hierarchy_name, item.id)}
                        className={`ui-custom-input ${errorDict && !errorDict.parentID && 'border-red'}`}>
                        <option>{item.hierarchy_name}</option>
                        <LocationsWithHOptions parentID={parentID}
                                               hierarchyID={item.id === parseInt(parentID, 10) + 1 ? item.id : null}/>
                    </select>
                </div>
            )
        })
        const reportHeader = assetReport.length > 0 && Object.keys(assetReport[0]).map(item => {
            return (
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
            )
        });

        return (
            <>
                {error &&
                <ErrorModal ops errorMessage={errorMessage}/>
                }
                <div className="ui-mis-report ui-other-report">
                    <div className="ui-top-container">
                        <div className={'ui-selects-container'}>
                            {locations}
                            <div>
                                <label className={'ui-custom-label'}>Date From</label>
                                <DatePicker timePicker={false}
                                            name={'date_from'}
                                            className={`ui-custom-input w-100 ${errorDict && !errorDict.date_from && 'border-red'}`}
                                            inputFormat="DD/MM/YYYY"
                                            onChange={date => this.setState({date_from: date})}
                                            value={date_from}
                                />
                            </div>
                            <div>
                                <label className={'ui-custom-label'}>Date To</label>
                                <DatePicker timePicker={false}
                                            name={'date_to'}
                                            className={`ui-custom-input w-100 ${errorDict && !errorDict.date_to && 'border-red'}`}
                                            inputFormat="DD/MM/YYYY"
                                            onChange={date => this.setState({date_to: date})}
                                            value={date_to}
                                />
                            </div>
                        </div>
                        <div className="ui-btn-container rounded">
                            <button onClick={this.handleSubmit} className={'mx-2 report-submit-btn'}>Submit</button>
                            <button className={'mx-2 report-reset-btn'} onClick={() => {
                                this.setState({
                                    assetReport: [],
                                    date_to: moment(),
                                    date_from: moment(),
                                    parentID: 0
                                })
                            }}>Reset
                            </button>
                            <div className={'position-relative'}>
                                <button onClick={() => {
                                    this.setState((prevState) => ({optionDropDown: !prevState.optionDropDown}))
                                }} className={'mx-2 report-export-btn'}>Export
                                </button>
                                {optionDropDown && <div className={'ui-dropdown-btn'}>
                                    <button
                                        className={`${typeof assetReport !== 'undefined' && (assetReport[Object.keys(assetReport)[0]] ? 'p-0' : null)}`}>
                                        {(typeof assetReport !== 'undefined' && (assetReport[Object.keys(assetReport)[0]]) ?
                                        <ReactExcelExport excelData={assetReport}/> : 'Excel')}
                                    </button>
                                    <button onClick={this.pdfViewr}>PDF</button>
                                </div>}
                            </div>
                        </div>
                    </div>

                    {!haveData ?
                        <NodataFound /> : <div className="ui-report-container">
                            <div className="ui-report-header">
                                {reportHeader}
                            </div>
                            {reportBody}
                        </div>}
                </div>

                {pdf &&
                <TablePdfViewer pdfViewr={this.pdfViewr} admin reportTitle={'All Delivery Report'} tableData={assetReport}/>}
            </>
        );
    }
}

export default AllDeliveryReportComponent;
