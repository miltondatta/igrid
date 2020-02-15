import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import DocumentCategoryOptions from "../../utility/component/documentCategoryOptions";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from "moment";

class DocumentInputContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allProjects: [],
            category_id: '',
            category_name: '',
            sub_category_id: '',
            sub_category_name: '',
            content_type: 0,
            title: '',
            circular_no: '',
            description: '',
            file_name: '',
            document_date: moment(),
            display_notice: false,
            status: true,
            editId: null,
            errorDict: null,
            error: false,
            errorMessage: '',
            success: false,
            successMessage: '',
            isLoading: false,
            documentSubCategory: []
        };

        this.content_types = ['Notice', 'Circular'];
    }

    handleSubmit = () => {
        const {getApi} = this.props;
        if (Object.values(this.validate()).includes(false)) {
            return
        }
        Axios.post(apiUrl() + getApi + '/store', this.getApiData())
            .then(res => {
                const {success, msg} = res.data;
                this.setState({
                    category_id: '',
                    category_name: '',
                    sub_category_id: '',
                    sub_category_name: '',
                    content_type: 0,
                    title: '',
                    circular_no: '',
                    description: '',
                    file_name: '',
                    document_date: '',
                    error: false,
                    success: success,
                    successMessage: success && msg
                })
            })
            .then(() => {
                this.setState({
                    allProjects: []
                });
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

    getData = () => {
        const {getApi} = this.props;
        this.setState({
            isLoading: true
        }, () => {
            Axios.get(apiUrl() + getApi + '/all')
                .then(res => {
                    this.setState({
                        allProjects: res.data
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

    updateEdit = (id) => {
        const {allProjects} = this.state;
        allProjects.find(item => {
            if (item.id === id) {
                this.setState({
                    editId: id
                }, () => {
                    Object.keys(item).map(val => {
                        if (val === 'sub_category_id') {
                            Axios.get(apiUrl() + 'document/sub/category/by/category/' + item['category_id'])
                                .then(resData => {
                                    this.setState({
                                        documentSubCategory: resData.data
                                    }, () => {
                                        this.setState({
                                            sub_category_id: item[val]
                                        }, () => {
                                            this.validate();
                                        });
                                    })
                                });
                        } else if(val === 'document_date') {
                            this.setState({
                                document_date: moment(item[val]).format('YYYY-MM-DD')
                            }, () => {
                                this.validate();
                            });
                        } else {
                            this.setState({
                                [val]: item[val]
                            }, () => {
                                this.validate();
                            })
                        }

                        /*this.setState({
                            [val]: item[val]
                        }, () => {
                            this.validate()
                        })*/
                    })
                });
                return null
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
                    allProjects: [],
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
                    allProjects: [],
                    error: false,
                    success: success,
                    successMessage: success && msg
                }, () => {
                    this.getData()
                });
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

    handleChange = (e) => {
        const {name, value, files, checked} = e.target;
        switch (name) {
            case "file_name":
                this.setState({
                    [name]: files[0]
                });
                return;
            case "category_id":
                Axios.get(apiUrl() + 'document/sub/category/by/category/' + value)
                    .then(resData => {
                        this.setState({
                            documentSubCategory: resData.data
                        }, () => {
                            this.setState({
                                category_id: value
                            });
                        })
                    });
                return;
            case "display_notice":
            case "status":
                this.setState({
                    [name]: checked
                });
                return;
            default:
                this.setState({
                    [name]: value
                });
                return;
        }
    };

    componentDidMount = () => {
        this.getData();
    };

    renderForm = () => {
        const {formType} = this.props;
        const {
            category_id, category_name, sub_category_id, sub_category_name, content_type, title, circular_no, description, file_name,
            document_date, display_notice, status, editId, errorDict, documentSubCategory
        } = this.state;

        switch (formType) {
            case 'DOCUMENTCATEGORY':
                return (
                    <div className={`rounded p-3 my-2`}>
                        <div className="row px-2">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-3">
                                        Document Category
                                    </div>
                                    <div className="col-md-9">
                                        <input
                                            placeholder='Enter Document Category Name'
                                            type={'text'}
                                            name={'category_name'}
                                            value={category_name}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.category_name) && 'is-invalid'}`}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                {editId === null ?
                                    <button className="btn btn-outline-info"
                                            onClick={this.handleSubmit}>Submit</button> : <>
                                        <button className="btn btn-outline-info mr-2" onClick={this.updateData}>
                                            Update
                                        </button>
                                        <button className="btn btn-outline-danger" onClick={() => {
                                            this.setState({
                                                editId: null,
                                                category_name: '',
                                                success: false,
                                                error: false
                                            })
                                        }}>Go Back
                                        </button>
                                    </>}
                            </div>
                        </div>
                    </div>
                );
            case 'DOCUMENTSUBCATEGORY':
                return (
                    <div className={`rounded p-3 my-2`}>
                        <div className="row px-2">
                            <div className="col-md-5">
                                <div className="row">
                                    <div className="col-md-4">
                                        Category
                                    </div>
                                    <div className="col-md-8">
                                        <select name={'category_id'} value={category_id} onChange={this.handleChange}
                                                className={`form-control ${(errorDict && !errorDict.category_id) && 'is-invalid'}`}>
                                            <option>--Select Category--</option>
                                            <DocumentCategoryOptions/>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="row">
                                    <div className="col-md-4">
                                        Sub Category Name
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            placeholder='Sub Category Name'
                                            type={'text'}
                                            name={'sub_category_name'}
                                            value={sub_category_name}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.sub_category_name) && 'is-invalid'}`}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                {editId === null ? <button className="btn btn-outline-info"
                                                           onClick={this.handleSubmit}>Submit</button> : <>
                                    <button className="btn btn-outline-info mr-2" onClick={this.updateData}>
                                        Update
                                    </button>
                                    <button className="btn btn-outline-danger" onClick={() => {
                                        this.setState({
                                            editId: null,
                                            category_id: '',
                                            sub_category_name: '',
                                            success: false,
                                            error: false
                                        })
                                    }}>Go Back
                                    </button>
                                </>}
                            </div>
                        </div>
                    </div>
                );
            case 'DOCUMENTLIST':
                return (
                    <div className={`rounded p-3 my-2`}>
                        <div className="row px-2 my-3">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Category
                                    </div>
                                    <div className="col-md-8">
                                        <select name={'category_id'} value={category_id} onChange={this.handleChange}
                                                className={`form-control ${(errorDict && !errorDict.category_id) && 'is-invalid'}`}>
                                            <option>--Select Category--</option>
                                            <DocumentCategoryOptions/>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Sub Category
                                    </div>
                                    <div className="col-md-8">
                                        <select name={'sub_category_id'} value={sub_category_id}
                                                onChange={this.handleChange}
                                                className={`form-control ${(errorDict && !errorDict.sub_category_id) && 'is-invalid'}`}>
                                            <option>--Select Category--</option>
                                            {documentSubCategory.length > 0 && documentSubCategory.map((item, index) => (
                                                <option key={index} value={item.id}>{item.sub_category_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row px-2 my-3">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Content Type
                                    </div>
                                    <div className="col-md-8 ui-checkbox d-flex align-items-center">
                                        <select name={'content_type'} value={content_type}
                                                onChange={this.handleChange}
                                                className={`form-control ${(errorDict && !errorDict.content_type) && 'is-invalid'}`}>
                                            <option>--Select Content Type--</option>
                                            {this.content_types.map((value, index) => (
                                                <option value={index + 1} key={index}>{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Title
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            placeholder='Title'
                                            name={'title'}
                                            value={title}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.title) && 'is-invalid'}`}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row px-2 my-3">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Circular No
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            placeholder='Circular No'
                                            name={'circular_no'}
                                            value={circular_no}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.circular_no) && 'is-invalid'}`}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Description
                                    </div>
                                    <div className="col-md-8">
                                        <CKEditor editor={ClassicEditor}
                                                  data={description}
                                                  onChange={(event, editor) => {
                                                      this.setState({
                                                          description: editor.getData()
                                                      });
                                                  }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row px-2 my-3">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        File Name
                                    </div>
                                    <div className="col-md-8">
                                        <div className="custom-file">
                                            <input type="file" onChange={this.handleChange} name={'file_name'}
                                                   className="custom-file-input" id="validatedCustomFile"
                                                   required/>
                                            <label className="custom-file-label"
                                                   htmlFor="validatedCustomFile">{file_name ? file_name.name : 'Choose file...'}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Document Date
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            placeholder='Document Date'
                                            type="date"
                                            name={'document_date'}
                                            value={document_date}
                                            onChange={this.handleChange}
                                            className={`form-control ${(errorDict && !errorDict.document_date) && 'is-invalid'}`}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row px-2 my-3">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Display Notice
                                    </div>
                                    <div className="col-md-8">
                                        <div className="custom-control custom-switch">
                                            <input type="checkbox" name="display_notice"
                                                   className="custom-control-input" onChange={this.handleChange}
                                                   checked={display_notice} id="switch1"/>
                                            <label className="custom-control-label" htmlFor="switch1"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4">
                                        Status
                                    </div>
                                    <div className="col-md-8">
                                        <div className="custom-control custom-switch">
                                            <input type="checkbox" name="status"
                                                   className="custom-control-input" onChange={this.handleChange}
                                                   checked={status} id="switch2"/>
                                            <label className="custom-control-label" htmlFor="switch2"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            {editId === null ? <button className="btn btn-outline-info mt-3"
                                                       onClick={this.handleSubmit}>Submit</button> : <>
                                <button className="btn btn-outline-info mt-3 mr-2" onClick={this.updateData}>
                                    Update
                                </button>
                                <button className="btn btn-outline-danger mt-3" onClick={() => {
                                    this.setState({
                                        category_id: '',
                                        sub_category_id: '',
                                        content_type: 0,
                                        title: '',
                                        circular_no: '',
                                        description: '',
                                        file_name: '',
                                        document_date: new Date(),
                                        display_notice: false,
                                        status: true,
                                        editId: null,
                                        success: false,
                                        error: false
                                    })
                                }}>Go Back
                                </button>
                            </>}
                        </div>
                    </div>
                );
            default:
                return null
        }
    };

    validate = () => {
        let errorDict = {};
        const {formType} = this.props;
        const {
            category_id, category_name, sub_category_id, sub_category_name, content_type, title, circular_no, description, file_name,
            document_date, display_notice, status
        } = this.state;

        switch (formType) {
            case "DOCUMENTCATEGORY":
                errorDict = {
                    category_name: category_name !== ''
                };
                this.setState({
                    errorDict
                });
                return errorDict;
            case "DOCUMENTSUBCATEGORY":
                errorDict = {
                    category_id: category_id !== '',
                    sub_category_name: sub_category_name !== ''
                };
                this.setState({
                    errorDict
                });
                return errorDict;
            case "DOCUMENTLIST":
                errorDict = {
                    category_id: category_id !== '',
                    sub_category_id: sub_category_id !== '',
                    content_type: content_type !== '',
                    title: title !== '',
                    circular_no: circular_no !== '',
                    description: description !== '',
                    file_name: file_name !== '',
                    document_date: document_date !== '',
                    display_notice: display_notice !== '',
                    status: status !== ''
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
            category_id, category_name, sub_category_id, sub_category_name, content_type, title, circular_no, description, file_name,
            document_date, display_notice, status, editId
        } = this.state;

        switch (formType) {
            case "DOCUMENTCATEGORY":
                return ({
                    id: editId,
                    category_name: category_name
                });
            case "DOCUMENTSUBCATEGORY":
                return ({
                    id: editId,
                    category_id,
                    sub_category_name
                });
            case "DOCUMENTLIST":
                data = new FormData();
                data.append('id', editId);
                data.append('category_id', category_id);
                data.append('sub_category_id', sub_category_id);
                data.append('content_type', content_type);
                data.append('title', title);
                data.append('circular_no', circular_no);
                data.append('description', description);
                data.append('file', file_name);
                data.append('document_date', document_date);
                data.append('display_notice', display_notice);
                data.append('status', status);
                return data;
            default:
                return data;
        }
    };

    tableBody = () => {
        const {formType} = this.props;
        const {allProjects} = this.state;
        let table_body = '';

        switch (formType) {
            case "DOCUMENTCATEGORY":
                table_body = allProjects.length > 0 && allProjects.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.category_name}</td>
                        <td className="d-flex justify-content-center">
                            <button className="btn btn-info btn-sm mr-2" onClick={() => {
                                this.updateEdit(item.id)
                            }}>Edit
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => {
                                this.deleteItem(item.id)
                            }}>Delete
                            </button>
                        </td>
                    </tr>
                ));
                return table_body;
            case "DOCUMENTSUBCATEGORY":
                table_body = allProjects.length > 0 && allProjects.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.document_category.category_name}</td>
                        <td>{item.sub_category_name}</td>
                        <td className="d-flex justify-content-center">
                            <button className="btn btn-info btn-sm mr-2" onClick={() => {
                                this.updateEdit(item.id)
                            }}>Edit
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => {
                                this.deleteItem(item.id)
                            }}>Delete
                            </button>
                        </td>
                    </tr>
                ));
                return table_body;
            case "DOCUMENTLIST":
                table_body = allProjects.length > 0 && allProjects.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.document_category.category_name}</td>
                        <td>{item.document_sub_category.sub_category_name}</td>
                        <td>
                            <span
                                className={`badge badge-${item.content_type == 1 ? 'success' : 'primary'}`}>{item.content_type == 1 ? 'notice' : 'circular'}</span>
                        </td>
                        <td>{item.title}</td>
                        <td>{item.circular_no}</td>
                        <td>{item.description}</td>
                        <td>
                            <span
                                className={`badge badge-${item.display_notice ? 'info' : 'warning'}`}>{item.display_notice ? 'approved' : 'pending'}</span>
                        </td>
                        <td className="d-flex justify-content-center">
                            <button className="btn btn-info btn-sm mr-2" onClick={() => {
                                this.updateEdit(item.id)
                            }}>Edit
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => {
                                this.deleteItem(item.id)
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
        const {title, table_header} = this.props;
        const {error, errorMessage, isLoading, allProjects, success, successMessage} = this.state;

        return (
            <div className="px-2 my-2">
                {error &&
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    </div>
                </div>
                }
                {success &&
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="alert alert-info" role="alert">
                            {successMessage}
                        </div>
                    </div>
                </div>
                }
                <div className={`bg-white rounded p-2 my-2  `}>
                    {this.renderForm()}
                </div>
                <div className={'p-2 my-2'}>
                    <div className="rounded p-3 bg-white shadow">
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-dark f-weight-500 f-20px m-0">{title}</p>
                        </nav>
                        {isLoading ? <h2>Loading</h2> : allProjects.length > 0 ? <>
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
                        </> : <h4>Currently There are No {title}</h4>}
                    </div>
                </div>
            </div>
        );
    }
}

export default DocumentInputContainer;