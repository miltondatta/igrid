import Axios from 'axios'
import jwt from "jsonwebtoken";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import ErrorModal from "../../utility/error/errorModal";
import TablePdfViewer from "../../module/table-pdf-viewer/tablePdfViewer";
import ReactExcelExport from "../../module/react-excel-export/reactExcelExport";
import moment from "moment";
import DatePicker from 'react-datepicker2';
import {disabledRanges} from "../../utility/custom";
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";

moment.locale('en');


class ComplaintReportComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complaintReportData: [],
            user: {},
            date_from: moment(),
            date_to: moment(),
            pdf: false,
            errorDict: null,
            error: false,
            errorMessage: '',
            optionDropDown: false
        }
    }

    componentDidMount() {
        const user = jwt.decode(localStorage.getItem('user')).data;
        Object.values(user).length > 0 && this.setState({user});
    }

    handleSubmit = () => {
        if (Object.values(this.validate()).includes(false)) return;
        const {date_from, date_to, user} = this.state;

        let data = {
            date_from: date_from,
            date_to: date_to.add(1, 'day'),
            user_id: user.id
        };

        Axios.post(apiUrl() + 'complaint/report/between', data)
            .then(res => {
                this.setState({
                    complaintReportData: []
                }, () => {
                    const complaintReportData = res.data.length > 0 && res.data.map(item => {
                        return {
                            complaint_date: moment(item.createdAt).format('YYYY-MM-DD'),
                            complaint_no: item.complaint_no,
                            complaint_category: item.complaint_name,
                            complaint_sub_category: item.sub_complaint_name,
                            product: item.product_name,
                            product_serial: item.product_serial,
                            status: item.status_name,
                            solved_by: item.solved_by,
                            solved_at: moment(item.solved_at).format('YYYY-MM-DD')
                        }
                    });

                    this.setState({complaintReportData}, () => this.setState({date_to: this.state.date_to.subtract(1, 'day')}));
                })
            })
            .catch(err => {
                const {error, msg} = err.response.data;
                if (msg) {
                    this.setState({
                        error: error,
                        errorMessage: error && msg
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                error: false
                            })
                        }, 2300);
                    })
                }
                console.log(err.response);
            })
    };

    pdfViewer = () => {
        const {complaintReportData} = this.state;
        complaintReportData.length > 0 && this.setState((prevState) => ({pdf: !prevState.pdf, optionDropDown: false}));
    };

    validate = () => {
        const {date_from, date_to} = this.state;
        let errorDict = {
            date_to: typeof date_to !== 'undefined' && date_to !== '',
            date_from: typeof date_from !== 'undefined' && date_from !== ''
        };
        this.setState({
            errorDict
        });

        return errorDict
    };

    render() {
        const {error, optionDropDown, errorMessage, date_from, date_to, complaintReportData, pdf, errorDict} = this.state;
        return (
            <>
                {error &&
                <ErrorModal errorMessage={errorMessage}/>
                }
                <div className={'rounded m-2 bg-white max-h-80vh ui-report-container px-3'}>
                    <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0">Complaint Report</p>
                    </nav>
                    <div className="ui-report-header rounded">
                        <div className="row">
                            <div className="col-md-4">
                                <div>
                                    <label className={'ui-custom-label'}>Date From</label>
                                    <DatePicker timePicker={false}
                                                name={'date_from'}
                                                className={`ui-custom-input w-100 ${errorDict && !errorDict.date_from && 'is-invalid'}`}
                                                inputFormat="DD/MM/YYYY"
                                                onChange={date => this.setState({date_from: date})}
                                                value={date_from}/>
                                </div>
                            </div>
                            <div className="col-md-4">
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
                            <div className="col-md-4">
                                <div className="ui-report-btn-header rounded p-2">
                                    <button onClick={this.handleSubmit} className={'mx-2 submit-btn-normal'}>Submit
                                    </button>
                                    <button className={'mx-2 reset-btn-normal'} onClick={() => {
                                        this.setState({date_from: moment(), date_to: moment()})
                                    }}>Reset
                                    </button>
                                    <div className={'position-relative'} onMouseLeave={() => {
                                        this.setState((prevState) => ({optionDropDown: !prevState.optionDropDown}))
                                    }}>
                                        <button onMouseEnter={() => {
                                            this.setState((prevState) => ({optionDropDown: !prevState.optionDropDown}))
                                        }} className={'mx-2 new-btn-normal'}>Export
                                        </button>
                                        {optionDropDown && <div className={'ui-dropdown-btn'}>
                                            <button
                                                className={`${typeof complaintReportData !== 'undefined' && (complaintReportData.length > 0 ? 'p-0' : '')}`}>
                                                {typeof complaintReportData !== 'undefined' && (complaintReportData.length > 0 ?
                                                    <ReactExcelExport excelData={complaintReportData}/> : 'Excel')}
                                            </button>
                                            <button onClick={this.pdfViewer}>PDF</button>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {typeof complaintReportData !== 'undefined' && complaintReportData.length > 0 ?
                        <PrimeDataTable
                            data={complaintReportData}
                        />
                        :
                        <h4 className={'no-project px-2 mt-4'}><i className="icofont-exclamation-circle"/> Currently
                            There are No Data</h4>}
                </div>

                {pdf && <TablePdfViewer pdfViewr={this.pdfViewer} reportTitle={'Complaint Report'}
                                        tableData={complaintReportData}/>}
            </>
        );
    }
}

export default ComplaintReportComponent;