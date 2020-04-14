import './AssetReg.css'
import React, {Component} from 'react';
import VendorOptions from "../../utility/component/vendorOptions";
import ProjectOptions from "../../utility/component/projectOptions";
import AssetCategoryOptions from "../../utility/component/assetCategoryOptions";
import AssetSubCategoryOptions from "../../utility/component/assetSubCategoryOptions";
import AssetTypeOptions from "../../utility/component/assetTypeOptions";
import DepreciationOptions from "../../utility/component/depreciationMethodOptions";
import jwt from "jsonwebtoken";
import Axios from "axios";
import {apiUrl} from "../../utility/constant";
import ConditionOptions from "../../utility/component/conditionOptions";
import ProductsOptions from "../../utility/component/productOptions";
import InstaAdd from "../../module/insta-add/InstaAdd";
import SuccessModal from "../../utility/success/successModal";
import ErrorModal from "../../utility/error/errorModal";
import AMCTypeOptions from "../../utility/component/amcTypeOptions";
import {getFileExtension} from "../../utility/custom";
import moment from "moment";
import DatePicker from 'react-datepicker2';
import {disabledRanges} from "../../utility/custom";

moment.locale('en');


class AssetRegComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            challan_no: '',
            challan_date: moment(),
            product_id: '',
            challan_description: '',
            purchase_order_no: '',
            purchase_order_date: moment(),
            vendor_id: '',
            received_by: '',
            receivedByFocus: false,
            recDropFoc: false,
            is_amc: true,
            addMoreProduct: false,
            success: false,
            error: false,
            successMessage: '',
            errorMessage: '',
            forceUpd: false,
            amc: false,
            added_by: jwt.decode(localStorage.getItem('user')).data.id,
            attachment: '',
            challanComments: '',
            challan_id: '',
            product_serial_1: '',
            project_id: null,
            asset_category: '',
            asset_sub_category: '',
            product_serial: '',
            cost_of_purchase: '',
            installation_cost: '',
            carrying_cost: '',
            other_cost: '',
            asset_type: null,
            depreciation_method: null,
            rate: null,
            effective_date: moment(),
            book_value: null,
            salvage_value: null,
            useful_life: null,
            last_effective_date: moment(),
            warranty: null,
            last_warranty_date: moment(),
            condition: null,
            comments: null,
            barcode: false,
            assign_to: jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data.id : '',
            asset_quantity: 1,
            prodArr: [],
            receivedBy: [],
            errorDict: null,
            errorDictAsset: null,
        }
    }

    componentDidMount() {
        let prodArr = Array.from(Array(1).keys())
        this.setState({
            prodArr,
        })
    }

    forceUp = () => {
        this.setState((prevState) => ({
            forceUpd: !prevState.forceUpd
        }), () => {
            console.log(this.state.forceUpd)
        })
    }

    amc = () => {
        this.setState((prevState) => ({
            amc: !prevState.amc
        }))
    }

    handleChange = (e) => {
        const {name, value, checked, files} = e.target
        if(name === 'barcode' || name === 'is_amc' || name === 'is_closed'){
            this.setState({
                [name]: checked
            })
        } else if (name === 'attachment') {
            if (["jpg","jpeg","png","doc","docx","pdf","xlsx"].includes(getFileExtension(files[0].name))) {
                this.setState({
                    [name]: files[0],
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
        } else if (name === 'asset_quantity') {
            for(let i = 0; i < value; i++) {
                let lebel = `product_serial_${i + 1}`
                this.setState({
                    [lebel] : ''
                })
            }
            if (parseInt(value, 10) > 0) {
                let prodArr = Array.from(Array(parseInt(value, 10)).keys())
                this.setState({
                    prodArr,
                    asset_quantity: value
                })
            }
        } else if(name === 'received_by') {
            this.setState({
                received_by: value
            }, () => {
                this.getReceiver(value)
            })
        } else {
            this.setState({
                [name]: value
            })
        }
    }

    getReceiver = (name) => {
        let data = {
            receiverName: name
        }
        if (name.length >= 3) {
            Axios.post(apiUrl() + 'challan-receiver', data)
                .then(res => {
                    if (res.message) {
                        this.setState({
                            error: true,
                            errorMsg: res.message
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    error: false,
                                })
                            }, 2300)
                        })
                    } else {
                        this.setState({
                            receivedBy: res.data
                        })
                    }
                })
        }
    }

    addProduct = () => {
        if (Object.values(this.validate('assets')).includes(false)) {
            return
        }
        const {asset_quantity} = this.state
        let dataArray = []
        let prodSerialHolder = []
        let stateHolder = this.state
        for(let i = 1; i <= asset_quantity; i++) {
            let obj = {}
            Object.keys(stateHolder).forEach((item) => {
                if (item === 'challan_id' ||
                    item === 'project_id' ||
                    item === 'amc_charge' ||
                    item === 'amc_type' ||
                    item === 'is_amc' ||
                    item === 'insurance_expire_date' ||
                    item === 'insurance_company' ||
                    item === 'insurance_premium' ||
                    item === 'insurance_value' ||
                    item === 'amc_expire_date' ||
                    item === 'asset_category' ||
                    item === 'asset_sub_category' ||
                    item === 'cost_of_purchase' ||
                    item === 'installation_cost' ||
                    item === 'carrying_cost' ||
                    item === 'other_cost' ||
                    item === 'asset_type' ||
                    item === 'depreciation_method' ||
                    item === 'rate' ||
                    item === 'effective_date' ||
                    item === 'book_value' ||
                    item === 'salvage_value' ||
                    item === 'useful_life' ||
                    item === 'warranty' ||
                    item === 'condition' ||
                    item === 'comments' ||
                    item === 'barcode' ||
                    item === 'product_id' ||
                    item === 'assign_to' ||
                    item === 'product_serial_'+i) {
                    if(item === 'product_serial_'+i) {
                        obj['product_serial'] = stateHolder[item]
                    } else {
                        obj[item] = stateHolder[item]
                    }
                }
            })
            prodSerialHolder.push(obj)
        }

        let prodArr = Array.from(Array(1).keys())
        this.setState({
            prodArr,
            asset_quantity: 1,
        })
        Axios.post(apiUrl() + 'assets-entry/entry', prodSerialHolder)
            .then(resData => {
                if (resData.data.status) {
                    this.setState({
                        success: true,
                        addMoreProduct: true,
                        successMessage: resData.data.message,
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                success: false,
                            })
                        }, 2300)
                    })
                } else {
                    this.setState({
                        error: true,
                        errorMessage: resData.data.message,
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                error: false,
                            })
                        }, 2300)
                    })
                }
            })
            .catch(err => {console.log(err)})
    }

    addChallan = () => {
        if (Object.values(this.validate('challan')).includes(false)) {
            return
        }
        const {challan_no, challan_date, challan_description, purchase_order_no, purchase_order_date, vendor_id, received_by, added_by, challanComments, attachment}  = this.state
        const data = new FormData()
        data.append('file', attachment)
        data.append('challan_no', challan_no)
        data.append('challan_date', moment(challan_date).format('YYYY-MM-DD'))
        data.append('challan_description', challan_description)
        data.append('purchase_order_no', purchase_order_no)
        data.append('purchase_order_date', moment(purchase_order_date).format('YYYY-MM-DD'))
        data.append('vendor_id', vendor_id)
        data.append('received_by', received_by)
        data.append('added_by', added_by)
        data.append('challanComments', challanComments)
        Axios.post(apiUrl() + 'assets-entry/challan/entry', data)
            .then(resData => {
                if (resData.data.status) {
                    this.setState({
                        success: true,
                        successMessage: resData.data.message,
                        challan_id: resData.data.resId,
                        vendor_id: resData.data.vendorName
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                success: false,
                            })
                        }, 2300)
                    })
                } else {
                    console.log(resData, 267)
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
                }
            })
            .catch(err => {console.log(err)})
    };

    resetFields = () => {
        this.setState({
            project_id: '',
            asset_category: '',
            asset_sub_category: '',
            prodArr: '',
            dataStore: '',
            cost_of_purchase: '',
            installation_cost: '',
            carrying_cost: '',
            other_cost: '',
            asset_type: '',
            depreciation_method: '',
            rate: '',
            effective_date: '',
            book_value: '',
            salvage_value: '',
            useful_life: '',
            last_effective_date: '',
            warranty: '',
            last_warranty_date: '',
            condition: '',
            comments: '',
            barcode: '',
            asset_quantity: ''
        })
    }

    validate = (forr) => {
        const {challan_no, challan_date, purchase_order_no, purchase_order_date, vendor_id, received_by, added_by,asset_category,asset_sub_category,cost_of_purchase,
            installation_cost,carrying_cost, other_cost, product_id, amc_charge, amc_expire_date, amc_type, is_amc} = this.state
        let errorDict = null
        if (forr === 'challan') {
            errorDict = {
                challan_no: typeof challan_no !== 'undefined' && challan_no !== '',
                challan_date: typeof challan_date !== 'undefined' && challan_date !== '',
                purchase_order_no: typeof purchase_order_no !== 'undefined' && purchase_order_no !== '',
                purchase_order_date: typeof purchase_order_date !== 'undefined' && purchase_order_date !== '',
                vendor_id: typeof vendor_id !== 'undefined' && vendor_id !== '',
                received_by: typeof received_by !== 'undefined' && received_by !== '',
                added_by: typeof added_by !== 'undefined' && added_by !== ''
            }
            this.setState({
                errorDict
            })
            return errorDict
        } else if (forr === 'assets') {
            errorDict = {
                product_id: typeof product_id !== 'undefined' && product_id !== '',
                asset_category: typeof asset_category !== 'undefined' && asset_category !== '',
                asset_sub_category: typeof asset_sub_category !== 'undefined' && asset_sub_category !== '',
                cost_of_purchase: typeof cost_of_purchase !== 'undefined' && cost_of_purchase !== '',
                installation_cost: typeof installation_cost !== 'undefined' && installation_cost !== '',
                carrying_cost: typeof carrying_cost !== 'undefined' && carrying_cost !== '',
                other_cost: typeof other_cost !== 'undefined' && other_cost !== '',
            }
            this.setState({
                errorDictAsset: errorDict
            })
            console.log(errorDict)
            return errorDict
        }

    }

    render() {
        const {challan_no, challan_date, challan_description, purchase_order_no, purchase_order_date, vendor_id, challan_id, attachment, formType, getApi, headTitle, error,
            received_by, addMoreProduct, challanComments, project_id, asset_category, asset_sub_category, prodArr, cost_of_purchase,errorDictAsset,receivedByFocus, success, errorMessage,
            installation_cost, carrying_cost, other_cost, asset_type, depreciation_method, rate, effective_date, book_value, errorDict, product_id, recDropFoc, successMessage, is_amc,
            salvage_value, useful_life, warranty, condition, comments, barcode, asset_quantity, receivedBy,  amc_charge, amc_expire_date, amc_type, insurance_expire_date, insurance_company,
            insurance_premium, insurance_value } = this.state

        const {userName} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        const prodSer = asset_quantity && prodArr.map((item, index) => {
            return(
                <div className={'mb-1'}>
                    <label className={'ui-custom-label'}>Product Serial No {item + 1}</label>
                    <input placeholder={`Product Serial No ${item + 1}`} onChange={this.handleChange} name={`product_serial_${item + 1}`}  className={'ui-custom-input w-100'}/>
                </div>
            )
        })
        const receiverList = receivedBy.length > 0 && receivedBy.map((item, index) => (
            <p key={index} onClick={() => {this.setState({received_by: item.received_by, receivedBy: []})}}>{item.received_by}</p>
        ))

        return (
            <>
                {error &&
                <ErrorModal errorMessage={errorMessage} />
                }
                {success &&
                <SuccessModal successMessage={successMessage} />
                }
                <InstaAdd
                    forceUp = {this.forceUp}
                    forceAmc = {this.amc}
                    formType = {formType}
                    getApi = {getApi}
                    headTitle = {headTitle}
                />
                {challan_id === '' && <div className=" p-2 ui-dataEntry">
                    <div className={'admin-input-height bg-white rounded position-relative p-3'}>
                        <nav className="navbar text-center mb-2 pl-1 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Add Challan Information</p>
                        </nav>
                        <div className={'mb-2'}>
                            <label htmlFor="challan_no" className={'ui-custom-label'}>Challan No</label>
                            <input onChange={this.handleChange} name={'challan_no'} id={'challan_no'}  value={challan_no} placeholder='Challan No' className={`ui-custom-input ${errorDict && !errorDict.challan_no && 'is-invalid'}`} />
                        </div>
                        <div className={'mb-2'}>
                            <label htmlFor="challan_date" className={'ui-custom-label'}>Challan Date</label>
                            <DatePicker timePicker={false}
                                        name={'challan_date'}
                                        className={`ui-custom-input w-100 ${errorDict && !errorDict.challan_date && 'is-invalid'}`}
                                        inputFormat="DD/MM/YYYY"
                                        onChange={date => this.setState({challan_date: date})}
                                        ranges={disabledRanges}
                                        value={challan_date}/>
                        </div>
                        <div className={'mb-2'}>
                            <div className="input-grid">
                                <label className={'ui-custom-label'}>Vendor</label>
                                <select onClick={() => {this.forceUpdate()}} className={`ui-custom-input w-100 ${errorDict && !errorDict.vendor_id && 'is-invalid'}`} value={vendor_id} onChange={this.handleChange} name={'vendor_id'}>
                                    <option>Select Vendor</option>
                                    <VendorOptions forceUp={this.forceUp} stateForceUpdate={this.state.forceUpd} />
                                </select>
                                <button onClick={() => {this.setState({formType: 'VENDOR', getApi: 'vendors', headTitle: 'Vendor Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div className={'mb-2 position-relative'}>
                            <label className={'ui-custom-label'}>Received By</label>
                            <input onFocus={() => {this.setState({receivedByFocus: true})}} onBlur={() => {this.setState({receivedByFocus: false})}} autoComplete={'off'} placeholder='Received By' value={received_by} onChange={this.handleChange} name={'received_by'} type={'text'} className={`ui-custom-input ${errorDict && !errorDict.received_by && 'is-invalid'}`} />
                            {(receivedBy.length > 0 && received_by.length >= 3 && (receivedByFocus || recDropFoc)) && <div onMouseOver={() => {this.setState({recDropFoc: true})}} onMouseOut={() => {this.setState({recDropFoc: false})}} className={'ui-received-by'}>
                                {receiverList}
                            </div>}
                        </div>
                        <div className={'mb-2'}>
                            <label className={'ui-custom-label'}>Purchase Order No</label>
                            <input value={purchase_order_no} onChange={this.handleChange} name={'purchase_order_no'} placeholder='Purchase Order No' className={`ui-custom-input ${errorDict && !errorDict.purchase_order_no && 'is-invalid'}`} />
                        </div>
                        <div className={'mb-2'}>
                            <label className={'ui-custom-label'}>Purchase Order Date</label>
                            <DatePicker timePicker={false}
                                        name={'purchase_order_date'}
                                        className={`ui-custom-input w-100 ${errorDict && !errorDict.purchase_order_date && 'is-invalid'}`}
                                        inputFormat="DD/MM/YYYY"
                                        onChange={date => this.setState({purchase_order_date: date})}
                                        value={purchase_order_date}/>
                        </div>
                        <div className={'w-100 mb-3'}>
                            <div className="ui-custom-file">
                                <input type="file" onChange={this.handleChange} name={'attachment'} id="attachment" />
                                <label className={`w-100 ${errorDict && !errorDict.challanComments && 'is-invalid'}`} htmlFor="attachment">{attachment ? attachment.name : 'Choose File'}</label>
                                <div className="bottom w-100">
                                    JPG | JPEG | PNG | DOC | PDF | XLSX Allowed
                                </div>
                            </div>
                        </div>
                        <button onClick={this.addChallan} className="submit-btn-normal mt-3">Add Challan</button>
                    </div>
                    <div className="admin-input-height bg-white rounded p-3">
                        <div className={'mb-2'}>
                            <nav className="navbar text-center mb-2 pl-1 rounded">
                                <p className="text-blue f-weight-700 f-20px m-0">Challan Description</p>
                            </nav>
                            <textarea
                                id={'enCh1'}
                                className={`ui-custom-textarea`}
                                value={challan_description}
                                placeholder={'Write Description'}
                                onChange={this.handleChange} name={'challan_description'}
                            />
                        </div>
                        <div className={'mb-2'}>
                            <nav className="navbar text-center mb-2 pl-1 rounded">
                                <p className="text-blue f-weight-700 f-20px m-0">Comment</p>
                            </nav>
                            <textarea
                                id={'enCh1'}
                                value={challanComments}
                                onChange={this.handleChange} name={'challanComments'}
                                placeholder={'Write Comments'}
                                className={`ui-custom-textarea`}
                            />
                        </div>
                    </div>
                </div>}
                {challan_id !== '' && <div className="ui-dataEntry">
                    <div className="admin-input-height bg-challan position-relative rounded p-3 m-2">
                        <nav className="navbar text-center mb-2 border-bottom-nav">
                            <p className="text-white f-weight-700 f-20px m-0">Challan Information</p>
                        </nav>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Challan No
                            </div>
                            <div className={'col-8 pr-2 ui-text'}>
                                <span className={'ui-text mr-3'}>:</span> {challan_no}
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Challan Date
                            </div>
                            <div className={'col-8 pr-2 ui-text'}>
                                <span className={'ui-text mr-3'}>:</span> {moment(challan_date).format('YYYY-MM-DD')}
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Challan Description
                            </div>
                            <div className={'col-8 pr-2 ui-text'}>
                                <span className={'ui-text mr-3'}>:</span> {challan_description ? challan_description : 'N/A'}
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Received By
                            </div>
                            <div className={'col-8 pr-2 ui-text'}>
                                <span className={'ui-text mr-3'}>:</span> {received_by}
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Added By
                            </div>
                            <div className={'col-8 pr-2 ui-text'}>
                                <span className={'ui-text mr-3'}>:</span> {userName}
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Vendor
                            </div>
                            <div className={'col-8 pr-2 ui-text'}>
                                <span className={'ui-text mr-3'}>:</span> {vendor_id}
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Comments
                            </div>
                            <div className={'col-8 pr-2 ui-text'}>
                                <span className={'ui-text mr-3'}>:</span> {challanComments ? challanComments : 'N/A'}
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Purchase Order No
                            </div>
                            <div className={'col-8 pr-2 ui-text'}>
                                <span className={'ui-text mr-3'}>:</span> {purchase_order_no}
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Purchase Order Date
                            </div>
                            <div className={'col-8 pr-2 ui-text'}>
                                <span className={'ui-text mr-3'}>:</span> {moment(purchase_order_date).format('YYYY-MM-DD')}
                            </div>
                        </div>
                    </div>
                    <div className={'asset-right admin-input-height'}>
                        <div className={'rounded p-3'}>
                            <div className="row">
                                <div className="col-md-6 pr-1 pl-0">
                                    <div className={'bg-white p-2 rounded mb-2 border-blue'}>
                                        <h5>Add Asset Information</h5>
                                        <div className={'mb-1'}>
                                            <div className="input-grid">
                                                <label className={'ui-custom-label'}>Category</label>
                                                <select className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.asset_category && 'is-invalid'}`}
                                                        onChange={this.handleChange} name={'asset_category'}
                                                        value={asset_category}>
                                                    <option>Asset Category</option>
                                                    <AssetCategoryOptions forceUp={this.forceUp} stateForceUpdate={this.state.forceUpd} />
                                                </select>
                                                <button onClick={() => {this.setState({formType: 'ASSETCATEGORY', getApi: 'asset-category', headTitle: 'Asset Category Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className={'mb-1'}>
                                            <div className="input-grid">
                                                <label className={'ui-custom-label'}>Sub Category</label>
                                                <select className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.asset_sub_category && 'is-invalid'}`} onChange={this.handleChange} name={'asset_sub_category'} value={asset_sub_category} >
                                                    <option>Asset Sub Category</option>
                                                    <AssetSubCategoryOptions assetId={asset_category} forceUp={this.forceUp} stateForceUpdate={this.state.forceUpd} />
                                                </select>
                                                <button onClick={() => {this.setState({formType: 'ASSETSUBCATEGORY', getApi: 'asset-sub-category', headTitle: 'Asset Sub Category Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className={'mb-1'}>
                                            <div className="input-grid">
                                                <label className={'ui-custom-label'}>Product</label>
                                                <select className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.asset_sub_category && 'is-invalid'}`} onChange={this.handleChange} name={'product_id'} value={product_id} >
                                                    <option>Product</option>
                                                    <ProductsOptions catId={asset_category} subId={asset_sub_category} forceUp={this.forceUp} stateForceUpdate={this.state.forceUpd} />
                                                </select>
                                                <button onClick={() => {this.setState({formType: 'PRODUCTS', getApi: 'products', headTitle: 'Product Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'bg-white p-2 rounded mb-2 border-blue'}>
                                        <h5>Cost Information</h5>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Cost of Purchase</label>
                                            <input type="number"
                                                   value={cost_of_purchase}
                                                   onChange={this.handleChange} name={'cost_of_purchase'}
                                                   placeholder={'Cost of Purchase'}
                                                   className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.cost_of_purchase && 'is-invalid'}`}/>
                                        </div>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Installation Cost</label>
                                            <input type="number"
                                                   value={installation_cost}
                                                   onChange={this.handleChange} name={'installation_cost'}
                                                   placeholder={'Installation Cost'}
                                                   className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.installation_cost && 'is-invalid'}`}/>
                                        </div>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Carrying Cost</label>
                                            <input type="number"
                                                   value={carrying_cost}
                                                   onChange={this.handleChange} name={'carrying_cost'}
                                                   placeholder={'Carrying Cost'}
                                                   className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.carrying_cost && 'is-invalid'}`}/>
                                        </div>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Other Cost</label>
                                            <input type={'number'}
                                                   value={other_cost}
                                                   onChange={this.handleChange} name={'other_cost'}
                                                   placeholder={'Other Cost'}
                                                   className={`ui-custom-input ${errorDictAsset && !errorDictAsset.other_cost && 'is-invalid'}`}/>
                                        </div>
                                    </div>
                                    <div className={'bg-white p-2 rounded mb-2 border-blue'}>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Asset Quantity</label>
                                            <input type='number' className={`ui-custom-input`} onChange={this.handleChange} placeholder={'Quantity'} name={'asset_quantity'} value={asset_quantity}/>
                                        </div>
                                        {prodSer}
                                        <button className="mt-3 submit-btn-normal w-49" onClick={this.addProduct} >Register Asset</button>
                                        {addMoreProduct && <button className="reset-btn-normal ml-2 w-49" onClick={this.resetFields} >Add More Product</button>}
                                    </div>
                                </div>
                                <div className="col-md-6 pl-1">
                                    {/*<div className={'bg-white p-2 rounded mb-2 mr-1 border-blue'}>*/}
                                    {/*    <h5>Insurance Information</h5>*/}
                                    {/*    <div className={'mb-1'}>*/}
                                    {/*        <label className={'ui-custom-label'}>Value of Insurance</label>*/}
                                    {/*        <input type="number"*/}
                                    {/*               value={insurance_value}*/}
                                    {/*               onChange={this.handleChange} name={'insurance_value'}*/}
                                    {/*               placeholder={'Value of Insurance'}*/}
                                    {/*               className={`ui-custom-input w-100`}/>*/}
                                    {/*    </div>*/}
                                    {/*    <div className={'mb-1'}>*/}
                                    {/*        <label className={'ui-custom-label'}>Value of Premium</label>*/}
                                    {/*        <input type="number"*/}
                                    {/*               value={insurance_premium}*/}
                                    {/*               onChange={this.handleChange} name={'insurance_premium'}*/}
                                    {/*               placeholder={'Value of Premium'}*/}
                                    {/*               className={`ui-custom-input w-100`}/>*/}
                                    {/*    </div>*/}
                                    {/*    <div className={'mb-1'}>*/}
                                    {/*        <label className={'ui-custom-label'}>Insurance Company</label>*/}
                                    {/*        <input type="text"*/}
                                    {/*               value={insurance_company}*/}
                                    {/*               onChange={this.handleChange} name={'insurance_company'}*/}
                                    {/*               placeholder={'Insurance Company'}*/}
                                    {/*               className={`ui-custom-input w-100`}/>*/}
                                    {/*    </div>*/}
                                    {/*    <div className={'mb-1'}>*/}
                                    {/*        <label className={'ui-custom-label'}>Expire Date</label>*/}
                                    {/*        <DatePicker timePicker={false}*/}
                                    {/*                    name={'insurance_expire_date'}*/}
                                    {/*                    className={`ui-custom-input w-100`}*/}
                                    {/*                    inputFormat="DD/MM/YYYY"*/}
                                    {/*                    onChange={date => this.setState({insurance_expire_date: date})}*/}
                                    {/*                    value={insurance_expire_date}/>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className={'bg-white p-2 rounded mb-2 mr-1 border-blue'}>
                                        <h5>Others Information</h5>
                                        <div className={'mb-1'}>
                                            <div className="input-grid">
                                                <label className={'ui-custom-label'}>Asset Type</label>
                                                <select className={`ui-custom-input w-100`} onChange={this.handleChange} name={'asset_type'} value={asset_type}>
                                                    <option>Asset Type</option>
                                                    <AssetTypeOptions forceUp={this.forceUp} stateForceUpdate={this.state.forceUpd} />
                                                </select>
                                                <button onClick={() => {this.setState({formType: 'ASSETTYPES', getApi: 'assets-types', headTitle: 'Asset Type Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className={'mb-1'}>
                                            <div className="input-grid">
                                                <label className={'ui-custom-label'}>Condition</label>
                                                <select className={`ui-custom-input w-100`} onChange={this.handleChange} name={'condition'} value={condition}>
                                                    <option>Select Condition</option>
                                                    <ConditionOptions forceUp={this.forceUp} stateForceUpdate={this.state.forceUpd} />
                                                </select>
                                                <button onClick={() => {this.setState({formType: 'CONDITIONS', getApi: 'conditions', headTitle: 'Condition Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className={'mb-1'}>
                                            <div className="input-grid">
                                                <label className={'ui-custom-label'}>Depreciation Method</label>
                                                <select className={`ui-custom-input w-100`} onChange={this.handleChange} name={'depreciation_method'} value={depreciation_method}>
                                                    <option>Select Depreciation Method</option>
                                                    <DepreciationOptions forceUp={this.forceUp} stateForceUpdate={this.state.forceUpd} />
                                                </select>
                                                <button onClick={() => {this.setState({formType: 'DEPMETHOD', getApi: 'depreciation-methods', headTitle: 'Depreciation Method Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        {/*<div className={'mb-1'}>*/}
                                        {/*    <label className={'ui-custom-label'}>Rate</label>*/}
                                        {/*    <input type="number"*/}
                                        {/*           value={rate}*/}
                                        {/*           onChange={this.handleChange} name={'rate'}*/}
                                        {/*           placeholder={'Rate'}*/}
                                        {/*           className={`ui-custom-input w-100`}/>*/}
                                        {/*</div>*/}
                                        {/*<div className={'mb-1'}>*/}
                                        {/*    <label className={'ui-custom-label'}>Effective Date</label>*/}
                                        {/*    <DatePicker timePicker={false}*/}
                                        {/*                name={'effective_date'}*/}
                                        {/*                className={`ui-custom-input w-100`}*/}
                                        {/*                inputFormat="DD/MM/YYYY"*/}
                                        {/*                onChange={date => this.setState({effective_date: date})}*/}
                                        {/*                value={effective_date}/>*/}
                                        {/*</div>*/}
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Book Value</label>
                                            <input type="number"
                                                   value={book_value}
                                                   onChange={this.handleChange} name={'book_value'}
                                                   placeholder={'Book Value'}
                                                   className={`ui-custom-input w-100`}/>
                                        </div>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Salvage Value</label>
                                            <input type="number"
                                                   value={salvage_value}
                                                   onChange={this.handleChange} name={'salvage_value'}
                                                   placeholder={'Salvage Value'}
                                                   className={`ui-custom-input w-100`}/>
                                        </div>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Useful Life (in month)</label>
                                            <input type="text"
                                                   value={useful_life}
                                                   onChange={this.handleChange} name={'useful_life'}
                                                   placeholder={'Useful Life'}
                                                   className={`ui-custom-input w-100`}/>
                                        </div>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Warranty (in month)</label>
                                            <input type="text"
                                                   value={warranty}
                                                   onChange={this.handleChange} name={'warranty'}
                                                   placeholder={'Warranty'}
                                                   className={`ui-custom-input w-100`}/>
                                        </div>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Comments</label>
                                            <textarea placeholder={'Comments'}
                                                      onChange={this.handleChange} name={'comments'}
                                                      value={comments}
                                                      className={`ui-custom-input w-100`}/>
                                        </div>
                                        <div className="mb-1 mt-3 pl-4 d-flex align-items-center ui-custom-checkbox">
                                            <div className="ui-custom-checkbox">
                                                <input
                                                    type={'checkbox'}
                                                    checked={barcode}
                                                    id={'customCheckbox'}
                                                    name={'barcode'}
                                                    onChange={this.handleChange} />
                                                <label htmlFor="customCheckbox" className={'mb-0'}>Barcode</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </>
        );
    }
}

export default AssetRegComponent;