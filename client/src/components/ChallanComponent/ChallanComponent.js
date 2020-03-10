import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import ProjectOptions from "../../utility/component/projectOptions";
import AssetCategoryOptions from "../../utility/component/assetCategoryOptions";
import AssetSubCategoryOptions from "../../utility/component/assetSubCategoryOptions";
import ConditionOptions from "../../utility/component/conditionOptions";
import AssetTypeOptions from "../../utility/component/assetTypeOptions";
import DepreciationOptions from "../../utility/component/depreciationMethodOptions";
import jwt from "jsonwebtoken";
import Barcode from "react-barcode"
import VendorOptions from "../../utility/component/vendorOptions";
import ProductsOptions from "../../utility/component/productOptions";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";
import AMCTypeOptions from "../../utility/component/amcTypeOptions";
import InstaAdd from "../../module/insta-add/InstaAdd";

class ChallanComponent extends Component {

    constructor(props){
        super(props)
        this.state={
            challans: [],
            assets: [],
            challan_date: '',
            receivedBy: [],
            assetId: '',
            forceUpd: false,
            is_closed: false,
            challan_no: '',
            error: false,
            errorMessage: '',
            receivedByFocus: false,
            recDropFoc: false,
            challan_description: '',
            purchase_order_no: '',
            purchase_order_date: '',
            vendor_id: '',
            received_by: '',
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
            addAssets: false,
            assign_to: jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data.id : '',
            asset_quantity: 1,
            prodArr: [],
            targetAsset: [],
            targetChallan: [],
            errorDict: null,
            errorDictAsset: null,
        }
    }

    componentDidMount() {
        let prodArr = Array.from(Array(this.state.asset_quantity).keys())
        this.setState({
            prodArr,
        })
        this.getChallanData()
    }

    getChallanData = () => {
        Axios.get(apiUrl() + 'assets-entry/challan')
            .then(resData => {
                this.setState({
                    challans: resData.data
                })
            })
    }

    forceUp = () => {
        this.setState({
            forceUpd: !this.state.forceUpd
        })
    }

