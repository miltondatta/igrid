import React, {Component} from 'react';
import jwt from "jsonwebtoken";
import axios from "axios";
import {apiUrl} from "../../utility/constant";
import {Redirect} from 'react-router-dom'
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";
import ErrorModal from "../../utility/error/errorModal";
import NodataFound from "../../utility/component/nodataFound";

class IncomingTransferReqComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            dbData: [],
            redirectPayload: [],
            redirect: false,
            errorMessage: '',
            error: false
        };
    }

    componentDidMount() {
        const {id} = jwt.decode(localStorage.getItem('user')).data;
        this.getData(id);
    }

    getData = id => {
            axios.get(apiUrl() + 'transfer-request/' + id)
                .then(res => {
                    if (res.data.status){
                        const {payload} = res.data
                        payload.forEach((data) => {
                            let tableObj = {}
                            let dbObj = {}
                            Object.keys(payload[0]).forEach((item) => {
                                if (item !== 'category' && item !== 'sub_category' && item !== 'request_from') {
                                    dbObj[item] = data[item]
                                }
                                if (item !== 'category_id' && item !== 'sub_category_id' && item !== 'req_user_id') {
                                    tableObj[item] = data[item]
                                }
                            })
                            this.setState({
                                tableData: [...this.state.tableData, tableObj],
                                dbData: [...this.state.dbData, dbObj]
                            })
                        })
                    }
                })
                .catch(err => {
                    console.log(err.response);
                })
    };

    deliverRequest = (id) => {
        const userId = jwt.decode(localStorage.getItem('user')).data.id
        axios.get(apiUrl() + 'assets-category/all/' + userId )
            .then(resData => {
                if(resData.data[0].length > 0) {
                    const {dbData} = this.state
                    let redPayload = dbData.filter(item => item.id === id)
                    redPayload[0]['transfer_request'] = true
                    this.setState({
                        redirect: true,
                        redirectPayload: redPayload[0]
                    })
                } else {
                    this.setState({
                        error: true,
                        errorMessage: 'You do not have this product'
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
    }

    render() {
        const {redirectPayload, tableData, redirect, error, errorMessage} = this.state;

        return (
            <>
                {error && <ErrorModal errorMessage={errorMessage} />}
                {redirect && <Redirect
                    to={{
                        pathname: "/asset-transfer",
                        state: redirectPayload
                    }}
                />}
                <div className="rounded bg-white admin-input-height p-2 m-2">
                    <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0">Incoming Asset Transfer Request</p>
                    </nav>
                    {tableData.length > 0 ? <>
                            <PrimeDataTable
                                data={tableData}
                                delivery={this.deliverRequest}
                                unavailable={'transfer-request'}
                            />
                        </> :
                        <NodataFound />}
                </div>
            </>
        );
    }
}

export default IncomingTransferReqComponent;
