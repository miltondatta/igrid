import React, {Component} from 'react';
import ErrorModal from "../../utility/error/errorModal";
import ReactExcelExport from "../../module/react-excel-export/reactExcelExport";
import TablePdfViewer from "../../module/table-pdf-viewer/tablePdfViewer";
import LocationsWithHOptions from "../../utility/component/locationWithHierarchy";
import Axios from "axios";
import {apiUrl} from "../../utility/constant";

class AllAssetReportCompoenent extends Component {

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

    getHierarchies = () => {
        Axios.get(apiUrl() + 'locHierarchies')
            .then(res => {
                this.setState({
                    hierarchies: res.data
                })
            })
    }

    getUserAssets = () => {
        const {parentID} = this.state

        this.setState({
            isLoading: true,
            allData: []
        }, () => {
            Axios.post(apiUrl() + 'assets-report/all', {
                location_id: parentID,
            })
                .then(res => {
                    if (res.data.status) {
                        this.setState({
                            assetReport: res.data.data,
                            isLoading: false
                        })
                    } else {
                        this.setState({
                            error: true,
                            errorMessage: res.message
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    error: false
                                })
                            }, 2300);
                        })
                    }
                })
                .catch(err => {
                    console.log(err.response);
                })
        })
    };

    validate = () => {
        const {parentID} = this.state
        let errorDict = {
            parentID: typeof parentID !== 'undefined' && parentID !== 0
        }
        this.setState({
            errorDict
        })
        return errorDict
    }

    render() {
        const {hierarchies, parentID, assetReport, pdf, optionDropDown, haveData, errorMessage, error, errorDict} = this.state

        const locations = hierarchies.length > 0 && hierarchies.map(item => {
            return(
                <div className={'position-relative w-25'}>
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
                <div style={{flexBasis: '20%'}}>
                    {item.replace('_', ' ').replace("_", ' ')}
                </div>
            )
        })

        const reportBody = assetReport.length > 0 && assetReport.map((main, index) => {
            return (
                <div key={index} className="ui-report-header">
                    <div style={{flexBasis: '20%'}}>{main.user_name}</div>
                    <div style={{flexBasis: '20%'}}>{main.category_name}</div>
                    <div style={{flexBasis: '20%'}}>{main.sub_category_name}</div>
                    <div style={{flexBasis: '20%'}}>{main.product_name}</div>
                    <div style={{flexBasis: '20%'}}>{main.quantity}</div>
                </div>
            )})

        return (
            <>
                {error &&
                    <ErrorModal ops errorMessage={errorMessage} />
                }
                <div className="ui-mis-report ui-other-report">
                    <div className="ui-top-container">
                        <div className={'ui-selects-container'}>
                            {locations}
                        </div>
                        <div className="ui-btn-container rounded">
                            <button onClick={this.getUserAssets} className={'report-submit-btn'}>Submit</button>
                            <button className={'report-reset-btn'}>Reset</button>
                            <div className={'position-relative w-25'}>
                                <button onClick={() => {this.setState((prevState) => ({optionDropDown: !prevState.optionDropDown}))}} className={'mx-2 report-export-btn'}>Export</button>
                                {optionDropDown && <div className={'ui-dropdown-btn'}>
                                    <button className={`${typeof assetReport !== 'undefined' && (assetReport[Object.keys(assetReport)[0]] ? 'p-0' : null)}`}>{(typeof assetReport !== 'undefined' && (assetReport[Object.keys(assetReport)[0]]) ? <ReactExcelExport misReport excelData={assetReport} /> : 'Excel')}</button>
                                    <button onClick={this.pdfViewr}>PDF</button>
                                </div>}
                            </div>
                        </div>
                    </div>

                    {assetReport.length === 0 ? <h4 className={'no-project px-2 mt-4'}><i className="icofont-exclamation-circle"></i> Currently There are No Data</h4> : <div className="ui-report-container">
                        <div className="ui-report-header">
                            {reportHeader}
                        </div>
                        {reportBody}
                    </div>}
                </div>

                {pdf && <TablePdfViewer pdfViewr={this.pdfViewr} reportTitle={'All Assets Report'}  tableData={assetReport} />}
            </>
        );
    }
}

export default AllAssetReportCompoenent;
