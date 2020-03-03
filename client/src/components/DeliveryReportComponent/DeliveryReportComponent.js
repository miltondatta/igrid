import Axios from 'axios'
import React, {Component} from 'react';
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import {apiUrl} from "../../utility/constant";
import jwt from "jsonwebtoken";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";

class DeliveryReportComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            date_to: '',
            error: false,
            date_from: '',
            errorMessage: '',
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
        const {date_from, date_to, errorDictAsset} = this.state
        const {id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : '';
        let data = {
            date_from,
            date_to,
            user_id: id
        }
        Axios.post(apiUrl() + 'requisition-approve/delivery/between', data)
            .then(resData => {
                if (resData.status) {
                    this.setState({
                        deliveryReportData: resData.data.data
                    })
                } else {
                    this.setState({
                        error: true,
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

    render() {
        const {error, success, successMessage, errorMessage, date_from, date_to, errorDictAsset, deliveryReportData} = this.state
        return (
            <>
                {error &&
                    <ErrorModal errorMessage={errorMessage} />
                }
                {success &&
                    <SuccessModal successMessage={successMessage} />
                }
                <div className={'rounded m-2 bg-white min-h-80vh ui-report-container p-3'}>
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
                                    <button className={'mx-2 reset-btn-normal'}>Reset</button>
                                    <button className={'mx-2 new-btn-normal'}>Export PSD/XSL</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {deliveryReportData.length > 0 ? <ReactDataTable
                        tableData={deliveryReportData}
                    /> :  <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> Currently There are No Data</h4>}
                </div>
            </>
        );
    }
}

export default DeliveryReportComponent;