import Axios from 'axios'
import React, {Component} from 'react';
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import {apiUrl} from "../../utility/constant";

class RequestHistoryComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            data: []
        }
    }

    componentDidMount() {
        Axios.get(apiUrl() + '/requisition-details')
            .then(res => {
                if(res.data.length > 0) {
                    this.setState({
                        data: res.data
                    })
                }
            })
    }

    assetList = (id) => {
        let idStore = id
    }

    render() {
        const {data} = this.state
        return (
            <div className={'bg-white p-3 rounded shadow'}>
                <nav className="navbar text-center mb-3 p-2 rounded">
                    <p className="text-dark f-weight-500 f-20px m-0" >Request History</p>
                </nav>
                {data.length > 0 ? <ReactDataTable
                    details
                    assetList={this.assetList}
                    searchable
                    pagination
                    tableData={data}
                /> : <h2>Loading...</h2>}
            </div>
        );
    }
}

export default RequestHistoryComponent;