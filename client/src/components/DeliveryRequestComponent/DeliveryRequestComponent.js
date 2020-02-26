import './multiselect.css'
import Axios from 'axios'
import jwt from "jsonwebtoken";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import PrintDelivery from "./PrintDelivery";

class DeliveryRequestComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            resData: [],
            products: [],
            assetsList: [],
            reqDetails: [],
            showDetails: false,
        }
    }

    componentDidMount = () => {
        const {id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        this.getReqDetails()
        Axios.get(apiUrl() + 'assets-entry/sub-assets/' + id)
            .then(resData => {
                if (resData.data.length > 0) {
                    this.setState({
                        products: resData.data
                    })
                }
            })
    }

    getReqApproveData = (id) => {
        Axios.get(apiUrl() + 'requisition-approve/specific/' + id)
            .then(resData => {
                this.setState({
                    resData: resData.data
                })
            })
    }

    getReqDetails = () => {
        Axios.get(apiUrl() + 'requisition-details/delivery')
            .then(res => {
                if(res.data.length > 0) {
                    this.setState({
                        reqDetails: res.data
                    })
                }
            })
    }

    assetList = (id) => {
        this.getReqApproveData(id)
        this.setState({
            showDetails: true
        })
    }

    customizeData = () => {
        const {resData, products, assetsList} = this.state
        if (resData.length > 0 && products.length > 0) {
            resData.forEach(item => {
                let quantity = 0
                products.forEach(pro => {
                    if(item.asset_category === parseInt(pro.asset_category, 10) && item.asset_sub_category === parseInt(pro.asset_sub_category, 10)) {
                        quantity++
                    }
                })
                item.status = 3
                item.update_quantity = quantity < item.update_quantity ? quantity : item.update_quantity
                item['update_by'] = jwt.decode(localStorage.getItem('user')).data.id
                delete item.category_name
                delete item.id
                delete item.sub_category_name
                delete item.location_name
                delete item.role_name
            })
        }
        const payload = {delivery: resData, products: assetsList}

        Axios.post(apiUrl() + 'requisition-approve/delivery', payload)
            .then(res => {
                this.setState({
                    printDelivery: true
                })
            })
    }

    comeBack = () => {
        this.setState({
            printDelivery: false
        })
    }

    subAssets = (cat, sub, dev_to) => {
        const {products} = this.state
        const filteredCategory = products.length > 0 && products.filter(item => (item.asset_category === parseInt(cat, 10) && item.asset_sub_category === parseInt(sub, 10)))
        const selectAsset = filteredCategory.length > 0 && filteredCategory.map((item, index) => {
            return(
                <div>
                    <input type={'checkbox'}
                           value={item.id}
                           id={item.products}
                           name={item.products}
                           onChange={(e) => this.handleChange(e, dev_to)}/>
                    <label htmlFor={item.products}>{item.products}</label>
                </div>
            )
        })
        return selectAsset
    }

    handleChange = (e, assign_to) => {
        let assetsList = this.state.assetsList.filter(item => item.assetId !== e.target.value)
        let assets = {
            assetId: e.target.value,
            assignTo: assign_to
        }
        if(assetsList.length >= this.state.assetsList.length) {
            this.setState({
                assetsList: [...assetsList, assets],
            })
        } else {
            this.setState({
                assetsList: [...assetsList],
            })
        }
    }

    render() {
        const {resData, reqDetails, showDetails, printDelivery} = this.state
        let tableData = resData.length > 0 && resData.map((item, index) => {
            return(
                <tr key={index + 10}>
                    <td>{index + 1}</td>
                    <td>{item.category_name}</td>
                    <td>{item.sub_category_name}</td>
                    <td>{item.role_name}</td>
                    <td>{item.location_name}</td>
                    <td>{item.update_quantity}</td>
                    <td style={{width: 350}}>
                        <div className={'ui-multiselect'}>
                            {this.subAssets(item.asset_category, item.asset_sub_category, item.delivery_to)}
                        </div>
                    </td>
                </tr>
            )
        })


        return (
                <div className={'bg-white p-3 rounded m-3'}>
                    {printDelivery && <PrintDelivery resData={resData} comeBack={this.comeBack} />}
                    {showDetails ?  <div className={'ui-req-history'}>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p onClick={() => {this.setState({showDetails: false, detailedData: []})}} className="text-blue cursor-pointer f-weight-700 f-22px m-0" ><i className="fas mr-1 fa-chevron-circle-left"></i>Go Back</p>
                        </nav>
                        <table className="table">
                            <thead className="thead-dark">
                            <tr>
                                <th>No</th>
                                <th>Category</th>
                                <th>Sub Category</th>
                                <th>Role</th>
                                <th>Location</th>
                                <th>Quantity</th>
                                <th>Product</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tableData}
                            </tbody>
                        </table>
                        <div className="d-flex w-100 justify-content-end">
                            <button className="btn btn-info px-4 f-18px" onClick={this.customizeData}>Deliver</button>
                        </div>
                    </div> : <>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-22px m-0">Delivery Request</p>
                        </nav>
                        {
                            reqDetails.length > 0 ? <ReactDataTable
                                details={'reqHistory'}
                                assetList={this.assetList}
                                tableData={reqDetails}
                            /> : <h3>Loading...</h3>
                        }
                    </>}
                </div>
        );
    }
}

export default DeliveryRequestComponent;