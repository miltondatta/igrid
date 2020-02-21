import './multiselect.css'
import Axios from 'axios'
import jwt from "jsonwebtoken";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";

class DeliveryRequestComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            resData: [],
            products: [],
            assetsList: [],
        }
    }

    componentDidMount = () => {
        const {id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        Axios.get(apiUrl() + 'requisition-approve')
            .then(resData => {
                this.setState({
                    resData: resData.data
                })
            })

        Axios.get(apiUrl() + 'assets-entry/sub-assets/' + id)
            .then(resData => {
                if (resData.data.length > 0) {
                    this.setState({
                        products: resData.data
                    })
                }
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
                console.log(res.data)
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
        const {resData} = this.state
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
            <div>
                <div className={'bg-white p-3 rounded shadow'}>
                    <nav className="navbar text-center mb-3 p-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0">Delivery Request</p>
                    </nav>
                    <div className={'ui-req-history'}>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default DeliveryRequestComponent;