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

class AssetRegComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            challan_no: '',
            challan_name: '',
            product_id: '',
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
            assign_to: jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data.id : '',
            asset_quantity: 1,
            prodArr: [],
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
        } else {
            this.setState({
                [name]: value
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
            delete stateHolder['challan_name']
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

            })
            .catch(err => {console.log(err)})
    }

    addChallan = () => {
        if (Object.values(this.validate('challan')).includes(false)) {
            return
        }
        const {challan_no, challan_name, challan_description, purchase_order_no, purchase_order_date, vendor_id, received_by, added_by, challanComments, attachment}  = this.state
        const data = new FormData()
        data.append('file', attachment)
        data.append('challan_no', challan_no)
        data.append('challan_name', challan_name)
        data.append('challan_description', challan_description)
        data.append('purchase_order_no', purchase_order_no)
        data.append('purchase_order_date', purchase_order_date)
        data.append('vendor_id', vendor_id)
        data.append('received_by', received_by)
        data.append('added_by', added_by)
        data.append('challanComments', challanComments)
        Axios.post(apiUrl() + 'assets-entry/challan/entry', data)
            .then(resData => {

                this.setState({
                    challan_id: resData.data
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
        const {attachment, challan_no, challan_name, challan_description, purchase_order_no, purchase_order_date, vendor_id, received_by, added_by,
            challanComments,project_id,asset_category,asset_sub_category,cost_of_purchase,installation_cost,carrying_cost,
            other_cost,asset_type,depreciation_method,rate,effective_date,book_value,salvage_value,useful_life,last_effective_date,warranty,
            last_warranty_date,condition,comments,barcode} = this.state
        let errorDict = null
        if (forr === 'challan') {
            errorDict = {
                attachment: typeof attachment !== 'undefined' && attachment !== '',
                challan_no: typeof challan_no !== 'undefined' && challan_no !== '',
                challan_name: typeof challan_name !== 'undefined' && challan_name !== '',
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
        const {challan_no, challan_name, challan_description, purchase_order_no, purchase_order_date, vendor_id, challan_id, attachment,
            received_by, added_by, challanComments, project_id, asset_category, asset_sub_category, prodArr, cost_of_purchase,errorDictAsset,
            installation_cost, carrying_cost, other_cost, asset_type, depreciation_method, rate, effective_date, book_value, errorDict, product_id,
            salvage_value, useful_life, last_effective_date, warranty, last_warranty_date, condition, comments, barcode, asset_quantity} = this.state

        const {userName} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        const prodSer = asset_quantity && prodArr.map((item, index) => {
            return(
                <div className={'row p-2 align-items-center'} key={10 + index}>
                    <div className={'col-5 pr-2'}>Product Serial No {item + 1}</div>
                    <div className={'col-7 pl-2'}>
                        <input placeholder={`Product Serial No ${item + 1}`} onChange={this.handleChange} name={`product_serial_${item + 1}`}  className={'form-control w-100'}/>
                    </div>
                </div>
            )
        })
        return (
            <div>
                {challan_id === '' && <div className="bg-white rounded p-2 shadow">
                    <nav className="navbar text-center mb-2 pl-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0">Add Challan Info First</p>
                    </nav>
                    <div className="row">
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Challan No</div>
                                <div className={'col-7 pl-2'}>
                                    <input onChange={this.handleChange} name={'challan_no'}  value={challan_no} placeholder='Challan No' className={`form-control ${errorDict && !errorDict.challan_no && 'is-invalid'}`} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Challan Name</div>
                                <div className={'col-7 pl-2'}>
                                    <input value={challan_name}  onChange={this.handleChange} name={'challan_name'} placeholder='Challan Name' className={`form-control ${errorDict && !errorDict.challan_name && 'is-invalid'}`} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Vendor</div>
                                <div className={'col-7 pl-2'}>
                                    <select className={`form-control w-100 ${errorDict && !errorDict.vendor_id && 'is-invalid'}`} value={vendor_id} onChange={this.handleChange} name={'vendor_id'}>
                                        <option>--Select Vendor--</option>
                                        <VendorOptions />
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Received By</div>
                                <div className={'col-7 pl-2'}>
                                    <input placeholder='Received By' value={received_by} onChange={this.handleChange} name={'received_by'} type={'text'} className={`form-control ${errorDict && !errorDict.received_by && 'is-invalid'}`} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Added By</div>
                                <div className={'col-7 pl-2'}>
                                    <input placeholder='Added By' value={userName} type={'text'} className={`form-control`} disabled={true} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Attachment</div>
                                <div className={'col-7 pl-2'}>
                                    <div className="custom-file">
                                        <input type="file" onChange={this.handleChange} name={'attachment'} className="custom-file-input" id="attachment" />
                                        <label className={`custom-file-label ${errorDict && !errorDict.attachment && 'is-invalid'}`} htmlFor="attachment">{attachment ? attachment.name : 'Choose file'}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Purchase Order No</div>
                                <div className={'col-7 pl-2'}>
                                    <input value={purchase_order_no} onChange={this.handleChange} name={'purchase_order_no'} placeholder='Purchase Order No' className={`form-control ${errorDict && !errorDict.purchase_order_no && 'is-invalid'}`} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Purchase Order Date</div>
                                <div className={'col-7 pl-2'}>
                                    <input placeholder='Challan Name' onChange={this.handleChange} name={'purchase_order_date'} value={purchase_order_date} type={'date'} className={`form-control ${errorDict && !errorDict.purchase_order_date && 'is-invalid'}`} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Challan Description</div>
                                <div className={'col-7 pl-2'}>
                                <textarea
                                    id={'enCh1'}
                                    className={`form-control ${errorDict && !errorDict.challan_description && 'is-invalid'}`}
                                    value={challan_description}
                                    placeholder={'Description'}
                                    onChange={this.handleChange} name={'challan_description'}
                                     />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Comments</div>
                                    <div className={'col-7 pl-2'}>
                                        <textarea
                                            id={'enCh1'}
                                            value={challanComments}
                                            onChange={this.handleChange} name={'challanComments'}
                                            placeholder={'Comments'}
                                            className={`form-control ${errorDict && !errorDict.challanComments && 'is-invalid'}`}
                                             />
                                    </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-12 pl-4'}>
                                    <div className={'row p-2 align-items-center'}>
                                        <button onClick={this.addChallan} className="btn btn-outline-info">Add Challan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                {challan_id !== '' && <div className="bg-white rounded p-2 shadow mt-3">
                    <nav className="navbar text-center mb-2 pl-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0">Challan Info</p>
                    </nav>
                    <div className="row">
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-12 pr-2'}>Challan No: <span className={'f-weight-500'}>{challan_no}</span></div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-12 pr-2'}>Challan Name: <span className={'f-weight-500'}>{challan_name}</span></div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-12 pr-2'}>Challan Description: <span className={'f-weight-500'}>{challan_description}</span></div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-12 pr-2'}>Received By: <span className={'f-weight-500'}>{received_by}</span></div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-12 pr-2'}>Added By: <span className={'f-weight-500'}>{userName}</span></div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-12 pr-2'}>Vendor: <span className={'f-weight-500'}>{vendor_id}</span></div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-12 pr-2'}>Comments: <span className={'f-weight-500'}>{challanComments}</span></div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-12 pr-2'}>Purchase Order No: <span className={'f-weight-500'}>{purchase_order_no}</span></div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-12 pr-2'}>
                                    Purchase Order Date: <span className={'f-weight-500'}>{purchase_order_date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                {challan_id !== '' && <div className="bg-white rounded p-2 mt-3 shadow">
                    <nav className="navbar text-center mb-2 pl-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0">Add Asset Info</p>
                    </nav>
                    <div className="row">
                        <div className="col-md-6 pr-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Project</div>
                                <div className={'col-7 pl-2'}>
                                    <select className={`form-control w-100 ${errorDictAsset && !errorDictAsset.project_id && 'is-invalid'}`} onChange={this.handleChange} name={'project_id'} value={project_id}>
                                        <option>--Select Project--</option>
                                        <ProjectOptions />
                                    </select>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Asset Category</div>
                                <div className={'col-7 pl-2'}>
                                    <select className={`form-control w-100 ${errorDictAsset && !errorDictAsset.asset_category && 'is-invalid'}`} onChange={this.handleChange} name={'asset_category'} value={asset_category}>
                                        <option>--Asset Category--</option>
                                        <AssetCategoryOptions />
                                    </select>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Asset Sub-category</div>
                                <div className={'col-7 pl-2'}>
                                    <select className={`form-control w-100 ${errorDictAsset && !errorDictAsset.asset_sub_category && 'is-invalid'}`} onChange={this.handleChange} name={'asset_sub_category'} value={asset_sub_category} >
                                        <option>--Asset Sub Category--</option>
                                        <AssetSubCategoryOptions assetId={asset_category} />
                                    </select>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Products</div>
                                <div className={'col-7 pl-2'}>
                                    <select className={`form-control w-100 ${errorDictAsset && !errorDictAsset.asset_sub_category && 'is-invalid'}`} onChange={this.handleChange} name={'product_id'} value={product_id} >
                                        <option>--Product--</option>
                                        <ProductsOptions catId={asset_category} subId={asset_sub_category} />
                                    </select>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Cost of Purchase</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="number"
                                           value={cost_of_purchase}
                                           onChange={this.handleChange} name={'cost_of_purchase'}
                                           placeholder={'Cost of Purchase'}
                                           className={`form-control w-100 ${errorDictAsset && !errorDictAsset.cost_of_purchase && 'is-invalid'}`}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Installation Cost</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="number"
                                           value={installation_cost}
                                           onChange={this.handleChange} name={'installation_cost'}
                                           placeholder={'Installation Cost'}
                                           className={`form-control w-100 ${errorDictAsset && !errorDictAsset.installation_cost && 'is-invalid'}`}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Carrying Cost</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="number"
                                           value={carrying_cost}
                                           onChange={this.handleChange} name={'carrying_cost'}
                                           placeholder={'Carrying Cost'}
                                           className={`form-control w-100 ${errorDictAsset && !errorDictAsset.carrying_cost && 'is-invalid'}`}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Other Cost</div>
                                <div className={'col-7 pl-2'}>
                                    <input type={'number'}
                                           value={other_cost}
                                           onChange={this.handleChange} name={'other_cost'}
                                           placeholder={'Other Cost'}
                                           className={`form-control ${errorDictAsset && !errorDictAsset.other_cost && 'is-invalid'}`}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Rate</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="number"
                                           value={rate}
                                           onChange={this.handleChange} name={'rate'}
                                           placeholder={'Rate'}
                                           className={`form-control w-100 ${errorDictAsset && !errorDictAsset.rate && 'is-invalid'}`}/>
                                </div>
                            </div>
                            <nav className="navbar text-center mt-2 pl-2 rounded">
                                <p className="text-dark f-weight-500 m-0">Quantity</p>
                            </nav>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Asset Quantity</div>
                                <div className={'col-7 pl-2'}>
                                    <input type='number' className={`form-control`} onChange={this.handleChange} placeholder={'Quantity'} name={'asset_quantity'} value={asset_quantity}/>
                                </div>
                            </div>

                            {prodSer}

                            <div className={'row p-2 align-items-center mt-3'}>
                                <div className={'col-8 pr-2 d-flex w-100'}>
                                    <button onClick={this.addProduct} className="btn mx-1 p-2 w-100 btn-outline-info">Submit Product</button>
                                    <button onClick={() => {window.location.reload()}} className="btn mx-1 p-2 w-75 btn-outline-warning">New Challan</button>
                                    <button onClick={this.resetFields} className="btn mx-1 p-2 w-50 btn-outline-danger">Reset</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 pr-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Effective Date</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="date"
                                           value={effective_date}
                                           onChange={this.handleChange} name={'effective_date'}
                                           placeholder={'Effective Date'}
                                           className={`form-control w-100 ${errorDictAsset && !errorDictAsset.effective_date && 'is-invalid'}`}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Book Value</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="number"
                                           value={book_value}
                                           onChange={this.handleChange} name={'book_value'}
                                           placeholder={'Book Value'}
                                           className={`form-control w-100 ${errorDictAsset && !errorDictAsset.book_value && 'is-invalid'}`}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Salvage Value</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="number"
                                           value={salvage_value}
                                           onChange={this.handleChange} name={'salvage_value'}
                                           placeholder={'Salvage Value'}
                                           className={`form-control w-100 ${errorDictAsset && !errorDictAsset.salvage_value && 'is-invalid'}`}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Useful Life</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="text"
                                           value={useful_life}
                                           onChange={this.handleChange} name={'useful_life'}
                                           placeholder={'Useful Life'}
                                           className={`form-control w-100 ${errorDictAsset && !errorDictAsset.useful_life && 'is-invalid'}`}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Last Effective Date</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="date"
                                           value={last_effective_date}
                                           onChange={this.handleChange} name={'last_effective_date'}
                                           placeholder={'Effective Date'}
                                           className={`form-control w-100 ${errorDictAsset && !errorDictAsset.last_effective_date && 'is-invalid'}`}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Warranty</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="text"
                                           value={warranty}
                                           onChange={this.handleChange} name={'warranty'}
                                           placeholder={'Warranty'}
                                           className={`form-control w-100 ${errorDictAsset && !errorDictAsset.warranty && 'is-invalid'}`}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Last Warranty Date</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="date"
                                           value={last_warranty_date}
                                           onChange={this.handleChange} name={'last_warranty_date'}
                                           className={`form-control w-100 ${errorDictAsset && !errorDictAsset.last_warranty_date && 'is-invalid'}`}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Condition</div>
                                <div className={'col-7 pl-2'}>
                                    <select className={`form-control w-100 ${errorDictAsset && !errorDictAsset.condition && 'is-invalid'}`} onChange={this.handleChange} name={'condition'} value={condition}>
                                        <option>--Select Condition--</option>
                                        <ConditionOptions />
                                    </select>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Comments</div>
                                <div className={'col-7 pl-2'}>
                                    <textarea placeholder={'Comments'}
                                              onChange={this.handleChange} name={'comments'}
                                              value={comments}
                                              className={`form-control w-100 ${errorDictAsset && !errorDictAsset.comments && 'is-invalid'}`}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Barcode</div>
                                <div className={'col-7 pl-2 ui-checkbox'}>
                                    <input type="checkbox"
                                           name={'barcode'}
                                           checked={barcode}
                                           onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Asset Type</div>
                                <div className={'col-7 pl-2'}>
                                    <select className={`form-control w-100 ${errorDictAsset && !errorDictAsset.asset_type && 'is-invalid'}`} onChange={this.handleChange} name={'asset_type'} value={asset_type}>
                                        <option>--Asset Type--</option>
                                        <AssetTypeOptions />
                                    </select>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Depreciation Method</div>
                                <div className={'col-7 pl-2'}>
                                    <select className={`form-control w-100 ${errorDictAsset && !errorDictAsset.depreciation_method && 'is-invalid'}`} onChange={this.handleChange} name={'depreciation_method'} value={depreciation_method}>
                                        <option>--Select Depreciation Method--</option>
                                        <DepreciationOptions />
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

export default AssetRegComponent;