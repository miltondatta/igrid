import Axios from 'axios'
import React, {Component} from 'react';
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";
import {apiUrl} from "../../utility/constant";
import jwt from "jsonwebtoken";
import NodataFound from "../../utility/component/nodataFound";

class TransferRequestStatusComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const {id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : '';
        Axios.get(apiUrl() + 'transfer-request-status/' + id)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        data: res.data.payload
                    })
                }
            })
    }

    render() {
        const {data} = this.state
        return (
            <div className="rounded bg-white admin-input-height p-2 m-2">
                <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                    <p className="text-blue f-weight-700 f-20px m-0">Asset Transfer Request Status</p>
                </nav>
                {data.length > 0 ? <>
                        <PrimeDataTable
                            data={data}
                        />
                    </> :
                    <NodataFound />}
            </div>
        );
    }
}

export default TransferRequestStatusComponent;
