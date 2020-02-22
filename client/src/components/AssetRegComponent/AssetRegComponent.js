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

class AssetRegComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            challan_no: '',
            challan_date: '',
            product_id: '',
            challan_description: '',
            purchase_order_no: '',
            purchase_order_date: '',
            vendor_id: '',
            received_by: '',
            receivedByFocus: false,
            recDropFoc: false,
            success: false,
            error: false,
            successMessage: '',
            errorMessage: '',
            forceUpdate: false,
            added_by: jwt.decode(localStorage.getItem('user')).data.id,
            attachment: '',
            challanComments: '',
            challan_id: '',
            project_id: '',
            asset_category: '',
            asset_sub_category: '',
            product_serial: '',
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
        let prodArr = Array.from(Array(this.state.asset_quantity).keys())
        this.setState({
            prodArr,
        })
    }

    forceUp = () => {
        this.setState({
            forceUpdate: !this.state.forceUpdate
        })
    }

    handleChange = (e) => {
        const {name, value, checked, files} = e.target
        if(name === 'barcode'){
            this.setState({
                barcode: checked
            })
        } else if (name === 'attachment') {
            this.setState({attachment: files[0]})
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
        let prodSerialHolder = []
        let dataArray = []
        let stateHolder = this.state
        for(let i = 1; i <= asset_quantity; i++) {
            prodSerialHolder.push(stateHolder['product_serial_'+i])
            delete stateHolder['product_serial_'+i]
            delete stateHolder['prodArr']
            delete stateHolder['asset_quantity']
            delete stateHolder['dataStore']
            delete stateHolder['challan_no']
            delete stateHolder['challan_date']
            delete stateHolder['challan_description']
            delete stateHolder['purchase_order_no']
            delete stateHolder['purchase_order_date']
            delete stateHolder['vendor_id']
            delete stateHolder['received_by']
            delete stateHolder['added_by']
            delete stateHolder['challanComments']
            delete stateHolder['attachment']

        }
        prodSerialHolder.forEach(item => {
            let x = {...stateHolder, product_serial: item}
            dataArray.push(x)
        })

        let prodArr = Array.from(Array(1).keys())
        this.setState({
            prodArr,
            asset_quantity: 1,
        })
        Axios.post(apiUrl() + 'assets-entry/entry', dataArray)
            .then(resData => {
                if (resData.data.status) {
                    this.setState({
                        success: true,
                        successMessage: resData.data.message,
                    })
                } else {
                    this.setState({
                        error: true,
                        errorMessage: resData.data.message,
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
        data.append('challan_date', challan_date)
        data.append('challan_description', challan_description)
        data.append('purchase_order_no', purchase_order_no)
        data.append('purchase_order_date', purchase_order_date)
        data.append('vendor_id', vendor_id)
        data.append('received_by', received_by)
        data.append('added_by', added_by)
        data.append('challanComments', challanComments)
        Axios.post(apiUrl() + 'assets-entry/challan/entry', data)
            .then(resData => {
                console.log(resData, 186)
                this.setState({
                    success: true,
                    successMessage: resData.data.message,
                    challan_id: resData.data.resId,
                    vendor_id: resData.data.vendorName
                })
            })
            .catch(err => {console.log(err)})
    }

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
        const {attachment, challan_no, challan_date, challan_description, purchase_order_no, purchase_order_date, vendor_id, received_by, added_by,
            challanComments,project_id,asset_category,asset_sub_category,cost_of_purchase,installation_cost,carrying_cost,
            other_cost,asset_type,depreciation_method,rate,effective_date,book_value,salvage_value,useful_life,last_effective_date,warranty,
            last_warranty_date,condition,comments,barcode} = this.state
        let errorDict = null
        if (forr === 'challan') {
            errorDict = {
                attachment: typeof attachment !== 'undefined' && attachment !== '',
                challan_no: typeof challan_no !== 'undefined' && challan_no !== '',
                challan_date: typeof challan_date !== 'undefined' && challan_date !== '',
                challan_description: typeof challan_description !== 'undefined' && challan_description !== '',
                purchase_order_no: typeof purchase_order_no !== 'undefined' && purchase_order_no !== '',
                purchase_order_date: typeof purchase_order_date !== 'undefined' && purchase_order_date !== '',
                vendor_id: typeof vendor_id !== 'undefined' && vendor_id !== '',
                received_by: typeof received_by !== 'undefined' && received_by !== '',
                added_by: typeof added_by !== 'undefined' && added_by !== '',
                challanComments: typeof challanComments !== 'undefined' && challanComments !== '',
            }
            this.setState({
                errorDict
            })
            return errorDict
        } else if (forr === 'assets') {
            errorDict = {
                project_id: typeof project_id !== 'undefined' && project_id !== '',
                asset_category: typeof asset_category !== 'undefined' && asset_category !== '',
                asset_sub_category: typeof asset_sub_category !== 'undefined' && asset_sub_category !== '',
                cost_of_purchase: typeof cost_of_purchase !== 'undefined' && cost_of_purchase !== '',
                installation_cost: typeof installation_cost !== 'undefined' && installation_cost !== '',
                carrying_cost: typeof carrying_cost !== 'undefined' && carrying_cost !== '',
                other_cost: typeof other_cost !== 'undefined' && other_cost !== '',
                asset_type: typeof asset_type !== 'undefined' && asset_type !== '',
                depreciation_method: typeof depreciation_method !== 'undefined' && depreciation_method !== '',
                rate: typeof rate !== 'undefined' && rate !== '',
                effective_date: typeof effective_date !== 'undefined' && effective_date !== '',
                book_value: typeof book_value !== 'undefined' && book_value !== '',
                salvage_value: typeof salvage_value !== 'undefined' && salvage_value !== '',
                useful_life: typeof useful_life !== 'undefined' && useful_life !== '',
                last_effective_date: typeof last_effective_date !== 'undefined' && last_effective_date !== '',
                warranty: typeof warranty !== 'undefined' && warranty !== '',
                last_warranty_date: typeof last_warranty_date !== 'undefined' && last_warranty_date !== '',
                condition: typeof condition !== 'undefined' && condition !== '',
                comments: typeof comments !== 'undefined' && comments !== '',
                barcode: typeof barcode !== 'undefined' && barcode !== '',
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
            received_by, added_by, challanComments, project_id, asset_category, asset_sub_category, prodArr, cost_of_purchase,errorDictAsset,receivedByFocus, success, errorMessage,
            installation_cost, carrying_cost, other_cost, asset_type, depreciation_method, rate, effective_date, book_value, errorDict, product_id, recDropFoc, successMessage,
            salvage_value, useful_life, last_effective_date, warranty, last_warranty_date, condition, comments, barcode, asset_quantity, receivedBy} = this.state

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
            <div>
                {error &&
                <div
                    className="alert alert-danger mx-2 mb-2 position-relative d-flex justify-content-between align-items-center"
                    role="alert">
                    {errorMessage} <i className="fas fa-times " onClick={() => {
                    this.setState({error: false})
                }}></i>
                </div>}
                {success &&
                <div
                    className="alert alert-success mx-2 mb-2 position-relative d-flex justify-content-between align-items-center"
                    role="alert">
                    {successMessage} <i className="fas fa-times " onClick={() => {
                    this.setState({success: false})
                }}></i>
                </div>}
                <InstaAdd
                    forceUp = {this.forceUp}
                    formType = {formType}
                    getApi = {getApi}
                    headTitle = {headTitle}
                />
                {challan_id === '' && <div className=" p-2 ui-dataEntry">
                    <div className={'min-h-80vh bg-white rounded position-relative p-3'}>
                        <nav className="navbar text-center mb-2 pl-1 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Add Challan Info First</p>
                        </nav>
                        <div className={'mb-2'}>
                            <label htmlFor="challan_no" className={'ui-custom-label'}>Challan No</label>
                            <input onChange={this.handleChange} name={'challan_no'} id={'challan_no'}  value={challan_no} placeholder='Challan No' className={`ui-custom-input ${errorDict && !errorDict.challan_no && 'is-invalid'}`} />
                        </div>
                        <div className={'mb-2'}>
                            <label htmlFor="challan_date" className={'ui-custom-label'}>Challan Date</label>
                            <input value={challan_date} type={'date'} onChange={this.handleChange} name={'challan_date'} placeholder='Challan Name' className={`ui-custom-input ${errorDict && !errorDict.challan_date && 'is-invalid'}`} />
                        </div>
                        <div className={'mb-2'}>
                            {/*<div className="input-grid">*/}
                                <label className={'ui-custom-label'}>Vendor</label>
                                <select onClick={() => {this.forceUpdate()}} className={`ui-custom-input w-100 ${errorDict && !errorDict.vendor_id && 'is-invalid'}`} value={vendor_id} onChange={this.handleChange} name={'vendor_id'}>
                                    <option>Select Vendor</option>
                                    <VendorOptions forceUp={this.forceUp} stateForceUpdate={this.state.forceUpdate} />
                                </select>
                            {/*    <button onClick={() => {this.setState({formType: 'VENDOR', getApi: 'vendors', headTitle: 'Vendor Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">*/}
                            {/*        <i className="fas fa-plus"></i>*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </div>
                        <div className={'mb-2 position-relative'}>
                            <label className={'ui-custom-label'}>Received By</label>
                            <input onFocus={() => {this.setState({receivedByFocus: true})}} onBlur={() => {this.setState({receivedByFocus: false})}} autoComplete={'off'} placeholder='Received By' value={received_by} onChange={this.handleChange} name={'received_by'} type={'text'} className={`ui-custom-input ${errorDict && !errorDict.received_by && 'is-invalid'}`} />
                            {(receivedBy.length > 0 && received_by.length >= 3 && (receivedByFocus || recDropFoc)) && <div onMouseOver={() => {this.setState({recDropFoc: true})}} onMouseOut={() => {this.setState({recDropFoc: false})}} className={'ui-received-by'}>
                                {receiverList}
                            </div>}
                        </div>
                        <div className={'mb-2'}>
                            <label className={'ui-custom-label'}>Added By</label>
                            <input placeholder='Added By' value={userName} type={'text'} className={`ui-custom-input`} disabled={true} />
                        </div>
                        <div className={'mb-2'}>
                            <label className={'ui-custom-label'}>Purchase Order No</label>
                            <input value={purchase_order_no} onChange={this.handleChange} name={'purchase_order_no'} placeholder='Purchase Order No' className={`ui-custom-input ${errorDict && !errorDict.purchase_order_no && 'is-invalid'}`} />
                        </div>
                        <div className={'mb-2'}>
                            <label className={'ui-custom-label'}>Purchase Order Date</label>
                            <input onChange={this.handleChange} name={'purchase_order_date'} value={purchase_order_date} type={'date'} className={`ui-custom-input ${errorDict && !errorDict.purchase_order_date && 'is-invalid'}`} />
                        </div>
                        <div className={'mb-2 w-50'}>
                            <div className="ui-custom-file">
                                <input type="file" onChange={this.handleChange} name={'attachment'} id="attachment" />
                                <label htmlFor="attachment">{attachment ? attachment.name : 'Choose File'}</label>
                            </div>
                        </div>
                        <button onClick={this.addChallan} className="submit-btn">Add Challan</button>
                    </div>
                    <div className="min-h-80vh bg-white rounded p-3">
                        <div className={'mb-2'}>
                            <nav className="navbar text-center mb-2 pl-1 rounded">
                                <p className="text-blue f-weight-700 f-20px m-0">Challan Description</p>
                            </nav>
                            <textarea
                                id={'enCh1'}
                                className={`ui-custom-textarea ${errorDict && !errorDict.challan_description && 'is-invalid'}`}
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
                                className={`ui-custom-textarea ${errorDict && !errorDict.challanComments && 'is-invalid'}`}
                                 />
                        </div>
                    </div>
                </div>}
                {challan_id !== '' && <div className=" p-2 ui-dataEntry">
                    <div className="min-h-80vh bg-white rounded position-relative p-3">
                        <nav className="navbar text-center mb-2 pl-1 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Challan Info</p>
                        </nav>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Challan No
                            </div>
                            <div className={'col-8 pr-2'}>
                                <span className={'ui-text mr-3'}>:</span> {challan_description}
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Challan Date
                            </div>
                            <div className={'col-8 pr-2'}>
                                <span className={'ui-text mr-3'}>:</span> {challan_date}
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Challan Description
                            </div>
                            <div className={'col-8 pr-2'}>
                                <span className={'ui-text mr-3'}>:</span> {challan_description}
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Received By
                            </div>
                            <div className={'col-8 pr-2'}>
                                <span className={'ui-text mr-3'}>:</span> {received_by}
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Added By
                            </div>
                            <div className={'col-8 pr-2'}>
                                <span className={'ui-text mr-3'}>:</span> {userName}
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Vendor
                            </div>
                            <div className={'col-8 pr-2'}>
                                <span className={'ui-text mr-3'}>:</span> {vendor_id}
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Comments
                            </div>
                            <div className={'col-8 pr-2'}>
                                <span className={'ui-text mr-3'}>:</span> {challanComments}
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Purchase Order No
                            </div>
                            <div className={'col-8 pr-2'}>
                                <span className={'ui-text mr-3'}>:</span> {purchase_order_no}
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mb-3'}>
                            <div className={'col-4 pl-2 ui-text'}>
                                Purchase Order Date
                            </div>
                            <div className={'col-8 pr-2'}>
                                <span className={'ui-text mr-3'}>:</span> {purchase_order_date}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={'bg-white rounded p-3'}>
                            <nav className="navbar text-center mb-2 pl-1 rounded">
                                <p className="text-blue f-weight-700 f-20px m-0">Add Asset Information</p>
                            </nav>
                            <div className="row">
                                <div className="col-md-6 pr-1">
                                    <div className={'mb-1'}>
                                        {/*<div className="input-grid">*/}
                                            <label className={'ui-custom-label'}>Project</label>
                                            <select className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.project_id && 'is-invalid'}`} onChange={this.handleChange} name={'project_id'} value={project_id}>
                                                <option>Select Project</option>
                                                <ProjectOptions forceUp={this.forceUp} stateForceUpdate={this.state.forceUpdate} />
                                            </select>
                                        {/*    <button onClick={() => {this.setState({formType: 'PROJECT', getApi: 'projects', headTitle: 'Project Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">*/}
                                        {/*        <i className="fas fa-plus"></i>*/}
                                        {/*    </button>*/}
                                        {/*</div>*/}
                                    </div>
                                    <div className={'mb-1'}>
                                        {/*<div className="input-grid">*/}
                                            <label className={'ui-custom-label'}>Category</label>
                                            <select className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.asset_category && 'is-invalid'}`} onChange={this.handleChange} name={'asset_category'} value={asset_category}>
                                            <option>Asset Category</option>
                                            <AssetCategoryOptions forceUp={this.forceUp} stateForceUpdate={this.state.forceUpdate} />
                                        </select>
                                        {/*    <button onClick={() => {this.setState({formType: 'ASSETCATEGORY', getApi: 'asset-category', headTitle: 'Asset Category Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">*/}
                                        {/*        <i className="fas fa-plus"></i>*/}
                                        {/*    </button>*/}
                                        {/*</div>*/}
                                    </div>
                                    <div className={'mb-1'}>
                                        {/*<div className="input-grid">*/}
                                            <label className={'ui-custom-label'}>Sub Category</label>
                                            <select className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.asset_sub_category && 'is-invalid'}`} onChange={this.handleChange} name={'asset_sub_category'} value={asset_sub_category} >
                                                <option>Asset Sub Category</option>
                                                <AssetSubCategoryOptions assetId={asset_category} forceUp={this.forceUp} stateForceUpdate={this.state.forceUpdate} />
                                            </select>
                                        {/*    <button onClick={() => {this.setState({formType: 'ASSETSUBCATEGORY', getApi: 'asset-sub-category', headTitle: 'Asset Sub Category Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">*/}
                                        {/*        <i className="fas fa-plus"></i>*/}
                                        {/*    </button>*/}
                                        {/*</div>*/}
                                    </div>
                                    <div className={'mb-1'}>
                                        {/*<div className="input-grid">*/}
                                            <label className={'ui-custom-label'}>Product</label>
                                            <select className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.asset_sub_category && 'is-invalid'}`} onChange={this.handleChange} name={'product_id'} value={product_id} >
                                            <option>Product</option>
                                            <ProductsOptions catId={asset_category} subId={asset_sub_category} forceUp={this.forceUp} stateForceUpdate={this.state.forceUpdate} />
                                        </select>
                                        {/*    <button onClick={() => {this.setState({formType: 'PRODUCTS', getApi: 'products', headTitle: 'Product Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">*/}
                                        {/*        <i className="fas fa-plus"></i>*/}
                                        {/*    </button>*/}
                                        {/*</div>*/}
                                    </div>
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
                                    <div className={'mb-1'}>
                                        <label className={'ui-custom-label'}>Rate</label>
                                        <input type="number"
                                               value={rate}
                                               onChange={this.handleChange} name={'rate'}
                                               placeholder={'Rate'}
                                               className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.rate && 'is-invalid'}`}/>
                                    </div>
                                    <div className={'mb-1'}>
                                        <label className={'ui-custom-label'}>Asset Quantity</label>
                                        <input type='number' className={`ui-custom-input`} onChange={this.handleChange} placeholder={'Quantity'} name={'asset_quantity'} value={asset_quantity}/>
                                    </div>
                                    {prodSer}
                                </div>
                                <div className="col-md-6 pl-1">
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Effective Date</label>
                                            <input type="date"
                                                   value={effective_date}
                                                   onChange={this.handleChange} name={'effective_date'}
                                                   placeholder={'Effective Date'}
                                                   className={`ui-custom-input pb-6px w-100 ${errorDictAsset && !errorDictAsset.effective_date && 'is-invalid'}`}/>
                                        </div>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Book Value</label>
                                            <input type="number"
                                                   value={book_value}
                                                   onChange={this.handleChange} name={'book_value'}
                                                   placeholder={'Book Value'}
                                                   className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.book_value && 'is-invalid'}`}/>
                                        </div>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Salvage Value</label>
                                            <input type="number"
                                                   value={salvage_value}
                                                   onChange={this.handleChange} name={'salvage_value'}
                                                   placeholder={'Salvage Value'}
                                                   className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.salvage_value && 'is-invalid'}`}/>
                                        </div>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Useful Life</label>
                                            <input type="text"
                                                   value={useful_life}
                                                   onChange={this.handleChange} name={'useful_life'}
                                                   placeholder={'Useful Life'}
                                                   className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.useful_life && 'is-invalid'}`}/>
                                        </div>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Last Effective Date</label>
                                            <input type="date"
                                                   value={last_effective_date}
                                                   onChange={this.handleChange} name={'last_effective_date'}
                                                   placeholder={'Effective Date'}
                                                   className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.last_effective_date && 'is-invalid'}`}/>
                                        </div>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Warranty</label>
                                            <input type="text"
                                                   value={warranty}
                                                   onChange={this.handleChange} name={'warranty'}
                                                   placeholder={'Warranty'}
                                                   className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.warranty && 'is-invalid'}`}/>
                                        </div>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Last Warranty Date</label>
                                            <input type="date"
                                                   value={last_warranty_date}
                                                   onChange={this.handleChange} name={'last_warranty_date'}
                                                   className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.last_warranty_date && 'is-invalid'}`}/>
                                        </div>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Comments</label>
                                            <textarea placeholder={'Comments'}
                                                      onChange={this.handleChange} name={'comments'}
                                                      value={comments}
                                                      className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.comments && 'is-invalid'}`}/>
                                        </div>
                                        <div className={'mb-1'}>
                                            {/*<div className="input-grid">*/}
                                                <label className={'ui-custom-label'}>Condition</label>
                                                <select className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.condition && 'is-invalid'}`} onChange={this.handleChange} name={'condition'} value={condition}>
                                                    <option>Select Condition</option>
                                                    <ConditionOptions forceUp={this.forceUp} stateForceUpdate={this.state.forceUpdate} />
                                                </select>
                                            {/*    <button onClick={() => {this.setState({formType: 'CONDITIONS', getApi: 'conditions', headTitle: 'Condition Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">*/}
                                            {/*        <i className="fas fa-plus"></i>*/}
                                            {/*    </button>*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className={'mb-1'}>
                                            {/*<div className="input-grid">*/}
                                                <label className={'ui-custom-label'}>Asset Type</label>
                                                <select className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.asset_type && 'is-invalid'}`} onChange={this.handleChange} name={'asset_type'} value={asset_type}>
                                                <option>Asset Type</option>
                                                <AssetTypeOptions forceUp={this.forceUp} stateForceUpdate={this.state.forceUpdate} />
                                            </select>
                                            {/*    <button onClick={() => {this.setState({formType: 'ASSETTYPES', getApi: 'assets-types', headTitle: 'Asset Type Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">*/}
                                            {/*        <i className="fas fa-plus"></i>*/}
                                            {/*    </button>*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className={'mb-1'}>
                                            {/*<div className="input-grid">*/}
                                                <label className={'ui-custom-label'}>Depreciation Method</label>
                                                <select className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.depreciation_method && 'is-invalid'}`} onChange={this.handleChange} name={'depreciation_method'} value={depreciation_method}>
                                                    <option>Select Depreciation Method</option>
                                                    <DepreciationOptions forceUp={this.forceUp} stateForceUpdate={this.state.forceUpdate} />
                                                </select>
                                            {/*    <button onClick={() => {this.setState({formType: 'DEPMETHOD', getApi: 'depreciation-methods', headTitle: 'Depreciation Method Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">*/}
                                            {/*        <i className="fas fa-plus"></i>*/}
                                            {/*    </button>*/}
                                            {/*</div>*/}
                                    </div>
                                        <div className="mb-1 mt-3 pl-4 d-flex align-items-center ui-custom-checkbox">
                                            <div className="ui-custom-checkbox">
                                                <input
                                                    type={'checkbox'}
                                                    checked={barcode}
                                                    id={'customCheckbox'}
                                                    name={'barcode'}
                                                    onChange={this.handleChange} />
                                                <label htmlFor="customCheckbox" className={'mb-0'}>Enlisted</label>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mt-1'}>
                            <div className={'col-6 px-2 d-flex w-100'}>
                                <button className="mr-3 submit-btn-normal" onClick={this.addProduct} >Submit Product</button>
                                <button className="mr-3 new-btn-normal" onClick={() => {window.location.reload()}}>New Challan</button>
                                <button className="mr-3 reset-btn-normal" onClick={this.resetFields} >Reset</button>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

export default AssetRegComponent;