import React, {Component} from 'react'
import jwt from 'jsonwebtoken';
import AssetCategoryByUserOption from "../../utility/component/assetCategoryByUserOption";
import AssetSubCategoryByUserOption from "../../utility/component/assetSubCategoryByUserOption";
import AssetProductByUserOptions from "../../utility/component/assetProductByUserOptions";
import AssetListByUserOptions from "../../utility/component/assetListByUserOptions";
import axios from "axios";
import {apiUrl} from "../../utility/constant";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";

class AssetDisposalComponent extends Component {
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
            disposal_reason: '',
            success: false,
            successMessage: '',
            error: false,
            errorMessage: '',
            errorDict: null,
            isLoading: false,
            disposalData: [],
            disposalCredential: []
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
        const {disposalData, disposalCredential, category_id, sub_category_id, product_id, product_serial} = this.state;
        const newDisposal = this.getFormData();

        const isExistDisposal = disposalCredential.filter(item => {
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
                        disposalData: [...disposalData, ...res.data[0]],
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
                            disposalCredential: [...disposalCredential, ...newDisposalArray]
                        }, () => this.setState({disposal_reason: ''}))
                    })
                })
                .catch(err => {
                    console.log(err.response);
                });
        })
    };

    cancelDisposal = index => {
        const {disposalData, disposalCredential} = this.state;
        this.setState({
            disposalData: disposalData.filter((item, key) => key !== index),
            disposalCredential: disposalCredential.filter((item, key) => key !== index)
        });
    };

    handleSubmit = () => {
        const {disposalCredential} = this.state;

        axios.post(apiUrl() + 'asset-disposal/by/credentials', {disposalCredential})
            .then(res => {
                const {success, msg} = res.data;
                this.setState({
                    disposalData: [],
                    disposalCredential: [],
                    error: false,
                    success: success,
                    successMessage: success && msg
                }, () => {
                    window.location.reload();
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
            category_id, sub_category_id, product_id, product_serial, disposal_reason, success, successMessage, error, errorMessage,
            errorDict, isLoading, disposalData, disposalCredential
        } = this.state;

        let disposal_reason_txt = [];
        disposalCredential.length && disposalCredential.map(item => {
            Object.keys(item).map(val => {
                if (val === 'disposal_reason') disposal_reason_txt.push(item[val]);
            });
        });

        const table_body = disposalData.length && disposalData.map((item, index) => (
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
                <ErrorModal errorMessage={errorMessage} />
                }
                {success &&
                <SuccessModal successMessage={successMessage} />
                }
                <div className="px-2 my-2 ui-dataEntry">
                    <div className={`bg-white rounded p-2 max-h-80vh position-relative`}>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Asset Disposal</p>
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
                            <label className={'ui-custom-label'}>Disposal Reason</label>
                            <textarea onChange={this.handleChange} value={disposal_reason}
                                      className="ui-custom-input " name={'disposal_reason'}
                                      placeholder="Disposal Reason"/>
                            {errorDict && !errorDict.disposal_reason &&
                            <span className="error">Disposal Reason Field is required</span>
                            }
                        </div>
                        <button onClick={this.addDisposal} className="submit-btn">Add Disposal</button>
                    </div>
                    <div className="rounded bg-white max-h-80vh p-2">
                        <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Disposal List</p>
                        </nav>
                        {isLoading ? <h2>Loading</h2> : disposalData.length ? <>
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
                            There are No Disposal Asset</h4>}
                        {disposalData.length ?
                            <button className="submit-btn" data-toggle="modal"
                                    data-target="#assetDisposalModal">Submit</button> : ''}
                    </div>
                    <div className="modal fade" id="assetDisposalModal" tabIndex="-1" role="dialog"
                         aria-labelledby="assetDisposalModal" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title"
                                        id="exampleModalLabel">{disposalData.length > 1 ? 'Assets' : 'Asset'} Disposal</h5>
                                    <button type="button" className="close" data-dismiss="modal"
                                            aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to
                                        disposal {disposalData.length > 1 ? 'these assets' : 'this asset'} ?</p>
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

export default AssetDisposalComponent;