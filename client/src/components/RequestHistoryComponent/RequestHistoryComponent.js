import Axios from 'axios'
import React, {Component} from 'react';
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import {apiUrl} from "../../utility/constant";

class RequestHistoryComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            data: [],
            detailedData: [],
            showDetails: false
        }
    }

    componentDidMount() {
        Axios.get(apiUrl() + 'requisition-details')
            .then(res => {
                if(res.data.length > 0) {
                    this.setState({
                        data: res.data
                    })
                }
            })
    }

    assetList = (id) => {
        Axios.get(apiUrl() + 'requisition-details/details/' + id)
            .then(res => {
                if(res.data.length > 0) {
                    this.setState({
                        detailedData: res.data,
                        showDetails: true
                    })
                }
            })
    }

    render() {
        const {data, showDetails, detailedData} = this.state
        const detailsData = detailedData.map((item, index) => {
            return(
                <div className={'row'}>
                    <div className="col-md-3 ml-3 my-2 f-weight-500">Username:</div>
                    <div className="col-md-8 ml-3 my-2">{item.username}</div>
                    <div className="col-md-3 ml-3 my-2 f-weight-500">Category:</div>
                    <div className="col-md-8 ml-3 my-2">{item.category_name}</div>
                    <div className="col-md-3 ml-3 my-2 f-weight-500">Sub Category:</div>
                    <div className="col-md-8 ml-3 my-2">{item.sub_category_name}</div>
                    <div className="col-md-3 ml-3 my-2 f-weight-500">Quantity:</div>
                    <div className="col-md-8 ml-3 my-2">{item.quantity}</div>
                    <div className="col-md-3 ml-3 my-2 f-weight-500">Email:</div>
                    <div className="col-md-8 ml-3 my-2">{item.email}</div>
                    <div className="col-md-3 ml-3 my-2 f-weight-500">Phone No:</div>
                    <div className="col-md-8 ml-3 my-2">{item.mobile}</div>
                </div>
            )
        })
        return (
            <div className={'bg-white p-3 rounded shadow'}>
                {!showDetails ? <>
                <nav className="navbar text-center mb-3 p-2 rounded">
                    <p className="text-dark f-weight-500 f-20px m-0" >Requisition History</p>
                </nav>
                    {data.length > 0 ? <ReactDataTable
                        details
                        assetList={this.assetList}
                        searchable
                        pagination
                        tableData={data}
                    /> : <h2>Loading...</h2>}
                </> : <>
                    <nav className="navbar text-center mb-2 p-2 rounded cursor-pointer">
                        <p onClick={() => {this.setState({showDetails: false, detailedData: []})}} className="text-dark f-weight-500 f-20px m-0" ><i className="fas fa-chevron-circle-left"></i> Go Back</p>
                    </nav>
                    {detailsData}
                </>}
            </div>
        );
    }
}

export default RequestHistoryComponent;