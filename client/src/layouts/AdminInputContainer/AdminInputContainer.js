import Axios from "axios";
import './adminInputContainer.css'
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";

import AssetCategoryOptions from "../../utility/component/assetCategoryOptions";
import AssetSubCategoryOptions from "../../utility/component/assetSubCategoryOptions";
import BrandIdOptions from "../../utility/component/brandIdOptions";
import ModelIdOptions from "../../utility/component/modelIdOptions";
import LocationsOptions from "../../utility/component/locationOptions";
import HierarchiesOptions from "../../utility/component/hierarchyOptions";
import UserRoleOptions from "../../utility/component/userRoleOptions";
import UserOptions from "../../utility/component/userOptions";
import ApproveLevelOptions from "../../utility/component/approveLevelOptions";
import ComCategoryOptions from "../../utility/component/comCategoryOption";
import ComSubCategoryOptions from "../../utility/component/comSubCategoryOptions";
import jwt from "jsonwebtoken";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";
import {getFileExtension} from "../../utility/custom";
import Spinner from "../Spinner";
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";

class AdminInputContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            allProjects: [],
            locationHolder: [],
            dataTableData: [],
            model: '',
            brand: '',
            parent_id: 0,
            location_id: 0,
            module_id: 0,
            file_name: null,
            file_name_all: null,
            category_id: '',
            description: '',
            vendor_name: '',
            project_name: '',
            project_code: '',
            category_name: '',
            category_code: '',
            asset_code: '',
            type_name: '',
            order_by: 0,
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
            complaint_status: false,
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
                if(!res.data.status){
                    this.setState({
                        error: true,
                        errorMessage: res.data.message
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
        if (this.props.formType === 'COMPLAINT') {
            const {id} = jwt.decode(localStorage.getItem('user')).data;
            this.setState({
                isLoading: true
            }, () => {
                Axios.get(apiUrl() + getApi + '/' + id)
                    .then(res => {
                        if(res.data.message){
                            this.setState({
                                error: true,
                                errorMessage: res.data.message,
                                isLoading: false
                            }, () => {
                                setTimeout(() => {
                                    this.setState({
                                        error: false,
                                    })
                                }, 2300)
                            })
                        } else {
                            this.setState({
                                allProjects: res.data,
                                isLoading: false
                            }, () => {
                                this.filterData()
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        } else {
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
                            }, () => {
                                setTimeout(() => {
                                    this.setState({
                                        error: false,
                                    })
                                }, 2300)
                            })
                        } else {
                            this.setState({
                                allProjects: res.data,
                                isLoading: false
                            }, () => {
                                this.filterData()
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        }
    }

    filterData = () => {
        let dataTableData = []
        const {formType} = this.props
        const {allProjects} = this.state

        switch (formType) {
            case "ASSETSUBCATEGORY":
                allProjects.map((items, key) => {
                        let obj = {}
                        Object.keys(items).forEach(item => {
                            if (item !== 'category_id') {
                                obj[item] = items[item]
                            }
                        })
                        dataTableData.push(obj)
                }, {})
                this.setState({
                    dataTableData,
                })
                break;
            case 'VENDOR':
                dataTableData = allProjects
                this.setState({
                    dataTableData,
                })
                break;
            case 'AMCTYPES':
                dataTableData = allProjects
                this.setState({
                    dataTableData,
                })
                break;
            case 'PROJECT':
                dataTableData = allProjects
                this.setState({
                    dataTableData,
                })
                break;
            case 'USERAPPROVAL':
                allProjects.map((items, key) => {
                    let obj = {}
                    Object.keys(items).forEach(item => {
                        console.log(item, 283)
                        if (item === 'location_heirarchy_id' || item === 'role_id') {return null}
                        else {
                            obj[item] = items[item]
                        }
                    })
                    dataTableData.push(obj)
                }, {})
                this.setState({
                    dataTableData,
                })
                break;
            case 'PRODUCTS':
                allProjects.map((items, key) => {
                    let obj = {}
                    Object.keys(items).forEach(item => {
                        if (item === 'category_id' || item === 'sub_category_id' ||  item === 'brand_id' || item === 'model_id') {
                            return
                        } else {
                            obj[item] = items[item]
                        }
                    })
                    dataTableData.push(obj)
                    console.log(dataTableData, 186)
                }, {})
                this.setState({
                    dataTableData,
                })
                break;
            case 'MODELS':
                dataTableData = allProjects
                this.setState({
                    dataTableData,
                })
                break;
            case 'BRANDS':
                dataTableData = allProjects
                this.setState({
                    dataTableData,
                })
                break;
            case 'CONDITIONS':
                dataTableData = allProjects
                this.setState({
                    dataTableData,
                })
                break;
            case 'LOCHIERARCHY':
                dataTableData = allProjects
                this.setState({
                    dataTableData,
                })
                break;
            case 'DEPMETHOD':

                dataTableData = allProjects
                this.setState({
                    dataTableData,
                })
                break;
            case 'ASSETTYPES':

                dataTableData = allProjects
                this.setState({
                    dataTableData,
                })
                break;
            case 'ASSETCATEGORY':
                dataTableData = allProjects
                this.setState({
                    dataTableData,
                })
                break;
            case 'LOCATIONS':
                allProjects.map((items, key) => {
                    let obj = {}
                    Object.keys(items).forEach(item => {
                        if (item === 'hierarchy') {return null}
                        else {
                            obj[item] = items[item]
                        }
                    })
                    dataTableData.push(obj)
                }, {})
                this.setState({
                    dataTableData,
                })
                break;
            case 'USERROLES':

                dataTableData = allProjects
                this.setState({
                    dataTableData,
                })
                break;
            case 'MODULE':

                dataTableData = allProjects
                this.setState({
                    dataTableData,
                })
                break;
            case 'COMCATEGORY':

                dataTableData = allProjects
                this.setState({
                    dataTableData,
                })
                break;
            case 'COMSUBCATEGORY':
                allProjects.map((items, key) => {
                    let obj = {}
                    Object.keys(items).forEach(item => {
                        if (item === 'complain_id') {return null}
                        else {
                            obj[item] = items[item]
                        }
                    })
                    dataTableData.push(obj)
                }, {})
                this.setState({
                    dataTableData,
                })
                break;
            case 'COMPLAINT':

                dataTableData = allProjects
                this.setState({
                    dataTableData,
                })
                break;
            case 'USERASSOCIATE':
                allProjects.map((items, key) => {
                    let obj = {}
                    Object.keys(items).forEach(item => {
                        if (item === 'role_id' || item === 'user_id' || item === 'location_id') {
                            return
                        } else {
                            obj[item] = items[item]
                        }
                    })
                    dataTableData.push(obj)
                    console.log(dataTableData, 269)
                }, {})
                this.setState({
                    dataTableData,
                })
                this.setState({
                    dataTableData,
                })
                break;
            default:
                return null
        }
    }

    updateEdit = (id) => {
        const {allProjects} = this.state
        console.log(allProjects, 137)
        allProjects.find(item => {
            if (item.id === id) {
                console.log(item)
                this.setState({
                    editId: id,
                }, () => {
                    Object.keys(item).map(val => {
                        console.log(val, 349)
                        if (val === 'file_name' || val === 'file_name') {
                            this.setState({
                                file_name_all: item[val]
                            }, () => {
                                console.log(this.state.file_name_all, 354)
                            })
                        } else {
                            this.setState({
                                [val]: item[val]
                            }, () => {
                                this.validate()
                            })
                        }
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
                        error: false,
                        allProjects: []
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                success: false,
                            }, () => {
                                window.location.reload()
                            })
                        }, 2300)
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
        else if(name === 'enlisted' || name === 'complaint_status'){
            this.setState({
                [name]: checked
            })
        } else if (name === 'file_name') {
            if (["jpg","jpeg","png","doc","docx","pdf","xlsx"].includes(getFileExtension(files[0].name))) {
                this.setState({
                    [name]: files[0],
                    file_name_all: files[0].name
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
        } else if(name === 'location_id'){
            this.setState({
                [name]: value
            }, () => {
                this.validate()
                this.locationUserApi(value)
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

    handleChangeLocation = (e, nameField) => {
        const {name, value} = e.target
        if(name === 'parent_id') {
            this.setState({
                [name]: value,
                [nameField]: value
            }, () => {
                this.locationApi(value)
            })
        }
    }

    componentDidMount = () => {
        this.getData()
    }

    locationApi = (id) => {
        const {hierarchy, parent_id} = this.state
        if (parent_id < hierarchy) {
            Axios.get(apiUrl() + 'locations/render/' + id)
                .then(resData => {
                    if(resData.data) {
                        this.setState({
                            locationHolder: [...this.state.locationHolder, ...resData.data]
                        })
                    }
                })
        }
    }

    locationUserApi = (id) => {
        const {hierarchy, parent_id} = this.state
        console.log(hierarchy, parent_id, 487)
            Axios.get(apiUrl() + 'locations/render/' + id)
                .then(resData => {
                    if(resData.data.length > 0) {
                        this.setState({
                            locationHolder: [...this.state.locationHolder, ...resData.data]
                        })
                    }
                })
    }

    renderForm = () => {
        const {formType} = this.props
        const {project_name, project_code, vendor_name, file_name, description, editId, errorDict, enlisted, model, brand, hierarchy_name, parent_id, complain_id,
            category_code,category_name, sub_category_code, sub_category_name, category_id, sub_category_id, product_name,product_code, location_code, order_by,
            brand_id, model_id, depreciation_code, method_name, type_name, asset_code, condition_type, location_name, hierarchy, role_desc, role_name, file_name_all,
            module_name, initial_link, user_id, location_id, role_id, locationHolder, parent_location_id, location_heirarchy_id,complaint_status, complaint_name,
            sub_complaint_name, com_category_id, com_sub_category_id, problem_details, location_lat, location_long ,address} = this.state

        switch (formType){
            case 'VENDOR':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Vendor Name</label>
                            <input
                                placeholder='Vendor Name'
                                type={'text'}
                                name={'vendor_name'}
                                value={vendor_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.vendor_name) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Description</label>
                            <textarea
                                placeholder={'Description'}
                                id={'enCh1'}
                                name={'description'}
                                value={description}
                                className={`ui-custom-textarea`}
                                onChange={this.handleChange} />
                        </div>
                        <div className="px-1 grid-2">
                            <div className="ui-custom-file">
                                <input type="file" onChange={this.handleChange} name={'file_name'} id="validatedCustomFile"
                                       required />
                                <label htmlFor="validatedCustomFile" className={'w-100'}>{file_name_all ? file_name_all : 'Choose file'}</label>
                                <div className="bottom w-100">
                                    JPG | JPEG | PNG | DOC | PDF | XLSX Allowed
                                </div>
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
                        {editId === null ? <button className="submit-btn-normal mt-3" onClick={this.handleSubmit}>Submit Vendor</button> : <>
                            <button className="submit-btn-normal mt-3 mr-2" onClick={this.updateData}>Update</button>
                            <button className="reset-btn-normal mt-3" onClick={() => {
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
            case 'AMCTYPES':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Type Name</label>
                            <input
                                placeholder='Type Name'
                                type={'text'}
                                name={'type_name'}
                                value={type_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.type_name) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Description</label>
                            <textarea
                                placeholder={'Description'}
                                id={'enCh1'}
                                name={'description'}
                                value={description}
                                className={`ui-custom-textarea`}
                                onChange={this.handleChange} />
                        </div>
                        <div className="px-1 grid-2">
                            <div className="ui-custom-file">
                                <input type="file" onChange={this.handleChange} name={'file_name'} id="validatedCustomFile"
                                       required />
                                <label htmlFor="validatedCustomFile" className={'w-100'}>{file_name_all ? file_name_all : 'Choose file'}</label>
                                <div className="bottom w-100">
                                    JPG | JPEG | PNG | DOC | PDF | XLSX Allowed
                                </div>
                            </div>
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" onClick={this.handleSubmit}>Submit</button> : <>
                            <button className="submit-btn-normal mt-3 mr-2" onClick={this.updateData}>Update</button>
                            <button className="reset-btn-normal mt-3" onClick={() => {
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
                            <label className={'ui-custom-label'}>Project Name</label>
                            <input
                                placeholder='Project Name'
                                type={'text'}
                                name={'project_name'}
                                value={project_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.project_name) && 'is-invalid'}`}  />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Project Code</label>
                            <input
                                placeholder='Project Code'
                                type={'text'}
                                name={'project_code'}
                                value={project_code}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.project_code) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-20p">
                            <label className={'ui-custom-label'}>Description</label>
                            <textarea
                                placeholder='Description'
                                name={'description'}
                                value={description}
                                onChange={this.handleChange}
                                className={`ui-custom-textarea`} />
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Project</button> : <>
                                <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mt-3 mr-2" onClick={this.updateData}>Update</button>
                                <button className="reset-btn-normal mt-3" onClick={() => {
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
                            <label className={'ui-custom-label'}>Location Type</label>
                            <select name={'location_heirarchy_id'} value={location_heirarchy_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.location_heirarchy_id) && 'is-invalid'}`}>
                                <option>Select Location</option>
                                <HierarchiesOptions />
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>User Role</label>
                            <select name={'role_id'} value={role_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.role_id) && 'is-invalid'}`}>
                                <option>Select User Role</option>
                                <UserRoleOptions />
                            </select>
                        </div>
                        <div className="px-1 mb-20p">
                            <label className={'ui-custom-label'}>Parent</label>
                            <select name={'parent_id'} value={parent_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.parent_id) && 'is-invalid'}`}>
                                <option>Select Parent</option>
                                <ApproveLevelOptions />
                            </select>
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Level</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mt-3 mr-2" onClick={this.updateData}>Update</button>
                                    <button className="reset-btn-normal mt-3" onClick={() => {
                                        this.setState({
                                            editId: null,
                                            location_heirarchy_id: '',
                                            role_id: '',
                                            parent_id: 0,
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
                            <label className={'ui-custom-label'}>Asset Category</label>
                            <select name={'category_id'} value={category_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.category_id) && 'is-invalid'}`}>
                                <option>Select Category</option>
                                <AssetCategoryOptions />
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Asset Sub Category</label>
                            <select name={'sub_category_id'} value={sub_category_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.sub_category_id) && 'is-invalid'}`}>
                                <option>Select Sub Category</option>
                                <AssetSubCategoryOptions assetId={category_id} />
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Product Name</label>
                            <input
                                placeholder='Product Name'
                                name={'product_name'}
                                value={product_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.product_name) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Product Code</label>
                            <input
                                placeholder='Product Code'
                                name={'product_code'}
                                value={product_code}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.product_code) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Brand</label>
                            <select name={'brand_id'} value={brand_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.brand_id) && 'is-invalid'}`}>
                                <option>Select Brand</option>
                                <BrandIdOptions />
                            </select>
                        </div>
                        <div className="px-1 mb-20p">
                            <label className={'ui-custom-label'}>Model</label>
                            <select name={'model_id'} value={model_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.model_id) && 'is-invalid'}`}>
                                <option>Select Model</option>
                                <ModelIdOptions />
                            </select>
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Product</button> : <>
                                <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mt-3 mr-2" onClick={this.updateData}>Update</button>
                                <button className="reset-btn-normal mt-3" onClick={() => {
                                    this.setState({
                                        editId: null,
                                        error: false,
                                        category_id: '',
                                        sub_category_id: '',
                                        brand_id: '',
                                        model_id: '',
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
                            <label className={'ui-custom-label'}>Models</label>
                            <input
                                placeholder='Models'
                                type={'text'}
                                name={'model'}
                                value={model}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.model) && 'is-invalid'}`}  />
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Model</button> : <div>
                                <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mr-2" onClick={this.updateData}>Update</button>
                                <button className="reset-btn-normal" onClick={() => {
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
                            <label className={'ui-custom-label'}>Brands</label>
                            <input
                                placeholder='Brands'
                                type={'text'}
                                name={'brand'}
                                value={brand}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.brand) && 'is-invalid'}`}  />
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Brand</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mr-2" onClick={this.updateData}>Update</button>
                                    <button className="reset-btn-normal" onClick={() => {
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
                            <label className={'ui-custom-label'}>Condition</label>
                            <input
                                placeholder='Condition Type'
                                type={'text'}
                                name={'condition_type'}
                                value={condition_type}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.condition_type) && 'is-invalid'}`}  />
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Condition</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mr-2" onClick={this.updateData}>Update</button>
                                    <button className="reset-btn-normal" onClick={() => {
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
                            <label className={'ui-custom-label'}>Hierarchy</label>
                            <input
                                placeholder='Hierarchy Name'
                                type={'text'}
                                name={'hierarchy_name'}
                                value={hierarchy_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.hierarchy_name) && 'is-invalid'}`}  />
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Hierarchy</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mr-2" onClick={this.updateData}>Update</button>
                                    <button className="reset-btn-normal" onClick={() => {
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
                            <label className={'ui-custom-label'}>Methods</label>
                            <input
                                placeholder='Method Name'
                                type={'text'}
                                name={'method_name'}
                                value={method_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.method_name) && 'is-invalid'}`}  />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Depreciation Code</label>
                            <input
                                placeholder='Depreciation Code'
                                type={'text'}
                                name={'depreciation_code'}
                                value={depreciation_code}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.depreciation_code) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-20p">
                            <label className={'ui-custom-label'}>Description</label>
                            <textarea
                                placeholder='Description'
                                name={'description'}
                                value={description}
                                onChange={this.handleChange}
                                className={`ui-custom-textarea`} />
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Method</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mt-3 mr-2" onClick={this.updateData}>Update</button>
                                    <button className="reset-btn-normal mt-3" onClick={() => {
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
                            <label className={'ui-custom-label'}>Type Name</label>
                            <input
                                placeholder='Type Name'
                                type={'text'}
                                name={'type_name'}
                                value={type_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.type_name) && 'is-invalid'}`}  />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Asset Code</label>
                            <input
                                placeholder='Asset Code'
                                type={'text'}
                                name={'asset_code'}
                                value={asset_code}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.asset_code) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-20p">
                            <label className={'ui-custom-label'}>Description</label>
                            <textarea
                                placeholder='Description'
                                name={'description'}
                                value={description}
                                onChange={this.handleChange}
                                className={`ui-custom-textarea`} />
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Asset Type</button> : <>
                                <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mt-3 mr-2" onClick={this.updateData}>Update</button>
                                <button className="reset-btn-normal mt-3" onClick={() => {
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
            case 'COMCATEGORY':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Complaint Name</label>
                            <input
                                placeholder='Type Name'
                                type={'text'}
                                name={'complaint_name'}
                                value={complaint_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.complaint_name) && 'is-invalid'}`}  />
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Category</button> : <>
                                <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mt-3 mr-2" onClick={this.updateData}>Update</button>
                                <button className="reset-btn-normal mt-3" onClick={() => {
                                    this.setState({
                                        editId: null,
                                        complaint_name: '',
                                    }, () => {
                                        this.validate()
                                    })}}>Go Back</button>
                            </>}
                    </>
                )
            case 'COMSUBCATEGORY':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Complaint Category</label>
                            <select name={'complain_id'} value={complain_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.complain_id) && 'is-invalid'}`}>
                                <option>Select Category</option>
                                <ComCategoryOptions />
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Complaint Sub Category Name</label>
                            <input
                                placeholder='Sub Category Name'
                                type={'text'}
                                name={'sub_complaint_name'}
                                value={sub_complaint_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.sub_complaint_name) && 'is-invalid'}`}  />
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Sub Category</button> : <>
                                <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mt-3 mr-2" onClick={this.updateData}>Update</button>
                                <button className="reset-btn-normal mt-3" onClick={() => {
                                    this.setState({
                                        editId: null,
                                        complain_id: '',
                                        sub_complaint_name: '',
                                    }, () => {
                                        this.validate()
                                    })}}>Go Back</button>
                            </>}
                    </>
                )
            case 'COMPLAINT':
                return(
                    <>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Complaint Category</label>
                            <select name={'com_category_id'} value={com_category_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.com_category_id) && 'is-invalid'}`}>
                                <option>Select Category</option>
                                <ComCategoryOptions />
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Complaint Sub Category</label>
                            <select name={'com_sub_category_id'} value={com_sub_category_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.com_sub_category_id) && 'is-invalid'}`}>
                                <option>Select Sub Category</option>
                                <ComSubCategoryOptions com_category_id={com_category_id}/>
                            </select>
                        </div>
                        <div className="px-1 mb-20p">
                            <label className={'ui-custom-label'}>Problem Details</label>
                            <textarea
                                placeholder='Problem Details'
                                type={'text'}
                                name={'problem_details'}
                                value={problem_details}
                                onChange={this.handleChange}
                                className={`ui-custom-textarea ${(errorDict && !errorDict.problem_details) && 'is-invalid'}`}  />
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Complaint</button> : <>
                                <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mt-3 mr-2" onClick={this.updateData}>Update</button>
                                <button className="reset-btn-normal mt-3" onClick={() => {
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
                            <label className={'ui-custom-label'}>Category Name</label>
                            <input
                                placeholder='Category Name'
                                type={'text'}
                                name={'category_name'}
                                value={category_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.category_name) && 'is-invalid'}`}  />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Category Code</label>
                            <input
                                placeholder='Category Code'
                                type={'text'}
                                name={'category_code'}
                                value={category_code}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.category_code) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-20p">
                            <label className={'ui-custom-label'}>Description</label>
                            <textarea
                                placeholder='Description'
                                name={'description'}
                                value={description}
                                onChange={this.handleChange}
                                className={`ui-custom-textarea`} />
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Category</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mt-3 mr-2" onClick={this.updateData}>Update</button>
                                    <button className="reset-btn-normal mt-3" onClick={() => {
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
                            <label className={'ui-custom-label'}>Asset Category</label>
                            <select name={'category_id'} value={category_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.category_id) && 'is-invalid'}`}>
                                <option>Select Category</option>
                                <AssetCategoryOptions assetId={category_id}/>
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Sub Category Name</label>
                            <input
                                placeholder='Sub Category Name'
                                type={'text'}
                                name={'sub_category_name'}
                                value={sub_category_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.sub_category_name) && 'is-invalid'}`}  />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Sub Category Code</label>
                            <input
                                placeholder='Sub Category Code'
                                type={'text'}
                                name={'sub_category_code'}
                                value={sub_category_code}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.sub_category_code) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-20p">
                            <label className={'ui-custom-label'}>Description</label>
                            <textarea
                                placeholder='Description'
                                name={'description'}
                                value={description}
                                onChange={this.handleChange}
                                className={`ui-custom-textarea`} />
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Sub Category</button> : <>
                                <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mt-3 mr-2" onClick={this.updateData}>Update</button>
                                <button className="reset-btn-normal mt-3" onClick={() => {
                                    this.setState({
                                        editId: null,
                                        error: false,
                                        category_id: '',
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
                let subLoc = locationHolder.length > 0 && locationHolder.map((item, index) =>
                    {
                        console.log(item, hierarchy, item.hierarchy, 1148)
                        return(
                            <div className="px-1 mb-2">
                                <label className={'ui-custom-label'}>{item.hierarchy_name}</label>
                                <select
                                    name={'parent_id'}
                                    disabled={this.state[item.hierarchy_name] && (parseInt(hierarchy, 10) !== item.hierarchy)}
                                    onChange={(e) => this.handleChangeLocation(e, item.hierarchy_name)}
                                    className={`ui-custom-input ${this.state[item.hierarchy_name] ? null : 'border-red'}`}>
                                    <option disabled={true} selected={true}>Select {item.hierarchy_name}</option>
                                    <LocationsOptions selectedId={item.parent_id} />
                                </select>
                            </div>
                    )}
                )
                return(
                    <>
                        <div className={'mb-20p'}>
                            <div className="px-1 mb-2">
                                <label className={'ui-custom-label'}>Location Name</label>
                                <input
                                    placeholder='Location Name'
                                    type={'text'}
                                    name={'location_name'}
                                    value={location_name}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input ${(errorDict && !errorDict.location_name) && 'is-invalid'}`} />
                            </div>
                            <div className="px-1 mb-2">
                                <label className={'ui-custom-label'}>Location Code</label>
                                <input
                                    placeholder='Location Code'
                                    type={'text'}
                                    name={'location_code'}
                                    value={location_code}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input ${(errorDict && !errorDict.location_code) && 'is-invalid'}`} />
                            </div>
                            <div className="px-1 mb-2">
                                <label className={'ui-custom-label'}>Location Type</label>
                                <select name={'hierarchy'} value={hierarchy} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.hierarchy) && 'is-invalid'}`}>
                                    <option>Select Type</option>
                                    <HierarchiesOptions />
                                </select>
                            </div>
                            {hierarchy && <div className="px-1 mb-2">
                                <label className={'ui-custom-label'}>Program</label>
                                <select name={'parent_id'} disabled={locationHolder.length > 0 && (parseInt(hierarchy, 10) !== 1)}
                                        onChange={(e) => this.handleChangeLocation(e, 'Program')}
                                        className={`ui-custom-input ${!this.state['Program'] && 'is-invalid'}`}>
                                    <option disabled={true} selected={true} value={0}>Select Parent</option>
                                    <LocationsOptions selectedId={parent_id} />
                                </select>
                            </div>}
                            {subLoc}
                            <div className="px-1 mb-2">
                                <label className={'ui-custom-label'}>Latitude</label>
                                <input
                                    placeholder='Latitude'
                                    type={'text'}
                                    name={'location_lat'}
                                    value={location_lat}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`} />
                            </div>
                            <div className="px-1 mb-2">
                                <label className={'ui-custom-label'}>Longitude</label>
                                <input
                                    placeholder='Longitude'
                                    type={'text'}
                                    name={'location_long'}
                                    value={location_long}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`} />
                            </div>
                            <div className="px-1 mb-2">
                                <label className={'ui-custom-label'}>Location Address</label>
                                <input
                                    placeholder='Location Address'
                                    type={'text'}
                                    name={'address'}
                                    value={address}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`} />
                            </div>
                            <div className="ui-custom-file w-100 pl-1 overflow-hidden rounded">
                                <input type="file" onChange={this.handleChange} name={'file_name'} id="validatedCustomFile"
                                       required />
                                <label htmlFor="validatedCustomFile" className={'w-100'}>{file_name_all ? file_name_all : 'Choose file'}</label>
                                <div className="bottom w-100">
                                    JPG | JPEG | PNG | DOC | PDF | XLSX Allowed
                                </div>
                            </div>
                        </div>
                        {editId === null ? <><button
                            className="submit-btn-normal mt-3"
                            disabled={errorDict && Object.values(errorDict).includes(false)}
                            onClick={this.handleSubmit}>Submit Location</button>
                            {parent_id !== 0 && <button
                                className="submit-btn-normal bg-warning ml-2"
                                disabled={errorDict && Object.values(errorDict).includes(false)}
                                onClick={() => {this.setState({
                                    locationHolder: [],
                                    parent_id: 0,
                                    hierarchy: false,
                                    Program: null,
                                    Division: null,
                                    Branch: null,
                                    Area: null,
                                    Region: null})}}>Reset Locations</button>}</> : <>
                                <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mt-3 mr-2" onClick={this.updateData}>Update</button>
                                <button className="reset-btn-normal mt-3" onClick={() => {
                                    this.setState({
                                        editId: null,
                                        error: false,
                                        hierarchy: false,
                                        location_name: '',
                                        location_code: '',
                                        parent_id: 0,
                                    }, () => {
                                        this.validate()
                                    })}}>Go Back</button>
                            </>}
                    </>
                )
            case 'USERROLES':
                console.log(errorDict && !errorDict.role_desc, 1286)
                return(
                    <>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Role Name</label>
                            <input
                                placeholder='Role Name'
                                type={'text'}
                                name={'role_name'}
                                value={role_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.role_name) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Role Description</label>
                            <input
                                placeholder='Role Description'
                                type={'text'}
                                name={'role_desc'}
                                value={role_desc}
                                onChange={this.handleChange}
                                className={`ui-custom-input`} />
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Role</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mt-3 mr-2" onClick={this.updateData}>Update</button>
                                    <button className="reset-btn-normal mt-3" onClick={() => {
                                        this.setState({
                                            editId: null,
                                            error: false,
                                            role_desc: '',
                                            role_name: '',
                                            module_id: 0
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
                            <label className={'ui-custom-label'}>Module Name</label>
                            <input
                                placeholder='Module Name'
                                type={'text'}
                                name={'module_name'}
                                value={module_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input ${(errorDict && !errorDict.module_name) && 'is-invalid'}`} />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Initial Link</label>
                            <input
                                placeholder='Initial Link'
                                type={'text'}
                                name={'initial_link'}
                                value={initial_link}
                                onChange={this.handleChange}
                                className={`ui-custom-input`} />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Order</label>
                            <select name={'order_by'} value={order_by} onChange={this.handleChange} className={`ui-custom-input`}>
                                <option>Select Order</option>
                                <option value={1}>Ascending</option>
                                <option value={2}>Descending</option>
                            </select>
                        </div>
                        <div className="ui-custom-file w-100 ml-1 overflow-hidden rounded">
                            <input type="file" name={'file_name'} onChange={this.handleChange} id="validatedCustomFile"
                                   required />
                            <label htmlFor="validatedCustomFile" className={'w-100'}>{file_name_all ? file_name_all : 'Choose file...'}</label>
                            <div className="bottom w-100">
                                JPG | JPEG | PNG | DOC | PDF | XLSX Allowed
                            </div>
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Module</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mt-3 mr-2" onClick={this.updateData}>Update</button>
                                    <button className="reset-btn-normal mt-3" onClick={() => {
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
                        <label className={'ui-custom-label'}>Sub Locations</label>
                        <select name={'location_id'} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.location_id) && 'is-invalid'}`}>
                            <option>Select Sub Location</option>
                            <LocationsOptions selectedId={item.parent_id} />
                        </select>
                    </div>
                ))
                return(
                    <>
                        <>
                            <div className="px-1 mb-2">
                                <label className={'ui-custom-label'}>Users Name</label>
                                <select name={'user_id'} value={user_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.user_id) && 'is-invalid'}`}>
                                    <option>Select User</option>
                                    <UserOptions />
                                </select>
                            </div>
                            <div className="px-1 mb-2">
                                <label className={'ui-custom-label'}>User Role</label>
                                <select name={'role_id'} value={role_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.role_id) && 'is-invalid'}`}>
                                    <option>Select Role</option>
                                    <UserRoleOptions />
                                </select>
                            </div>
                            <div className="px-1 mb-2">
                                <label className={'ui-custom-label'}>Locations</label>
                                <select name={'location_id'} value={parent_location_id}
                                        onChange={this.handleChange}
                                        className={`ui-custom-input ${(errorDict && !errorDict.location_id) && 'is-invalid'}`}>
                                    <option>Select Location</option>
                                    <LocationsOptions selectedId={location_id} />
                                </select>
                            </div>
                            {subLocation}
                        </>
                        {editId === null ? <button className="submit-btn-normal mt-3" disabled={errorDict && Object.values(errorDict).includes(false)} onClick={this.handleSubmit}>Submit Role</button> : <>
                                    <button disabled={errorDict && Object.values(errorDict).includes(false)} className="submit-btn-normal mt-3 mr-2" onClick={this.updateData}>Update</button>
                                    <button className="reset-btn-normal mt-3" onClick={() => {
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
        const {vendor_name, com_category_id, com_sub_category_id, project_name, project_code, model, brand, category_code,category_name, sub_category_name, order_by,
            category_id, sub_category_code, sub_category_id, product_name, product_code, brand_id, model_id, depreciation_code, method_name,  module_name, initial_link,
            type_name, asset_code, condition_type, hierarchy_name, hierarchy, parent_id, location_code, location_name, role_desc, role_name, module_id,
            user_id, location_id, role_id, location_heirarchy_id, complaint_status, complaint_name, sub_complaint_name, complain_id, problem_details} = this.state
        switch (formType){
            case "USERROLES":
                errorDict = {
                    role_name: typeof role_name !== 'undefined' && role_name !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "PROJECT":
                errorDict = {
                    project_name: typeof project_name !== 'undefined' && project_name !== '',
                    project_code: typeof project_code !== 'undefined' && project_code !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "USERAPPROVAL":
                errorDict = {
                    location_heirarchy_id: typeof location_heirarchy_id !== 'undefined' && location_heirarchy_id !== '',
                    role_id: typeof role_id !== 'undefined' && role_id !== '',
                    parent_id: typeof parent_id !== 'undefined' && parent_id !== 0,
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "DEPMETHOD":
                errorDict = {
                    depreciation_code: typeof depreciation_code !== 'undefined' && depreciation_code !== '',
                    method_name: typeof method_name !== 'undefined' && method_name !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "ASSETTYPES":
                errorDict = {
                    asset_code: typeof asset_code !== 'undefined' && asset_code !== '',
                    type_name: typeof type_name !== 'undefined' && type_name !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "PRODUCTS":
                errorDict = {
                    brand_id: typeof brand_id !== 'undefined' && brand_id !== '',
                    model_id: typeof model_id !== 'undefined' && model_id !== '',
                    category_id: typeof category_id !== 'undefined' && category_id !== '',
                    product_name: typeof product_name !== 'undefined' && product_name !== '',
                    product_code: typeof product_code !== 'undefined' && product_code !== '',
                    sub_category_id: typeof sub_category_id !== 'undefined' && sub_category_id !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "VENDOR":
                errorDict = {
                    vendor_name: typeof vendor_name !== 'undefined' && vendor_name !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "AMCTYPES":
                errorDict = {
                    type_name: typeof type_name !== 'undefined' && type_name !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "COMPLAINT":
                errorDict = {
                    com_category_id: typeof com_category_id !== 'undefined' && com_category_id !== '',
                    com_sub_category_id: typeof com_sub_category_id !== 'undefined' && com_sub_category_id !== '',
                    problem_details: typeof problem_details !== 'undefined' && problem_details !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "MODELS":
                errorDict = {
                    model: typeof model !== 'undefined' && model !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "CONDITIONS":
                errorDict = {
                    condition_type: typeof condition_type !== 'undefined' && condition_type !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "LOCHIERARCHY":
                errorDict = {
                    hierarchy_name: typeof hierarchy_name !== 'undefined' && hierarchy_name !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "BRANDS":
                errorDict = {
                    brand: typeof brand !== 'undefined' && brand !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "COMCATEGORY":
                errorDict = {
                    complaint_status: typeof complaint_status !== 'undefined' && complaint_status !== '',
                    complaint_name: typeof complaint_name !== 'undefined' && complaint_name !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "COMSUBCATEGORY":
                errorDict = {
                    sub_complaint_name: typeof sub_complaint_name !== 'undefined' && sub_complaint_name !== '',
                    complain_id: typeof complain_id !== 'undefined' && complain_id !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "LOCATIONS":
                errorDict = {
                    hierarchy: typeof hierarchy !== 'undefined' && hierarchy !== '',
                    parent_id: typeof parent_id !== 'undefined' && parent_id !== '',
                    location_code: typeof location_code !== 'undefined' && location_code !== '',
                    location_name: typeof location_name !== 'undefined' && location_name !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "ASSETCATEGORY":
                errorDict = {
                    category_name: typeof category_name !== 'undefined' && category_name !== '',
                    category_code: typeof category_code !== 'undefined' && category_code !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "ASSETSUBCATEGORY":
                errorDict = {
                    category_id: typeof  category_id !== 'undefined' && category_id !== '',
                    sub_category_name: typeof  sub_category_name !== 'undefined' && sub_category_name !== '',
                    sub_category_code: typeof  sub_category_code !== 'undefined' && sub_category_code !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "MODULE":
                errorDict = {
                    module_name: typeof module_name !== 'undefined' && module_name !== '',
                }
                this.setState({
                    errorDict
                })
                return errorDict
            case "USERASSOCIATE":
                errorDict = {
                    user_id: typeof user_id !== 'undefined' && user_id !== '',
                    location_id: typeof location_id !== 'undefined' && location_id !== 0,
                    role_id: typeof role_id !== 'undefined' && role_id !== '',
                    module_id: typeof module_id !== 'undefined' && module_id !== '',
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
            user_id, location_id, role_id, location_heirarchy_id, complaint_status, complaint_name, location_lat, location_long ,address, sub_complaint_name, complain_id, com_category_id, com_sub_category_id, problem_details} = this.state
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
            case "AMCTYPES":
                data = new FormData()
                data.append('file', file_name)
                data.append('type_name', type_name)
                data.append('description', description)
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
            case "COMCATEGORY":
                return({status: complaint_status, complaint_name})
            case "COMSUBCATEGORY":
                return({status: complaint_status, sub_complaint_name, complain_id})
            case "LOCHIERARCHY":
                return({hierarchy_name})
            case "BRANDS":
                return({
                    brand
                })
            case "COMPLAINT":
                return({
                    createdBy: jwt.decode(localStorage.getItem('user')).data.id,
                    locationId: jwt.decode(localStorage.getItem('user')).data.location_id,
                    roleID: jwt.decode(localStorage.getItem('user')).data.role_id,
                    complaint_category: com_category_id,
                    complaint_sub_category: com_sub_category_id,
                    problemDetails: problem_details,
                })
            case "LOCATIONS":
                return({hierarchy, parent_id, location_code, location_name, location_lat, location_long ,address})
            case "ASSETCATEGORY":
                return({category_code,category_name,description})
            case "USERASSOCIATE":
                return({user_id, location_id, role_id, module_id})
            case "ASSETSUBCATEGORY":
                return({sub_category_name,category_id, sub_category_code,description})
            case "MODULE":
                data = new FormData()
                file_name && data.append('file', file_name ? file_name : null);
                !file_name && data.append('image_name', image_name ? image_name : null);
                data.append('module_name', module_name);
                data.append('initial_link', initial_link ? initial_link : null);
                data.append('order_by', order_by);
                return data
            default:
                return null
        }
    }

    render() {
        const {getApi, title, headTitle, formType} = this.props
        const {error, errorMessage, isLoading, allProjects, success, successMessage, dataTableData} = this.state
        return (
            <>
                {error &&
                    <ErrorModal errorMessage={errorMessage} />
                }
                {success &&
                    <SuccessModal successMessage={successMessage} />
                }
                <div className="px-2 my-2 ui-dataEntry">
                    <div className={`bg-white rounded p-2 admin-input-height overflow-y-auto overflow-x-hidden position-relative`}>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">{headTitle}</p>
                        </nav>
                        {this.renderForm()}
                    </div>
                    <div className={`rounded bg-white admin-input-height p-2 ${(formType !== 'ASSETSUBCATEGORY')&& 'overflow-x-hidden'}`}>
                        <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">{title}</p>
                        </nav>
                        {isLoading ? <Spinner/> : dataTableData.length > 0 ? <>
                            <PrimeDataTable
                                sideTable
                                del={formType !== 'COMPLAINT' ? getApi : false}
                                updateEdit={this.updateEdit}
                                edit = {formType !== 'COMPLAINT'}
                                dataDisplay = {formType !== 'COMPLAINT'}
                                footer = {formType !== 'COMPLAINT'}
                                isLoading = {formType !== 'COMPLAINT'}
                                pagination = {formType !== 'COMPLAINT'}
                                searchable = {formType !== 'COMPLAINT'}
                                data={dataTableData}
                                deleteModalTitle={title}
                            />
                        </> : <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> Currently There are No {title}</h4>}
                    </div>
                </div>
            </>
        );
    }
}

export default AdminInputContainer;