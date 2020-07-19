import Axios from 'axios'
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import jwt from "jsonwebtoken";

import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";
import NodataFound from "../../utility/component/nodataFound";

class RequisitionStatusComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewDetails: false,
            requisitionStatus: [],
            requisitionDetailsStatus: []
        }
    }

    componentDidMount() {
        this.getReqStatus()
    }

    getReqStatus = () => {
        const {id} = jwt.decode(localStorage.getItem('user')).data

        Axios.get(apiUrl() + 'requisition-master/my-req/' + id)
            .then(res => {
                this.setState({
                    requisitionStatus: res.data
                })
            })
    }

    assetList = (id) => {
        Axios.get(apiUrl() + 'requisition-details/status/' + id)
            .then(res => {
                this.setState({
                    viewDetails: true,
                    requisitionDetailsStatus: res.data
                })
            })
    }

    render() {
        const {requisitionStatus, viewDetails, requisitionDetailsStatus} = this.state
        console.log(requisitionStatus)
        return (
            <div className={'bg-white rounded p-2 admin-input-height m-2'}>
                <nav className="navbar text-center mb-2 ml-0 pl-2 rounded">
                    <p className="text-blue f-weight-700 f-22px m-0">Requisition Status</p>
                </nav>
                {viewDetails ? <>
                    <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                        <p onClick={() => {this.setState({viewDetails: false, requisitionDetailsStatus: []})}} className="text-blue cursor-pointer f-weight-700 f-20px m-0" ><i className="fas fa-chevron-circle-left"></i> Go Back</p>
                    </nav>
                    <PrimeDataTable
                        assetList={this.assetList}
                        data={requisitionDetailsStatus}
                    />

                </>: requisitionStatus.length > 0 ? <PrimeDataTable
                        details
                        assetList={this.assetList}
                        data={requisitionStatus}
                    />
                : <NodataFound />}
            </div>
        );
    }
}

export default RequisitionStatusComponent;
