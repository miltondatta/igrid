import React, {Component} from "react";
import axios from 'axios';
import {apiUrl} from "../../utility/constant";
import {validateInput} from "../../utility/custom";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";
import Spinner from "../../layouts/Spinner";

import ModuleOptions from "../../utility/component/moduleOptions";
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";
import jwt from "jsonwebtoken";

class MenuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuData: [],
            menuTableData: [],
            menu_list: [],
            menu_type: '',
            module_id: '',
            menu_id: '',
            name: '',
            icon: '',
            sub_menu: false,
            link: '',
            visible: true,
            order_by: '',
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

        this.menu_type_list = [
            {id: 1, name: 'Main Menu'},
            {id: 2, name: 'Sub Menu'}
        ];
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        this.setState({
            isLoading: true
        }, () => {
            const { role_id } = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
            role_id !== null && axios.get(apiUrl() + 'menu/get/' + role_id)
                .then(res => {
                    this.setState({
                        menuData: [],
                        isLoading: false,
                        menuTableData: []
                    }, () => {
                        let menuData = [];
                        let menuTableData = [];
                        res.data.length > 0 && res.data.map(module => {
                            module !== null && module.length > 0 && module.map(menu => {
                                let newObj = {
                                    id: menu.id,
                                    module_name: menu.module_name === null ? 'N/A' : menu.module_name,
                                    menu_name: menu.name,
                                    sub_menu: '',
                                    is_active: menu.visible ? 'active' : 'inactive'
                                };
                                menuData.push(menu);
                                menuTableData.push(newObj);
                                menu.submenus.length > 0 && menu.submenus.map(submenu => {
                                    let newObj = {
                                        id: submenu.id,
                                        module_name: menu.module_name === null ? 'N/A' : menu.module_name,
                                        menu_name: menu.name,
                                        sub_menu: submenu.name,
                                        is_active: submenu.visible ? 'active' : 'inactive'
                                    };
                                    menuData.push(submenu);
                                    menuTableData.push(newObj);
                                });
                            });
                        });

                        this.setState({menuData: menuData, menuTableData: menuTableData});
                    });
                })
                .catch(err => {
                    console.log(err.response);
                })
        });
    };

    handleChange = (e) => {
        const {name, value, checked} = e.target;
        const {menu_type} = this.state;
        switch (name) {
            case "module_id":
                if (!value) return;
                if (menu_type == 1) return this.setState({module_id: value, menu_id: ''}, () => this.validate());
                let data = {
                    module_id: value,
                    parent_id: 0,
                    sub_menu: true
                };
                axios.post(apiUrl() + 'menu/by/credential', data)
                    .then(resData => {
                        this.setState({
                            menu_list: []
                        }, () => {
                            this.setState({
                                menu_list: resData.data,
                                module_id: value,
                                menu_id: ''
                            }, () => {
                                this.validate();
                            });
                        })
                    })
                    .catch(err => {
                        console.log(err.response);
                    });
                return;
            case "menu_type":
                this.setState({
                    [name]: value,
                    module_id: ''
                }, () => {
                    this.validate();
                });
                return;
            case "order_by":
                let valid = validateInput(e);
                if (valid || valid === '') {
                    this.setState({
                        [name]: valid
                    }, () => {
                        this.validate();
                    });
                }
                return;
            case "sub_menu":
            case "visible":
                this.setState({
                    [name]: checked
                }, () => {
                    this.validate();
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
        axios.post(apiUrl() + 'menu/entry', this.getApiData())
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
        const {menuData} = this.state;
        menuData.find(item => {
            if (item.id === id) {
                this.setState({
                    editId: id
                }, () => {
                    Object.keys(item).map(val => {
                        if (val === 'parent_id' && item[val] === 0) {
                            this.setState({
                                menu_type: 1,
                                module_id: item.module_id,
                                name: item.name,
                                icon: item.icon === null ? '' : item.icon,
                                sub_menu: item.sub_menu,
                                link: item.link,
                                visible: item.visible,
                                order_by: item.order_by === null ? '' : item.order_by,
                                menu_id: ''
                            }, () => {
                                this.validate();
                            });
                        } else if (val === 'parent_id' && item[val] !== 0) {
                            this.setState({
                                menu_type: 2,
                                module_id: item.module_id,
                                name: item.name,
                                icon: item.icon === null ? '' : item.icon,
                                sub_menu: item.sub_menu,
                                link: item.link,
                                visible: item.visible,
                                order_by: item.order_by === null ? '' : item.order_by
                            }, () => {
                                let data = {
                                    module_id: item.module_id,
                                    parent_id: 0,
                                    sub_menu: true
                                };
                                axios.post(apiUrl() + 'menu/by/credential', data)
                                    .then(resData => {
                                        this.setState({
                                            menu_list: [],
                                        }, () => {
                                            this.setState({
                                                menu_list: resData.data,
                                                menu_id: item.parent_id
                                            }, () => {
                                                this.validate();
                                            });
                                        })
                                    })
                                    .catch(err => {
                                        console.log(err.response);
                                    });
                            });
                        }
                    })
                });
            }
        })
    };

    updateData = () => {
        if (Object.values(this.validate()).includes(false)) return;
        axios.post(apiUrl() + '/menu/update', this.getApiData())
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
        const {
            module_id, menu_id, name, icon, sub_menu, link, visible, order_by, editId
        } = this.state;

        return ({
            id: editId,
            module_id,
            parent_id: menu_id === '' ? 0 : menu_id,
            name,
            icon,
            sub_menu,
            link,
            visible,
            order_by
        });
    };

    emptyStateValue = () => {
        return this.setState({
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
            menu_type, module_id, menu_id, name, icon, sub_menu, link, visible, order_by
        } = this.state;

        let errorObj = {
            menu_type: menu_type !== '',
            module_id: module_id !== '',
            name: name !== '',
            sub_menu: sub_menu !== '',
            visible: visible !== ''
        };

        if (menu_type == 2) Object.assign(errorObj, {menu_id: menu_id !== ''});
        if (menu_type == 2) Object.assign(errorObj, {link: link !== ''});
        this.setState({errorObj});
        return errorObj;
    };

    docDeleteModal = id => {
        const {menuTableData} = this.state;
        menuTableData.length && menuTableData.find(item => {
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
        axios.delete(apiUrl() + '/menu/delete/' + id)
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
            success, error, successMessage, errorMessage, isLoading, menuTableData, deleteId, deleteModalTitle, deleteContentName, menu_type, module_id, menu_id,
            name, icon, sub_menu, link, visible, order_by, errorObj, editId, menu_list
        } = this.state;

        const menu_types = this.menu_type_list.length > 0 && this.menu_type_list.map((item, index) => (
            <option key={index} value={item.id}>{item.name}</option>
        ));

        const menu_list_option = menu_list.length > 0 && menu_list.map((item, index) => (
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
                        <p className="text-blue f-weight-700 f-20px m-0">Menu Information</p>
                    </nav>
                    <div className="px-1 mb-2">
                        <label htmlFor="inputPassword4" className={'ui-custom-label'}>Menu Type</label>
                        <select name={'menu_type'} value={menu_type} onChange={this.handleChange}
                                className={`ui-custom-input`}>
                            <option value="">Select Menu Type</option>
                            {menu_types}
                        </select>
                        {errorObj && !errorObj.menu_type &&
                        <span className="error">Menu Type Name Field is required</span>
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
                    {menu_type == 2 &&
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
                    }
                    <div className="px-1 mb-2">
                        <label htmlFor="inputPassword4" className={'ui-custom-label'}>Name</label>
                        <input
                            placeholder='Name'
                            type={'text'}
                            name={'name'}
                            value={name}
                            onChange={this.handleChange}
                            className={`ui-custom-input`}/>
                        {errorObj && !errorObj.name &&
                        <span className="error">Name Field is required</span>
                        }
                    </div>
                    <div className="px-1 mb-2">
                        <label htmlFor="inputPassword4" className={'ui-custom-label'}>Icon Name (Optional)</label>
                        <input
                            placeholder='Icon Name'
                            type={'text'}
                            name={'icon'}
                            value={icon}
                            onChange={this.handleChange}
                            className={`ui-custom-input`}/>
                    </div>
                    <div className="px-1 mb-2">
                        <label htmlFor="inputPassword4" className={'ui-custom-label'}>Link</label>
                        <input
                            placeholder='Enter Link'
                            type={'text'}
                            name={'link'}
                            value={link}
                            onChange={this.handleChange}
                            className={`ui-custom-input`}/>
                        {errorObj && !errorObj.link && menu_type == 2 &&
                        <span className="error">Link Field is required</span>
                        }
                    </div>
                    <div className="px-1 mb-2">
                        <label htmlFor="inputPassword4" className={'ui-custom-label'}>Order By</label>
                        <input
                            placeholder='Order By'
                            type={'text'}
                            name={'order_by'}
                            value={order_by}
                            data-number={'integer_only'}
                            onChange={this.handleChange}
                            className={`ui-custom-input`}/>
                    </div>
                    {menu_type == 1 &&
                    <div className="px-1 mb-2">
                        <div className="custom-control custom-switch">
                            <input type="checkbox" name="sub_menu"
                                   className="custom-control-input" onChange={this.handleChange}
                                   checked={sub_menu} id="switch1"/>
                            <label className="custom-control-label" htmlFor="switch1">Sub Menu</label>
                        </div>
                    </div>
                    }
                    <div className="px-1 mb-2">
                        <div className="custom-control custom-switch">
                            <input type="checkbox" name="visible"
                                   className="custom-control-input" onChange={this.handleChange}
                                   checked={visible} id="switch2"/>
                            <label className="custom-control-label" htmlFor="switch2">Visibility</label>
                        </div>
                    </div>
                    {editId === null ? <button className="submit-btn-normal mt-5" onClick={this.handleSubmit}>Submit</button> : <>
                        <button className="submit-btn-normal mr-2 mt-5" onClick={this.updateData}>Update</button>
                        <button className="reset-btn-normal mt-5" onClick={this.emptyStateValue}>Go Back</button>
                    </>}
                </div>
                <div className="rounded bg-white admin-input-height">
                    <nav className="navbar text-center mb-2 pl-3 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0">Menu List</p>
                    </nav>
                    {isLoading ? <Spinner/> : menuTableData.length > 0 ? <>
                            <PrimeDataTable
                                dataDisplay
                                footer
                                isLoading
                                shortWidth
                                pagination
                                searchable
                                edit
                                docDelete
                                data={menuTableData}
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
                        </> :
                        <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"/> Currently There
                            are No Data</h4>}
                </div>
            </div>
        </>;
    }
}

export default MenuComponent;
