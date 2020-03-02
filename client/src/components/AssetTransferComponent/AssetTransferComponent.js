import React, {Component} from 'react'
import jwt from 'jsonwebtoken';
import AssetCategoryByUserOption from "../../utility/component/assetCategoryByUserOption";
import AssetSubCategoryByUserOption from "../../utility/component/assetSubCategoryByUserOption";
import AssetProductByUserOptions from "../../utility/component/assetProductByUserOptions";
import AssetListByUserOptions from "../../utility/component/assetListByUserOptions";
import LocationsOptions from "../../utility/component/locationOptions";
import UserOptionsByLocation from "../../utility/component/userOptionsByLocation";
import axios from "axios";
import {apiUrl} from "../../utility/constant";

class AssetTransferComponent extends Component {
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
            parent_id: '',
            user_id: '',
            success: false,
            successMessage: '',
            error: false,
            errorMessage: '',
            errorDict: null,
            isLoading: false,
            transferData: [],
            transferCredential: [],
            subLocation: []
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
            "Warranty",
            "Last Warranty Date",
            "Last Effective Date",
            "Condition Type",
            "Action"
        ];
    }

    componentDidMount() {
        const user = jwt.decode(localStorage.getItem('user')).data;
        if (Object.keys(user).length) this.setState({user});
    }

    handleChange = e => {
        const {name, value} = e.target;
        let name_list = ['category_id', 'sub_category_id', 'product_id', 'product_serial', 'parent_id'];
        if (name_list.includes(name) && value === '') return false;

        this.setState({
            [name]: value
        }, () => {
            this.handleFilter(name, value);
            this.validate()
        })
    };

    addTransfer = () => {
        if (Object.values(this.validate()).includes(false)) return false;
        const {transferData, transferCredential, category_id, sub_category_id, product_id, product_serial, user_id} = this.state;
        const newTransfer = this.getFormData();

        const isExistTransfer = transferCredential.filter(item => {
            return (item.category_id === category_id && item.sub_category_id === sub_category_id && item.product_id === product_id &&
                item.product_serial === product_serial);
        });
        if (isExistTransfer.length) return this.setState({
            error: true,
            errorMessage: 'This Asset is already added in Transfer list!'
        });

        this.setState({isLoading: true}, () => {
            axios.post(apiUrl() + 'assets-entry/all/by/credentials', this.getFormData())
                .then(res => {
                    if (!res.data[0].length) return this.setState({
                        error: true,
                        errorMessage: 'There is no asset found for Transfer!',
                        isLoading: false,
                        success: false
                    });
                    this.setState({
                        transferData: [...transferData, ...res.data[0]],
                        error: false,
                        isLoading: false
                    }, () => {
                        res.data[0].map(item => {
                            Object.keys(item).map(val => {
                                if (val === 'id') Object.assign(newTransfer, {id: item[val]});
                            });
                        });

                        if (user_id) Object.assign(newTransfer, {assign_to: user_id});
                        let newTransferArray = [newTransfer];

                        this.setState({
                            transferCredential: [...transferCredential, ...newTransferArray],
                            parent_id: 1,
                            user_id: '',
                            subLocation: []
                        }, () => this.getSubLocation(this.state.parent_id))
                    })
                })
                .catch(err => {
                    console.log(err.response);
                });
        })
    };

    cancelTransfer = index => {
        const {transferData, transferCredential} = this.state;
        this.setState({
            transferData: transferData.filter((item, key) => key !== index),
            transferCredential: transferCredential.filter((item, key) => key !== index)
        });
    };

    handleSubmit = () => {
        const {transferCredential} = this.state;

        axios.post(apiUrl() + 'asset-transfer/by/credentials', {transferCredential})
            .then(res => {
                const {success, msg} = res.data;
                this.setState({
                    transferData: [],
                    transferCredential: [],
                    error: false,
                    success: success,
                    successMessage: success && msg
                }, () => {
                    window.location.reload();
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
            category_id, sub_category_id, product_id, product_serial, user: {id}
        } = this.state;

        return {
            user_id: id,
            category_id,
            sub_category_id,
            product_id,
            product_serial,
            is_disposal: false
        }
    };

    validate = () => {
        const {
            category_id, sub_category_id, product_id, product_serial, parent_id, user_id
        } = this.state;

        let errorDict = {
            category_id: category_id !== '',
            sub_category_id: sub_category_id !== '',
            product_id: product_id !== '',
            product_serial: product_serial !== '',
            parent_id: parent_id !== '',
            user_id: user_id !== ''
        };

        this.setState({errorDict});
        return errorDict;
    };

    handleFilter = (name, value) => {
        if (name === 'category_id') {
            this.setState({
                sub_category_id: '',
                product_id: '',
                product_serial: ''
            }, () => this.validate());
        }
        if (name === 'sub_category_id') this.setState({product_id: '', product_serial: ''}, () => this.validate());
        if (name === 'product_id') this.setState({product_serial: ''}, () => this.validate());
        if (name === 'parent_id') this.getSubLocation(value);
    };

    getSubLocation = id => {
        const {subLocation} = this.state;
        if (subLocation.filter(item => item.parent_id === parseInt(id)).length) return false;
        axios.get(apiUrl() + 'locations/' + id)
            .then(resData => {
                this.setState({
                    subLocation: [...subLocation, ...resData.data]
                })
            })
    };

    emptyStateValue = () => {
        this.setState({
            category_id: '',
            sub_category_id: '',
            product_id: '',
            product_serial: '',
            parent_id: '',
            user_id: ''
        });
    };

    render() {
        const {
            category_id, sub_category_id, product_id, product_serial, success, successMessage, error, errorMessage,
            errorDict, isLoading, transferData, parent_id, subLocation, user_id
        } = this.state;

        const table_body = transferData.length && transferData.map((item, index) => (
            <tr key={index}>
                <td>{item.product_serial}</td>
                <td>{item.product_name}</td>
                <td>{item.category_name}</td>
                <td>{item.sub_category_name}</td>
                <td>{item.cost_of_purchase}</td>
                <td>{item.book_value}</td>
                <td>{item.salvage_value}</td>
                <td>{item.useful_life}</td>
                <td>{item.warranty}</td>
                <td>{item.last_warranty_date}</td>
                <td>{item.last_effective_date}</td>
                <td>{item.condition_type}</td>
                <td>
                    <span className={'btn btn-danger btn-sm cursor-pointer'} onClick={() => this.cancelTransfer(index)}><i
                        className="fas fa-times"/></span>
                </td>
            </tr>
        ));

        const table_header = this.table_header.length && this.table_header.map((item, index) => (
            <th key={index} scope="col">{item}</th>
        ));

        let subLocationItem = subLocation.length > 0 && subLocation.map((item, index) => (
            <div className="px-1 mb-2" key={index}>
                <label className={'ui-custom-label'}>Select Sub Location {item.location_name}</label>
                <select name={'parent_id'} onChange={this.handleChange} className={`ui-custom-input`}>
                    <option value="">Select Sub Location {item.location_name}</option>
                    <LocationsOptions selectedId={item.parent_id}/>
                </select>
            </div>));

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
                            <p className="text-blue f-weight-700 f-20px m-0">Asset Transfer</p>
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
                            <label className={'ui-custom-label'}>Parent Location</label>
                            <select name={'parent_id'}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Parent</option>
                                <LocationsOptions selectedId={0}/>
                            </select>
                        </div>
                        {subLocationItem}
                        <div className="px-1 mb-20p">
                            <label className={'ui-custom-label'}>User</label>
                            <select name={'user_id'} value={user_id}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select User</option>
                                <UserOptionsByLocation location_id={parent_id && parent_id - 1}/>
                            </select>
                            {errorDict && !errorDict.user_id &&
                            <span className="error">User Field is required</span>
                            }
                        </div>
                        <button onClick={this.addTransfer} className="submit-btn">Add Transfer</button>
                    </div>
                    <div className="rounded bg-white min-h-80vh p-2">
                        <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Transfer List</p>
                        </nav>
                        {isLoading ? <h2>Loading</h2> : transferData.length ? <>
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
                            There are No Transfer Asset</h4>}
                        {transferData.length ?
                            <button className="submit-btn" data-toggle="modal"
                                    data-target="#assetTransferModal">Submit</button> : ''}
                    </div>
                    <div className="modal fade" id="assetTransferModal" tabIndex="-1" role="dialog"
                         aria-labelledby="assetTransferModal" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title"
                                        id="exampleModalLabel">{transferData.length > 1 ? 'Assets' : 'Asset'} Transfer</h5>
                                    <button type="button" className="close" data-dismiss="modal"
                                            aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to
                                        transfer {transferData.length > 1 ? 'these assets' : 'this asset'} ?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            data-dismiss="modal">Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal"
                                            onClick={this.handleSubmit}>Transfer Now
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

export default AssetTransferComponent;