import React, {Component} from 'react';
import VendorOptions from "../../utility/component/vendorOptions";
import ProjectOptions from "../../utility/component/projectOptions";
import AssetCategoryOptions from "../../utility/component/assetCategoryOptions";
import AssetSubCategoryOptions from "../../utility/component/assetSubCategoryOptions";
import AssetTypeOptions from "../../utility/component/assetTypeOptions";
import DepreciationOptions from "../../utility/component/depreciationMethodOptions";

class AssetRegComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            challan_no: '',
            challan_name: '',
            challan_description: '',
            purchase_order_no: '',
            purchase_order_date: '',
            vendor_id: '',
            quantity: '',
            received_by: '',
            added_by: '',
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
            assetComments: '',
            barcode: '',
            assign_to: '',
            asset_quantity: 1,
            prodArr: []
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
            console.log(value)
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
        const {asset_quantity} = this.state
        let prodSerialHolder = []
        let dataArray = []
        let stateHolder = this.state
        for(let i = 1; i <= asset_quantity; i++) {
            prodSerialHolder.push(stateHolder['product_serial_'+i])
            delete stateHolder['product_serial_'+i]
            delete stateHolder['prodArr']
            delete stateHolder['asset_quantity']
        }
        prodSerialHolder.forEach(item => {
            let x = {...stateHolder, product_serial: item}
            dataArray.push(x)
        })
        console.log(dataArray)
        console.log(stateHolder)
    }

    render() {
        const {challan_no, challan_name, challan_description, purchase_order_no, purchase_order_date, vendor_id, quantity,
            received_by, added_by, challanComments, project_id, asset_category, asset_sub_category, prodArr,
            cost_of_purchase, installation_cost, carrying_cost, other_cost, asset_type, depreciation_method, rate, effective_date, book_value,
            salvage_value, useful_life, last_effective_date, warranty, last_warranty_date, condition, assetComments, barcode, assign_to, asset_quantity} = this.state

        const prodSer = asset_quantity && prodArr.map((item, index) => {
            return(
                <div className={'row p-2 align-items-center'} key={'index'}>
                    <div className={'col-5 pr-2'}>Product Serial No {item + 1}</div>
                    <div className={'col-7 pl-2'}>
                        <input placeholder={`Product Serial No ${item + 1}`} onChange={this.handleChange} name={`product_serial_${item + 1}`}  className={'form-control w-100'}/>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <div className="bg-white rounded p-2">
                    <nav className="navbar text-center mb-2 pl-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0">Challan Entry</p>
                    </nav>
                    <div className="row">
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Challan No</div>
                                <div className={'col-7 pl-2'}>
                                    <input onChange={this.handleChange} name={'challan_no'}  value={challan_no} placeholder='Challan No' className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Challan Name</div>
                                <div className={'col-7 pl-2'}>
                                    <input value={challan_name}  onChange={this.handleChange} name={'challan_name'} placeholder='Challan Name' className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Vendor</div>
                                <div className={'col-7 pl-2'}>
                                    <select className={'form-control w-100'} value={vendor_id} onChange={this.handleChange} name={'vendor_id'}>
                                        <option>--Select Vendor--</option>
                                        <VendorOptions />
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Purchase Order No</div>
                                <div className={'col-7 pl-2'}>
                                    <input value={purchase_order_no} onChange={this.handleChange} name={'purchase_order_no'} placeholder='Purchase Order No' className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Purchase Order Date</div>
                                <div className={'col-7 pl-2'}>
                                    <input placeholder='Challan Name' onChange={this.handleChange} name={'purchase_order_date'} value={purchase_order_date} type={'datetime-local'} className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Quantity</div>
                                <div className={'col-7 pl-2'}>
                                    <input placeholder='Quantity' value={quantity} onChange={this.handleChange} name={'quantity'} type={'number'} className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Received By</div>
                                <div className={'col-7 pl-2'}>
                                    <input placeholder='Received By' value={received_by} onChange={this.handleChange} name={'received_by'} type={'text'} className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Added By</div>
                                <div className={'col-7 pl-2'}>
                                    <input placeholder='Added By' value={added_by} onChange={this.handleChange} name={'added_by'} type={'text'} className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Attachment</div>
                                <div className={'col-7 pl-2'}>
                                    <div className="custom-file">
                                        <input type="file" onChange={this.handleChange} name={'attachment'} className="custom-file-input" id="attachment" />
                                        <label className="custom-file-label" htmlFor="attachment">Choose
                                            file</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Challan Description</div>
                                <div className={'col-7 pl-2'}>
                                <textarea
                                    id={'enCh1'}
                                    className={'form-control'}
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
                                            className={'form-control'}
                                             />
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded p-2 mt-3">
                    <nav className="navbar text-center mb-2 pl-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0">Asset Entry</p>
                    </nav>
                    <div className="row">
                        <div className="col-md-6 pr-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Project</div>
                                <div className={'col-7 pl-2'}>
                                    <select className={'form-control w-100'} onChange={this.handleChange} name={'project_id'} value={project_id}>
                                        <option>--Select Project--</option>
                                        <ProjectOptions />
                                    </select>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Asset Category</div>
                                <div className={'col-7 pl-2'}>
                                    <select className={'form-control w-100'} onChange={this.handleChange} name={'asset_category'} value={asset_category}>
                                        <option>--Asset Category--</option>
                                        <AssetCategoryOptions />
                                    </select>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Asset Sub-category</div>
                                <div className={'col-7 pl-2'}>
                                    <select className={'form-control w-100'} onChange={this.handleChange} name={'asset_sub_category'} value={asset_sub_category} >
                                        <option>--Asset Sub Category--</option>
                                        <AssetSubCategoryOptions />
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
                                           className={'form-control w-100'}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Installation Cost</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="number"
                                           value={installation_cost}
                                           onChange={this.handleChange} name={'installation_cost'}
                                           placeholder={'Installation Cost'}
                                           className={'form-control w-100'}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Carrying Cost</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="number"
                                           value={carrying_cost}
                                           onChange={this.handleChange} name={'carrying_cost'}
                                           placeholder={'Carrying Cost'}
                                           className={'form-control w-100'}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Other Cost</div>
                                <div className={'col-7 pl-2'}>
                                    <input type={'number'}
                                           value={other_cost}
                                           onChange={this.handleChange} name={'other_cost'}
                                           placeholder={'Other Cost'}
                                           className={'form-control'}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Asset Type</div>
                                <div className={'col-7 pl-2'}>
                                    <select className={'form-control w-100'} onChange={this.handleChange} name={'asset_type'} value={asset_type}>
                                        <option>--Asset Type--</option>
                                        <AssetTypeOptions />
                                    </select>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Depreciation Method</div>
                                <div className={'col-7 pl-2'}>
                                    <select className={'form-control w-100'} onChange={this.handleChange} name={'depreciation_method'} value={depreciation_method}>
                                        <option>--Select Depreciation Method--</option>
                                        <DepreciationOptions />
                                    </select>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Rate</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="number"
                                           value={rate}
                                           onChange={this.handleChange} name={'rate'}
                                           placeholder={'Rate'}
                                           className={'form-control w-100'}/>
                                </div>
                            </div>
                            <nav className="navbar text-center mt-2 pl-2 rounded">
                                <p className="text-dark f-weight-500 m-0">Quantity</p>
                            </nav>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Asset Quantity</div>
                                <div className={'col-7 pl-2'}>
                                    <input type='number' className={'form-control'} onChange={this.handleChange} placeholder={'Quantity'} name={'asset_quantity'} value={asset_quantity}/>
                                </div>
                            </div>

                            {prodSer}

                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>
                                    <button onClick={this.addProduct} className="btn btn-outline-info">Add Product</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 pr-2">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Effective Date</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="datetime-local"
                                           value={effective_date}
                                           onChange={this.handleChange} name={'effective_date'}
                                           placeholder={'Effective Date'}
                                           className={'form-control w-100'}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Book Value</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="number"
                                           value={book_value}
                                           onChange={this.handleChange} name={'book_value'}
                                           placeholder={'Book Value'}
                                           className={'form-control w-100'}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Salvage Value</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="number"
                                           value={salvage_value}
                                           onChange={this.handleChange} name={'salvage_value'}
                                           placeholder={'Salvage Value'}
                                           className={'form-control w-100'}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Useful Life</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="text"
                                           value={useful_life}
                                           onChange={this.handleChange} name={'useful_life'}
                                           placeholder={'Useful Life'}
                                           className={'form-control w-100'}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Last Effective Date</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="datetime-local"
                                           value={last_effective_date}
                                           onChange={this.handleChange} name={'last_effective_date'}
                                           placeholder={'Effective Date'}
                                           className={'form-control w-100'}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Warranty</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="text"
                                           value={warranty}
                                           onChange={this.handleChange} name={'warranty'}
                                           placeholder={'Warranty'}
                                           className={'form-control w-100'}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Last Warranty Date</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="datetime-local"
                                           value={last_warranty_date}
                                           onChange={this.handleChange} name={'last_warranty_date'}
                                           className={'form-control w-100'}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Condition</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="number"
                                           value={condition}
                                           onChange={this.handleChange} name={'condition'}
                                           placeholder={'Condition'}
                                           className={'form-control w-100'}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Comments</div>
                                <div className={'col-7 pl-2'}>
                                    <textarea placeholder={'Comments'}
                                              onChange={this.handleChange} name={'assetComments'}
                                              value={assetComments}
                                              className={'form-control w-100'}/>
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Barcode</div>
                                <div className={'col-7 pl-2 ui-checkbox'}>
                                    <input type="checkbox"
                                           checked={barcode}
                                    />
                                </div>
                            </div>
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Assigned To</div>
                                <div className={'col-7 pl-2'}>
                                    <input type="text"
                                           value={assign_to}
                                           onChange={this.handleChange} name={'assign_to'}
                                           placeholder={'Assigned To'}
                                           className={'form-control w-100'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AssetRegComponent;