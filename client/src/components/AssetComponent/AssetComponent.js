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
        const {name, value, files} = e.target
        if (name === 'upload_file') {
            this.setState({
                [name]: files[0]
            })
        }
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
        const {asset_category, asset_sub_category, quantity, productSet, assetSubCategory, assetCategory,  brand, expected_date, model, upload_file, details, reason} = this.state
        const length = productSet.length
        const assName = assetCategory.find(item => item.id === parseInt(asset_category, 10)).category_name
        const subAssName = assetSubCategory.find(item => item.id === parseInt(asset_sub_category, 10)).sub_category_name
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
            quantity, brand, expected_date, model, upload_file, details, reason
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
        let data = new FormData()

        productSet.forEach((item, index) => {
            delete item.id
            Object.keys(item).forEach(itemData => {
                data.append('data', item[itemData])
            })
            console.log(data  , 101)
            data.append('requisition_id', reqMaster.id)
            Axios.post(apiUrl() + 'requisition-details/entry', data)
                .then(resData => {
                    if(resData){
                        console.log(resData)
                    }
                })
                .catch(err => {console.log(err)})
        })
    }

    handleFilter = (e) => {
        const {value} = e.target
        this.setState({
            filterText: value
        }, () => {
            console.log(this.state.filterText)
        })
    }

    render(){
        const {asset_category, brand, expected_date, quantity, model, upload_file, details, asset_sub_category, productSet, arrayData, reason} = this.state

        return(
            <>
                <div className={'ui-dataEntry p-1'}>
                    <div className={'bg-white rounded p-2 min-h-80vh position-relative'}>
                        <nav className="navbar text-center mb-3 p-2 rounded">
                            <p className="text-dark f-weight-500 f-20px m-0">Requisition</p>
                        </nav>
                        <div className={'px-1 mb-2'}>
                            <select onChange={this.handleChange} className="ui-custom-input" id="requeston" value={asset_category} name={'asset_category'}>
                                <option value={0}>Select Category</option>
                                <AssetCategoryOptions />
                            </select>
                        </div>
                        <div className={"px-1 mb-2"}>
                            <select onChange={this.handleChange} className="ui-custom-input" id="itemname" name={'asset_sub_category'} value={asset_sub_category}>
                                <option value={0}>Select Sub Category</option>
                                <AssetSubCategoryOptions assetId={asset_category} />
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <input onChange={this.handleChange} value={quantity} type="number" className="ui-custom-input" name={'quantity'} id="inputAddress" placeholder="Quantity" />
                        </div>
                        <div className="px-1 mb-2">
                            <input onChange={this.handleChange} value={model} type="text" className="ui-custom-input" name={'model'} placeholder="Model" />
                        </div>
                        <div className="px-1 mb-2">
                            <input onChange={this.handleChange} value={brand} type="text" className="ui-custom-input" name={'brand'} placeholder="Brand" />
                        </div>
                        <div className="px-1 mb-2">
                            <input onChange={this.handleChange} value={reason} type="text" className="ui-custom-input" name={'reason'} placeholder="Reason" />
                        </div>
                        <div className="px-1 mb-2">
                            <input onChange={this.handleChange} value={expected_date} type={'date'} className="form-control" name={'expected_date'} placeholder="Expected Date" />
                        </div>
                        <div className="px-1 mb-2">
                            <textarea onChange={this.handleChange} value={details} type="text" className="ui-custom-input " name={'details'} placeholder="Details" />
                        </div>
                        <div className="ui-custom-file w-50 px-1">
                            <input type="file" onChange={this.handleChange} name={'upload_file'} required />
                            <label htmlFor="validatedCustomFile">{upload_file ? upload_file.name : 'Choose file'}</label>
                        </div>
                        <button type="submit" onClick={this.handleSubmit} className="submit-btn">Requisition</button>
                    </div>
                    <div className={'rounded p-2 bg-white min-h-80vh'}>
                        <nav className="navbar text-center mb-3 p-2 rounded">
                            <p className="text-dark f-weight-500 f-20px m-0">Submit Requisiiton</p>
                        </nav>
                        {arrayData.length > 0 ? <ReactDataTable
                            tableData={arrayData}
                        /> : <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> Currently There are No Data</h4>}

                        {productSet.length > 0 && <button type="submit" onClick={this.sendRequisition} className="ui-btn">Submit</button>}
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(AssetComponent)