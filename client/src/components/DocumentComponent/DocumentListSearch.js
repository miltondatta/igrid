import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import DocumentCategoryOptions from "../../utility/component/documentCategoryOptions";
import Axios from "axios";

class DocumentListSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_id: '',
            sub_category_id: '',
            content_type: '',
            title: '',
            circular_no: '',
            error: false,
            errorMessage: '',
            fileError: false,
            fileErrorMessage: '',
            searchData: [],
            documentTitle: [],
            documentSubCategory: [],
            keyword: '',
            isLoading: false
        };

        this.content_types = ['Notice', 'Circular'];
        this.table_header = ['Serial No', 'Category Name', 'Sub Category Name', 'Title', 'Description', 'Circular No', 'Content Type', 'Display Notice', 'Status', 'File', 'Details'];
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        const {category_id} = this.state;

        switch (name) {
            case "category_id":
                Axios.get(apiUrl() + 'document/sub/category/by/category/' + value)
                    .then(resData => {
                        this.setState({
                            documentSubCategory: resData.data
                        }, () => {
                            this.setState({
                                category_id: value,
                                error: false
                            });
                        })
                    });
                return;
            case "sub_category_id":
                Axios.post(apiUrl() + 'document/list/by/category/sub/category', {
                    category_id: category_id,
                    sub_category_id: value
                })
                    .then(resData => {
                        this.setState({
                            documentTitle: resData.data
                        }, () => {
                            this.setState({
                                sub_category_id: value
                            });
                        })
                    });
                return;
            default:
                this.setState({
                    [name]: value
                });
                return;
        }
    };

    handleKeyPress = (event) => {
        /*
        * 32 = Single Space
        * 46 = Dot
        */

        let keyboardKey = [32, 46];
        if (keyboardKey.includes(event.which)) event.preventDefault();
    };

    handleSearch = () => {
        const {category_id, sub_category_id, content_type, title, circular_no, keyword} = this.state;
        let keywordArray = keyword ? keyword.split(',') : [];
        let keywordData = keywordArray.filter(value => value !== '');

        const data = {
            category_id,
            sub_category_id,
            content_type,
            title,
            circular_no,
            keyword: keywordData
        };

        Axios.post(apiUrl() + 'document/list/search', data)
            .then(res => {
                this.setState({
                    searchData: res.data[0],
                    error: false
                })
            })
            .catch(err => {
                const {error, msg} = err.response.data;
                if (msg) {
                    this.setState({
                        error: error,
                        errorMessage: error && msg
                    })
                }
                console.log(err.response);
            })
    };

    downloadFile = (e, file_name) => {
        e.preventDefault();

        Axios.get(apiUrl() + 'document/list/download/' + file_name)
            .then(() => {
                const link = document.createElement('a');
                link.href = apiUrl() + 'document/list/download/' + file_name;
                link.setAttribute('download', file_name);
                link.click();

                this.setState({
                    fileError: false
                })
            })
            .catch(err => {
                const {error, msg} = err.response.data;
                if (msg) {
                    this.setState({
                        fileError: error,
                        fileErrorMessage: error && msg
                    })
                }
                console.log(err.response);
            })
    };

    render() {
        const {category_id, sub_category_id, content_type, title, circular_no, documentTitle, documentSubCategory, error, errorMessage, fileError, fileErrorMessage, keyword, isLoading, searchData} = this.state;

        return (
            <>
                <div className="px-2 my-2">
                    <h3 className="pb-3">Document Search</h3>
                    <div className={`bg-white rounded p-2 my-2  `}>
                        <div className="rounded p-3 my-2">
                            <div className="row px-2 my-3">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-4">
                                            Category
                                        </div>
                                        <div className="col-md-8">
                                            <select name={'category_id'} value={category_id}
                                                    onChange={this.handleChange}
                                                    className={`form-control`}>
                                                <option>--Select Category--</option>
                                                <DocumentCategoryOptions/>
                                            </select>
                                            {error &&
                                            <span className="error">{errorMessage}</span>
                                            }
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
                                                    className={`form-control`}>
                                                <option>--Select Category--</option>
                                                {documentSubCategory.length > 0 && documentSubCategory.map((item, index) => (
                                                    <option key={index}
                                                            value={item.id}>{item.sub_category_name}</option>
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
                                            Title
                                        </div>
                                        <div className="col-md-8">
                                            <select name={'title'} value={title}
                                                    onChange={this.handleChange}
                                                    className={`form-control`}>
                                                <option value="">--Select Title--</option>
                                                {documentTitle.length > 0 && documentTitle.map((item, index) => (
                                                    <option key={index}
                                                            value={item.title}>{item.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-4">
                                            Content Type
                                        </div>
                                        <div className="col-md-8">
                                            <select name={'content_type'} value={content_type}
                                                    onChange={this.handleChange}
                                                    className={`form-control`}>
                                                <option value="">--Select Content Type--</option>
                                                {this.content_types.map((value, index) => (
                                                    <option value={index + 1} key={index}>{value}</option>
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
                                            Circular No
                                        </div>
                                        <div className="col-md-8">
                                            <input
                                                placeholder='Circular No'
                                                name={'circular_no'}
                                                value={circular_no}
                                                onChange={this.handleChange}
                                                className={`form-control`}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-4">
                                            Keyword (Multiple Keyword Separated by Comma)
                                        </div>
                                        <div className="col-md-8">
                                            <input
                                                placeholder='Add Comma Seperated keyword'
                                                name={'keyword'}
                                                value={keyword}
                                                onChange={this.handleChange}
                                                onKeyPress={this.handleKeyPress}
                                                className={`form-control`}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-outline-info"
                                        onClick={this.handleSearch}>Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={'p-2 my-2'}>
                        {fileError &&
                        <div className="row">
                            <div className="col-md-4 alert alert-danger" role="alert">
                                {fileErrorMessage}
                            </div>
                        </div>
                        }
                        <div className="rounded p-3 bg-white shadow">
                            {isLoading ? <h2>Loading</h2> : searchData.length > 0 ? <>
                                <nav className="navbar text-center mb-2 pl-2 rounded">
                                    <p className="text-dark f-weight-500 f-20px m-0">Document Search</p>
                                </nav>
                                <table className="table table-bordered table-striped table-hover text-center">
                                    <thead>
                                    <tr>
                                        {this.table_header.map((item, index) => (
                                            <th key={index}>{item}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {searchData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.category_name}</td>
                                            <td>{item.sub_category_name}</td>
                                            <td>{item.title}</td>
                                            <td>
                                                <div dangerouslySetInnerHTML={{__html: item.description}}/>
                                            </td>
                                            <td>{item.circular_no}</td>
                                            <td>
                                                <span
                                                    className={`badge badge-${item.content_type == 1 ? 'success' : 'primary'}`}>{item.content_type == 1 ? 'notice' : 'circular'}</span>
                                            </td>
                                            <td>
                                                <span
                                                    className={`badge badge-${item.display_notice ? 'info' : 'warning'}`}>{item.display_notice ? 'on' : 'off'}</span>
                                            </td>
                                            <td>
                                                {item.status ?
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
                                            <td>
                                                <a href="/"
                                                   onClick={e => this.downloadFile(e, item.file_name)}>Download</a>
                                            </td>
                                            <td>
                                                <a href={`/documents/document-list-search/notice/id/${item.id}`}
                                                   target="_blank">Details</a>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </> : <h5>Currently There are No Content</h5>}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default DocumentListSearch;