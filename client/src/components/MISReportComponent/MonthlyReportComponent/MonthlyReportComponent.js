import React, {Component} from 'react';
import Axios from "axios";
import {apiUrl} from "../../../utility/constant";
import LocationsWithHOptions from "../../../utility/component/locationWithHierarchy";
import ReactExcelExport from "../../../module/react-excel-export/reactExcelExport";
import TablePdfViewer from "../../../module/table-pdf-viewer/tablePdfViewer";
import ErrorModal from "../../../utility/error/errorModal";
import moment from "moment";
import DatePicker from 'react-datepicker2';
import {disabledRanges} from "../../../utility/custom";

moment.locale('en');

class MonthlyReportComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parentID: 0,
            date_to: moment(),
            error: false,
            date_from: moment(),
            haveData: false,
            errorMessage: '',
            collapsId: [0,1],
            dailyReport: {},
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
            date_from : moment(date_from).format('YYYY-MM-DD'),
            date_to : moment(date_to).format('YYYY-MM-DD'),
            location_id: parentID,
        }
        if (date_from !== '' && date_to !== '' && parentID !== 0) {
            Axios.get(apiUrl() + 'mis/basic/report/monthly' , {params: data})
                .then(res => {
                    if (res.data.message) {
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
                            dailyReport: res.data
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

    collaps = (ind) => {
        let colId
        if (this.state.collapsId.includes(ind)) {
            colId = this.state.collapsId.filter(item => ind !== item)
            this.setState((prevState) => ({
                collapsId: colId
            }))
        } else {
            this.setState((prevState) => ({
                collapsId: [...prevState.collapsId, ind]
            }))
        }

    }

    render() {
        const {hierarchies, selectData, parentID, date_from, date_to, dailyReport, pdf, optionDropDown, haveData, errorMessage, error, errorDict, collapsId} = this.state

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
        const reportHeader = haveData && (dailyReport[Object.keys(dailyReport)[0]].length > 0 && Object.keys(dailyReport[Object.keys(dailyReport)[0]][0]).map(item => {
            return(
                <div>
                    {item.replace('_', ' ')}
                </div>
            )
        }))
        const reportBody = haveData && Object.keys(dailyReport).map((main, index) => {
            return (
                <>
                    <div className={'ui-report-title'}>
                        <div onClick={() => {this.collaps(index)}}>
                            {main}
                        </div>
                        {
                          dailyReport[main].length &&  Object.keys(dailyReport[main][0]).map((data, index2) => {
                                return(
                                    <div key={index2} onClick={() => {this.collaps(index)}}>

                                    </div>
                                )
                            })
                        }
                    </div>
                    
                    {collapsId.includes(index) && dailyReport[main].map((mainData, index3) => {
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
                                <DatePicker timePicker={false}
                                            name={'date_from'}
                                            className={`ui-custom-input w-100 ${errorDict && !errorDict.date_from && 'is-invalid'}`}
                                            inputFormat="DD/MM/YYYY"
                                            onChange={date => this.setState({date_from: date})}
                                            ranges={disabledRanges}
                                            value={date_from}/>
                            </div>
                            <div>
                                <label className={'ui-custom-label'}>Date To</label>
                                <DatePicker timePicker={false}
                                            name={'date_to'}
                                            className={`ui-custom-input w-100 ${errorDict && !errorDict.date_to && 'is-invalid'}`}
                                            inputFormat="DD/MM/YYYY"
                                            onChange={date => this.setState({date_to: date})}
                                            ranges={disabledRanges}
                                            value={date_to}/>
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

                    {!haveData ? <h4 className={'no-project px-2 mt-4'}><i className="icofont-exclamation-circle"></i> Currently There are No Data</h4> : <div className="ui-report-container">
                        <div className="ui-report-header"  style={{zIndex: 5}}>
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

export default MonthlyReportComponent;