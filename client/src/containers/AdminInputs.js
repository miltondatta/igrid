import Axios from 'axios'
import React, {Component} from 'react'
import {apiUrl} from "../utility/constant";

class AdminInputs extends Component{
    constructor(props){
        super(props);
        this.state={
            vendorName: '',
            fileName: '',
            description: '',
            model: '',
            brand: '',
            category_id: '',
            sub_categoy_id: '',
            product_name: '',
            product_code: '',
            brand_id: '',
            sub_categoy_name: '',
            sub_category_code: ''
        }
    }

    handleChange = (e) => {
        const {name, value, checked} = e.target
        if(name === 'enlisted'){
            this.setState({
                [name]: checked
            })
        } else {
            this.setState({
                [name]: value
            })
        }
    }

    submitVendor = () => {
        const {vendorName, fileName, description, enlisted} = this.state
        const data = {
            vendor_name: vendorName,
            file_name: fileName,
            description,
            enlisted: enlisted
        }
        Axios.post(apiUrl() + '/vendors/entry', data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    submitModel = () => {
        const {model} = this.state
        const data = {model}
        Axios.post(apiUrl() + '/models/entry', data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    submitBrand = () => {
        const {brand} = this.state
        const data = {brand}
        Axios.post(apiUrl() + '/brands/entry', data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    submitProducts = () => {
        const {category_id, sub_categoy_id, product_name, product_code, brand_id} = this.state
        const data = {category_id, sub_categoy_id, product_name, product_code, brand_id}
        Axios.post(apiUrl() + '/products/entry', data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render(){
        const {vendorName, fileName, description, model, brand,
                category_id, sub_categoy_id, product_name, product_code, brand_id, sub_categoy_name, sub_category_code,
                category_code,category_name,
                project_name, project_code,
                method_name, depreciation_code,
                type_name, asset_code,
                condition_type,
                asset_id, assign_to} = this.state
        return(
            <div>
                <h2>Admin Inputs</h2>
                <div className="row">
                    <div className="col-md-6 px-2">
                        <div className={'bg-white rounded p-2'}>
                            <nav className="navbar text-center mb-2 pl-2 rounded">
                                <p className="text-dark f-weight-500 f-20px m-0">Vendors</p>
                            </nav>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Vendor Name
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder='Vendor Name'
                                        type={'text'}
                                        name={'vendorName'}
                                        value={vendorName}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Enlisted
                                </div>
                                <div className="col-md-9 ui-checkbox d-flex align-items-center">
                                    <input
                                        type={'checkbox'}
                                        id={'enCh1'}
                                        name={'enlisted'}
                                        value={vendorName}
                                        onChange={this.handleChange} />
                                    <label htmlFor="enCh1" className={'mb-0'}>Enlisted</label>
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Description
                                </div>
                                <div className="col-md-9 ui-checkbox">
                            <textarea
                                placeholder={'Description'}
                                id={'enCh1'}
                                name={'description'}
                                value={description}
                                className={'form-control'}
                                onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    File Name
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder='File Name'
                                        type={'text'}
                                        name={'fileName'}
                                        value={fileName}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end px-2">
                                <button className="btn btn-outline-info mt-3" onClick={this.submitVendor}>Submit Vendor</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 px-2">
                        <div className={'bg-white rounded p-2 mb-2'}>
                            <nav className="navbar text-center mb-2 pl-2 rounded">
                                <p className="text-dark f-weight-500 f-20px m-0">Model</p>
                            </nav>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Model
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder='Model'
                                        type={'text'}
                                        name={'model'}
                                        value={model}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end px-2">
                                <button className="btn btn-outline-info mt-3" onClick={this.submitModel}>Submit Model</button>
                            </div>
                        </div>
                        <div className={'bg-white rounded p-2'}>
                            <nav className="navbar text-center mb-2 pl-2 rounded">
                                <p className="text-dark f-weight-500 f-20px m-0">Brand</p>
                            </nav>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Brand
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder='Brand'
                                        type={'text'}
                                        name={'brand'}
                                        value={brand}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end px-2">
                                <button className="btn btn-outline-info mt-3" onClick={this.submitBrand}>Submit Brand</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 px-2 my-2">
                        <div className={'bg-white rounded p-2'}>
                            <nav className="navbar text-center mb-2 pl-2 rounded">
                                <p className="text-dark f-weight-500 f-20px m-0">Products</p>
                            </nav>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Category Id
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder='Category Id'
                                        type={'number'}
                                        name={'category_id'}
                                        value={category_id}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Sub Category Id
                                </div>
                                <div className="col-md-9 ui-checkbox d-flex align-items-center">
                                    <input
                                        placeholder='Sub Category Id'
                                        type={'number'}
                                        name={'sub_categoy_id'}
                                        value={sub_categoy_id}
                                        onChange={this.handleChange}
                                        className={'form-control'}  />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Product Name
                                </div>
                                <div className="col-md-9 ui-checkbox">
                                    <input
                                        placeholder='Product Name'
                                        type={'text'}
                                        name={'product_name'}
                                        value={product_name}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Product Code
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder='Product Code'
                                        type={'text'}
                                        name={'product_code'}
                                        value={product_code}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Brand Id
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder='Brand Id'
                                        type={'number'}
                                        name={'brand_id'}
                                        value={brand_id}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Model Id
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder='Model Id'
                                        type={'number'}
                                        name={'brand_id'}
                                        value={brand_id}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end px-2">
                                <button className="btn btn-outline-info mt-3" onClick={this.submitProducts}>Submit Products</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 px-2 my-2">
                        <div className={'bg-white rounded p-2'}>
                            <nav className="navbar text-center mb-2 pl-2 rounded">
                                <p className="text-dark f-weight-500 f-20px m-0">Asset Sub Categories</p>
                            </nav>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Category Id
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder='Category Id'
                                        type={'number'}
                                        name={'category_id'}
                                        value={category_id}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Sub Category Name
                                </div>
                                <div className="col-md-9 ui-checkbox d-flex align-items-center">
                                    <input
                                        placeholder='Sub Category Name'
                                        type={'number'}
                                        name={'sub_categoy_name'}
                                        value={sub_categoy_name}
                                        onChange={this.handleChange}
                                        className={'form-control'}  />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Sub Category Code
                                </div>
                                <div className="col-md-9 ui-checkbox">
                                    <input
                                        placeholder='Product Name'
                                        type={'text'}
                                        name={'sub_category_code'}
                                        value={sub_category_code}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Product Code
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder='Product Code'
                                        type={'text'}
                                        name={'product_code'}
                                        value={product_code}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Description
                                </div>
                                <div className="col-md-9">
                                    <textarea
                                        placeholder='Description'
                                        name={'description'}
                                        value={description}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end px-2">
                                <button className="btn btn-outline-info mt-3" onClick={this.submitProducts}>Submit Sub Categories</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 px-2 my-2">
                        <div className={'bg-white rounded p-2'}>
                            <nav className="navbar text-center mb-2 pl-2 rounded">
                                <p className="text-dark f-weight-500 f-20px m-0">Asset Categories</p>
                            </nav>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Category Name
                                </div>
                                <div className="col-md-9 ui-checkbox">
                                    <input
                                        placeholder='Product Name'
                                        type={'text'}
                                        name={'category_name'}
                                        value={category_name}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Category Code
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder='Category Code'
                                        type={'text'}
                                        name={'category_code'}
                                        value={category_code}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Description
                                </div>
                                <div className="col-md-9">
                                    <textarea
                                        placeholder='Description'
                                        name={'description'}
                                        value={description}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end px-2">
                                <button className="btn btn-outline-info mt-3" onClick={this.submitProducts}>Submit Category</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 px-2 my-2">
                        <div className={'bg-white rounded p-2'}>
                            <nav className="navbar text-center mb-2 pl-2 rounded">
                                <p className="text-dark f-weight-500 f-20px m-0">Projects</p>
                            </nav>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Project Name
                                </div>
                                <div className="col-md-9 ui-checkbox d-flex align-items-center">
                                    <input
                                        placeholder='Project Name'
                                        type={'text'}
                                        name={'project_name'}
                                        value={project_name}
                                        onChange={this.handleChange}
                                        className={'form-control'}  />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Project Code
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder='Project Code'
                                        type={'text'}
                                        name={'project_code'}
                                        value={project_code}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Description
                                </div>
                                <div className="col-md-9">
                                    <textarea
                                        placeholder='Description'
                                        name={'description'}
                                        value={description}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end px-2">
                                <button className="btn btn-outline-info mt-3" onClick={this.submitProducts}>Submit Projects</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 px-2 my-2">
                        <div className={'bg-white rounded p-2'}>
                            <nav className="navbar text-center mb-2 pl-2 rounded">
                                <p className="text-dark f-weight-500 f-20px m-0">Depreciation Methods</p>
                            </nav>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Method Name
                                </div>
                                <div className="col-md-9 ui-checkbox">
                                    <input
                                        placeholder='Product Name'
                                        type={'text'}
                                        name={'method_name'}
                                        value={method_name}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Depreciation Code
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder='Category Code'
                                        type={'text'}
                                        name={'depreciation_code'}
                                        value={depreciation_code}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Description
                                </div>
                                <div className="col-md-9">
                                    <textarea
                                        placeholder='Description'
                                        name={'description'}
                                        value={description}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end px-2">
                                <button className="btn btn-outline-info mt-3" onClick={this.submitProducts}>Submit Methods</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 px-2 my-2">
                        <div className={'bg-white rounded p-2'}>
                            <nav className="navbar text-center mb-2 pl-2 rounded">
                                <p className="text-dark f-weight-500 f-20px m-0">Asset Types</p>
                            </nav>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Type Name
                                </div>
                                <div className="col-md-9 ui-checkbox d-flex align-items-center">
                                    <input
                                        placeholder='Project Name'
                                        type={'text'}
                                        name={'type_name'}
                                        value={type_name}
                                        onChange={this.handleChange}
                                        className={'form-control'}  />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Asset Code
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder='Project Code'
                                        type={'text'}
                                        name={'asset_code'}
                                        value={asset_code}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Description
                                </div>
                                <div className="col-md-9">
                                    <textarea
                                        placeholder='Description'
                                        name={'description'}
                                        value={description}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end px-2">
                                <button className="btn btn-outline-info mt-3" onClick={this.submitProducts}>Submit Asset Types</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 px-2 my-2">
                        <div className={'bg-white rounded p-2'}>
                            <nav className="navbar text-center mb-2 pl-2 rounded">
                                <p className="text-dark f-weight-500 f-20px m-0">Conditions</p>
                            </nav>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Condition Type
                                </div>
                                <div className="col-md-9 ui-checkbox">
                                    <input
                                        placeholder='Product Name'
                                        type={'text'}
                                        name={'condition_type'}
                                        value={condition_type}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end px-2">
                                <button className="btn btn-outline-info mt-3" onClick={this.submitProducts}>Submit Conditions</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 px-2 my-2">
                        <div className={'bg-white rounded p-2'}>
                            <nav className="navbar text-center mb-2 pl-2 rounded">
                                <p className="text-dark f-weight-500 f-20px m-0">Asset History</p>
                            </nav>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Asset Id
                                </div>
                                <div className="col-md-9 ui-checkbox d-flex align-items-center">
                                    <input
                                        placeholder='Asset Id'
                                        type={'text'}
                                        name={'asset_id'}
                                        value={asset_id}
                                        onChange={this.handleChange}
                                        className={'form-control'}  />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Assigned To
                                </div>
                                <div className="col-md-9">
                                    <input
                                        placeholder='Assigned To'
                                        type={'text'}
                                        name={'assign_to'}
                                        value={assign_to}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="row px-2 py-2">
                                <div className="col-md-3">
                                    Description
                                </div>
                                <div className="col-md-9">
                                    <textarea
                                        placeholder='Description'
                                        name={'description'}
                                        value={description}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end px-2">
                                <button className="btn btn-outline-info mt-3" onClick={this.submitProducts}>Submit Assignment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminInputs