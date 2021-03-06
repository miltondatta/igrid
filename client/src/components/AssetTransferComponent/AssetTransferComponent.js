import React, {Component} from 'react'
import jwt from 'jsonwebtoken';
import {withRouter} from 'react-router-dom'
import AssetCategoryByUserOption from "../../utility/component/assetCategoryByUserOption";
import AssetSubCategoryByUserOption from "../../utility/component/assetSubCategoryByUserOption";
import AssetProductByUserOptions from "../../utility/component/assetProductByUserOptions";
import AssetListByUserOptions from "../../utility/component/assetListByUserOptions";
import LocationsOptions from "../../utility/component/locationOptions";
import UserOptionsByLocation from "../../utility/component/userOptionsByLocation";
import axios from "axios";
import {apiUrl} from "../../utility/constant";
import '../../module/data-table-react/reactDataTable.css';

import Spinner from "../../layouts/Spinner";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";
import NodataFound from "../../utility/component/nodataFound";

class AssetTransferComponent extends Component {

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
            transferTableData: [],
            subLocation: []
        };
    }

    componentDidMount() {
        const {state} = this.props.location
        if (state) {
            if (state.transfer_request) {
                setTimeout(() => {
                    this.setState({
                        user_id: state.req_user_id,
                        category_id: state.category_id,
                    })
                }, 500)
                setTimeout(() => {
                    this.setState({
                        sub_category_id: state.sub_category_id
                    })
                }, 800)
            }
        }
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
        const {state} = this.props.location
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
        }, () => {
            setTimeout(() => {
                this.setState({
                    error: false
                })
            }, 2300);
        });

        this.setState({isLoading: true}, () => {
            axios.post(apiUrl() + 'assets-entry/all/by/credentials', this.getFormData())
                .then(res => {
                    if (!res.data[0].length) return this.setState({
                        error: true,
                        errorMessage: 'There is no asset found for Transfer!',
                        isLoading: false
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                error: false
                            })
                        }, 2300);
                    });
                    this.setState({
                        transferData: [...transferData, ...res.data[0]],
                        isLoading: false
                    }, () => {
                        res.data[0].map(item => {
                            Object.keys(item).map(val => {
                                if (val === 'id') Object.assign(newTransfer, {id: item[val]});
                            });
                        });

                        if (user_id) Object.assign(newTransfer, {assign_to: user_id});
                        let newTransferArray = [newTransfer];

                        if (!state) {
                            this.setState({
                                parent_id: 1,
                                user_id: '',
                            })
                        }

                        this.setState({
                            transferCredential: [...transferCredential, ...newTransferArray],
                            subLocation: []
                        }, () => {
                            let newTransferObj = {};
                            this.state.transferData.length > 0 && this.state.transferData.map(item => {
                                const newObj = {
                                    id: item.id,
                                    product_serial: item.product_serial,
                                    category: item.category,
                                    sub_category: item.sub_category,
                                    product_name: item.product_name
                                };
                                Object.assign(newTransferObj, newObj);
                            });

                            let transferTableData = [newTransferObj];
                            this.setState({
                                transferTableData: [...this.state.transferTableData, ...transferTableData]
                            }, () => this.getSubLocation(this.state.parent_id))
                        })
                    })
                })
                .catch(err => {
                    console.log(err.response);
                });
        })
    };

    cancelTransfer = id => {
        const {transferData, transferCredential, transferTableData} = this.state;
        this.setState({
            transferData: transferData.filter(item => item.id !== id),
            transferCredential: transferCredential.filter(item => item.id !== id),
            transferTableData: transferTableData.filter(item => item.id !== id)
        });
    };

    transferRequestSent = () => {
        const {state} = this.props.location
        if(state && state.transfer_request) {
            axios.post(apiUrl() + 'transfer-request/unavailable/' + state.id + '/4')
                .then(res => {
                    if(res.data.status){
                        this.setState({
                            success: true,
                            successMessage: res.data.message
                        }, () => {
                            this.updateRequestQuantity()
                            setTimeout(() => {
                                this.setState({
                                    success: false
                                })
                            }, 2300);
                        })
                    }
                })
        }
    }

    handleSubmit = () => {
        const {transferCredential} = this.state;

        const {state} = this.props.location
        if(state && state.transfer_request) {
            this.setState({
                updatedQuantity: transferCredential.length
            })
        }

        axios.post(apiUrl() + 'asset-transfer/by/credentials', {transferCredential})
            .then(res => {
                const {success, msg} = res.data;
                this.setState({
                    transferData: [],
                    transferCredential: [],
                    success: success,
                    successMessage: success && msg
                }, () => {
                    this.emptyStateValue();
                    this.transferRequestSent()
                    window.history.pushState(null, '');
                    setTimeout(() => {
                        window.location.reload();
                    }, 2300);
                })
            })
            .catch(err => {
                const {error, msg} = err.response.data;
                if (msg) {
                    this.setState({
                        error: error,
                        errorMessage: error && msg
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                error: false
                            })
                        }, 2300);
                    })
                }
                console.log(err.response);
            })
    };

    updateRequestQuantity = () => {
        const {state} = this.props.location
        const {updatedQuantity} = this.state
        const payload = {quantity: updatedQuantity}
        if (state && state.transfer_request) {
            axios.put(apiUrl() + 'transfer-request/update/' + state.id, payload)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

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
        const {state} = this.props.location
        const {
            category_id, sub_category_id, product_id, product_serial, parent_id, user_id
        } = this.state;

        let errorDict = {
            category_id: category_id !== '',
            sub_category_id: sub_category_id !== '',
            product_id: product_id !== '',
            product_serial: product_serial !== '',
            user_id: user_id !== ''
        };

        if (!state){
            errorDict[parent_id] = parent_id !== ''
        }

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
        axios.get(apiUrl() + 'locations/render/' + id)
            .then(resData => {
                if (resData.data.length > 0) {
                    this.setState({
                        subLocation: [...subLocation, ...resData.data]
                    })
                }
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
        const {state} = this.props.location
        const {
            category_id, sub_category_id, product_id, product_serial, success, successMessage, error, errorMessage,
            errorDict, isLoading, transferData, parent_id, subLocation, user_id, transferTableData
        } = this.state;

        let subLocationItem = subLocation.length > 0 && subLocation.map((item, index) => (
            <div className="px-1 mb-2" key={index}>
                <label className={'ui-custom-label'}>Select Sub Location {item.location_name}</label>
                <select name={'parent_id'} onChange={this.handleChange} className={`ui-custom-input`}>
                    <option value="">Select Sub Location {item.hierarchy_name}</option>
                    <LocationsOptions selectedId={item.parent_id}/>
                </select>
            </div>));

        const user = jwt.decode(localStorage.getItem('user')).data

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
                        <div className={'ui-transfer-from'}>
                            <nav className="navbar text-center mb-2 pl-2 rounded">
                                <p className="text-blue f-weight-700 f-20px m-0">Transfer From
                                    {state && <button onClick={() => {window.history.pushState(null, ''); window.location.reload()}} className={' ml-2 btn btn-info py-1'}>
                                        <i className="fas fa-chevron-left"></i> Go Back</button>}</p>
                            </nav>
                            <div className="px-1 mb-2">
                                <label className={'ui-custom-label'}>From</label>
                                <input value={user.userName}
                                        disabled={true}
                                        className={`ui-custom-input ui-disabled`} />
                            </div>
                            <div className="px-1 mb-2">
                                <label className={'ui-custom-label'}>Location</label>
                                <input value={user.location_name}
                                        disabled={true}
                                        className={`ui-custom-input ui-disabled`} />
                            </div>
                            <div className="px-1 mb-2">
                                <label className={'ui-custom-label'}>Category</label>
                                <select name={'category_id'} value={category_id}
                                        onChange={this.handleChange}
                                        disabled={(state && state.transfer_request)}
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
                                        disabled={(state && state.transfer_request)}
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
                        </div>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Transfer To
                                {state && <button onClick={() => {window.history.pushState(null, ''); window.location.reload()}} className={' ml-2 btn btn-info py-1'}>
                                    <i className="fas fa-chevron-left"></i> Go Back</button>}</p>
                        </nav>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Parent Location</label>
                            <select name={'parent_id'}
                                    disabled={(state && state.transfer_request)}
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
                                    disabled={(state && state.transfer_request)}
                                    className={`ui-custom-input`}>
                                <option value="">Select User</option>
                                <UserOptionsByLocation userId={state ? state.req_user_id : false} location_id={parent_id && parent_id}/>
                            </select>
                            {errorDict && !errorDict.user_id &&
                            <span className="error">User Field is required</span>
                            }
                        </div>
                        <button onClick={this.addTransfer} className="submit-btn-normal mt-5">Add Transfer</button>
                    </div>

                    <div className="rounded bg-white admin-input-height p-2">
                        <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Transfer List</p>
                        </nav>
                        {isLoading ? <Spinner/> : transferTableData.length > 0 ? <>
                            <PrimeDataTable
                                remove={this.cancelTransfer}
                                data={transferTableData}
                            />
                        </> : <NodataFound />}
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

export default withRouter(AssetTransferComponent);
