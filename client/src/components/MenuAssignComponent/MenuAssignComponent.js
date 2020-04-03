import React, {Component} from "react";
import axios from 'axios';
import {apiUrl} from "../../utility/constant";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";
import Spinner from "../../layouts/Spinner";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import ModuleOptions from "../../utility/component/moduleOptions";
import UserRoleOptions from "../../utility/component/userRoleOptions";

class MenuAssignComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuAssignData: [],
            menuAssignTableData: [],
            menu_list: [],
            sub_menu_list: [],
            role_id: '',
            module_id: '',
            menu_id: '',
            sub_menu_id: '',
            editId: null,
            success: false,
            error: false,
            successMessage: '',
            errorMessage: '',
            errorObj: null,
            isLoading: false,
            deleteId: 0,
            deleteModalTitle: '',
            deleteContentName: ''
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        this.setState({
            isLoading: true
        }, () => {
            axios.get(apiUrl() + 'menu/assign/data')
                .then(res => {
                    this.setState({
                        menuAssignData: [],
                        isLoading: false,
                        menuAssignTableData: []
                    }, () => {
                        let menuAssignTableData = [];
                        let menu_name = '';
                        res.data.length > 0 && res.data.map(item => {
                            if (item.parent_id === 0) menu_name = item.menu_name;
                            res.data.find(val => {
                                if (val.menus_id === item.parent_id) return menu_name = val.menu_name;
                            });
                            let newObj = {
                                id: item.id,
                                role_name: item.role_name,
                                module_name: item.module_name === null ? 'N/A' : item.module_name,
                                menu_name: menu_name,
                                sub_menu: item.sub_menu
                            };
                            menuAssignTableData.push(newObj);
                        });

                        this.setState({menuAssignData: res.data, menuAssignTableData: menuAssignTableData});
                    });
                })
                .catch(err => {
                    console.log(err.response);
                })
        });
    };

    handleChange = (e) => {
        const {name, value} = e.target;
        const {module_id} = this.state;
        switch (name) {
            case "module_id":
                if (!value) return;
                let data = {
                    module_id: value,
                    parent_id: 0
                };
                axios.post(apiUrl() + 'menu/by/credential', data)
                    .then(resData => {
                        this.setState({
                            menu_list: [],
                            sub_menu_list: []
                        }, () => {
                            this.setState({
                                menu_list: resData.data,
                                module_id: value,
                                menu_id: '',
                                sub_menu_id: ''
                            }, () => {
                                this.validate();
                            });
                        })
                    })
                    .catch(err => {
                        console.log(err.response);
                    });
                return;
            case "menu_id":
                if (!value) return;
                axios.post(apiUrl() + 'menu/by/credential', {module_id: module_id, parent_id: value, sub_menu: false})
                    .then(resData => {
                        this.setState({
                            sub_menu_list: []
                        }, () => {
                            this.setState({
                                sub_menu_list: resData.data,
                                menu_id: value,
                                sub_menu_id: ''
                            }, () => {
                                this.validate();
                            });
                        })
                    })
                    .catch(err => {
                        console.log(err.response);
                    });
                return;
            default:
                this.setState({
                    [name]: value
                }, () => {
                    this.validate();
                });
                return;
        }
    };

    handleSubmit = () => {
        if (Object.values(this.validate()).includes(false)) return;
        axios.post(apiUrl() + 'menu/assign/entry', this.getApiData())
            .then(res => {
                const {success, msg} = res.data;
                this.setState({
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
        const {menuAssignData} = this.state;
        menuAssignData.find(item => {
            if (item.id === id) {
                this.setState({
                    editId: id,
                    module_id: item.module_id,
                    role_id: item.role_id
                }, () => {
                    axios.post(apiUrl() + 'menu/by/credential', {module_id: item.module_id, parent_id: 0})
                        .then(resData => {
                            this.setState({
                                menu_list: [],
                                sub_menu_list: []
                            }, () => {
                                this.setState({
                                    menu_list: resData.data,
                                    menu_id: item.menu_name ? item.menus_id : item.parent_id,
                                    sub_menu_id: ''
                                }, () => {
                                    if (!item.sub_menu) return this.setState({sub_menu_list: [], sub_menu_id: ''});
                                    axios.post(apiUrl() + 'menu/by/credential', {
                                        module_id: item.module_id,
                                        parent_id: this.state.menu_id,
                                        sub_menu: false
                                    })
                                        .then(resData => {
                                            this.setState({
                                                sub_menu_list: resData.data,
                                                sub_menu_id: item.sub_menu ? item.menus_id : item.parent_id
                                            }, () => {
                                                this.validate();
                                            });
                                        })
                                        .catch(err => {
                                            console.log(err.response);
                                        });
                                });
                            })
                        })
                        .catch(err => {
                            console.log(err.response);
                        });
                });
            }
        })
    };

    updateData = () => {
        if (Object.values(this.validate()).includes(false)) return;
        axios.post(apiUrl() + '/menu/assign/update', this.getApiData())
            .then(resData => {
                const {success, msg} = resData.data;
                this.setState({
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

    getApiData = () => {
        const {role_id, menu_id, sub_menu_id, editId} = this.state;

        return ({
            id: editId,
            role_id: role_id,
            menu_id: sub_menu_id !== '' ? sub_menu_id : menu_id
        });
    };

    emptyStateValue = () => {
        return this.setState({
            menu_list: [],
            sub_menu_list: [],
            role_id: '',
            menu_type: '',
            module_id: '',
            menu_id: '',
            name: '',
            icon: '',
            sub_menu: false,
            link: '',
            visible: true,
            order_by: '',
            editId: null
        });
    };

    validate = () => {
        const {
            role_id, module_id, menu_id, sub_menu_id, sub_menu_list
        } = this.state;

        let errorObj = {
            role_id: role_id !== '',
            module_id: module_id !== '',
            menu_id: menu_id !== ''
        };

        this.setState({errorObj});
        return errorObj;
    };

    docDeleteModal = id => {
        const {menuAssignTableData} = this.state;
        menuAssignTableData.length && menuAssignTableData.find(item => {
            if (item.id === id) {
                this.setState({
                    deleteId: item.id,
                    deleteContentName: item.sub_menu !== '' ? item.sub_menu : item.menu_name,
                    deleteModalTitle: item.sub_menu !== '' ? 'Delete Sub Menu' : 'Delete Menu'
                });
            }
        });
    };

    deleteItem = (id) => {
        axios.delete(apiUrl() + '/menu/assign/delete/' + id)
            .then(resData => {
                const {success, msg} = resData.data;
                this.setState({
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

    render() {
        const {
            success, error, successMessage, errorMessage, isLoading, menuAssignTableData, deleteId, deleteModalTitle, deleteContentName, module_id, menu_id,
            sub_menu_id, role_id, errorObj, editId, menu_list, sub_menu_list
        } = this.state;

        const menu_list_option = menu_list.length > 0 && menu_list.map((item, index) => (
            <option key={index} value={item.id}>{item.name}</option>
        ));

        const sub_menu_list_option = sub_menu_list.length > 0 && sub_menu_list.map((item, index) => (
            <option key={index} value={item.id}>{item.name}</option>
        ));

        return <>
            {error &&
            <ErrorModal errorMessage={errorMessage}/>
            }
            {success &&
            <SuccessModal successMessage={successMessage}/>
            }
            <div className="px-2 my-1 ui-dataEntry">
                <div className={`bg-white rounded p-2 admin-input-height-max overflow-y-auto`}>
                    <nav className="navbar text-center mb-2 pl-2 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0">Menu Assign Information</p>
                    </nav>
                    <div className="px-1 mb-2">
                        <label htmlFor="inputPassword4" className={'ui-custom-label'}>User Role</label>
                        <select name={'role_id'} value={role_id} onChange={this.handleChange}
                                className={`ui-custom-input`}>
                            <option value="">Select User Role</option>
                            <UserRoleOptions/>
                        </select>
                        {errorObj && !errorObj.role_id &&
                        <span className="error">User Role Field is required</span>
                        }
                    </div>
                    <div className="px-1 mb-2">
                        <label htmlFor="inputPassword4" className={'ui-custom-label'}>Module Name</label>
                        <select name={'module_id'} value={module_id} onChange={this.handleChange}
                                className={`ui-custom-input`}>
                            <option value="">Select Module Name</option>
                            {<ModuleOptions/>}
                        </select>
                        {errorObj && !errorObj.module_id &&
                        <span className="error">Module Name Field is required</span>
                        }
                    </div>
                    <div className="px-1 mb-2">
                        <label htmlFor="inputPassword4" className={'ui-custom-label'}>Menu Name</label>
                        <select name={'menu_id'} value={menu_id} onChange={this.handleChange}
                                className={`ui-custom-input`}>
                            <option value="">Select Menu Name</option>
                            {menu_list_option}
                        </select>
                        {errorObj && !errorObj.menu_id &&
                        <span className="error">Menu Name Field is required</span>
                        }
                    </div>
                    {
                        sub_menu_list.length > 0 &&
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Sub Menu Name</label>
                            <select name={'sub_menu_id'} value={sub_menu_id} onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Sub Menu Name</option>
                                {sub_menu_list_option}
                            </select>
                        </div>
                    }
                    {editId === null ? <button className="submit-btn-normal mt-5"
                                               onClick={this.handleSubmit}>Submit</button> : <>
                        <button className="submit-btn-normal mr-2 mt-5" onClick={this.updateData}>Update</button>
                        <button className="reset-btn-normal mt-5" onClick={this.emptyStateValue}>Go Back</button>
                    </>}
                </div>
                <div className="rounded bg-white admin-input-height">
                    <nav className="navbar text-center mb-2 pl-3 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0">Menu Assign List</p>
                    </nav>
                    {isLoading ? <Spinner/> : menuAssignTableData.length > 0 ? <>
                            <ReactDataTable
                                dataDisplay
                                footer
                                isLoading
                                shortWidth
                                pagination
                                searchable
                                edit
                                docDelete
                                tableData={menuAssignTableData}
                                updateEdit={this.updateEdit}
                                docDeleteModal={this.docDeleteModal}
                                bigTable
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
                        </> :
                        <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"/> Currently There
                            are No Data</h4>}
                </div>
            </div>
        </>;
    }
}

export default MenuAssignComponent;