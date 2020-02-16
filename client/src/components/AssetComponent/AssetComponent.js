import './assetComponent.css'
import Axios from "axios";
import jwt from "jsonwebtoken";
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {apiUrl} from "../../utility/constant";
import AssetCategoryOptions from "../../utility/component/assetCategoryOptions";
import AssetSubCategoryOptions from "../../utility/component/assetSubCategoryOptions";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";

class AssetComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            items: 0,
            quantity: '',
            reqMaster: '',
            arrayData: [],
            productSet: [],
            assetCategory: [],
            assetSubCategory: [],
            filterText: '',
            asset_category: '',
            submitProduct: false,
            asset_sub_category: '',
            request: this.props.match.params.option ? this.props.match.params.option : 0,
            email: jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data.email : '',
            userName: jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data.userName : '',
            mobile: jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data.phone_number : '',
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    componentDidMount() {
        Axios.get(apiUrl() + 'asset-category')
            .then(resData => {
                this.setState({
                    assetCategory: resData.data
                })
            })
        Axios.get(apiUrl() + 'asset-sub-category')
            .then(resData => {
                this.setState({
                    assetSubCategory: resData.data
                })
            })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {asset_category, asset_sub_category, quantity, arrayData, productSet, assetSubCategory, assetCategory} = this.state
        const length = productSet.length
        const assName = assetCategory.find(item => item.id === parseInt(asset_category, 10)).category_name
        const subAssName = assetSubCategory.find(item => item.id === parseInt(asset_sub_category, 10)).sub_category_name
        console.log(assName, 59)
        const productCombination = {
            id: length + 1,
            request_name: assName,
            item_id: subAssName,
            quantity
        }
        const productCombinationStore = {
            id: length + 1,
            request_name: asset_category,
            item_name: asset_sub_category,
            quantity
        }
        if (asset_category !== 0 && asset_sub_category !== 0 && quantity !== '') {
            this.setState((prevState) => ({
                productSet: [...prevState.productSet, productCombinationStore],
                arrayData: [...prevState.arrayData, productCombination],
                submitProduct: true,
                quantity: '',
                request: 0,
                items: 0,
            }))
        }
    }

    sendRequisition = (e) => {
        e.preventDefault()
        const {reqMaster, productSet} = this.state
        const data = []

        productSet.forEach(item => {
            data.push({
                requisition_id: reqMaster.id,
                asset_category: item.request_name,
                asset_sub_category: item.item_name,
                quantity: item.quantity,
            })
        })

        Axios.post(apiUrl() + 'requisition-details/entry', data)
            .then(resData => {
                if(resData){
                    console.log(resData)
                }
            })
            .catch(err => {console.log(err)})
    }

    handleFilter = (e) => {
        const {value} = e.target
        this.setState({
            filterText: value
        }, () => {
            console.log(this.state.filterText)
        })
    }

    handleReqMaster = (e) => {
        e.preventDefault()
        const {mobile, email} = this.state
        const {location_id, role_id, id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        const payload = {
            mobile,
            email,
            location_id,
            role_id,
            request_by: id
        }
        Axios.post(apiUrl() + 'requisition-master/entry', payload)
            .then(resData => {
                if(resData){
                    this.setState({
                        reqMaster: resData.data[0]
                    })
                }
            })
            .catch(err => {console.log(err)})
    }

    render(){
        const {asset_category, mobile, email, quantity, reqMaster, userName, asset_sub_category, productSet, arrayData} = this.state

        return(
            <div className={'ui-asset-component m-auto justify-content-between'}>
                {!reqMaster ? <div className={'bg-white p-3 rounded shadow'}>
                    <nav className="navbar text-center mb-3 p-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0">Your Information</p>
                    </nav>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="email">Email</label>
                                <input onChange={this.handleChange} value={email} type="email" className="form-control" name={'email'} id="email" placeholder="Email" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="mobile">Phone</label>
                                <input onChange={this.handleChange} value={mobile} type="text" className="form-control" name={'mobile'} id="mobile" placeholder="Phone Number" />
                            </div>
                        </div>
                        <button type="submit" onClick={this.handleReqMaster} className="ui-btn">Add Info</button>
                    </form>
                </div> : <div className={'bg-white p-3 rounded shadow'}>
                    <nav className="navbar text-center p-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0" href="#">Your Information</p>
                    </nav>
                    <div className={'row px-3'}>
                        <div className="col-md-3 mt-3 pl-2 f-18px f-weight-500">Your Name</div>
                        <div className="col-md-9 mt-3 pl-2 f-18px">{userName}</div>
                        <div className="col-md-3 mt-3 pl-2 f-18px f-weight-500">Your Email</div>
                        <div className="col-md-9 mt-3 pl-2 f-18px">{reqMaster.email}</div>
                        <div className="col-md-3 mt-3 pl-2 f-18px f-weight-500">Phone Number</div>
                        <div className="col-md-9 mt-3 pl-2 f-18px">{reqMaster.mobile}</div>
                        <div className="col-md-3 mt-3 pl-2 f-18px f-weight-500">Request Date</div>
                        <div className="col-md-9 mt-3 pl-2 f-18px">{reqMaster.request_date}</div>
                    </div>
                </div>}
                <div className={'bg-white p-3 rounded shadow ui-req-dataTable'}>
                    <nav className="navbar text-center mb-3 p-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0">Submit Product</p>
                    </nav>
                    <ReactDataTable
                        tableData={arrayData}
                    />
                    {productSet.length > 0 && <button type="submit" onClick={this.sendRequisition} className="ui-btn">Submit</button>}
                </div>
                {reqMaster &&
                    <div className={'bg-white p-3 rounded shadow'}>
                        <nav className="navbar text-center mb-3 p-2 rounded">
                            <p className="text-dark f-weight-500 f-20px m-0">Add Products</p>
                        </nav>
                        <form className={'p-2'}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="requeston">Request On</label>
                                    <select onChange={this.handleChange} className="form-control" id="requeston" value={asset_category} name={'asset_category'}>
                                        <option value={0}>--Select--</option>
                                        <AssetCategoryOptions />
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="itemname">Item Name</label>
                                    <select onChange={this.handleChange} className="form-control" id="itemname" name={'asset_sub_category'} value={asset_sub_category}>
                                        <option value={0}>--Select Items--</option>
                                        <AssetSubCategoryOptions assetId={asset_category} />
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Quantity</label>
                                <input onChange={this.handleChange} value={quantity} type="number" className="form-control" name={'quantity'} id="inputAddress" placeholder="Quantity" />
                            </div>
                            <button type="submit" onClick={this.handleSubmit} className="ui-btn">Add Product</button>
                        </form>
                    </div>}
            </div>
        )
    }
}

export default withRouter(AssetComponent)