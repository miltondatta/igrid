import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";

import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";
import UserRoleOptions from "../../utility/component/userRoleOptions";
import ComCategoryOptions from "../../utility/component/comCategoryOption";
import Spinner from "../../layouts/Spinner";
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";

class ComplaintMappingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            tableData: [],
            cat_id: '',
            role_id: '',
            deleteId: 0,
            deleteModalTitle: '',
            deleteContentName: '',
            editId: null,
            errorDict: null,
            error: false,
            errorMessage: '',
            success: false,
            successMessage: '',
            isLoading: false
        };
    }

    componentDidMount = () => {
        this.getData();
    };

    getData = () => {
        this.setState({
            isLoading: true
        }, () => {
            Axios.get(apiUrl() + 'complaint/mapping/all')
                .then(res => {
                    this.setState({
                        allData: res.data,
                        isLoading: false,
                        tableData: []
                    }, () => {
                        let tableData = [];
                        res.data.length > 0 && res.data.map(item => {
                            let newObj = {
                                id: item.id,
                                category_name: item.comCategory.complaint_name,
                                user_role: item.user_role.role_name
                            };
                            tableData.push(newObj);
                        });
                        this.setState({tableData});
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        })
    };

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        }, () => {
            this.validate();
        });
    };

    handleSubmit = () => {
        if (Object.values(this.validate()).includes(false)) return;
        Axios.post(apiUrl() + 'complaint/mapping/store', this.getApiData())
            .then(res => {
                const {success, msg} = res.data;
                this.setState({
                    allData: [],
                    success: success,
                    successMessage: success && msg
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            success: false
                        })
                    }, 2300);
                    this.emptyStateValue();
                })
            })
            .then(() => {
                this.getData()
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

    updateEdit = (id) => {
        const {allData} = this.state;
        allData.find(item => {
            if (item.id === id) {
                this.setState({
                    editId: id
                }, () => {
                    Object.keys(item).map(val => {
                        this.setState({
                            [val]: item[val]
                        }, () => {
                            this.validate();
                        })
                    })
                });
            }
        })
    };

    updateData = () => {
        if (Object.values(this.validate()).includes(false)) return;
        Axios.post(apiUrl() + 'complaint/mapping/update', this.getApiData())
            .then(resData => {
                const {success, msg} = resData.data;
                this.setState({
                    allData: [],
                    success: success,
                    successMessage: success && msg
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            success: false
                        })
                    }, 2300);
                });
            })
            .then(() => {
                this.getData()
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

    deleteItem = (id) => {
        const data = {id};
        Axios.delete(apiUrl() + 'complaint/mapping/delete', {data})
            .then(resData => {
                const {success, msg} = resData.data;
                this.setState({
                    allData: [],
                    success: success,
                    successMessage: success && msg
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            success: false
                        })
                    }, 2300);
                    this.emptyStateValue();
                    this.getData();
                });
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

    emptyStateValue = () => {
        return this.setState({
            cat_id: '',
            role_id: '',
            editId: null,
            errorDict: null,
            deleteId: 0,
            deleteModalTitle: '',
            deleteContentName: ''
        });
    };

    validate = () => {
        const {cat_id, role_id} = this.state;

        let errorDict = {
            cat_id: cat_id !== '',
            role_id: role_id !== ''
        };

        this.setState({errorDict});
        return errorDict;
    };

    getApiData = () => {
        const {editId, cat_id, role_id} = this.state;

        return ({
            id: editId,
            cat_id,
            role_id
        });
    };

    docDeleteModal = id => {
        const {tableData} = this.state;
        tableData.length && tableData.find(item => {
            if (item.id === id) {
                this.setState({
                    deleteId: item.id,
                    deleteContentName: 'this item',
                    deleteModalTitle: 'Delete Complaint Mapping'
                });
            }
        });
    };

    render() {
        const {
            error, errorMessage, isLoading, success, successMessage, deleteId, deleteContentName, deleteModalTitle, tableData, cat_id,
            role_id, errorDict, editId
        } = this.state;

        return (
            <>
                {error &&
                <ErrorModal errorMessage={errorMessage}/>
                }
                {success &&
                <SuccessModal successMessage={successMessage}/>
                }

                <div className="px-2 my-2 ui-dataEntry">
                    <div
                        className={`bg-white rounded p-2 admin-input-height overflow-y-auto overflow-x-hidden position-relative`}>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Complaint Mapping</p>
                        </nav>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Complaint Category</label>
                            <select name={'cat_id'} value={cat_id} onChange={this.handleChange}
                                    className={`ui-custom-input ${errorDict && !errorDict.cat_id ? 'is-invalid' : ''}`}>
                                <option value="">Select Complaint Category</option>
                                <ComCategoryOptions/>
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>User Role</label>
                            <select name={'role_id'} value={role_id} onChange={this.handleChange}
                                    className={`ui-custom-input ${errorDict && !errorDict.role_id ? 'is-invalid' : ''}`}>
                                <option value="">Select User Role</option>
                                <UserRoleOptions/>
                            </select>
                        </div>
                        {editId === null ?
                            <button className="submit-btn-normal mt-5" onClick={this.handleSubmit}>Submit</button> : <>
                                <button className="submit-btn-normal mr-2 mt-5" onClick={this.updateData}>Update
                                </button>
                                <button className="reset-btn-normal mt-5" onClick={this.emptyStateValue}>Go Back
                                </button>
                            </>}
                    </div>
                    <div className="rounded bg-white admin-input-height">
                        <nav className="navbar text-center mb-2 pl-3 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Complaint Mapping List</p>
                        </nav>
                        {isLoading ? <Spinner/> : tableData.length > 0 ? <>
                            <PrimeDataTable
                                edit
                                docDelete
                                data={tableData}
                                updateEdit={this.updateEdit}
                                docDeleteModal={this.docDeleteModal}
                            />
                            <div className="modal fade" id="docDeleteModal" tabIndex="-1" role="dialog"
                                 aria-labelledby="docDeleteModal" aria-hidden="true">
                                <div className="modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">{deleteModalTitle}</h5>
                                            <button type="button" className="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Are you sure you want to delete {deleteContentName}?</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary"
                                                    data-dismiss="modal">Cancel
                                            </button>
                                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                                                    onClick={() => this.deleteItem(deleteId)}>Delete Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </> : <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> Currently
                            There are No Data</h4>}
                    </div>
                </div>
            </>
        );
    }
}

export default ComplaintMappingComponent;