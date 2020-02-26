import Axios from 'axios'
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import jwt from "jsonwebtoken";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";

class RequisitionStatusComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requisitionStatus: []
        }
    }

    componentDidMount() {
        this.getReqStatus()
    }

    getReqStatus = () => {
        const {id} = jwt.decode(localStorage.getItem('user')).data
        Axios.get(apiUrl() + 'requisition-details/status/' + id)
            .then(res => {
                console.log(res, 23)
                this.setState({
                    requisitionStatus: res.data
                })
            })
    }

    render() {
        const {requisitionStatus} = this.state
        console.log(requisitionStatus)
        return (
            <div className={'bg-white rounded p-2 m-3'}>
                <nav className="navbar text-center mb-2 ml-2 rounded">
                    <p className="text-blue f-weight-700 f-22px m-0">Requisition Status</p>
                </nav>
                <ReactDataTable
                    tableData={requisitionStatus}
                />
            </div>
        );
    }
}

export default RequisitionStatusComponent;