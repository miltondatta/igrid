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

    getReqApproveData = (requisition_id) => {
        let user_data = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : '';
        user_data['requisition_id'] =   requisition_id;
        Axios.get(apiUrl() + 'requisition-approve/specific', {
            params: user_data
        }).then(resData => {
                this.setState({
                    resData: resData.data
                })
            })
    }

    getReqDetails = () => {
        let user_data = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : '';
        Axios.get(apiUrl() + 'requisition-details/delivery', {
            params: user_data
        }).then(res => {
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
                <div key={index + 10} className={'ui-tbody-child'}>
                    <div className={'d-flex align-items-center'}>
                        <p className={'w-60px'}>{index + 1}</p>
                        <p>{item.category_name}</p>
                        <p>{item.sub_category_name}</p>
                        <p>{item.role_name}</p>
                        <p>{item.location_name}</p>
                        <p>{item.update_quantity}</p>
                        <p style={{width: 350, overflow: "visible"}}>
                            <div className={'ui-multiselect'}>
                                {this.subAssets(item.asset_category, item.asset_sub_category, item.delivery_to)}
                            </div>
                        </p>
                    </div>
                </div>
            )
        })


        return (
            <div className={'bg-white p-3 rounded m-3 min-h-80vh'}>
                {printDelivery && <PrintDelivery resData={resData} comeBack={this.comeBack} />}
                {showDetails ?  <>
                    <nav className="navbar text-center mb-2 pl-2 rounded">
                        <p onClick={() => {this.setState({showDetails: false, detailedData: []})}} className="text-blue cursor-pointer f-weight-700 f-22px m-0" ><i className="fas mr-1 fa-chevron-circle-left"></i>Go Back</p>
                    </nav>
                    <div className={'reactDataTable mb-20p'}>
                        <div className={'table'}>
                            <div className={'thead'}>
                                <div className={'d-flex align-items-center'}>
                                    <p className={'w-60px'}>No</p>
                                    <p>Category</p>
                                    <p>Sub Category</p>
                                    <p>Role</p>
                                    <p>Location</p>
                                    <p>Quantity</p>
                                    <p>Product</p>
                                </div>
                            </div>
                            <div className={'tbody'}>
                                {tableData}
                            </div>
                        </div>
                    </div>
                    <button className="submit-btn" onClick={this.customizeData}>Deliver</button>
                </> : <>
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