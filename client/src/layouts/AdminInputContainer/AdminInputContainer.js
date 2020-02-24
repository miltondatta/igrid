import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import AssetCategoryOptions from "../../utility/component/assetCategoryOptions";
import AssetSubCategoryOptions from "../../utility/component/assetSubCategoryOptions";
import BrandIdOptions from "../../utility/component/brandIdOptions";
import ModelIdOptions from "../../utility/component/modelIdOptions";
import LocationsOptions from "../../utility/component/locationOptions";
import HierarchiesOptions from "../../utility/component/hierarchyOptions";
import ModuleOptions from "../../utility/component/moduleOptions";
import UserRoleOptions from "../../utility/component/userRoleOptions";
import UserOptions from "../../utility/component/userOptions";
import ApproveLevelOptions from "../../utility/component/approveLevelOptions";

class AdminInputContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            allProjects: [],
            locationHolder: [],
            model: '',
            brand: '',
            parent_id: 0,
            location_id: 0,
            module_id: 0,
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
            order_by: '',
            product_name: '',
            depreciation_code: '',
            method_name: '',
            product_code: '',
            sub_category_id: '',
            sub_category_name: '',
            sub_category_code: '',
            hierarchy_name: '',
            editId: null,
            errorDict: null,
            error: false,
            success: false,
            enlisted: false,
            isLoading: false,
        }
    }
    
    handleSubmit = () => {
        const {getApi} = this.props
        console.log(this.getApiData(), 50)
        if (Object.values(this.validate()).includes(false)) {
            return
        }
        Axios.post(apiUrl() + getApi + '/entry', this.getApiData())
            .then(res => {
                console.log(res)
                if(!res.data.status){
                    this.setState({
                        error: true,
                        errorMessage: res.data.message
                    })
                } else {
                    this.setState({
                        success: true,
                        successMessage: res.data.message,
                        error: false,
                        model: '',
                        brand: '',
                        file_name: '',
                        description: '',
                        vendor_name: '',
                        project_name: '',
                        project_code: '',
                        category_name: '',
                        user_id: '',
                        category_code: '',
                        location_id: '',
                        parent_location_id: '',
                        role_id: '',
                        module_id: '',
                        locationHolder: [],
                        sub_category_name: '',
                        sub_category_code: '',
                        enlisted: false
                    }, () => {
                        window.location.reload()
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
                    if(res.data.message){
                        this.setState({
                            error: true,
                            errorMessage: res.data.message,
                            isLoading: false
                        })
                    } else {
                        this.setState({
                            allProjects: res.data,
                            isLoading: false
                        })
                    }
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
                        console.log(val, 144)
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
                if(!resData.data.status){
                    this.setState({
                        error: true,
                        errorMessage: resData.data.message
                    })
                } else {
                    this.setState({
                        success: true,
                        successMessage: resData.data.message,
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
        const {name, value, checked, files, location_id} = e.target
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
        } else if(name === 'location_id'){
            this.setState({
                [name]: value
            }, () => {
                this.validate()
                this.locationApi(value)
            })
        } else if(name === 'parent_id') {
            this.setState({
                [name]: value
            }, () => {
                this.locationApi(value)
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

    locationApi = (id) => {
        Axios.get(apiUrl() + 'locations/' + id)
            .then(resData => {
                if(resData.data.length > 0) {
                    this.setState({
                        locationHolder: [resData.data, ...this.state.locationHolder]
                    })
                }
            })
    }

    renderForm = () => {
        const {formType} = this.props
        const {project_name, project_code, vendor_name, file_name, description, editId, errorDict, enlisted, model, brand, hierarchy_name, parent_id, image_name,
            category_code,category_name, sub_category_code, sub_category_name, category_id, sub_category_id, product_name,product_code, location_code, order_by,
            brand_id, model_id, depreciation_code, method_name, type_name, asset_code, condition_type, location_name, hierarchy, role_desc, role_name, module_id,
            module_name, initial_link, user_id, location_id, role_id, locationHolder, parent_location_id, location_heirarchy_id} = this.state

        switch (formType){
            case 'VENDOR':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Vendor Name'
                                type={'text'}
                                name={'vendor_name'}
                                value={vendor_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.vendor_name) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-2">
                            <textarea
                                placeholder={'Description'}
                                id={'enCh1'}
                                name={'description'}
                                value={description}
                                className={`ui-custom-textarea ${(errorDict && !errorDict.description) && 'is-invalid'}`}
                                onChange={this.handleChange} />
                        </div>
                        <div className="px-1 mb-20p grid-2">
                            <div className="ui-custom-file">
                                <input type="file" onChange={this.handleChange} name={'file_name'} id="validatedCustomFile"
                                       required />
                                <label htmlFor="validatedCustomFile">{file_name.name ? file_name.name : file_name ? file_name : 'Choose file'}</label>
                            </div>
                            <div className="d-flex justify-content-center align-items-center ui-custom-checkbox">
                                <input
                                    type={'checkbox'}
                                    checked={enlisted}
                                    id={'customCheckbox'}
                                    name={'enlisted'}
                                    value={vendor_name}
                                    onChange={this.handleChange} />
                                <label htmlFor="customCheckbox" className={'mb-0'}>Enlisted</label>
                            </div>
                        </div>
                        {editId === null ? <button className="submit-btn" onClick={this.handleSubmit}>Submit Vendor</button> : <>
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
                    </>
                )
            case 'PROJECT':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Project Name'
                                type={'text'}
                                name={'project_name'}
                                value={project_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.project_name) && 'is-invalid'}`}  />
                        </div>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Project Code'
                                type={'text'}
                                name={'project_code'}
                                value={project_code}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.project_code) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-20p">
                            <textarea
                                placeholder='Description'
                                name={'description'}
                                value={description}
                                onChange={this.handleChange}
                                className={`ui-custom-textarea ${(errorDict && !errorDict.description) && 'is-invalid'}`} />
                        </div>
                        {editId === null ? <button className="submit-btn" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Project</button> : <>
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
                    </>
                )
            case 'USERAPPROVAL':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <select name={'location_heirarchy_id'} value={location_heirarchy_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.location_heirarchy_id) && 'is-invalid'}`}>
                                <option>Select Location</option>
                                <HierarchiesOptions />
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <select name={'role_id'} value={role_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.role_id) && 'is-invalid'}`}>
                                <option>Select User Role</option>
                                <UserRoleOptions />
                            </select>
                        </div>
                        <div className="px-1 mb-20p">
                            <select name={'parent_id'} value={parent_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.parent_id) && 'is-invalid'}`}>
                                <option>Select Parent</option>
                                <ApproveLevelOptions />
                            </select>
                        </div>
                        {editId === null ? <button className="submit-btn" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Project</button> : <>
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
                    </>
                )
            case 'PRODUCTS':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <select name={'category_id'} value={category_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.category_id) && 'is-invalid'}`}>
                                <option>Select Category</option>
                                <AssetCategoryOptions />
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <select name={'sub_category_id'} value={sub_category_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.sub_category_id) && 'is-invalid'}`}>
                                <option>Select Category</option>
                                <AssetSubCategoryOptions assetId={category_id} />
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Product Name'
                                name={'product_name'}
                                value={product_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.product_name) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Product Code'
                                name={'product_code'}
                                value={product_code}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.product_code) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-2">
                            <select name={'brand_id'} value={brand_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.brand_id) && 'is-invalid'}`}>
                                <option>Select Brand</option>
                                <BrandIdOptions />
                            </select>
                        </div>
                        <div className="px-1 mb-20p">
                            <select name={'model_id'} value={model_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.model_id) && 'is-invalid'}`}>
                                <option>Select Model</option>
                                <ModelIdOptions />
                            </select>
                        </div>
                        {editId === null ? <button className="submit-btn" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Product</button> : <>
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
                    </>
                )
            case 'MODELS':
                return(
                    <>
                            <div className="px-1 mb-2">
                                <input
                                    placeholder='Models'
                                    type={'text'}
                                    name={'model'}
                                    value={model}
                                    onChange={this.handleChange}
                                    className={`form-control ${(errorDict && !errorDict.model) && 'is-invalid'}`}  />
                            </div>
                            {editId === null ? <button className="submit-btn" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Model</button> : <div>
                                <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mr-2" onClick={this.updateData}>Update Model</button>
                                <button className="btn btn-outline-danger" onClick={() => {
                                    this.setState({
                                        editId: null,
                                        model: '',
                                    }, () => {
                                        this.validate()
                                    })}}>Go Back</button>
                            </div>}
                    </>
                )
            case 'BRANDS':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Brands'
                                type={'text'}
                                name={'brand'}
                                value={brand}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.brand) && 'is-invalid'}`}  />
                        </div>
                        {editId === null ? <button className="submit-btn" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Brand</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mr-2" onClick={this.updateData}>Update Brand</button>
                                    <button className="btn btn-outline-danger" onClick={() => {
                                        this.setState({
                                            editId: null,
                                            brand: '',
                                        }, () => {
                                            this.validate()
                                        })}}>Go Back</button>
                                </>}
                    </>
                )
            case 'CONDITIONS':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Condition Type'
                                type={'text'}
                                name={'condition_type'}
                                value={condition_type}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.condition_type) && 'is-invalid'}`}  />
                        </div>
                        {editId === null ? <button className="submit-btn" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Condition</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mr-2" onClick={this.updateData}>Update Condition</button>
                                    <button className="btn btn-outline-danger" onClick={() => {
                                        this.setState({
                                            editId: null,
                                            condition_type: '',
                                        }, () => {
                                            this.validate()
                                        })}}>Go Back</button>
                                </>}
                    </>
                )
            case 'LOCHIERARCHY':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Hierarchy Name'
                                type={'text'}
                                name={'hierarchy_name'}
                                value={hierarchy_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.hierarchy_name) && 'is-invalid'}`}  />
                        </div>
                        {editId === null ? <button className="submit-btn" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Hierarchy</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mr-2" onClick={this.updateData}>Update Condition</button>
                                    <button className="btn btn-outline-danger" onClick={() => {
                                        this.setState({
                                            editId: null,
                                            hierarchy_name: '',
                                        }, () => {
                                            this.validate()
                                        })}}>Go Back</button>
                                </>}
                    </>
                )
            case 'DEPMETHOD':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Method Name'
                                type={'text'}
                                name={'method_name'}
                                value={method_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.method_name) && 'is-invalid'}`}  />
                        </div>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Depreciation Code'
                                type={'text'}
                                name={'depreciation_code'}
                                value={depreciation_code}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.depreciation_code) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-20p">
                            <textarea
                                placeholder='Description'
                                name={'description'}
                                value={description}
                                onChange={this.handleChange}
                                className={`ui-custom-textarea ${(errorDict && !errorDict.description) && 'is-invalid'}`} />
                        </div>
                        {editId === null ? <button className="submit-btn" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Method</button> : <>
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
                    </>
                )
            case 'ASSETTYPES':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Type Name'
                                type={'text'}
                                name={'type_name'}
                                value={type_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.type_name) && 'is-invalid'}`}  />
                        </div>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Asset Code'
                                type={'text'}
                                name={'asset_code'}
                                value={asset_code}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.asset_code) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-20p">
                            <textarea
                                placeholder='Description'
                                name={'description'}
                                value={description}
                                onChange={this.handleChange}
                                className={`ui-custom-textarea ${(errorDict && !errorDict.description) && 'is-invalid'}`} />
                        </div>
                        {editId === null ? <button className="submit-btn" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Asset Type</button> : <>
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
                    </>
                )
            case 'ASSETCATEGORY':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Category Name'
                                type={'text'}
                                name={'category_name'}
                                value={category_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.category_name) && 'is-invalid'}`}  />
                        </div>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Category Code'
                                type={'text'}
                                name={'category_code'}
                                value={category_code}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.category_code) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-20p">
                            <textarea
                                placeholder='Description'
                                name={'description'}
                                value={description}
                                onChange={this.handleChange}
                                className={`ui-custom-textarea ${(errorDict && !errorDict.description) && 'is-invalid'}`} />
                        </div>
                        {editId === null ? <button className="submit-btn" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Category</button> : <>
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
                    </>
                )
            case 'ASSETSUBCATEGORY':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <select name={'category_id'} value={category_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.category_id) && 'is-invalid'}`}>
                                <option>Select Category</option>
                                <AssetCategoryOptions assetId={category_id}/>
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Sub Category Name'
                                type={'text'}
                                name={'sub_category_name'}
                                value={sub_category_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.sub_category_name) && 'is-invalid'}`}  />
                        </div>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Sub Category Code'
                                type={'text'}
                                name={'sub_category_code'}
                                value={sub_category_code}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.sub_category_code) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-20p">
                            <textarea
                                placeholder='Description'
                                name={'description'}
                                value={description}
                                onChange={this.handleChange}
                                className={`ui-custom-textarea ${(errorDict && !errorDict.description) && 'is-invalid'}`} />
                        </div>
                        {editId === null ? <button className="submit-btn" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Sub Category</button> : <>
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
                    </>
                )
            case 'LOCATIONS':
                let subLoc = locationHolder.length > 0 && locationHolder.map((item, index) => (
                    <div className="px-1 mb-2">
                        <select name={'parent_id'} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.location_id) && 'is-invalid'}`}>
                            <option>Select Sub Location</option>
                            <LocationsOptions selectedId={item[index].parent_id} />
                        </select>
                    </div>
                ))
                return(
                    <>
                            <div className="px-1 mb-2">
                                <input
                                    placeholder='Location Name'
                                    type={'text'}
                                    name={'location_name'}
                                    value={location_name}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input ${(errorDict && !errorDict.location_name) && 'is-invalid'}`} />
                            </div>
                            <div className="px-1 mb-2">
                                <input
                                    placeholder='Location Code'
                                    type={'text'}
                                    name={'location_code'}
                                    value={location_code}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input ${(errorDict && !errorDict.location_code) && 'is-invalid'}`} />
                            </div>
                            <div className="px-1 mb-2">
                                <select name={'parent_id'} value={parent_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.parent_id) && 'is-invalid'}`}>
                                    <option value={0}>Select Parent</option>
                                    <LocationsOptions selectedId={parent_id} />
                                </select>
                            </div>
                            {subLoc}
                            <div className="px-1 mb-20p">
                                <select name={'hierarchy'} value={hierarchy} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.hierarchy) && 'is-invalid'}`}>
                                    <option>Select Hierarchy</option>
                                    <HierarchiesOptions />
                                </select>
                            </div>
                        {editId === null ? <button className="submit-btn" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Location</button> : <>
                                <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mt-3 mr-2" onClick={this.updateData}>Update Locations</button>
                                <button className="btn btn-outline-danger mt-3" onClick={() => {
                                    this.setState({
                                        editId: null,
                                        error: false,
                                        location_name: '',
                                        location_code: '',
                                        parent_id: '',
                                        hierarchy: '',
                                    }, () => {
                                        this.validate()
                                    })}}>Go Back</button>
                            </>}

                    </>
                )
            case 'USERROLES':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Role Name'
                                type={'text'}
                                name={'role_name'}
                                value={role_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.role_name) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Role Description'
                                type={'text'}
                                name={'role_desc'}
                                value={role_desc}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.role_desc) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-20p">
                            <select name={'module_id'} value={module_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.module_id) && 'is-invalid'}`}>
                                <option>Select Module</option>
                                <ModuleOptions />
                            </select>
                        </div>
                        {editId === null ? <button className="submit-btn" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Role</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mt-3 mr-2" onClick={this.updateData}>Update Role</button>
                                    <button className="btn btn-outline-danger mt-3" onClick={() => {
                                        this.setState({
                                            editId: null,
                                            error: false,
                                            role_desc: '',
                                            role_name: '',
                                            module_id: ''
                                        }, () => {
                                            this.validate()
                                        })}}>Go Back</button>
                                </>}
                    </>
                )
            case 'MODULE':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Module Name'
                                type={'text'}
                                name={'module_name'}
                                value={module_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.module_name) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-2">
                            <input
                                placeholder='Initial Link'
                                type={'text'}
                                name={'initial_link'}
                                value={initial_link}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.initial_link) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-2">
                            <select name={'order_by'} value={order_by} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.order_by) && 'is-invalid'}`}>
                                <option>Select Options</option>
                                <option value={1}>Ascending</option>
                                <option value={2}>Descending</option>
                            </select>
                        </div>
                        <div className="ui-custom-file w-50 px-1 mb-20p">
                            <input type="file" name={'file_name'} onChange={this.handleChange} id="validatedCustomFile"
                                   required />
                            <label htmlFor="validatedCustomFile">{image_name ? image_name : 'Choose file...'}</label>
                        </div>
                        {editId === null ? <button className="submit-btn" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Module</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mt-3 mr-2" onClick={this.updateData}>Update Module</button>
                                    <button className="btn btn-outline-danger mt-3" onClick={() => {
                                        this.setState({
                                            editId: null,
                                            error: false,
                                            order_by: '',
                                            initial_link: '',
                                            module_name: '',
                                            image_name: ''
                                        }, () => {
                                            this.validate()
                                        })}}>Go Back</button>
                                </>}
                    </>
                )
            case 'USERASSOCIATE':
                let subLocation = locationHolder.length > 0 && locationHolder.map((item, index) => (
                    <div className="px-1 mb-2">
                            <select name={'location_id'} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.location_id) && 'is-invalid'}`}>
                                <option>Select Sub Location</option>
                                <LocationsOptions selectedId={item[index].parent_id} />
                            </select>
                    </div>
                ))
                return(
                    <>
                        <div className="px-1 mb-2">
                            <select name={'user_id'} value={user_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.user_id) && 'is-invalid'}`}>
                                <option>Select User</option>
                                <UserOptions />
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <select name={'module_id'} value={module_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.module_id) && 'is-invalid'}`}>
                                <option>Select Module</option>
                                <ModuleOptions />
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <select name={'location_id'} value={parent_location_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.location_id) && 'is-invalid'}`}>
                                <option>Select Location</option>
                                <LocationsOptions selectedId={location_id} />
                            </select>
                        </div>
                        {subLocation}
                        <div className="px-1 mb-20p">
                            <select name={'role_id'} value={role_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.role_id) && 'is-invalid'}`}>
                                <option>Select Role</option>
                                <UserRoleOptions />
                            </select>
                        </div>
                        {editId === null ? <button className="submit-btn" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Role</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="btn btn-outline-info mt-3 mr-2" onClick={this.updateData}>Update Module</button>
                                    <button className="btn btn-outline-danger mt-3" onClick={() => {
                                        this.setState({
                                            editId: null,
                                            error: false,
                                            user_id: '',
                                            location_id: '',
                                            role_id: '',
                                            module_id: ''
                                        }, () => {
                                            this.validate()
                                        })}}>Go Back</button>
                                </>}
                    </>
                )
            default:
                return null
        }
    }

    validate = () => {
        let errorDict = {}
        const {formType} = this.props
        const {vendor_name, file_name, description, project_name, project_code, model, brand, category_code,category_name, sub_category_name, order_by,
            category_id, sub_category_code, sub_category_id, product_name, product_code, brand_id, model_id, depreciation_code, method_name,  module_name, initial_link,
            type_name, asset_code, condition_type, hierarchy_name, hierarchy, parent_id, location_code, location_name, role_desc, role_name, module_id,
            user_id, location_id, role_id, location_heirarchy_id} = this.state
        switch (formType){
            case "USERROLES":
                errorDict = {
                    role_desc: role_desc !== '',
                    role_name: role_name !== '',
                    module_id: module_id !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
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
            case "USERAPPROVAL":
                errorDict = {
                    location_heirarchy_id: location_heirarchy_id !== '',
                    role_id: role_id !== '',
                    parent_id: parent_id !== '',
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
            case "LOCHIERARCHY":
                errorDict = {
                    hierarchy_name: hierarchy_name !== '',
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
            case "LOCATIONS":
                errorDict = {
                    hierarchy: hierarchy !== '',
                    parent_id: parent_id !== '',
                    location_code: location_code !== '',
                    location_name: location_name !== '',
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
            case "MODULE":
                errorDict = {
                    module_name: module_name !== '',
                    initial_link: initial_link !== '',
                    order_by: order_by !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "USERASSOCIATE":
                errorDict = {
                    user_id: user_id !== '',
                    location_id: location_id !== '',
                    role_id: role_id !== '',
                    module_id: module_id !== '',
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
        let data = null
        const {formType} = this.props
        const {vendor_name, file_name, description, project_name, project_code, enlisted, model, brand, category_code,category_name, sub_category_name, order_by,
            category_id, sub_category_code, sub_category_id, product_name,product_code, brand_id, model_id, depreciation_code, method_name, module_name, initial_link,
            type_name, asset_code, condition_type, hierarchy_name, hierarchy, parent_id, location_code, location_name, role_desc, role_name, module_id, image_name,
            user_id, location_id, role_id, location_heirarchy_id} = this.state
        switch (formType){
            case "USERROLES":
                return ({role_desc, role_name, module_id})
            case "VENDOR":
                data = new FormData()
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
            case "USERAPPROVAL":
                return({
                    location_heirarchy_id,
                    role_id,
                    parent_id
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
            case "LOCHIERARCHY":
                return({hierarchy_name})
            case "BRANDS":
                return({
                    brand
                })
            case "LOCATIONS":
                return({hierarchy, parent_id, location_code, location_name})
            case "ASSETCATEGORY":
                return({category_code,category_name,description})
            case "USERASSOCIATE":
                return({user_id, location_id, role_id, module_id})
            case "ASSETSUBCATEGORY":
                return({sub_category_name,category_id, sub_category_code,description})
            case "MODULE":
                data = new FormData()
                file_name && data.append('file', file_name);
                !file_name && data.append('image_name', image_name);
                data.append('module_name', module_name);
                data.append('initial_link', initial_link);
                data.append('order_by', order_by);
                return data
            default:
                return null
        }
    }

    render() {
        const {getApi, title, headTitle} = this.props
        const {error, errorMessage, isLoading, allProjects, success, successMessage} = this.state
        return (
            <>
                {error && <div className="alert alert-danger mx-2 my-2 position-relative d-flex justify-content-between align-items-center  " role="alert">
                    {errorMessage}  <i className="fas fa-times " onClick={() => {this.setState({error: false})}}></i>
                </div>}
                {success &&
                <div className="alert alert-success mx-2 my-2 position-relative d-flex justify-content-between align-items-center"
                    role="alert">
                    {successMessage} <i className="fas fa-times " onClick={() => {
                    this.setState({success: false})
                }}></i>
                </div>}
                <div className="px-2 my-2 ui-dataEntry">
                    <div className={`bg-white rounded p-2 min-h-80vh position-relative`}>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">{headTitle}</p>
                        </nav>
                        {this.renderForm()}
                    </div>
                    <div className="rounded bg-white min-h-80vh">
                        <nav className="navbar text-center mb-2 pl-3 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">{title}</p>
                        </nav>
                        {isLoading ? <h2>Loading</h2> : allProjects.length > 0 ? <>
                            <ReactDataTable
                                edit
                                dataDisplay
                                footer
                                isLoading
                                pagination
                                searchable

                                deleteModalTitle={title}
                                del={getApi}
                                tableData={allProjects}
                                updateEdit={this.updateEdit}
                            />
                        </> : <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> Currently There are No {title}</h4>}
                    </div>
                </div>
            </>
        );
    }
}

export default AdminInputContainer;