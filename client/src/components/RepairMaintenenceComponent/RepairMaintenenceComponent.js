import React, {Component} from 'react'
import jwt from 'jsonwebtoken';
import AssetCategoryByUserOption from "../../utility/component/assetCategoryByUserOption";
import AssetSubCategoryByUserOption from "../../utility/component/assetSubCategoryByUserOption";
import AssetProductByUserOptions from "../../utility/component/assetProductByUserOptions";
import AssetListByUserOptions from "../../utility/component/assetListByUserOptions";
import axios from "axios";
import {apiUrl} from "../../utility/constant";

class RepairMaintenenceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            category_id: '',
            category_name: '',
            sub_category_id: '',
            sub_category_name: '',
            product_id: '',
            product_name: '',
            product_serial: '',
            estimated_cost: '',
            details: '',
            file_name: '',
            success: false,
            successMessage: '',
            error: false,
            errorMessage: '',
            errorDict: null,
            isLoading: false,
            repairData: [],
            repairCredential: []
        };

        this.table_header = [
            "Product Serial",
            "Product",
            "Category",
            "Sub Category",
            "Cost of Purchase",
            "Book Value",
            "Salvage Value",
            "Useful Life",
            "Disposal Reason",
            "Action"
        ];
    }

    componentDidMount() {
        const user = jwt.decode(localStorage.getItem('user')).data;
        if (Object.keys(user).length) this.setState({user});
    }

    handleChange = e => {
        const {name, value} = e.target;
        let name_list = ['category_id', 'sub_category_id', 'product_id', 'product_serial'];
        if (name_list.includes(name) && value === '') return false;

        this.setState({
            [name]: value
        }, () => {
            if (name === 'category_id') this.setState({
                sub_category_id: '',
                product_id: '',
                product_serial: ''
            }, () => this.validate());
            if (name === 'sub_category_id') this.setState({product_id: '', product_serial: ''}, () => this.validate());
            if (name === 'product_id') this.setState({product_serial: ''}, () => this.validate());
            this.validate()
        })
    };

    addDisposal = () => {
        if (Object.values(this.validate()).includes(false)) return false;
        const {repairData, repairCredential, category_id, sub_category_id, product_id, product_serial} = this.state;
        const newDisposal = this.getFormData();

        const isExistDisposal = repairCredential.filter(item => {
            return (item.category_id === category_id && item.sub_category_id === sub_category_id && item.product_id === product_id &&
                item.product_serial === product_serial);
        });
        if (isExistDisposal.length) return this.setState({
            error: true,
            errorMessage: 'This Asset is already added in disposal list!'
        });

        this.setState({isLoading: true}, () => {
            axios.post(apiUrl() + 'assets-entry/all/by/credentials', this.getFormData())
                .then(res => {
                    if (!res.data[0].length) return this.setState({
                        error: true,
                        errorMessage: 'There is no asset found for disposal!',
                        isLoading: false,
                        success: false
                    });
                    this.setState({
                        repairData: [...repairData, ...res.data[0]],
                        error: false,
                        isLoading: false
                    }, () => {
                        res.data[0].map(item => {
                            Object.keys(item).map(val => {
                                if (val === 'id') Object.assign(newDisposal, {id: item[val]});
                            });
                        });

                        let newDisposalArray = [newDisposal];
                        this.setState({
                            repairCredential: [...repairCredential, ...newDisposalArray]
                        }, () => this.setState({disposal_reason: ''}))
                    })
                })
                .catch(err => {
                    console.log(err.response);
                });
        })
    };

    cancelDisposal = index => {
        const {repairData, repairCredential} = this.state;
        this.setState({
            repairData: repairData.filter((item, key) => key !== index),
            repairCredential: repairCredential.filter((item, key) => key !== index)
        });
    };

    handleSubmit = () => {
        const {repairCredential} = this.state;

        axios.post(apiUrl() + 'asset-disposal/by/credentials', {repairCredential})
            .then(res => {
                const {success, msg} = res.data;
                this.setState({
                    repairData: [],
                    repairCredential: [],
                    error: false,
                    success: success,
                    successMessage: success && msg
                }, () => {
                    this.emptyStateValue();
                })
            })
            .catch(err => {
                const {error, msg} = err.response.data;
                if (msg) {
                    this.setState({
                        success: false,
                        error: error,
                        errorMessage: error && msg
                    })
                }
                console.log(err.response);
            })
    };

    getFormData = () => {
        const {
            category_id, sub_category_id, product_id, product_serial, disposal_reason, user: {id}
        } = this.state;

        return {
            user_id: id,
            category_id,
            sub_category_id,
            product_id,
            product_serial,
            disposal_reason,
            is_disposal: false
        }
    };

    validate = () => {
        const {
            category_id, sub_category_id, product_id, product_serial, disposal_reason
        } = this.state;

        let errorDict = {
            category_id: category_id !== '',
            sub_category_id: sub_category_id !== '',
            product_id: product_id !== '',
            product_serial: product_serial !== '',
            disposal_reason: disposal_reason !== ''
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
            disposal_reason: ''
        });
    };

    render() {
        const {
            category_id, sub_category_id, product_id, product_serial, success, successMessage, error, errorMessage,
            errorDict, isLoading, repairData, repairCredential, estimated_cost, details, file_name
        } = this.state;

        let disposal_reason_txt = [];
        repairCredential.length && repairCredential.map(item => {
            Object.keys(item).map(val => {
                if (val === 'disposal_reason') disposal_reason_txt.push(item[val]);
            });
        });

        const table_body = repairData.length && repairData.map((item, index) => (
            <tr key={index}>
                <td>{item.product_serial}</td>
                <td>{item.product_name}</td>
                <td>{item.category_name}</td>
                <td>{item.sub_category_name}</td>
                <td>{item.cost_of_purchase}</td>
                <td>{item.book_value}</td>
                <td>{item.salvage_value}</td>
                <td>{item.useful_life}</td>
                <td>{disposal_reason_txt[index]}</td>
                <td>
                    <span className={'btn btn-danger btn-sm cursor-pointer'} onClick={() => this.cancelDisposal(index)}><i
                        className="fas fa-times"/></span>
                </td>
            </tr>
        ));

        const table_header = this.table_header.length && this.table_header.map((item, index) => (
            <th key={index} scope="col">{item}</th>
        ));

        return (
            <>
                {error &&
                <div
                    className="alert alert-danger mx-3 mt-2 mb-0 position-relative d-flex justify-content-between align-items-center"
                    role="alert">
                    {errorMessage} <i className="fas fa-times " onClick={() => this.setState({error: false})}></i>
                </div>}
                {success &&
                <div
                    className="alert alert-success mx-3 mt-2 mb-0 position-relative d-flex justify-content-between align-items-center"
                    role="alert">
                    {successMessage} <i className="fas fa-times " onClick={() => this.setState({success: false})}></i>
                </div>}
                <div className="px-2 my-2 ui-dataEntry">
                    <div className={`bg-white rounded p-2 min-h-80vh position-relative`}>
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
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Estimated Cost</label>
                            <input
                                placeholder='Estimated Cost'
                                name={'estimated_cost'}
                                value={estimated_cost}
                                onChange={this.handleChange}
                                className={`ui-custom-input`}/>
                            {errorDict && !errorDict.estimated_cost &&
                            <span className="error">Estimated Cost Field is required</span>
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
                        <div className="px-1 mb-2 w-50">
                            <div className="ui-custom-file">
                                <input type="file" onChange={this.handleChange} name={'file_name'}
                                       className="custom-file-input" id="validatedCustomFile"/>
                                <label
                                    htmlFor="validatedCustomFile">{file_name ? file_name.name ? file_name.name.substr(0, 20) + '...' : file_name.substr(0, 20) + '...' : 'Choose File'}</label>
                            </div>
                        </div>
                        <button onClick={this.addDisposal} className="submit-btn">Add Repair-Maintenance</button>
                    </div>
                    <div className="rounded bg-white min-h-80vh p-2">
                        <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Asset Repair/Maintenance List</p>
                        </nav>
                        {isLoading ? <h2>Loading</h2> : repairData.length ? <>
                            <table className="table table-bordered table-responsive">
                                <thead>
                                <tr>
                                    {table_header}
                                </tr>
                                </thead>
                                <tbody>
                                {table_body}
                                </tbody>
                            </table>
                        </> : <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> Currently
                            There are No Repair/Maintenance Asset</h4>}
                        {repairData.length ?
                            <button className="submit-btn" data-toggle="modal"
                                    data-target="#assetDisposalModal">Submit</button> : ''}
                    </div>
                    <div className="modal fade" id="assetDisposalModal" tabIndex="-1" role="dialog"
                         aria-labelledby="assetDisposalModal" aria-hidden="true">
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
                                            onClick={this.handleSubmit}>Repair Now
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