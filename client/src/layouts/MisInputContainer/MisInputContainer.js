import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import IndicatorCategoryOptions from "../../utility/component/indicatorCategoryOptions";
import LocationsOptions from "../../utility/component/locationOptions";
import {validateInput} from "../../utility/custom";
import Spinner from "../Spinner";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";
import moment from "moment";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";

class MisInputContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            tableData: [],
            indicatormaster_id: '',
            indicatormaster_name: '',
            indicatormaster_code: '',
            description: '',
            indicator_name: '',
            item_no: '',
            parent_location_id: '',
            order_by: '',
            is_default: true,
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
        const {getApi, formType} = this.props;
        this.setState({
            isLoading: true
        }, () => {
            Axios.get(apiUrl() + getApi + '/all')
                .then(res => {
                    this.setState({
                        allData: res.data,
                        isLoading: false,
                        tableData: []
                    }, () => {
                        let tableData = [];
                        switch (formType) {
                            case "INDICATORCATEGORY":
                                res.data.length > 0 && res.data.map(item => {
                                    let newObj = {
                                        id: item.id,
                                        category_name: item.indicatormaster_name,
                                        indicator_code: item.indicatormaster_code,
                                        description: item.description,
                                        is_default: item.is_default ? 'On' : 'Off'
                                    };
                                    tableData.push(newObj);
                                });
                                return this.setState({
                                    tableData: tableData,
                                    isLoading: false
                                });
                            case "INDICATORSUBCATEGORY":
                                res.data.length > 0 && res.data.map(item => {
                                    let newObj = {
                                        id: item.id,
                                        category_name: item.mis_indicatormaster.indicatormaster_name,
                                        indicator: item.indicator_name,
                                        location: item.location.location_name,
                                        item_no: item.item_no,
                                        order_by: item.order_by,
                                        is_default: item.is_default ? 'On' : 'Off'
                                    };
                                    tableData.push(newObj);
                                });
                                return this.setState({
                                    tableData: tableData,
                                    isLoading: false
                                });
                            default:
                                return;
                        }
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        })
    };

    handleChange = (e) => {
        const {name, value, checked} = e.target;
        switch (name) {
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
            case "is_default":
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
        const {getApi} = this.props;
        if (Object.values(this.validate()).includes(false)) return;
        Axios.post(apiUrl() + getApi + '/store', this.getApiData())
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
        const {getApi} = this.props;
        if (Object.values(this.validate()).includes(false)) return;
        Axios.post(apiUrl() + getApi + '/update', this.getApiData())
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
        const {getApi} = this.props;
        const data = {id};
        Axios.delete(apiUrl() + getApi + '/delete', {data})
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
                const {error, msg, fullError} = err.response.data;
                if (fullError.name === 'SequelizeForeignKeyConstraintError') {
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
                }
                console.log(err.response);
            })
    };

    emptyStateValue = () => {
        return this.setState({
            indicatormaster_id: '',
            indicatormaster_name: '',
            indicatormaster_code: '',
            description: '',
            indicator_name: '',
            item_no: '',
            parent_location_id: '',
            order_by: '',
            is_default: true,
            editId: null,
            errorDict: null,
            deleteId: 0,
            deleteModalTitle: '',
            deleteContentName: ''
        });
    };

    renderForm = () => {
        const {formType} = this.props;
        const {
            indicatormaster_id, indicatormaster_name, indicatormaster_code, description, indicator_name, item_no, parent_location_id, order_by, is_default,
            editId, errorDict
        } = this.state;

        switch (formType) {
            case 'INDICATORCATEGORY':
                return (
                    <>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Indicator Category</label>
                            <input
                                placeholder='Enter Indicator Category Name'
                                type={'text'}
                                name={'indicatormaster_name'}
                                value={indicatormaster_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input`}/>
                        </div>
                        {errorDict && !errorDict.indicatormaster_name &&
                        <span className="error">Indicator Category Name Field is required</span>
                        }
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Indicator Master Code</label>
                            <input
                                placeholder='Enter Indicator Master Code'
                                type={'text'}
                                name={'indicatormaster_code'}
                                value={indicatormaster_code}
                                onChange={this.handleChange}
                                className={`ui-custom-input`}/>
                        </div>
                        {errorDict && !errorDict.indicatormaster_code &&
                        <span className="error">Indicator Master Code Field is required</span>
                        }
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Description</label>
                            <textarea
                                id={'enCh1'}
                                className={'ui-custom-textarea'}
                                value={description}
                                placeholder={'Write Description'}
                                onChange={this.handleChange} name={'description'}
                            />
                        </div>
                        {errorDict && !errorDict.description &&
                        <span className="error">Indicator Description Field is required</span>
                        }
                        <div className="px-1 mb-2">
                            <div className="custom-control custom-switch">
                                <input type="checkbox" name="is_default"
                                       className="custom-control-input" onChange={this.handleChange}
                                       checked={is_default} id="switch1"/>
                                <label className="custom-control-label" htmlFor="switch1">Is Default</label>
                            </div>
                        </div>
                        {editId === null ? <button className="submit-btn"
                                                   onClick={this.handleSubmit}>Submit</button> : <>
                            <button className="submit-btn mr-2" onClick={this.updateData}
                                    style={{position: 'absolute', bottom: 12}}>
                                Update
                            </button>
                            <button className="reset-btn-normal" onClick={this.emptyStateValue}
                                    style={{position: 'absolute', bottom: 12, left: 110}}>Go Back
                            </button>
                        </>}
                    </>
                );
            case 'INDICATORSUBCATEGORY':
                return (
                    <>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Indicator Category</label>
                            <select name={'indicatormaster_id'} value={indicatormaster_id} onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Indicator Category</option>
                                <IndicatorCategoryOptions/>
                            </select>
                            {errorDict && !errorDict.indicatormaster_id &&
                            <span className="error">Indicator Category Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Indicator Parent Location</label>
                            <select name={'parent_location_id'} value={parent_location_id} onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Indicator Parent Location</option>
                                <LocationsOptions selectedId={0}/>
                            </select>
                            {errorDict && !errorDict.parent_location_id &&
                            <span className="error">Indicator Parent Location Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Indicator</label>
                            <input
                                placeholder='Indicator Name'
                                type={'text'}
                                name={'indicator_name'}
                                value={indicator_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input`}/>
                            {errorDict && !errorDict.indicator_name &&
                            <span className="error">Indicator Name Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Item Number</label>
                            <input
                                placeholder='Item No'
                                type={'text'}
                                name={'item_no'}
                                value={item_no}
                                onChange={this.handleChange}
                                className={`ui-custom-input`}/>
                            {errorDict && !errorDict.item_no &&
                            <span className="error">Item No Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Order By</label>
                            <input
                                placeholder='Order By'
                                type={'text'}
                                name={'order_by'}
                                value={order_by}
                                onChange={this.handleChange}
                                data-number={'integer_only'}
                                className={`ui-custom-input`}/>
                            {errorDict && !errorDict.order_by &&
                            <span className="error">Order By Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <div className="custom-control custom-switch">
                                <input type="checkbox" name="is_default"
                                       className="custom-control-input" onChange={this.handleChange}
                                       checked={is_default} id="switch2"/>
                                <label className="custom-control-label" htmlFor="switch2">Is Default</label>
                            </div>
                        </div>
                        {editId === null ? <button className="submit-btn"
                                                   onClick={this.handleSubmit}>Submit</button> : <>
                            <button className="submit-btn mr-2" onClick={this.updateData}
                                    style={{position: 'absolute', bottom: 12}}>
                                Update
                            </button>
                            <button className="reset-btn-normal" onClick={this.emptyStateValue}
                                    style={{position: 'absolute', bottom: 12, left: 110}}>Go Back
                            </button>
                        </>}
                    </>
                );
            default:
                return null
        }
    };

    validate = () => {
        let errorDict = {};
        const {formType} = this.props;
        const {
            indicatormaster_id, indicatormaster_name, indicatormaster_code, description, indicator_name, item_no, parent_location_id, order_by
        } = this.state;

        switch (formType) {
            case "INDICATORCATEGORY":
                errorDict = {
                    indicatormaster_name: indicatormaster_name !== '',
                    indicatormaster_code: indicatormaster_code !== '',
                    description: description !== ''
                };
                this.setState({
                    errorDict
                });
                return errorDict;
            case "INDICATORSUBCATEGORY":
                errorDict = {
                    indicator_name: indicator_name !== '',
                    indicatormaster_id: indicatormaster_id !== '',
                    item_no: item_no !== '',
                    parent_location_id: parent_location_id !== '',
                    order_by: order_by !== ''
                };
                this.setState({
                    errorDict
                });
                return errorDict;
            default:
                return null
        }
    };

    getApiData = () => {
        let data = null;
        const {formType} = this.props;
        const {
            indicatormaster_id, indicatormaster_name, indicatormaster_code, description, indicator_name, item_no, parent_location_id, order_by, is_default,
            editId
        } = this.state;

        switch (formType) {
            case "INDICATORCATEGORY":
                return ({
                    id: editId,
                    indicatormaster_name,
                    indicatormaster_code,
                    description,
                    is_default
                });
            case "INDICATORSUBCATEGORY":
                return ({
                    id: editId,
                    indicator_name,
                    indicatormaster_id,
                    item_no,
                    parent_location_id,
                    order_by,
                    is_default
                });
            default:
                return data;
        }
    };

    docDeleteModal = id => {
        const {tableData} = this.state;
        const {formType} = this.props;
        tableData.length && tableData.find(item => {
            if (item.id === id) {
                let deleteContentName, deleteModalTitle;
                if (formType === 'INDICATORCATEGORY') {deleteContentName = item.category_name; deleteModalTitle = 'Delete Indicator Category';}
                if (formType === 'INDICATORSUBCATEGORY') {deleteContentName = item.indicator; deleteModalTitle = 'Delete Indicator';}

                this.setState({
                    deleteId: item.id,
                    deleteContentName: deleteContentName,
                    deleteModalTitle: deleteModalTitle
                });
            }
        });
    };

    render() {
        const {title, headTitle} = this.props;
        const {error, errorMessage, isLoading, success, successMessage, deleteId, deleteContentName, deleteModalTitle, tableData} = this.state;

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
                    <div className="rounded bg-white admin-input-height">
                        <nav className="navbar text-center mb-2 pl-3 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">{title}</p>
                        </nav>
                        {isLoading ? <Spinner/> : tableData.length > 0 ? <>
                            <ReactDataTable
                                dataDisplay
                                footer
                                isLoading
                                shortWidth
                                pagination
                                searchable
                                edit
                                tableData={tableData}
                                updateEdit={this.updateEdit}
                                docDelete={this.docDeleteModal}
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
                        </> : <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> Currently There are No Data</h4>}
                    </div>
                </div>
            </>
        );
    }
}

export default MisInputContainer;