    assetList = (id) => {
        console.log(id)
        Axios.get(apiUrl() + 'assets-entry/assets/' + id)
            .then(resData => {
                if (resData.data.status) {
                    this.setState({
                        assets: resData.data.results
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
    }

    updateEdit = (id, endpoint) => {
        Axios.get(apiUrl() + 'assets-entry/' + endpoint + id)
            .then(resData => {
                let data = resData.data[0]
                if (endpoint === 'specific-challan/') {
                    this.setState({
                        challan_id: id,
                        targetChallan: resData.data,
                        challan_no: data.challan_no,
                        challan_date: data.challan_date,
                        challan_name: data.challan_name,
                        vendor_id: data.vendor_id,
                        challan_description: data.challan_description,
                        purchase_order_no: data.purchase_order_no,
                        purchase_order_date: data.purchase_order_date,
                        attachment: data.attachment,
                        received_by: data.received_by,
                        added_by: data.added_by,
                        challanComments: data.comments
                    })
                    console.log(resData.data, 116)
                } else {
                    this.setState({
                        targetAsset: resData.data,
                        assetId: data.id,
                        barcode: data.barcode,
                        project_id: data.project_id,
                        asset_category: data.asset_category,
                        asset_sub_category: data.asset_sub_category,
                        product_serial: data.product_serial,
                        cost_of_purchase: data.cost_of_purchase,
                        installation_cost: data.installation_cost,
                        carrying_cost: data.carrying_cost,
                        other_cost: data.other_cost,
                        asset_type: data.asset_type,
                        depreciation_method: data.depreciation_method,
                        rate: data.rate,
                        effective_date: data.effective_date,
                        book_value: data.book_value,
                        salvage_value: data.salvage_value,
                        useful_life: data.useful_life,
                        last_effective_date: data.last_effective_date,
                        warranty: data.warranty,
                        last_warranty_date: data.last_warranty_date,
                        condition: data.condition,
                        comments: data.comments,
                    })
                } setTimeout(() => {
                    this.forceUpdate()
                }, 100)
            })
    }

    handleChange = (e) => {
        const {name, value, checked, files} = e.target
        if(name === 'barcode' || name === 'is_amc' || name === 'is_closed'){
            this.setState({
                [name]: checked
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

    updateChallan = () => {
        const {challan_no, is_closed, challan_name, challan_description, purchase_order_no, purchase_order_date, vendor_id, attachment, received_by, challanComments, added_by} = this.state
            const data = {challan_no, is_closed, challan_name, challan_description, purchase_order_no, purchase_order_date, vendor_id, attachment, received_by, comments: challanComments, added_by}
            Axios.put(apiUrl() + 'assets-entry/challan-update/' + this.state.challan_id, data)
                .then(resData => {
                    if (resData.data.status) {
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
    }

    validate = (forr) => {
        const {project_id,asset_category,asset_sub_category,cost_of_purchase,installation_cost,carrying_cost, other_cost,
            asset_type,depreciation_method,rate,effective_date,book_value,salvage_value,useful_life,warranty, condition,comments,barcode,
            amc_charge, amc_expire_date, amc_type, insurance_expire_date, insurance_company, insurance_premium, insurance_value} = this.state
        let errorDict = null
        if (forr === 'assets') {
            errorDict = {
                project_id: typeof project_id !== 'undefined' && project_id !== '',
                amc_charge: typeof amc_charge !== 'undefined' && amc_charge !== '',
                amc_expire_date: typeof amc_expire_date !== 'undefined' && amc_expire_date !== '',
                amc_type: typeof amc_type !== 'undefined' && amc_type !== '',
                insurance_expire_date: typeof insurance_expire_date !== 'undefined' && insurance_expire_date !== '',
                insurance_premium: typeof insurance_premium !== 'undefined' && insurance_premium !== '',
                insurance_value: typeof insurance_value !== 'undefined' && insurance_value !== '',
                insurance_company: typeof insurance_company !== 'undefined' && insurance_company !== '',
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
                warranty: typeof warranty !== 'undefined' && warranty !== '',
                condition: typeof condition !== 'undefined' && condition !== '',
                comments: typeof comments !== 'undefined' && comments !== '',
                barcode: typeof barcode !== 'undefined' && barcode !== '',
            }
            this.setState({
                errorDictAsset: errorDict
            })
            return errorDict
        }
    }

    addAssets = (id) => {
        this.setState({
            challan_id: id,
            addAssets: true
        })
    }

    addProduct = () => {
        const {asset_quantity} = this.state
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
                        targetAsset: [], addAssets: false,
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

    render() {
        const {challans, assets, product_id, challan_no, challan_description, purchase_order_no, purchase_order_date, vendor_id, attachment, prodArr, error, formType, getApi, headTitle,
            received_by, challanComments, project_id, asset_category, asset_sub_category, cost_of_purchase,errorDictAsset, errorMessage, addAssets, asset_quantity,
            installation_cost, carrying_cost, other_cost, asset_type, depreciation_method, rate, effective_date, book_value, errorDict, targetAsset, targetChallan,
            salvage_value, useful_life, warranty, condition, comments, barcode, challan_date, receivedBy, receivedByFocus, is_closed,
            recDropFoc, success, successMessage, amc_charge, amc_expire_date, amc_type, is_amc, insurance_expire_date, insurance_company, insurance_premium, insurance_value} = this.state

        const prodSer = asset_quantity && prodArr.map((item, index) => {
            return(
                <div className={'mb-1'}>
                    <label className={'ui-custom-label'}>Product Serial No {item + 1}</label>
                    <input placeholder={`Product Serial No ${item + 1}`} onChange={this.handleChange} name={`product_serial_${item + 1}`}  className={'ui-custom-input w-100'}/>
                </div>
            )
        })
        const receiverList = receivedBy && receivedBy.length > 0 && receivedBy.map((item, index) => (
            <p key={index} onClick={() => {this.setState({received_by: item.received_by, receivedBy: []})}}>{item.received_by}</p>
        ))
        return (
            <div className={'w-100 p-2'}>
                {error &&
                    <ErrorModal ops errorMessage={errorMessage} />
                }
                {success &&
                    <SuccessModal successMessage={successMessage} />
                }
                <InstaAdd
                    forceUp = {this.forceUp}
                    formType = {formType}
                    getApi = {getApi}
                    headTitle = {headTitle}
                />
                <div className="rounded">
                    {targetChallan.length > 0 ? <>
                        <nav className="navbar text-center mb-0 mx-1 mb-1 p-3 rounded bg-white cursor-pointer" onClick={() => {this.setState({targetChallan: []})}}>
                            <p className="text-blue cursor-pointer f-weight-700 f-20px m-0"><i className="icofont-swoosh-left f-22px"></i> Go Back</p>
                        </nav>
                        <div className=" p-1 ui-dataEntry">
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
                                    <input onChange={this.handleChange} name={'purchase_order_date'} value={purchase_order_date} type={'date'} className={`ui-custom-input ${errorDict && !errorDict.purchase_order_date && 'is-invalid'}`} />
                                </div>
                                <div className={'w-50 mb-20p'}>
                                    <div className="ui-custom-file">
                                        <input type="file" onChange={this.handleChange} name={'attachment'} id="attachment" />
                                        <label className={`${errorDict && !errorDict.challanComments && 'is-invalid'}`} htmlFor="attachment">{attachment ? attachment.name : 'Choose File'}</label>
                                    </div>
                                </div>
                                <button onClick={this.updateChallan} className="submit-btn">Add Challan</button>
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
                                <div className={'mb-2'}>
                                    <nav className="navbar text-center mb-2 pl-1 rounded">
                                        <p className="text-blue f-weight-700 f-20px m-0">Close Challan</p>
                                    </nav>
                                    <div className="d-flex ml-4 align-items-center ui-custom-checkbox">
                                        <input
                                            type={'checkbox'}
                                            checked={is_closed}
                                            id={'customCheckbox'}
                                            name={'is_closed'}
                                            value={is_closed}
                                            onChange={this.handleChange} />
                                        <label htmlFor="customCheckbox" className={'mb-0'}>Close Challan</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : (targetAsset.length === 0 && !addAssets) ? <div className={'bg-white m-1 rounded'}>
                    <nav className="navbar text-center mb-0 pl-3 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0">{assets.length > 0 ?
                            <p className={'cursor-pointer mb-0'}
                               onClick={() => {this.setState({assets: []})}}>
                                <i className="fas fa-angle-left"></i> Challan Details
                            </p> : 'Challan Information'}</p>
                    </nav>
                    <div className="px-2">
                        {assets.length > 0 ? <ReactDataTable
                            del={'assets-entry'}
                            deleteModalTitle={'Delete Asset'}
                            updateEdit={this.updateEdit}
                            tableData={assets}
                        /> : challans.length > 0 && assets.length === 0 ? <ReactDataTable
                            details
                            add
                            addName={'Assets'}
                            addAssets={this.addAssets}
                            edit={'specific-challan/'}
                            updateEdit={this.updateEdit}
                            assetList={this.assetList}
                            tableData={challans}
                        /> : <h4 className={'no-project px-2 py-2'}><i className="icofont-exclamation-circle"></i> Currently There are No Challan</h4>}
                    </div> </div> : <div className={'p-2'}>
                        <nav className="navbar text-center mb-0 mb-1 p-3 rounded bg-white cursor-pointer" onClick={() => {this.setState({    targetAsset: [], addAssets: false })}}>
                            <p className="text-blue cursor-pointer f-weight-700 f-20px m-0"><i className="icofont-swoosh-left f-22px"></i> Go Back</p>
                        </nav>
                        <div>
                            <div className={'rounded pl-3 pt-1'}>
                                <div className="row">
                                    <div className="col-md-6 pr-1 pl-0">
                                        <div className={'bg-white p-2 rounded mb-2'}>
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
                                                    <label className={'ui-custom-label'}>Project</label>
                                                    <select className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.project_id && 'is-invalid'}`} onChange={this.handleChange} name={'project_id'} value={project_id}>
                                                        <option>Select Project</option>
                                                        <ProjectOptions forceUp={this.forceUp} stateForceUpdate={this.state.forceUpd} />
                                                    </select>
                                                    <button onClick={() => {this.setState({formType: 'PROJECT', getApi: 'projects', headTitle: 'Project Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">
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
                                        <div className={'bg-white p-2 rounded mb-2'}>
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
                                            <div className="mb-2 mt-3 pl-4 d-flex align-items-center ui-custom-checkbox">
                                                <div className="ui-custom-checkbox">
                                                    <input
                                                        type={'checkbox'}
                                                        checked={is_amc}
                                                        id={'is_amc'}
                                                        name={'is_amc'}
                                                        onChange={this.handleChange} />
                                                    <label htmlFor="is_amc" className={'mb-0'}>IS AMC</label>
                                                </div>
                                            </div>
                                            {is_amc && <>
                                                <div className={'mb-1'}>
                                                    <label className={'ui-custom-label'}>AMC Type</label>
                                                    <select className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.asset_type && 'is-invalid'}`} onChange={this.handleChange} name={'amc_type'} value={amc_type}>
                                                        <option>AMC Types</option>
                                                        <AMCTypeOptions />
                                                    </select>
                                                </div>
                                                <div className={'mb-1'}>
                                                    <label className={'ui-custom-label'}>AMC Charge</label>
                                                    <input type={'number'}
                                                           value={amc_charge}
                                                           onChange={this.handleChange} name={'amc_charge'}
                                                           placeholder={'AMC Charge'}
                                                           className={`ui-custom-input ${errorDictAsset && !errorDictAsset.amc_charge && 'is-invalid'}`}/>
                                                </div>
                                                <div className={'mb-1'}>
                                                    <label className={'ui-custom-label'}>AMC Expire Date</label>
                                                    <input type="date"
                                                           value={amc_expire_date}
                                                           onChange={this.handleChange} name={'amc_expire_date'}
                                                           placeholder={'AMC Expire Date'}
                                                           className={`ui-custom-input pb-6px w-100 ${errorDictAsset && !errorDictAsset.amc_expire_date && 'is-invalid'}`}/>
                                                </div></>}
                                        </div>

                                        <div className={'bg-white p-2 rounded mb-2'}>
                                        <div className={'mb-1'}>
                                            <label className={'ui-custom-label'}>Asset Quantity</label>
                                            <input type='number' className={`ui-custom-input`} onChange={this.handleChange} placeholder={'Quantity'} name={'asset_quantity'} value={asset_quantity}/>
                                        </div>
                                        {prodSer}
                                        </div>
                                    </div>
                                    <div className="col-md-6 pl-1">
                                        <div className={'bg-white p-2 rounded mb-2'}>
                                            <h5>Insurance Information</h5>
                                            <div className={'mb-1'}>
                                                <label className={'ui-custom-label'}>Value of Insurance</label>
                                                <input type="number"
                                                       value={insurance_value}
                                                       onChange={this.handleChange} name={'insurance_value'}
                                                       placeholder={'Value of Insurance'}
                                                       className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.insurance_value && 'is-invalid'}`}/>
                                            </div>
                                            <div className={'mb-1'}>
                                                <label className={'ui-custom-label'}>Value of Premium</label>
                                                <input type="number"
                                                       value={insurance_premium}
                                                       onChange={this.handleChange} name={'insurance_premium'}
                                                       placeholder={'Value of Premium'}
                                                       className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.insurance_premium && 'is-invalid'}`}/>
                                            </div>
                                            <div className={'mb-1'}>
                                                <label className={'ui-custom-label'}>Insurance Company</label>
                                                <input type="text"
                                                       value={insurance_company}
                                                       onChange={this.handleChange} name={'insurance_company'}
                                                       placeholder={'Insurance Company'}
                                                       className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.insurance_company && 'is-invalid'}`}/>
                                            </div>
                                            <div className={'mb-1'}>
                                                <label className={'ui-custom-label'}>Expire Date</label>
                                                <input type="date"
                                                       value={insurance_expire_date}
                                                       onChange={this.handleChange} name={'insurance_expire_date'}
                                                       placeholder={'Expire Date'}
                                                       className={`ui-custom-input pb-6px w-100 ${errorDictAsset && !errorDictAsset.insurance_expire_date && 'is-invalid'}`}/>
                                            </div>
                                        </div>
                                        <div className={'bg-white p-2 rounded mb-2'}>
                                            <h5>Depreciation & Others</h5>
                                            <div className={'mb-1'}>
                                                <div className="input-grid">
                                                    <label className={'ui-custom-label'}>Asset Type</label>
                                                    <select className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.asset_type && 'is-invalid'}`} onChange={this.handleChange} name={'asset_type'} value={asset_type}>
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
                                                    <select className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.condition && 'is-invalid'}`} onChange={this.handleChange} name={'condition'} value={condition}>
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
                                                    <select className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.depreciation_method && 'is-invalid'}`} onChange={this.handleChange} name={'depreciation_method'} value={depreciation_method}>
                                                        <option>Select Depreciation Method</option>
                                                        <DepreciationOptions forceUp={this.forceUp} stateForceUpdate={this.state.forceUpd} />
                                                    </select>
                                                    <button onClick={() => {this.setState({formType: 'DEPMETHOD', getApi: 'depreciation-methods', headTitle: 'Depreciation Method Information'})}} type="button" className="add-button" data-toggle="modal" data-target="#rowDeleteModal">
                                                        <i className="fas fa-plus"></i>
                                                    </button>
                                                </div>
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
                                                <label className={'ui-custom-label'}>Warranty</label>
                                                <input type="text"
                                                       value={warranty}
                                                       onChange={this.handleChange} name={'warranty'}
                                                       placeholder={'Warranty'}
                                                       className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.warranty && 'is-invalid'}`}/>
                                            </div>
                                            <div className={'mb-1'}>
                                                <label className={'ui-custom-label'}>Comments</label>
                                                <textarea placeholder={'Comments'}
                                                          onChange={this.handleChange} name={'comments'}
                                                          value={comments}
                                                          className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.comments && 'is-invalid'}`}/>
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
                            <div className={'row p-2 align-items-center mt-1'}>
                                <div className={'col-6 px-2 d-flex w-100'}>
                                    <button className="mr-3 submit-btn-normal" onClick={this.addProduct} >Submit Product</button>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        );
    }
}

export default ChallanComponent;