import React, {Component} from 'react';
import Axios from "axios";
import {apiUrl} from "../../utility/constant";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";
import ReactExcelExport from "../../module/react-excel-export/reactExcelExport";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import TablePdfViewer from "../../module/table-pdf-viewer/tablePdfViewer";
import jwt from "jsonwebtoken";

class AssetDisposalReportComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            date_to: '',
            pdf: false,
            error: false,
            date_from: '',
            errorMessage: '',
            optionDropDown: false,
            deliveryReportData: []
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = () => {
        const {date_from, date_to} = this.state
        const {id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : '';
        let data = {
            date_from,
            date_to,
            user_id: id
        }
        Axios.post(apiUrl() + 'assets-disposal/report', data)
            .then(resData => {
                if (resData.status) {
                    this.setState({
                        deliveryReportData: resData.data.data
                    })
                } else {
                    this.setState({
                        error: true,
                        deliveryReportData: [],
                        errorMessage: resData.message
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                error: false,
                            })
                        }, 2300)
                    })
                }
            })
    }

    pdfViewr = () => {
        const {deliveryReportData} = this.state
        deliveryReportData.length > 0 && this.setState((prevState) => ({pdf: !prevState.pdf, optionDropDown: false}))
    }

    render() {
        const {error, optionDropDown, success, successMessage, errorMessage, date_from, date_to, errorDictAsset, deliveryReportData, pdf} = this.state

        return (
            <>
                {error &&
                <ErrorModal errorMessage={errorMessage} />
                }
                {success &&
                <SuccessModal successMessage={successMessage} />
                }
                <div className={'rounded m-2 bg-white max-h-80vh ui-report-container px-3'}>
                    <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0">Assets Disposal Report</p>
                    </nav>
                    <div className="ui-report-header rounded">
                        <div className="row">
                            <div className="col-md-4">
                                <div>
                                    <label className={'ui-custom-label'}>Date From</label>
                                    <input type="date"
                                           name={'date_from'}
                                           value={date_from}
                                           onChange={this.handleChange}
                                           className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.date_from && 'is-invalid'}`}/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    <label className={'ui-custom-label'}>Date To</label>
                                    <input type="date"
                                           name={'date_to'}
                                           value={date_to}
                                           onChange={this.handleChange}
                                           className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.date_to && 'is-invalid'}`}/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="ui-report-btn-header rounded p-2">
                                    <button onClick={this.handleSubmit} className={'mx-2 submit-btn-normal'}>Submit</button>
                                    <button className={'mx-2 reset-btn-normal'} onClick={() => {
                                        this.setState({
                                            date_from: '', date_to: ''
                                        })
                                    }}>Reset</button>
                                    <div className={'position-relative'}>
                                        <button onClick={() => {this.setState((prevState) => ({optionDropDown: !prevState.optionDropDown}))}} className={'mx-2 new-btn-normal'}>Export</button>
                                        {optionDropDown && <div className={'ui-dropdown-btn'}>
                                            <button className={`${typeof deliveryReportData !== 'undefined' && (deliveryReportData.length > 0 ? 'p-0' : null)}`}>{typeof deliveryReportData !== 'undefined' && (deliveryReportData.length > 0 ? <ReactExcelExport excelData={deliveryReportData} /> : 'Excel')}</button>
                                            <button onClick={this.pdfViewr}>PDF</button>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {typeof deliveryReportData !== 'undefined' && deliveryReportData.length > 0 ? <ReactDataTable
                        tableData={deliveryReportData}
                    /> :  <h4 className={'no-project px-2 mt-4'}><i className="icofont-exclamation-circle"></i> Currently There are No Data</h4>}
                </div>

                {pdf && <TablePdfViewer pdfViewr={this.pdfViewr} reportTitle={'Delivery Report'}  tableData={deliveryReportData} />}
            </>
        );
    }
}

export default AssetDisposalReportComponent;