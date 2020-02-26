import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import IndicatorCategoryOptions from "../../utility/component/indicatorCategoryOptions";
import LocationsOptions from "../../utility/component/locationOptions";

class MisInputContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
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
        const {getApi} = this.props;
        this.setState({
            isLoading: true
        }, () => {
            Axios.get(apiUrl() + getApi + '/all')
                .then(res => {
                    this.setState({
                        allData: res.data
                    })
                })
                .then(res => {
                    this.setState({
                        isLoading: false
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })
    };

    handleChange = (e) => {
        const {name, value, checked} = e.target;
        switch (name) {
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
        if (Object.values(this.validate()).includes(false)) {
            return
        }
        Axios.post(apiUrl() + getApi + '/store', this.getApiData())
            .then(res => {
                const {success, msg} = res.data;
                this.setState({
                    allData: [],
                    error: false,
                    success: success,
                    successMessage: success && msg
                }, () => {
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
                        success: false,
                        error: error,
                        errorMessage: error && msg
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
        if (Object.values(this.validate()).includes(false)) {
            return
        }
        Axios.post(apiUrl() + getApi + '/update', this.getApiData())
            .then(resData => {
                const {success, msg} = resData.data;
                this.setState({
                    allData: [],
                    error: false,
                    success: success,
                    successMessage: success && msg
                });
            })
            .then(() => {
                this.getData()
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

    deleteItem = (id) => {
        const {getApi} = this.props;
        const data = {id};
        Axios.delete(apiUrl() + getApi + '/delete', {data})
            .then(resData => {
                const {success, msg} = resData.data;
                this.setState({
                    allData: [],
                    error: false,
                    success: success,
                    successMessage: success && msg,
                    deleteId: 0,
                    deleteContentName: '',
                    deleteModalTitle: ''
                }, () => {
                    this.emptyStateValue();
                    this.getData();
                });
            })
            .catch(err => {
                const {error, msg, fullError} = err.response.data;
                if (fullError.name === 'SequelizeForeignKeyConstraintError') {
                    if (msg) {
                        this.setState({
                            success: false,
                            error: error,
                            errorMessage: error && msg
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
                            <input
                                placeholder='Enter Indicator Category Name'
                                type={'text'}
                                name={'indicatormaster_name'}
                                value={indicatormaster_name}
                                onChange={this.handleChange}
                                className={`ui-custom-input`}/>
                        </div>
                        <div className="px-1 mb-2">
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
                        {errorDict && !errorDict.indicatormaster_name &&
                        <span className="error">Indicator Category Field is required</span>
                        }
                        <div className="px-1 mb-2">
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
                            <input
                                placeholder='Order By'
                                type={'text'}
                                name={'order_by'}
                                value={order_by}
                                onChange={this.handleChange}
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

    tableBody = () => {
        const {formType} = this.props;
        const {allData} = this.state;
        let table_body = '';

        switch (formType) {
            case "INDICATORCATEGORY":
                table_body = allData.length > 0 && allData.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.indicatormaster_name}</td>
                        <td>{item.indicatormaster_code}</td>
                        <td>{item.description.substring(0, 20)}{item.description.length > 20 ? ' ...' : ''}</td>
                        <td>
                            {item.is_default ?
                                <>
                                    <span className="badge badge-success">
                                        <i className="far fa-check-circle"></i>
                                    </span>
                                </>
                                :
                                <>
                                    <span className="badge badge-danger">
                                        <i className="far fa-times-circle"></i>
                                    </span>
                                </>}
                        </td>
                        <td className="d-flex justify-content-center">
                            <button className="btn btn-info btn-sm mr-2" onClick={() => {
                                this.updateEdit(item.id)
                            }}>Edit
                            </button>
                            <button type="button" className="btn btn-danger btn-sm" data-toggle="modal"
                                    data-target="#rowDeleteModal" onClick={() => {
                                this.setState({
                                    deleteId: item.id,
                                    deleteContentName: item.indicatormaster_name,
                                    deleteModalTitle: 'Delete Indicator Category'
                                });
                            }}>Delete
                            </button>
                        </td>
                    </tr>
                ));
                return table_body;
            case "INDICATORSUBCATEGORY":
                table_body = allData.length > 0 && allData.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.mis_indicatormaster.indicatormaster_name}</td>
                        <td>{item.location.location_name}</td>
                        <td>{item.indicator_name}</td>
                        <td>{item.item_no}</td>
                        <td>{item.order_by}</td>
                        <td>
                            {item.is_default ?
                                <>
                                    <span className="badge badge-success">
                                        <i className="far fa-check-circle"></i>
                                    </span>
                                </>
                                :
                                <>
                                    <span className="badge badge-danger">
                                        <i className="far fa-times-circle"></i>
                                    </span>
                                </>}
                        </td>
                        <td className="d-flex justify-content-center">
                            <button className="btn btn-info btn-sm mr-2" onClick={() => {
                                this.updateEdit(item.id)
                            }}>Edit
                            </button>
                            <button type="button" className="btn btn-danger btn-sm" data-toggle="modal"
                                    data-target="#rowDeleteModal" onClick={() => {
                                this.setState({
                                    deleteId: item.id,
                                    deleteContentName: item.indicator_name,
                                    deleteModalTitle: 'Delete Indicator'
                                });
                            }}>Delete
                            </button>
                        </td>
                    </tr>
                ));
                return table_body;
            default:
                return;
        }
    };

    render() {
        const {title, table_header, headTitle} = this.props;
        const {error, errorMessage, isLoading, allData, success, successMessage, deleteId, deleteContentName, deleteModalTitle} = this.state;

        return (
            <>
                {error &&
                <div
                    className="alert alert-danger mx-2 mb-2 position-relative d-flex justify-content-between align-items-center mt-2"
                    role="alert">
                    {errorMessage} <i className="fas fa-times " onClick={() => {
                    this.setState({error: false})
                }}></i>
                </div>}
                {success &&
                <div
                    className="alert alert-success mx-2 mb-2 position-relative d-flex justify-content-between align-items-center mt-2"
                    role="alert">
                    {successMessage} <i className="fas fa-times " onClick={() => {
                    this.setState({success: false})
                }}></i>
                </div>}

                <div className="px-2 my-2 ui-dataEntry">
                    <div className={`bg-white rounded p-2 min-h-80vh position-relative`}>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">{headTitle}</p>
                        </nav>
                        {this.renderForm()}
                    </div>
                    <div className="rounded bg-white min-h-80vh">
                        <nav className="navbar text-center mb-2 pl-3 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">{title}</p>
                        </nav>
                        {isLoading ? <h2>Loading</h2> : allData.length > 0 ? <>
                            <table className="table table-bordered table-striped table-hover text-center">
                                <thead>
                                <tr>
                                    {table_header.map((item, index) => (
                                        <th key={index}>{item}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {this.tableBody()}
                                </tbody>
                            </table>
                            <div className="modal fade" id="rowDeleteModal" tabIndex="-1" role="dialog"
                                 aria-labelledby="rowDeleteModal" aria-hidden="true">
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
                        </> : <h4>Currently There are No Content</h4>}
                    </div>
                </div>
            </>
        );
    }
}

export default MisInputContainer;