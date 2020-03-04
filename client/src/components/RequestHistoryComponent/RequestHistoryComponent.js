import Axios from 'axios'
import jwt from "jsonwebtoken";
import './RequestHistoryCom.css'
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";

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
            comment: '',
            successMessage: '',
        }
    }

    componentDidMount() {
        let user_data = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : '';
        Axios.get(apiUrl() + 'requisition-details', {
            params: user_data
        }).then(res => {
            if (res.data.length > 0) {
                this.setState({
                    data: res.data
                })
            }
        })
    }

    handleComment = (e, ind) => {
        const {value, name} = e.target
        const {reqDetails} = this.state
        let commentedReqDetails = reqDetails.length > 0 && reqDetails.map((item, index) => {
            if (index === ind) {
                item[name] = value
            }
            return item
        })
        this.setState({
            reqDetails: commentedReqDetails
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
                    }, () => {
                        window.location.reload()
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
        console.log(this.state.reqDetails, 134)
        const {data, showDetails, detailedData, error, errorMessage, success, successMessage, comment} = this.state
        let tableData = detailedData.map((item, index) => {
            return(
                <div key={index + 10} className={'ui-tbody-child'}>
                    <div className={'d-flex align-items-center'}>
                        <p className={'w-60px'}>{index + 1}</p>
                        <p>{item.category_name}</p>
                        <p>{item.sub_category_name}</p>
                        <p>{item.brand}</p>
                        <p>{item.model}</p>
                        <p>{item.reason}</p>
                        <p>
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
                        </p>
                        <p>
                            <input
                                type={'text'}
                                name={'comment'}
                                placeholder={'Comments'}
                                className={'ui-req-textarea'}
                                onChange={(e) => this.handleComment(e, index)}
                            />
                        </p>
                    </div>
                </div>
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
                    <nav className="navbar text-center mb-2 pl-2 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0" >Requisition History</p>
                    </nav>
                        {data.length > 0 ? <ReactDataTable
                            details={'reqHistory'}
                            assetList={this.assetList}
                            tableData={data}
                        /> : <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> Currently There are No Data</h4>}
                    </> : <>
                        <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                            <p onClick={() => {this.setState({showDetails: false, detailedData: []})}} className="text-blue cursor-pointer f-weight-700 f-20px m-0" ><i className="fas fa-chevron-circle-left"></i> Go Back</p>
                        </nav>

                        <div className={'reactDataTable mb-20p'}>
                            <div className={'table'}>
                                <div className={'thead'}>
                                    <div className={'d-flex align-items-center'}>
                                        <p className={'w-60px'}>No</p>
                                        <p>Category</p>
                                        <p>Sub Category</p>
                                        <p>Brand</p>
                                        <p>Model</p>
                                        <p>Reasons</p>
                                        <p>Quantity</p>
                                        <p>Comment</p>
                                    </div>
                                    <div className={'d-flex align-items-center'}> </div>
                                </div>
                                <div className={'tbody'}>
                                    {tableData}
                                </div>
                            </div>
                        </div>
                        <button className="submit-btn" onClick={this.submitApprove}>Approve</button>
                    </>}
                </div>
            </div>
        );
    }
}

export default RequestHistoryComponent