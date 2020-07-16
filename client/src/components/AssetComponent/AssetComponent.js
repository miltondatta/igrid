import './assetComponent.css'
import Axios from "axios";
import jwt from "jsonwebtoken";
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {apiUrl} from "../../utility/constant";
import AssetCategoryOptions from "../../utility/component/assetCategoryOptions";
import AssetSubCategoryOptions from "../../utility/component/assetSubCategoryOptions";

import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";
import {getFileExtension} from "../../utility/custom";
import moment from "moment";
import DatePicker from 'react-datepicker2';
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";
import NodataFound from "../../utility/component/nodataFound";

moment.locale('en');

class AssetComponent extends Component{

    constructor(props){
        super(props)
        this.state={
            items: 0,
            quantity: '',
            brand: '',
            model: '',
            reason: '',
            details: '',
            upload_file: null,
            reqMaster: '',
            arrayData: [],
            productSet: [],
            assetCategory: [],
            assetSubCategory: [],
            filterText: '',
            error: false,
            expected_date: moment(),
            errorMessage: '',
            success: false,
            successMessage: '',
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
            if (["jpg","jpeg","png","doc","docx","pdf","xlsx"].includes(getFileExtension(files[0].name))) {
                this.setState({
                    [name]: files[0]
                })
            } else {
                this.setState({
                    error: true,
                    errorMessage: 'Only JPG | JPEG | PNG | DOC | DOCX | PDF | XLSX Files Excepted'
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            error: false,
                        })
                    }, 2300)
                })
            }
        } else {
            this.setState({
                [name]: value
            })
        }
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
        if (Object.values(this.validate()).includes(false)) return;
        if (this.state.reqMaster === '') {
            this.handleReqMaster()
        }
        const {asset_category, asset_sub_category, quantity, productSet, assetSubCategory, assetCategory, expected_date, brand, model, upload_file, details, reason} = this.state
        if (asset_category !== 0 && asset_sub_category !== 0 && quantity !== '') {
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
                asset_category, asset_sub_category, quantity, brand, expected_date: moment(expected_date).format('YYYY-MM-DD'), model, upload_file, details, reason
            }
            this.setState((prevState) => ({
                productSet: [...prevState.productSet, productCombinationStore],
                arrayData: [...prevState.arrayData, productCombination],
                submitProduct: true,
                quantity: '',
                request: 0,
                items: 0,
            }), () => {
                this.setState({
                    reason: '',
                    details: '',
                    brand: '',
                    model: '',
                    upload_file: null,
                    quantity: '',
                    asset_category: '',
                    asset_sub_category: '',
                })
            })
        }
    }

    sendRequisition = (e) => {
        e.preventDefault()
        const {reqMaster, productSet} = this.state
        let data = new FormData()

        productSet.forEach((item, index) => {
            delete item.id
            console.log(item)
            Object.keys(item).forEach(itemData => {
                itemData === 'upload_file' ? data.append('file', item[itemData]) : data.append(itemData, item[itemData])
            })
            data.append('requisition_id', reqMaster.id)
            Axios.post(apiUrl() + 'requisition-details/entry', data)
                .then(resData => {
                    if(!resData.data.status){
                        this.setState({
                            error: true,
                            errorMessage: resData.data.message
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    error: false,
                                })
                            }, 2300)
                        })
                    } else {
                        this.setState({
                            success: true,
                            successMessage: resData.data.message,
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    success: false,
                                })
                            }, 2300)
                        })
                    }
                })
                .catch(err => {console.log(err)})

            data = new FormData()
            if (index + 1 === productSet.length) {
                this.setState({
                    arrayData: []
                })
            }
        })
    }

    handleReqMaster = () => {
        const {location_id, role_id, id, email, phone_number} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        const payload = {
            mobile: phone_number,
            email,
            location_id,
            role_id,
            request_by: id
        }
        Axios.post(apiUrl() + 'requisition-master/entry', payload)
            .then(resData => {
                if(resData){
                    this.setState({
                        reqMaster: resData.data.resData1[0]
                    })
                }
            })
            .catch(err => {console.log(err)})
    }

    removeItemFromList = (id) => {
        const {arrayData, productSet} = this.state
        let filteredData = arrayData.length > 0 && arrayData.filter(item => item.id !== id)
        let filteredData2 = productSet.length > 0 && productSet.filter(item => item.id !== id)
        this.setState({
            arrayData: filteredData,
            productSet: filteredData2
        })
    }

    validate = () => {
        const {asset_category, quantity, details, asset_sub_category, reason, expected_date} = this.state
        let errorDict = {
            asset_category: typeof asset_category !== 'undefined' && asset_category !== '',
            quantity: typeof quantity !== 'undefined' && quantity !== '',
            details: typeof details !== 'undefined' && details !== '',
            expected_date: typeof expected_date !== 'undefined' && expected_date !== '',
            asset_sub_category: typeof asset_sub_category !== 'undefined' && asset_sub_category !== '',
            reason: typeof reason !== 'undefined' && reason !== '',
        }

        this.setState({
            errorDict
        })

        return errorDict
    }

    render(){
        const {asset_category, brand, error, success, successMessage, errorMessage, expected_date, quantity, model, upload_file, details, asset_sub_category, errorDict, arrayData, reason} = this.state

        return(
            <>
                {error &&
                    <ErrorModal errorMessage={errorMessage} />
                }
                {success &&
                    <SuccessModal successMessage={successMessage} />
                }
                <div className={'ui-dataEntry p-2'}>
                    <div className={'bg-white rounded p-2 admin-input-height position-relative'}>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Add Product for Requisition</p>
                        </nav>
                        <div className={'px-1 mb-2'}>
                            <label className={'ui-custom-label'}>Select Category</label>
                            <select onChange={this.handleChange} className={`ui-custom-input ${errorDict && !errorDict.asset_category && 'is-invalid'}`} id="requeston" value={asset_category} name={'asset_category'}>
                                <option value={0}>Select Category</option>
                                <AssetCategoryOptions />
                            </select>
                        </div>
                        <div className={"px-1 mb-2"}>
                            <label className={'ui-custom-label'}>Select Sub Category</label>
                            <select onChange={this.handleChange} className={`ui-custom-input ${errorDict && !errorDict.asset_sub_category && 'is-invalid'}`} id="itemname" name={'asset_sub_category'} value={asset_sub_category}>
                                <option value={0}>Select Sub Category</option>
                                <AssetSubCategoryOptions assetId={asset_category} />
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Brand</label>
                            <input onChange={this.handleChange} value={brand} type="text" className={`ui-custom-input`} name={'brand'} placeholder="Brand" />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Model</label>
                            <input onChange={this.handleChange} value={model} type="text" className={`ui-custom-input`} name={'model'} placeholder="Model" />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Quantity</label>
                            <input onChange={this.handleChange} value={quantity} type="number" className={`ui-custom-input ${errorDict && !errorDict.quantity && 'is-invalid'}`} name={'quantity'} id="inputAddress" placeholder="Quantity" />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Reason</label>
                            <input onChange={this.handleChange} value={reason} type="text" className={`ui-custom-input ${errorDict && !errorDict.reason && 'is-invalid'}`} name={'reason'} placeholder="Reason" />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Expected Date</label>
                            <DatePicker timePicker={false}
                                        name={'expected_date'}
                                        className={`ui-custom-input ${errorDict && !errorDict.expected_date && 'is-invalid'}`}
                                        inputFormat="DD/MM/YYYY"
                                        onChange={date => this.setState({expected_date: date})}
                                        value={expected_date}/>
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Details</label>
                            <textarea onChange={this.handleChange} value={details} className={`ui-custom-input ${errorDict && !errorDict.details && 'is-invalid'}`} name={'details'} placeholder="Details" />
                        </div>
                        <div className="ui-custom-file w-100 mb-20p">
                            <input id={'validatedCustomFile'} type="file" onChange={this.handleChange} name={'upload_file'} required />
                            <label className={`w-100 `} htmlFor="validatedCustomFile">{upload_file ? upload_file.name : 'Choose file'}</label>
                            <div className="bottom w-100">
                                JPG | JPEG | PNG | DOC | PDF | XLSX Allowed
                            </div>
                        </div>
                        <button type="submit" onClick={this.handleSubmit} className="submit-btn">Add Product</button>
                    </div>
                    <div className={'rounded bg-white admin-input-height p-2'}>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Submit Requisition</p>
                        </nav>
                        {arrayData.length > 0 ?
                            <PrimeDataTable
                                remove={this.removeItemFromList}
                                data={arrayData}
                            />
                        : <NodataFound />}

                        {arrayData.length > 0 && <button type="submit" onClick={this.sendRequisition} className="submit-btn">Submit</button>}
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(AssetComponent)
