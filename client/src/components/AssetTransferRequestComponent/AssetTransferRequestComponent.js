import React, {Component} from 'react';
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";
import LocationsOptions from "../../utility/component/locationOptions";
import AssetCategoryByUserOption from "../../utility/component/assetCategoryByUserOption";
import AssetSubCategoryByUserOption from "../../utility/component/assetSubCategoryByUserOption";
import UserOptionsByLocation from "../../utility/component/userOptionsByLocation";
import Spinner from "../../layouts/Spinner";
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";
import axios from "axios";
import {apiUrl} from "../../utility/constant";
import jwt from "jsonwebtoken";

class AssetTransferRequestComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            successMessage: '',
            error: false,
            errorMessage: '',
            category_id: '',
            sub_category_id: '',
            details: '',
            quantity: '',
            errorDict: null,
            subLocation: [],
            transferData: [],
            transferCredential: [],
            transferTableData: [],
        }
    }

    componentDidMount() {
        const user = jwt.decode(localStorage.getItem('user')).data;
        if (Object.keys(user).length) this.setState({user});
    }

    validate = () => {
        const {
            category_id, sub_category_id, parent_id, user_id, details, quantity} = this.state;

        let errorDict = {
            category_id: typeof category_id !== 'undefined' && category_id !== '',
            sub_category_id: typeof sub_category_id !== 'undefined' && sub_category_id !== '',
            parent_id: typeof parent_id !== 'undefined' && parent_id !== '',
            details: typeof details !== 'undefined' && details !== '',
            user_id: typeof user_id !== 'undefined' && user_id !== '',
            quantity: typeof quantity !== 'undefined' && quantity !== ''
        };

        this.setState({errorDict});
        return errorDict;
    };

    handleChange = e => {
        const {name, value} = e.target;
        let name_list = ['category_id', 'sub_category_id', 'parent_id'];
        if (name_list.includes(name) && value === '') return false;

        this.setState({
            [name]: value
        }, () => {
            this.handleFilter(name, value);
            this.validate()
        })
    };

    handleFilter = (name, value) => {
        if (name === 'category_id') {
            this.setState({
                sub_category_id: '',
            }, () => this.validate());
        }
        if (name === 'parent_id') this.getSubLocation(value);
    };

    getFormData = () => {
        const {category_id, sub_category_id, user: {id}, details, quantity} = this.state;

        return {
            request_from: id,
            category_id,
            details,
            quantity,
            sub_category_id,
        }
    };

    addTransfer = () => {
        if (Object.values(this.validate()).includes(false)) return false;
        const {transferData, transferCredential, category_id, sub_category_id, user_id} = this.state;
        const newTransfer = this.getFormData();

        const isExistTransfer = transferCredential.filter(item => {
            return (item.category_id === category_id && item.sub_category_id === sub_category_id);
        });

        if (isExistTransfer.length > 0) return this.setState({
            error: true,
            errorMessage: 'This Asset is already added in Transfer list!'
        }, () => {
            setTimeout(() => {
                this.setState({
                    error: false
                })
            }, 2300);
        });

        this.setState({isLoading: true}, () => {
            axios.get(apiUrl() + `cat-subcat-name/${newTransfer.category_id}/${newTransfer.sub_category_id}`)
                .then(res => {
                    this.setState({
                        transferData: [...transferData, res.data],
                        isLoading: false
                    }, () => {
                        if (user_id) Object.assign(newTransfer, {request_to: user_id});
                        this.setState({
                            transferCredential: [...transferCredential, newTransfer],
                            parent_id: 1,
                            user_id: '',
                            subLocation: []
                        }, () => {
                            let newTransferObj = {};
                            this.state.transferData.length > 0 && this.state.transferData.map((item, index) => {
                                const newObj = {
                                    id: index,
                                    category: item[0].category_name,
                                    sub_category: item[0].sub_category,
                                    details: this.state.details
                                };
                                Object.assign(newTransferObj, newObj);
                            });

                            let transferTableData = [newTransferObj];
                            this.setState({
                                transferTableData: [...this.state.transferTableData, ...transferTableData]
                            }, () => {
                                this.setState({
                                    category_id: '',
                                    sub_category_id: '',
                                    parent_id: '',
                                    details: '',
                                    user_id: ''
                                })
                            })
                        })
                    })
                })
                .catch(err => {
                    console.log(err.response);
                });
        })
    };

    handleSubmit = () => {
        const {transferCredential} = this.state;
        axios.post(apiUrl() + 'transfer-request/entry', transferCredential)
            .then(res => {
                if (res.data.status){
                    this.setState({
                        transferTableData: [],
                        success: true,
                        successMessage: res.data.message,
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                success: false,
                            })
                        }, 2300)
                    })
                } else {
                    this.setState({
                        error: true,
                        errorMessage: res.data.message,
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                error: false,
                            })
                        }, 2300)
                    })
                }
            })
    }

    getSubLocation = id => {
        const {subLocation, hierarchy} = this.state;
        if (subLocation.filter(item => item.parent_id === parseInt(id)).length) return false;
        axios.get(apiUrl() + 'locations/render/' + id)
            .then(resData => {
                if (resData.data.length > 0) {
                    this.setState({
                        subLocation: [...subLocation, ...resData.data],
                    })
                }
            })
    };

    cancelTransfer = id => {
        const {transferData, transferCredential, transferTableData} = this.state;
        this.setState({
            transferData: transferData.filter((item, index) => index !== id),
            transferCredential: transferCredential.filter((item, index) => index !== id),
            transferTableData: transferTableData.filter((item, index) => index !== id)
        });
    };

    render() {
        const {
            category_id, sub_category_id, success, successMessage, error, errorMessage, details, transferCredential, quantity,
            errorDict, isLoading, transferData, parent_id, subLocation, user_id, transferTableData
        } = this.state;

        let subLocationItem = subLocation.length > 0 && subLocation.map((item, index) => (
            <div className="px-1 mb-2" key={index}>
                <label className={'ui-custom-label'}>Select Sub Location {item.hierarchy_name}</label>
                <select name={'parent_id'} onChange={this.handleChange} className={`ui-custom-input`}>
                    <option value="">Select Sub Location {item.location_name}</option>
                    <LocationsOptions selectedId={item.parent_id}/>
                </select>
            </div>));


        return (
            <>
                {error &&
                    <ErrorModal errorMessage={errorMessage}/>
                }
                {success &&
                    <SuccessModal successMessage={successMessage}/>
                }
                <div className="px-2 my-2 ui-dataEntry">
                    <div className={`bg-white rounded p-2 admin-input-height position-relative`}>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Asset Transfer Request</p>
                        </nav>
                        <div className={`px-1 mb-2`}>
                            <label className={'ui-custom-label'}>Category</label>
                            <select name={`category_id`} value={category_id}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input ${errorDict && !errorDict.category_id && 'is-invalid'}`}>
                                <option value="">Select Category</option>
                                <AssetCategoryByUserOption/>
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Sub Category</label>
                            <select name={'sub_category_id'} value={sub_category_id}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input ${errorDict && !errorDict.sub_category_id && 'is-invalid'}`}>
                                <option value="">Select Sub Category</option>
                                <AssetSubCategoryByUserOption
                                    category_id={category_id}/>
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Details</label>
                            <input name={'details'}
                                   value={details}
                                   onChange={this.handleChange}
                                   className={`ui-custom-input ${errorDict && !errorDict.details && 'is-invalid'}`}
                                   placeholder={'Details'}
                            />
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Quantity</label>
                            <input name={'quantity'}
                                   value={quantity}
                                   onChange={this.handleChange}
                                   className={`ui-custom-input ${errorDict && !errorDict.quantity && 'is-invalid'}`}
                                   placeholder={'Quantity'}
                            />
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
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>User</label>
                            <select name={'user_id'} value={user_id}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input ${errorDict && !errorDict.user_id && 'is-invalid'}`}>
                                <option value="">Select User</option>
                                <UserOptionsByLocation location_id={parent_id && parent_id}/>
                            </select>
                        </div>
                        <button onClick={this.addTransfer} className="submit-btn-normal mt-5">Add Request</button>
                    </div>
                    <div className="rounded bg-white admin-input-height p-2">
                        <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Request List</p>
                        </nav>
                        {isLoading ? <Spinner/> : transferTableData.length > 0 ? <>
                            <PrimeDataTable
                                remove={this.cancelTransfer}
                                data={transferTableData}
                            />
                        </> : <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> Currently
                            There are No Transfer Asset</h4>}
                        {transferTableData.length ?
                            <button className="submit-btn-normal mt-3" data-toggle="modal" data-target="#assetTransferModal">Submit</button> : ''}
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
                                        request {transferCredential.length > 1 ? 'these assets' : 'this asset'} ?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            data-dismiss="modal">Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal"
                                            onClick={this.handleSubmit}>Request Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AssetTransferRequestComponent;