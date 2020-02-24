import Axios from 'axios'
import jwt from "jsonwebtoken";
import './RequestHistoryCom.css'
import {Redirect} from 'react-router-dom'
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import StatusOptions from "../../utility/component/statusOptions";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import InstaAdd from "../../module/insta-add/InstaAdd";
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class RequestHistoryComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            data: [],
            keys: [],
            reqDetails: [],
            detailedData: [],
            showDetails: false,
            renderRidirect: false,
            error: false,
            success: false,
            errorMessage: '',
            successMessage: '',
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
        this.setState({
            requisition_id: id
        })
        Axios.get(apiUrl() + 'requisition-details/details/' + id)
            .then(res => {
                if(res.data.length > 0) {
                    this.setState({
                        detailedData: res.data,
                        showDetails: true
                    }, () => {
                        res.data.forEach(item => {
                            this.handleChange({target: {value: null}},item.id, 'update_quantity', item.quantity, id )
                        })
                    })
                }
            })
    }

    submitApprove = () => {
        const {reqDetails} = this.state
        Axios.post(apiUrl() + 'requisition-approve/entry', reqDetails)
            .then(res => {
                if(!res.data.status){
                    this.setState({
                        error: true,
                        errorMessage: res.data.message
                    })
                } else {
                    this.setState({
                        success: true,
                        successMessage: res.data.message
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange = (e, requisition_details_id, type, quantity, requisition_id) => {
        const {value} = e.target
        let keys = this.state.keys
        let obj = this.state.reqDetails
        const {location_id, role_id} = jwt.decode(localStorage.getItem('user')).data
        const update_by = jwt.decode(localStorage.getItem('user')).data.id
        if(obj.length > 0) {
            obj.forEach(item => {
                if(requisition_details_id === item.requisition_details_id) {
                    item[type] = type === 'update_quantity' && !value ? quantity : parseInt(value, 10)
                } else if(!keys.includes(requisition_details_id)) {
                    keys.push(requisition_details_id)
                    obj.push({
                        role_id,
                        update_by,
                        location_id,
                        requisition_id,
                        delivery_to: null,
                        status: 1,
                        requisition_details_id,
                        [type]: type === 'update_quantity' && !value ? quantity : parseInt(value, 10)
                    })
                }
            })
        } else {
            keys.push(requisition_details_id)
            obj.push({
                role_id,
                update_by,
                location_id,
                requisition_id,
                delivery_to: null,
                requisition_details_id,
                status: 1,
                [type]: type === 'update_quantity' && !value ? quantity : parseInt(value, 10)
            })
        }


        this.setState({
            reqDetails: obj,
            keys: [...this.state.keys, requisition_details_id, keys]
        }, () => {
            console.log(this.state.reqDetails, 73)
        })
    }

    render() {
        const {data, showDetails, detailedData, error, errorMessage, success, successMessage} = this.state
        let tableData = detailedData.map((item, index) => {
            return(
                <tr key={index + 10}>
                    <td>{index + 1}</td>
                    <td>{item.category_name}</td>
                    <td>{item.sub_category_name}</td>
                    <td>
                        {this.state[item.id] ? <input
                                className={'ui-transparent-input'}
                                onChange={(e) => {this.handleChange(e,item.id, 'update_quantity', item.quantity )}}
                            /> :
                        <input
                            className={'ui-transparent-input'}
                            onFocus={() => {
                                this.setState({
                                    [item.id]: true
                                })
                            }}
                            value={item.quantity} />}
                    </td>
                </tr>
            )
        })

        return (
            <div className={'m-3'}>
                {error && <div className="alert alert-danger my-2 position-relative d-flex justify-content-between align-items-center  " role="alert">
                    {errorMessage}  <i className="fas fa-times " onClick={() => {this.setState({error: false})}}></i>
                </div>}
                {success &&
                <div className="alert alert-success my-2 position-relative d-flex justify-content-between align-items-center"
                     role="alert">
                    {successMessage} <i className="fas fa-times " onClick={() => {
                    this.setState({success: false})
                }}></i>
                </div>}
                <div className={'bg-white p-3 rounded'}>
                    {!showDetails ? <>
                    <nav className="navbar text-center mb-3 p-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0" >Requisition History</p>
                    </nav>
                        {data.length > 0 ? <ReactDataTable
                            details={'reqHistory'}
                            assetList={this.assetList}
                            tableData={data}
                        /> : <h2>Loading...</h2>}
                    </> : <>
                        <nav className="navbar text-center mb-2 p-2 rounded cursor-pointer">
                            <p onClick={() => {this.setState({showDetails: false, detailedData: []})}} className="text-dark f-weight-500 f-20px m-0" ><i className="fas fa-chevron-circle-left"></i>     Go Back</p>
                        </nav>
                        <div className={'ui-req-history'}>
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>No</th>
                                        <th>Category</th>
                                        <th>Sub Category</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData}
                                </tbody>
                            </table>
                            <div className="d-flex w-100 justify-content-end">
                                <button className="btn btn-info px-4 f-18px" onClick={this.submitApprove}>Submit</button>
                            </div>
                        </div>
                    </>}
                </div>
            </div>
        );
    }
}

export default RequestHistoryComponent