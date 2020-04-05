import React, {Component} from 'react'
import jwt from 'jsonwebtoken';
import AssetCategoryByUserOption from "../../utility/component/assetCategoryByUserOption";
import AssetSubCategoryByUserOption from "../../utility/component/assetSubCategoryByUserOption";
import AssetProductByUserOptions from "../../utility/component/assetProductByUserOptions";
import AssetListByUserOptions from "../../utility/component/assetListByUserOptions";
import axios from "axios";
import {apiUrl} from "../../utility/constant";
import {getFileExtension} from "../../utility/custom";
import {validateInput} from "../../utility/custom";
import Spinner from "../../layouts/Spinner";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";

class RepairMaintenenceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            category_id: '',
            category: '',
            sub_category_id: '',
            sub_category: '',
            product_id: '',
            product_name: '',
            product_serial: '',
            estimated_cost: '',
            details: '',
            file_name: '',
            is_disposal: false,
            extError: false,
            success: false,
            successMessage: '',
            error: false,
            errorMessage: '',
            errorDict: null,
            isLoading: false,
            repairData: [],
            repairCredential: [],
            repairTableData: []
        };

        this.accepted_file_ext = ['png', 'jpg', 'jpeg', 'doc', 'docx', 'pdf', 'xlsx'];
    }

    componentDidMount() {
        const user = jwt.decode(localStorage.getItem('user')).data;
        if (Object.keys(user).length) this.setState({user});
    }

    handleChange = e => {
        const {name, value, files} = e.target;
        let name_list = ['category_id', 'sub_category_id', 'product_id', 'product_serial'];
        if (name_list.includes(name) && value === '') return false;

        switch (name) {
            case 'estimated_cost':
                let valid = validateInput(e);
                if (valid || valid === '') this.setState({[name]: valid}, () => {this.validate()});
                return;
            case 'file_name':
                if (!files.length) return;
                const ext = getFileExtension(files[0].name);
                if (!this.accepted_file_ext.includes(ext)) return this.setState({extError: true, file_name: ''});
                this.setState({file_name: files[0], extError: false}, () => {this.validate()});
                return;
            default:
                this.setState({[name]: value}, () => {
                    if (name === 'category_id') this.setState({sub_category_id: '', product_id: '', product_serial: ''}, () => this.validate());
                    if (name === 'sub_category_id') this.setState({product_id: '', product_serial: ''}, () => this.validate());
                    if (name === 'product_id') this.setState({product_serial: ''}, () => this.validate());
                    this.validate();
                });
                return;
        }
    };

    addRepair = () => {
        if (this.state.extError) return false;
        if (Object.values(this.validate()).includes(false)) return false;
        const {repairData, repairCredential, category_id, sub_category_id, product_id, product_serial, estimated_cost, details} = this.state;
        let file = document.getElementById("validatedCustomFile");

        const isExistRepair = repairCredential.filter(item => {return (item.category_id === category_id && item.sub_category_id === sub_category_id && item.product_id === product_id && item.product_serial === product_serial)});
        if (isExistRepair.length) return this.setState({error: true, errorMessage: 'This Asset is already added in Repair list!'}, () => {
            setTimeout(() => {
                this.setState({
                    error: false
                })
            }, 2300)
        });

        this.setState({isLoading: true}, () => {
            axios.post(apiUrl() + 'assets-entry/all/by/credentials', this.getApiData())
                .then(res => {
                    if (!res.data[0].length) return this.setState({error: true, errorMessage: 'There is no asset found for Repair & Maintenance!', isLoading: false, success: false}, () => {
                        setTimeout(() => {
                            this.setState({
                                error: false
                            })
                        }, 2300)
                    });
                    this.setState({repairData: [...repairData, ...res.data[0]], error: false, isLoading: false}, () => {
                        let newRepair = this.getApiData();
                        res.data[0].map(item => {
                            Object.keys(item).map(val => {
                                if (val === 'id') Object.assign(newRepair, {id: item[val]});
                            });
                        });

                        let newRepairArray = [newRepair];
                        this.setState({
                            repairCredential: [...repairCredential, ...newRepairArray]
                        }, () => {
                            let newRepairObj = {};
                            this.state.repairData.length > 0 && this.state.repairData.map(item => {
                                const newObj = {
                                    id: item.id,
                                    product_serial: item.product_serial,
                                    category: item.category,
                                    sub_category: item.sub_category,
                                    product_name: item.product_name,
                                    cost: estimated_cost,
                                    details: details
                                };
                                Object.assign(newRepairObj, newObj);
                            });

                            let repairTableData = [newRepairObj];
                            this.setState({
                                repairTableData: [...this.state.repairTableData, ...repairTableData]
                            }, () => this.setState({estimated_cost: '', details: '', file_name: ''}, () => { return file.value = "";}))
                        })
                    })
                })
                .catch(err => {
                    console.log(err.response);
                });
        })
    };

    cancelRepair = id => {
        const {repairData, repairCredential, repairTableData} = this.state;
        this.setState({
            repairData: repairData.filter(item => item.id !== id),
            repairCredential: repairCredential.filter(item => item.id !== id),
            repairTableData: repairTableData.filter(item => item.id !== id)
        });
    };

    handleSubmit = () => {
        axios.post(apiUrl() + 'asset-repair/store', this.getFormData())
            .then(res => {
                const {success, msg} = res.data;
                this.setState({
                    repairData: [],
                    repairCredential: [],
                    repairTableData: [],
                    success: success,
                    successMessage: success && msg
                }, () => {
                    this.emptyStateValue();
                    setTimeout(() => {
                        window.location.reload();
                    }, 2300);
                })
            })
            .catch(err => {
                const {error, msg} = err.response.data;
                if (msg) this.setState({error: error, errorMessage: error && msg}, () => {
                    setTimeout(() => {
                        this.setState({
                            error: false
                        })
                    }, 2300);
                });
                console.log(err.response);
            })
    };

    getFormData = () => {
        const {repairCredential, user: {id, location_id, role_id}} = this.state;
        let jsonData = [];
        let data;

        repairCredential.length && repairCredential.map(item => {
            if (location_id !== 0 && role_id !== 0) {
                data = {
                    location_id: location_id,
                    role_id: role_id,
                    user_id: id,
                    asset_id: item.id,
                    estimated_cost: item.estimated_cost,
                    details: item.details
                };
            } else {
                data = {
                    user_id: id,
                    asset_id: item.id,
                    estimated_cost: item.estimated_cost,
                    details: item.details
                };
            }

            jsonData.push(data);
        });

        let formData = new FormData();
        formData.append('jsonData', JSON.stringify(jsonData));

        repairCredential.length && repairCredential.map((item) => {
            formData.append('file', item.file_name);
        });

        return formData;
    };

    getApiData = () => {
        const {category_id, sub_category_id, product_id, product_serial, estimated_cost, details, file_name, is_disposal, user: {id}} = this.state;
        return {
            user_id: id,
            category_id,
            sub_category_id,
            product_id,
            product_serial,
            estimated_cost,
            details,
            file_name,
            is_disposal
        }
    };

    validate = () => {
        const {
            category_id, sub_category_id, product_id, product_serial, estimated_cost, details, file_name
        } = this.state;

        let errorDict = {
            category_id: category_id !== '',
            sub_category_id: sub_category_id !== '',
            product_id: product_id !== '',
            product_serial: product_serial !== '',
            estimated_cost: estimated_cost !== '',
            details: details !== '',
            file_name: (file_name.name ? file_name.name : file_name) !== ''
        };

        this.setState({errorDict});
        return errorDict;
    };

    emptyStateValue = () => {
        this.setState({
            category_id: '',
            sub_category_id: '',
            product_id: '',
            product_serial: '',
            estimated_cost: '',
            details: '',
            file_name: ''
        });
    };

    setTableWidth = () => {
        let table = document.getElementById('__table_react');
        if (table) table.style.width = '100%';
    };

    render() {
        const {
            category_id, sub_category_id, product_id, product_serial, success, successMessage, error, errorMessage,
            errorDict, isLoading, repairData, repairTableData, estimated_cost, details, file_name, extError
        } = this.state;

        repairTableData.length > 0 && this.setTableWidth();

        return (
            <>
                {error &&
                <ErrorModal errorMessage={errorMessage}/>
                }
                {success &&
                <SuccessModal successMessage={successMessage}/>
                }
                <div className="px-2 my-2 ui-dataEntry">
                    <div className={`bg-white rounded p-2 admin-input-height position-relative ui-overflow`}>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Asset Repair/Maintenance</p>
                        </nav>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Category</label>
                            <select name={'category_id'} value={category_id}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Category</option>
                                <AssetCategoryByUserOption/>
                            </select>
                            {errorDict && !errorDict.category_id &&
                            <span className="error">Category Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Sub Category</label>
                            <select name={'sub_category_id'} value={sub_category_id}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Sub Category</option>
                                <AssetSubCategoryByUserOption
                                    category_id={category_id}/>
                            </select>
                            {errorDict && !errorDict.sub_category_id &&
                            <span className="error">Sub Category Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Product</label>
                            <select name={'product_id'} value={product_id}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Product</option>
                                <AssetProductByUserOptions category_id={category_id} sub_category_id={sub_category_id}/>
                            </select>
                            {errorDict && !errorDict.product_id &&
                            <span className="error">Product Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Product Serial</label>
                            <select name={'product_serial'} value={product_serial}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Product Serial</option>
                                <AssetListByUserOptions category_id={category_id} sub_category_id={sub_category_id}
                                                        product_id={product_id}/>
                            </select>
                            {errorDict && !errorDict.product_serial &&
                            <span className="error">Product Serial Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Cost</label>
                            <input
                                placeholder='Cost'
                                name={'estimated_cost'}
                                value={estimated_cost}
                                data-number={'float_only'}
                                onChange={this.handleChange}
                                className={`ui-custom-input`}/>
                            {errorDict && !errorDict.estimated_cost &&
                            <span className="error">Cost Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Repair Details</label>
                            <textarea onChange={this.handleChange} value={details}
                                      className="ui-custom-input " name={'details'}
                                      placeholder="Details"/>
                            {errorDict && !errorDict.details &&
                            <span className="error">Repair Details Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2 w-100">
                            <div className="ui-custom-file">
                                <input type="file" onChange={this.handleChange} name={'file_name'}
                                       className="custom-file-input" id="validatedCustomFile"/>
                                <label className={'w-100'} htmlFor="validatedCustomFile">{file_name ? file_name.name ? file_name.name.substr(0, 20) + '...' : file_name.substr(0, 20) + '...' : 'Choose File'}</label>
                                <div className="bottom w-100">
                                    JPG | JPEG | PNG | DOC | PDF | XLSX Allowed
                                </div>
                            </div>
                            {errorDict && !errorDict.file_name &&
                            <>
                                <span className="error">File Name Field is required</span>
                                <br/>
                            </>
                            }
                            {extError &&
                            <span className="error">Only png, jpg, jpeg, doc, docx, pdf, xlsx file format is allowed!</span>
                            }
                        </div>
                        <button onClick={this.addRepair} className="submit-btn-normal mt-5">Add Into List</button>
                    </div>
                    <div className="rounded bg-white admin-input-height p-2">
                        <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Asset Repair/Maintenance List</p>
                        </nav>
                        {isLoading ? <Spinner/> : repairTableData.length ? <>
                            <PrimeDataTable
                                remove={this.cancelRepair}
                                data={repairTableData}
                            />
                        </> : <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> Currently
                            There are No Repair/Maintenance Asset</h4>}
                        {repairData.length ?
                            <button className="submit-btn-normal mt-3" data-toggle="modal"
                                    data-target="#assetRepairModal">Submit</button> : ''}
                    </div>
                    <div className="modal fade" id="assetRepairModal" tabIndex="-1" role="dialog"
                         aria-labelledby="assetRepairModal" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title"
                                        id="exampleModalLabel">{repairData.length > 1 ? 'Assets' : 'Asset'} Repair/Maintenance</h5>
                                    <button type="button" className="close" data-dismiss="modal"
                                            aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to
                                        Repair/Maintenance {repairData.length > 1 ? 'these assets' : 'this asset'} ?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            data-dismiss="modal">Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal"
                                            onClick={this.handleSubmit}>Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default RepairMaintenenceComponent;