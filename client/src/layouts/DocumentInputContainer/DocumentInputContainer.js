import Axios from "axios";
import React, {Component} from 'react';
import {apiBaseUrl, apiUrl} from "../../utility/constant";
import DocumentCategoryOptions from "../../utility/component/documentCategoryOptions";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from "moment";
import DatePicker from 'react-datepicker2';
import {getFileExtension} from "../../utility/custom";
import Spinner from "../Spinner";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";

import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";

ClassicEditor.defaultConfig = {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote',
            'undo',
            'redo'
        ]
    },
    language: 'en'
};

const disabledRanges = [{
    disabled: true,
    start: moment().add(1, 'day'),
    end: moment().add(50, 'year')
}];
moment.locale('en');

class DocumentInputContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allProjects: [],
            allProjectTableData: [],
            category_id: '',
            category: '',
            sub_category_id: '',
            sub_category: '',
            content_type: '',
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
            extError: false,
            success: false,
            successMessage: '',
            isLoading: false,
            documentSubCategory: [],
            deleteId: 0,
            deleteModalTitle: '',
            deleteContentName: ''
        };

        this.content_types = ['Notice', 'Circular'];
        this.accepted_file_ext = ['png', 'jpg', 'jpeg', 'doc', 'docx', 'pdf', 'xlsx'];
    }

    handleSubmit = () => {
        if (this.state.extError) return false;
        if (Object.values(this.validate()).includes(false)) return false;
        if (this.state.description.length > 3000) return this.setState({
            error: true,
            errorMessage: 'Description Message length exceeds!'
        }, () => {
            setTimeout(() => {
                this.setState({
                    error: false
                })
            }, 2300);
        });
        const {getApi, formType} = this.props;
        let file = document.getElementById("validatedCustomFile");

        Axios.post(apiUrl() + getApi + '/store', this.getApiData())
            .then(res => {
                const {success, msg} = res.data;
                this.setState({
                    category_id: '',
                    category: '',
                    sub_category_id: '',
                    sub_category: '',
                    content_type: 0,
                    title: '',
                    circular_no: '',
                    description: '',
                    file_name: '',
                    document_date: '',
                    display_notice: false,
                    success: success,
                    successMessage: success && msg
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            success: false
                        })
                    }, 2300);
                    if (formType === 'DOCUMENTLIST') return file.value = ""; else return true;
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

    getData = () => {
        const {getApi, formType} = this.props;
        this.setState({
            isLoading: true
        }, () => {
            Axios.get(apiUrl() + getApi + '/all')
                .then(res => {
                    this.setState({
                        allProjects: res.data,
                        allProjectTableData: []
                    }, () => {
                        let allProjectTableData = [];
                        switch (formType) {
                            case "DOCUMENTCATEGORY":
                                res.data.length > 0 && res.data.map(item => {
                                    let newObj = {
                                        id: item.id,
                                        category: item.category_name
                                    };
                                    allProjectTableData.push(newObj);
                                });
                                return this.setState({
                                    allProjectTableData: allProjectTableData,
                                    isLoading: false
                                });
                            case "DOCUMENTSUBCATEGORY":
                                res.data.length > 0 && res.data.map(item => {
                                    let newObj = {
                                        id: item.id,
                                        category: item.document_category.category_name,
                                        sub_category: item.sub_category_name
                                    };
                                    allProjectTableData.push(newObj);
                                });
                                return this.setState({
                                    allProjectTableData: allProjectTableData,
                                    isLoading: false
                                });
                            case "DOCUMENTLIST":
                                res.data.length > 0 && res.data.map(item => {
                                    let newObj = {
                                        id: item.id,
                                        document_date: moment(item.document_date).format('YYYY-MM-DD'),
                                        category: item.document_category.category_name,
                                        sub_category: item.document_sub_category.sub_category_name,
                                        title: item.title,
                                        description: item.description,
                                        circular_no: item.circular_no,
                                        content_type: item.content_type === 1 ? 'notice' : 'circular',
                                        display_notice: item.display_notice ? 'on' : 'off',
                                        current_status: item.status ? 'active' : 'inactive'
                                    };
                                    allProjectTableData.push(newObj);
                                });
                                return this.setState({
                                    allProjectTableData: allProjectTableData,
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
                        } else if (val === 'document_date') {
                            this.setState({
                                document_date: moment(item[val])
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
                    allProjects: [],
                    success: success,
                    successMessage: success && msg,
                    deleteId: 0,
                    deleteContentName: '',
                    deleteModalTitle: ''
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
            category_id: '',
            category: '',
            sub_category_id: '',
            sub_category: '',
            content_type: 0,
            title: '',
            circular_no: '',
            description: '',
            file_name: '',
            document_date: moment(),
            display_notice: false,
            status: true,
            editId: null,
            errorDict: null
        });
    };

    handleChange = (e) => {
        const {name, value, files, checked} = e.target;
        switch (name) {
            case "file_name":
                if (!files.length) return;
                const ext = getFileExtension(files[0].name);
                if (!this.accepted_file_ext.includes(ext)) return this.setState({extError: true, file_name: ''});

                this.setState({
                    file_name: files[0],
                    extError: false
                }, () => {
                    this.validate();
                });
                return;
            case "category_id":
                if (!value) return;
                Axios.get(apiUrl() + 'document/sub/category/by/category/' + value)
                    .then(resData => {
                        this.setState({
                            documentSubCategory: resData.data
                        }, () => {
                            this.setState({
                                category_id: value
                            }, () => {
                                this.validate();
                            });
                        })
                    });
                return;
            case "display_notice":
            case "status":
                this.setState({
                    [name]: checked
                }, () => {
                    this.validate();
                });
                return;
            /*case "circular_no":
                let valid = validateInput(e);
                if (valid || valid === '') {
                    this.setState({
                        [name]: valid
                    }, () => {
                        this.validate();
                    });
                }
                return;*/
            default:
                this.setState({
                    [name]: value
                }, () => {
                    this.validate();
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
            category_id, category, sub_category_id, sub_category, content_type, title, circular_no, description, file_name,
            document_date, display_notice, status, editId, errorDict, documentSubCategory, extError
        } = this.state;

        switch (formType) {
            case 'DOCUMENTCATEGORY':
                return (
                    <>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Document Category Name</label>
                            <input
                                placeholder='Enter Document Category Name'
                                type={'text'}
                                name={'category_name'}
                                value={category}
                                onChange={this.handleChange}
                                className={`ui-custom-input`}/>
                        </div>
                        {errorDict && !errorDict.category &&
                        <span className="error">Document Category Field is required</span>
                        }
                        {editId === null ? <button className="submit-btn-normal mt-5"
                                                   onClick={this.handleSubmit}>Submit</button> : <>
                            <button className="submit-btn-normal mr-2 mt-5" onClick={this.updateData}>
                                Update
                            </button>
                            <button className="reset-btn-normal mt-5" onClick={this.emptyStateValue}>Go Back
                            </button>
                        </>}
                    </>
                );
            case 'DOCUMENTSUBCATEGORY':
                return (
                    <>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Category Name</label>
                            <select name={'category_id'} value={category_id} onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Category</option>
                                <DocumentCategoryOptions/>
                            </select>
                            {errorDict && !errorDict.category_id &&
                            <span className="error">Category Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Sub Category Name</label>
                            <input
                                placeholder='Sub Category Name'
                                type={'text'}
                                name={'sub_category_name'}
                                value={sub_category}
                                onChange={this.handleChange}
                                className={`ui-custom-input`}/>
                            {errorDict && !errorDict.sub_category &&
                            <span className="error">Sub Category Name Field is required</span>
                            }
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-5"
                                                   onClick={this.handleSubmit}>Submit</button> : <>
                            <button className="submit-btn-normal mr-2 mt-5" onClick={this.updateData}>Update</button>
                            <button className="reset-btn-normal mt-5" onClick={this.emptyStateValue}>Go Back</button>
                        </>}
                    </>
                );
            case 'DOCUMENTLIST':
                return (
                    <>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Category Name</label>
                            <select name={'category_id'} value={category_id} onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Category</option>
                                <DocumentCategoryOptions/>
                            </select>
                            {errorDict && !errorDict.category_id &&
                            <span className="error">Category Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Sub Category Name</label>
                            <select name={'sub_category_id'} value={sub_category_id}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Sub Category</option>
                                {documentSubCategory.length > 0 && documentSubCategory.map((item, index) => (
                                    <option key={index} value={item.id}>{item.sub_category_name}</option>
                                ))}
                            </select>
                            {errorDict && !errorDict.sub_category_id &&
                            <span className="error">Sub Category Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Content Type</label>
                            <select name={'content_type'} value={content_type}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Content Type</option>
                                {this.content_types.map((value, index) => (
                                    <option value={index + 1} key={index}>{value}</option>
                                ))}
                            </select>
                            {errorDict && !errorDict.content_type &&
                            <span className="error">Content Type Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Title</label>
                            <input
                                placeholder='Title'
                                name={'title'}
                                value={title}
                                onChange={this.handleChange}
                                className={`ui-custom-input`}/>
                            {errorDict && !errorDict.title &&
                            <span className="error">Title Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Circular No</label>
                            <input
                                placeholder='Circular No'
                                name={'circular_no'}
                                value={circular_no}
                                onChange={this.handleChange}
                                className={`ui-custom-input`}/>
                            {errorDict && !errorDict.circular_no &&
                            <span className="error">Circular No Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <CKEditor editor={ClassicEditor}
                                      data={description}
                                      onChange={(event, editor) => {
                                          this.setState({
                                              description: editor.getData()
                                          }, () => {
                                              if (editor.getData()) {
                                                  this.validate();
                                              }
                                          });
                                      }}
                            />
                            {errorDict && !errorDict.description &&
                            <span className="error">Description Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <DatePicker timePicker={false}
                                        name={'document_date'}
                                        className={`form-control`}
                                        inputFormat="DD/MM/YYYY"
                                        onChange={date => this.setState({document_date: date})}
                                        ranges={disabledRanges}
                                        value={document_date}/>
                        </div>
                        <div className="px-1 mb-2">
                            <div className="ui-custom-file">
                                <input type="file" onChange={this.handleChange} name={'file_name'}
                                       className="custom-file-input" id="validatedCustomFile"/>
                                <label htmlFor="validatedCustomFile" style={{width: '100%'}}>{file_name ? file_name.name ? file_name.name.substr(0, 20) + '...' : file_name.substr(0, 20) + '...' : 'Choose File'}</label>
                                <div className="bottom text-center" style={{width: '100%'}}>
                                    JPG | JPEG | PNG | DOC | PDF | XLSX Allowed
                                </div>
                            </div>
                            {errorDict && !errorDict.file_name &&
                            <>
                                <span className="error">File Name Field is required</span>
                                <br/>
                            </>
                            }
                            {extError &&
                            <span className="error">Only png, jpg, jpeg, doc, docx, pdf, xlsx file format is allowed!</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" name="display_notice"
                                               className="custom-control-input" onChange={this.handleChange}
                                               checked={display_notice} id="switch1"/>
                                        <label className="custom-control-label" htmlFor="switch1">Display Notice</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" name="status"
                                               className="custom-control-input" onChange={this.handleChange}
                                               checked={status} id="switch2"/>
                                        <label className="custom-control-label" htmlFor="switch2">Status</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {editId === null ? <button className="submit-btn-normal mt-5"
                                                   onClick={this.handleSubmit}>Submit</button> : <>
                            <button className="submit-btn-normal mr-2 mt-5" onClick={this.updateData}>Update</button>
                            <button className="reset-btn-normal cursor-pointer mt-5" onClick={this.emptyStateValue}>Go Back</button>
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
            category_id, category, sub_category_id, sub_category, content_type, title, circular_no, description, file_name,
            document_date
        } = this.state;

        switch (formType) {
            case "DOCUMENTCATEGORY":
                errorDict = {
                    category: category !== ''
                };
                this.setState({
                    errorDict
                });
                return errorDict;
            case "DOCUMENTSUBCATEGORY":
                errorDict = {
                    category_id: category_id !== '',
                    sub_category: sub_category !== ''
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
                    document_date: document_date !== '',
                    file_name: (file_name.name ? file_name.name : file_name) !== ''
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
            category_id, category, sub_category_id, sub_category, content_type, title, circular_no, description, file_name,
            document_date, display_notice, status, editId
        } = this.state;

        switch (formType) {
            case "DOCUMENTCATEGORY":
                return ({
                    id: editId,
                    category_name: category
                });
            case "DOCUMENTSUBCATEGORY":
                return ({
                    id: editId,
                    category_id,
                    sub_category_name: sub_category
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

    docDeleteModal = id => {
        const {allProjectTableData} = this.state;
        const {formType} = this.props;
        allProjectTableData.length && allProjectTableData.find(item => {
            if (item.id === id) {
                let deleteContentName, deleteModalTitle;
                if (formType === 'DOCUMENTCATEGORY') {deleteContentName = item.category; deleteModalTitle = 'Delete Category';}
                if (formType === 'DOCUMENTSUBCATEGORY') {deleteContentName = item.sub_category; deleteModalTitle = 'Delete Sub Category';}
                if (formType === 'DOCUMENTLIST') {deleteContentName = item.title; deleteModalTitle = 'Delete Document List';}

                this.setState({
                    deleteId: item.id,
                    deleteContentName: deleteContentName,
                    deleteModalTitle: deleteModalTitle
                });
            }
        });
    };

    render() {
        const {title, headTitle, formType} = this.props;
        const {error, errorMessage, isLoading, allProjectTableData, success, successMessage, deleteId, deleteContentName, deleteModalTitle} = this.state;
        return (
            <>
                {error &&
                <ErrorModal errorMessage={errorMessage}/>
                }
                {success &&
                <SuccessModal successMessage={successMessage}/>
                }

                <div className="px-2 my-2 ui-dataEntry">
                    <div className={`bg-white rounded p-2 admin-input-height overflow-x-hidden position-relative`}>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">{headTitle}</p>
                        </nav>
                        {this.renderForm()}
                    </div>
                    <div className="rounded bg-white p-3 admin-input-height">
                        <nav className="navbar text-center mb-2 pl-0 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">{title}</p>
                        </nav>
                        {isLoading ? <Spinner/> : allProjectTableData.length > 0 ? <>
                            <PrimeDataTable
                                action
                                dnger
                                data={allProjectTableData}
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
                            There are No {title}</h4>}
                    </div>
                </div>
            </>
        );
    }
}

export default DocumentInputContainer;