import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import AssetCategoryOptions from "../../utility/component/assetCategoryOptions";
import AssetSubCategoryOptions from "../../utility/component/assetSubCategoryOptions";
import BrandIdOptions from "../../utility/component/brandIdOptions";
import ModelIdOptions from "../../utility/component/modelIdOptions";

class AdminInputContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            allProjects: [],
            model: '',
            brand: '',
            file_name: '',
            category_id: '',
            description: '',
            vendor_name: '',
            project_name: '',
            project_code: '',
            category_name: '',
            category_code: '',
            asset_code: '',
            type_name: '',
            product_name: '',
            depreciation_code: '',
            method_name: '',
            product_code: '',
            sub_category_id: '',
            sub_category_name: '',
            sub_category_code: '',
            editId: null,
            errorDict: null,
            error: false,
            enlisted: false,
            isLoading: false,
        }
    }
    
    handleSubmit = () => {
        const {getApi} = this.props
        if (Object.values(this.validate()).includes(false)) {
            return
        }
        Axios.post(apiUrl() + getApi + '/entry', this.getApiData())
            .then(res => {
                console.log(res)
                if(res.data.message){
                    this.setState({
                        error: true,
                        errorMessage: res.data.message
                    })
                } else {
                    this.setState({
                        error: false,
                        model: '',
                        brand: '',
                        file_name: '',
                        description: '',
                        vendor_name: '',
                        project_name: '',
                        project_code: '',
                        category_name: '',
                        category_code: '',
                        sub_category_name: '',
                        sub_category_code: '',
                        enlisted: false
                    }, () => {
                        this.validate()
                    })
                }
            })
            .then(res => {
                this.setState({
                    allProjects: []
                })
                this.getData()
            })
            .catch(err => {
                console.log(err)
            })
    }

    getData = () => {
        const {getApi} = this.props
        this.setState({
            isLoading: true
        }, () => {
            Axios.get(apiUrl() + getApi)
                .then(res => {
                    this.setState({
                        allProjects: res.data
                    })
                })
                .then(res => {
                    this.setState({
                        isLoading: false
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }

    updateEdit = (id) => {
        const {allProjects} = this.state
        allProjects.find(item => {
            if (item.id === id) {
                console.log(item)
                this.setState({
                    editId: id
                }, () => {
                    Object.keys(item).map(val => {
                        this.setState({
                            [val]: item[val]
                        }, () => {
                            this.validate()
                        })
                    })
                })
                return null
            }
        })
    }

    updateData = () => {
        const {getApi} = this.props
        const {editId} = this.state
        if (Object.values(this.validate()).includes(false)) {
            return
        }
        Axios.put(apiUrl() + getApi + '/update/' + editId, this.getApiData())
            .then(resData => {

                if(resData.data.message){
                    this.setState({
                        error: true,
                        errorMessage: resData.data.message
                    })
                } else {
                    this.setState({
                        error: false,
                        allProjects: []
                    })
                }
            })
            .then(res => {
                this.getData()
            })
    }

    handleChange = (e) => {
        const {name, value, checked, files} = e.target
        console.log(files, name, value)
        if(name === 'project_code'){
            if (isNaN(value)){
                return
            } else {
                this.setState({
                    [name]: value
                }, () => {
                    this.validate()
                })
            }
        }
        else if(name === 'enlisted'){
            this.setState({
                [name]: checked
            })
        } else if (name === 'file_name') {
            this.setState({
                [name]: files[0],
            })
        } else {
            this.setState({
                [name]: value
            }, () => {
                this.validate()
            })
        }

    }

    componentDidMount = () => {
        this.getData()
    }

    renderForm = () => {
        const {formType} = this.props
        const {project_name, project_code, vendor_name, file_name, description, editId, errorDict, enlisted, model, brand,file_name_tag,
            category_code,category_name, sub_category_code, sub_category_name, category_id, sub_category_id, product_name,product_code,
            brand_id, model_id, depreciation_code, method_name, type_name, asset_code, condition_type} = this.state

        console.log(errorDict)
        switch (formType){
            case 'VENDOR':
                return(
                    <div className={`rounded p-3 my-2`}>
                        <div className="row px-2">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-3">
                                        Vendor Name
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            placeholder='Vendor Name'
                                            type={'text'}
                                            name={'vendor_name'}
                                            value={vendor_name}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.vendor_name) && 'is-invalid'}`} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-3">
                                        File Name
                                    </div>
                                    <div className="col-md-9 was-validated">
                                        <div className="custom-file">
                                            <input type="file" onChange={this.handleChange} name={'file_name'} className="custom-file-input" id="validatedCustomFile"
                                                   required />
                                                <label className="custom-file-label" htmlFor="validatedCustomFile">{file_name ? file_name.name : 'Choose file...'}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row px-2 mt-3">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-3">
                                        Description
                                    </div>
                                    <div className="col-md-9 ui-checkbox">
                                        <textarea
                                            placeholder={'Description'}
                                            id={'enCh1'}
                                            name={'description'}
                                            value={description}
                                            className={`form-control ${(errorDict && !errorDict.description) && 'is-invalid'}`}
                                            onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 d-flex">
                                <div className="row w-100">
                                    <div className="col-md-3 d-flex align-items-center">
                                        Enlisted
                                    </div>
                                    <div className="col-md-9 ui-checkbox d-flex align-items-center">
                                        <input
                                            type={'checkbox'}
                                            checked={enlisted}
                                            id={'enCh1'}
                                            name={'enlisted'}
                                            value={vendor_name}
                                            onChange={this.handleChange} />
                                        <label htmlFor="enCh1" className={'mb-0'}>Enlisted</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end px-2 w-100">
                            {editId === null ? <button className="btn btn-outline-info mt-3" onClick={this.handleSubmit}>Submit Vendor</button> : <>
                                <button className="btn btn-outline-info mt-3 mr-2" onClick={this.updateData}>Update Projects</button>
                                <button className="btn btn-outline-danger mt-3" onClick={() => {
                                    this.setState({
                                        editId: null,
                                        vendor_name: '',
                                        file_name: '',
                                        description: '',
                                        enlisted: false,
                                    }, () => {
                                        this.validate()
                                    })}}>Go Back</button>
                            </>}
                        </div>
                    </div>
                )
            case 'PROJECT':
                return(
                    <div className={`rounded p-3 my-2`}>
                        <div className="row px-2">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Project Name
                                    </div>
                                    <div className="col-md-8 ui-checkbox d-flex align-items-center">
                                        <input
                                            placeholder='Project Name'
                                            type={'text'}
                                            name={'project_name'}
                                            value={project_name}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.project_name) && 'is-invalid'}`}  />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Project Code
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            placeholder='Project Code'
                                            type={'text'}
                                            name={'project_code'}
                                            value={project_code}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.project_code) && 'is-invalid'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row px-2 my-2">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Description
                                    </div>
                                    <div className="col-md-8">
                                        <textarea
                                            placeholder='Description'
                                            name={'description'}
                                            value={description}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.description) && 'is-invalid'}`} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                {editId === null ? <button className="btn btn-outline-info mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Project</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mt-3 mr-2" onClick={this.updateData}>Update Projects</button>
                                    <button className="btn btn-outline-danger mt-3" onClick={() => {
                                        this.setState({
                                            editId: null,
                                            project_name: '',
                                            project_code: '',
                                            description: '',
                                        }, () => {
                                            this.validate()
                                        })}}>Go Back</button>
                                </>}
                            </div>
                        </div>
                    </div>
                )
            case 'PRODUCTS':
                return(
                    <div className={`rounded p-3 my-2`}>
                        <div className="row px-2">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Category
                                    </div>
                                    <div className="col-md-8 ui-checkbox d-flex align-items-center">
                                        <select name={'category_id'} value={category_id} onChange={this.handleChange} className={`form-control ${(errorDict && !errorDict.category_id) && 'is-invalid'}`}>
                                            <option>--Select Category--</option>
                                            <AssetCategoryOptions />
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Sub Category
                                    </div>
                                    <div className="col-md-8 ui-checkbox d-flex align-items-center">
                                        <select name={'sub_category_id'} value={sub_category_id} onChange={this.handleChange} className={`form-control ${(errorDict && !errorDict.sub_category_id) && 'is-invalid'}`}>
                                            <option>--Select Category--</option>
                                            <AssetSubCategoryOptions assetId={category_id} />
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row px-2 my-2">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Product Name
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            placeholder='Product Name'
                                            name={'product_name'}
                                            value={product_name}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.product_name) && 'is-invalid'}`} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Product Code
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            placeholder='Product Code'
                                            name={'product_code'}
                                            value={product_code}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.product_code) && 'is-invalid'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row px-2">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Brand
                                    </div>
                                    <div className="col-md-8 ui-checkbox d-flex align-items-center">
                                        <select name={'brand_id'} value={brand_id} onChange={this.handleChange} className={`form-control ${(errorDict && !errorDict.brand_id) && 'is-invalid'}`}>
                                            <option>--Select Brand--</option>
                                            <BrandIdOptions />
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Model
                                    </div>
                                    <div className="col-md-8 ui-checkbox d-flex align-items-center">
                                        <select name={'model_id'} value={model_id} onChange={this.handleChange} className={`form-control ${(errorDict && !errorDict.model_id) && 'is-invalid'}`}>
                                            <option>--Select Model--</option>
                                            <ModelIdOptions />
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            {editId === null ? <button className="btn btn-outline-info mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Products</button> : <>
                                <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mt-3 mr-2" onClick={this.updateData}>Update Products</button>
                                <button className="btn btn-outline-danger mt-3" onClick={() => {
                                    this.setState({
                                        editId: null,
                                        error: false,
                                        product_name: '',
                                        product_code: '',
                                        description: '',
                                    }, () => {
                                        this.validate()
                                    })}}>Go Back</button>
                            </>}
                        </div>
                    </div>
                )
            case 'MODELS':
                return(
                    <div className={`rounded p-3 my-2`}>
                        <div className="row px-2">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-4">
                                        Models
                                    </div>
                                    <div className="col-md-8 ui-checkbox d-flex align-items-center">
                                        <input
                                            placeholder='Models'
                                            type={'text'}
                                            name={'model'}
                                            value={model}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.model) && 'is-invalid'}`}  />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                {editId === null ? <button className="btn btn-outline-info" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Model</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mr-2" onClick={this.updateData}>Update Model</button>
                                    <button className="btn btn-outline-danger" onClick={() => {
                                        this.setState({
                                            editId: null,
                                            model: '',
                                        }, () => {
                                            this.validate()
                                        })}}>Go Back</button>
                                </>}
                            </div>
                        </div>
                    </div>
                )
            case 'BRANDS':
                return(
                    <div className={`rounded p-3 my-2`}>
                        <div className="row px-2">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-4">
                                        Brand
                                    </div>
                                    <div className="col-md-8 ui-checkbox d-flex align-items-center">
                                        <input
                                            placeholder='Brands'
                                            type={'text'}
                                            name={'brand'}
                                            value={brand}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.brand) && 'is-invalid'}`}  />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                {editId === null ? <button className="btn btn-outline-info" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Brand</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mr-2" onClick={this.updateData}>Update Brand</button>
                                    <button className="btn btn-outline-danger" onClick={() => {
                                        this.setState({
                                            editId: null,
                                            brand: '',
                                        }, () => {
                                            this.validate()
                                        })}}>Go Back</button>
                                </>}
                            </div>
                        </div>
                    </div>
                )
            case 'CONDITIONS':
                return(
                    <div className={`rounded p-3 my-2`}>
                        <div className="row px-2">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-4">
                                        Condition Type
                                    </div>
                                    <div className="col-md-8 ui-checkbox d-flex align-items-center">
                                        <input
                                            placeholder='Condition Type'
                                            type={'text'}
                                            name={'condition_type'}
                                            value={condition_type}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.condition_type) && 'is-invalid'}`}  />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                {editId === null ? <button className="btn btn-outline-info" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Condition</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mr-2" onClick={this.updateData}>Update Condition</button>
                                    <button className="btn btn-outline-danger" onClick={() => {
                                        this.setState({
                                            editId: null,
                                            condition_type: '',
                                        }, () => {
                                            this.validate()
                                        })}}>Go Back</button>
                                </>}
                            </div>
                        </div>
                    </div>
                )
            case 'DEPMETHOD':
                return(
                    <div className={`rounded p-3 my-2`}>
                        <div className="row px-2">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Method Name
                                    </div>
                                    <div className="col-md-8 ui-checkbox d-flex align-items-center">
                                        <input
                                            placeholder='Method Name'
                                            type={'text'}
                                            name={'method_name'}
                                            value={method_name}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.method_name) && 'is-invalid'}`}  />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Depreciation Code
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            placeholder='Depreciation Code'
                                            type={'text'}
                                            name={'depreciation_code'}
                                            value={depreciation_code}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.depreciation_code) && 'is-invalid'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row px-2 my-2">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Description
                                    </div>
                                    <div className="col-md-8">
                                        <textarea
                                            placeholder='Description'
                                            name={'description'}
                                            value={description}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.description) && 'is-invalid'}`} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                {editId === null ? <button className="btn btn-outline-info mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Method</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mt-3 mr-2" onClick={this.updateData}>Update Method</button>
                                    <button className="btn btn-outline-danger mt-3" onClick={() => {
                                        this.setState({
                                            editId: null,
                                            depreciation_code: '',
                                            method_name: '',
                                            description: '',
                                        }, () => {
                                            this.validate()
                                        })}}>Go Back</button>
                                </>}
                            </div>
                        </div>
                    </div>
                )
            case 'ASSETTYPES':
                return(
                    <div className={`rounded p-3 my-2`}>
                        <div className="row px-2">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Type Name
                                    </div>
                                    <div className="col-md-8 ui-checkbox d-flex align-items-center">
                                        <input
                                            placeholder='Type Name'
                                            type={'text'}
                                            name={'type_name'}
                                            value={type_name}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.type_name) && 'is-invalid'}`}  />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Asset Code
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            placeholder='Asset Code'
                                            type={'text'}
                                            name={'asset_code'}
                                            value={asset_code}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.asset_code) && 'is-invalid'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row px-2 my-2">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Description
                                    </div>
                                    <div className="col-md-8">
                                        <textarea
                                            placeholder='Description'
                                            name={'description'}
                                            value={description}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.description) && 'is-invalid'}`} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                {editId === null ? <button className="btn btn-outline-info mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Asset Type</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mt-3 mr-2" onClick={this.updateData}>Update Asset Type</button>
                                    <button className="btn btn-outline-danger mt-3" onClick={() => {
                                        this.setState({
                                            editId: null,
                                            asset_code: '',
                                            type_name: '',
                                            description: '',
                                        }, () => {
                                            this.validate()
                                        })}}>Go Back</button>
                                </>}
                            </div>
                        </div>
                    </div>
                )
            case 'ASSETCATEGORY':
                return(
                    <div className={`rounded p-3 my-2`}>
                        <div className="row px-2">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Category Name
                                    </div>
                                    <div className="col-md-8 ui-checkbox d-flex align-items-center">
                                        <input
                                            placeholder='Category Name'
                                            type={'text'}
                                            name={'category_name'}
                                            value={category_name}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.category_name) && 'is-invalid'}`}  />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Category Code
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            placeholder='Category Code'
                                            type={'text'}
                                            name={'category_code'}
                                            value={category_code}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.category_code) && 'is-invalid'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row px-2 my-2">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Description
                                    </div>
                                    <div className="col-md-8">
                                        <textarea
                                            placeholder='Description'
                                            name={'description'}
                                            value={description}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.description) && 'is-invalid'}`} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                {editId === null ? <button className="btn btn-outline-info mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Category</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mt-3 mr-2" onClick={this.updateData}>Update Category</button>
                                    <button className="btn btn-outline-danger mt-3" onClick={() => {
                                        this.setState({
                                            editId: null,
                                            category_name: '',
                                            category_code: '',
                                            description: '',
                                        }, () => {
                                            this.validate()
                                        })}}>Go Back</button>
                                </>}
                            </div>
                        </div>
                    </div>
                )
            case 'ASSETSUBCATEGORY':
                return(
                    <div className={`rounded p-3 my-2`}>
                        <div className="row px-2">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Category
                                    </div>
                                    <div className="col-md-8 ui-checkbox d-flex align-items-center">
                                        <select name={'category_id'} value={category_id} onChange={this.handleChange} className={`form-control ${(errorDict && !errorDict.category_id) && 'is-invalid'}`}>
                                            <option>--Select Category--</option>
                                            <AssetCategoryOptions assetId={category_id}/>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Sub Category Name
                                    </div>
                                    <div className="col-md-8 ui-checkbox d-flex align-items-center">
                                        <input
                                            placeholder='Sub Category Name'
                                            type={'text'}
                                            name={'sub_category_name'}
                                            value={sub_category_name}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.sub_category_name) && 'is-invalid'}`}  />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row px-2 mt-3">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Sub Category Code
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            placeholder='Sub Category Code'
                                            type={'text'}
                                            name={'sub_category_code'}
                                            value={sub_category_code}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.sub_category_code) && 'is-invalid'}`} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Description
                                    </div>
                                    <div className="col-md-8">
                                        <textarea
                                            placeholder='Description'
                                            name={'description'}
                                            value={description}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.description) && 'is-invalid'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            {editId === null ? <button className="btn btn-outline-info mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Sub Category</button> : <>
                                <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mt-3 mr-2" onClick={this.updateData}>Update Sub Category</button>
                                <button className="btn btn-outline-danger mt-3" onClick={() => {
                                    this.setState({
                                        editId: null,
                                        error: false,
                                        sub_category_code: '',
                                        sub_category_name: '',
                                        description: '',
                                    }, () => {
                                        this.validate()
                                    })}}>Go Back</button>
                            </>}
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    validate = () => {
        let errorDict = {}
        const {formType} = this.props
        const {vendor_name, file_name, description, project_name, project_code, model, brand, category_code,category_name, sub_category_name,
            category_id, sub_category_code, sub_category_id, product_name, product_code, brand_id, model_id, depreciation_code, method_name,
            type_name, asset_code, condition_type} = this.state
        switch (formType){
            case "PROJECT":
                errorDict = {
                    description: description !== '',
                    project_name: project_name !== '',
                    project_code: project_code !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "DEPMETHOD":
                errorDict = {
                    depreciation_code: depreciation_code !== '',
                    method_name: method_name !== '',
                    description: description !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "ASSETTYPES":
                errorDict = {
                    asset_code: asset_code !== '',
                    type_name: type_name !== '',
                    description: description !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "PRODUCTS":
                errorDict = {
                    brand_id: brand_id !== '',
                    model_id: model_id !== '',
                    category_id: category_id !== '',
                    product_name: product_name !== '',
                    product_code: product_code !== '',
                    sub_category_id: sub_category_id !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "VENDOR":
                errorDict = {
                    file_name: file_name !== '',
                    vendor_name: vendor_name !== '',
                    description: description !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "MODELS":
                errorDict = {
                    model: model !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "CONDITIONS":
                errorDict = {
                    condition_type: condition_type !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "BRANDS":
                errorDict = {
                    brand: brand !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "ASSETCATEGORY":
                errorDict = {
                    description: description !== '',
                    category_name: category_name !== '',
                    category_code: category_code !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "ASSETSUBCATEGORY":
                errorDict = {
                    description: description !== '',
                    category_id: category_id !== '',
                    sub_category_name: sub_category_name !== '',
                    sub_category_code: sub_category_code !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            default:
                return null
        }
    }

    getApiData = () => {
        const {formType} = this.props
        const {vendor_name, file_name, description, project_name, project_code, enlisted, model, brand, category_code,category_name, sub_category_name,
            category_id, sub_category_code, sub_category_id, product_name,product_code, brand_id, model_id, depreciation_code, method_name,
            type_name, asset_code, condition_type} = this.state
        switch (formType){
            case "VENDOR":
                let data = new FormData()
                data.append('file', file_name)
                data.append('vendor_name', vendor_name)
                data.append('description', description)
                data.append('enlisted', enlisted)
                return data
            case "PROJECT":
                return({
                    project_name,
                    project_code,
                    description
                })
            case "DEPMETHOD":
                return({
                    depreciation_code,
                    method_name,
                    description
                })
            case "ASSETTYPES":
                return({description, type_name, asset_code,})
            case "PRODUCTS":
                return({
                    category_id,
                    sub_category_id,
                    product_name,
                    product_code,
                    brand_id,
                    model_id
                })
            case "MODELS":
                return({
                    model
                })
            case "CONDITIONS":
                return({condition_type})
            case "BRANDS":
                return({
                    brand
                })
            case "ASSETCATEGORY":
                return({category_code,category_name,description})
            case "ASSETSUBCATEGORY":
                return({sub_category_name,category_id, sub_category_code,description})
            default:
                return null
        }
    }

    render() {
        const {getApi} = this.props
        const {error, errorMessage, isLoading, allProjects, editId} = this.state
        return (
            <div className="px-2 my-2">
                {error && <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>}
                <div className={`bg-white rounded p-2 my-2 ${editId !== null && 'shadow'}`}>
                    {this.renderForm()}
                </div>
                <div className={'bg-white rounded p-2 my-2'}>
                    <nav className="navbar text-center mb-2 pl-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0">Projects List</p>
                    </nav>
                    {isLoading ? <h2>Loading</h2> : allProjects.length > 0 ? <>
                        <ReactDataTable
                            edit
                            isLoading
                            pagination
                            searchable
                            del={getApi}
                            tableData={allProjects}
                            updateEdit={this.updateEdit}
                        />
                    </> : <h4>Currently There are No Projects</h4>}
                </div>
            </div>
        );
    }
}

export default AdminInputContainer;