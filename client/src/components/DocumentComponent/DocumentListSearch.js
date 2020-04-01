import React, {Component} from 'react';
import {apiBaseUrl, apiUrl} from "../../utility/constant";
import DocumentCategoryOptions from "../../utility/component/documentCategoryOptions";
import Axios from "axios";
import moment from "moment";
import DatePicker from 'react-datepicker2';
import Spinner from "../../layouts/Spinner";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import ErrorModal from "../../utility/error/errorModal";
import {disabledRanges} from "../../utility/custom";

moment.locale('en');

class DocumentListSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category_id: '',
            keywordText: '',
            sub_category_id: '',
            content_type: '',
            title: '',
            circular_no: '',
            activeSuggestion: 0,
            from_date: moment(),
            to_date: moment(),
            error: false,
            receivedByFocus: false,
            recDropFoc: false,
            errorMessage: '',
            fileError: false,
            fileErrorMessage: '',
            searchData: [],
            searchTableData: [],
            documentTitle: [],
            documentSubCategory: [],
            keyword: [],
            keywordHolder: [],
            isLoading: false
        };

        this.content_types = ['Notice', 'Circular'];
        this.table_header = ['Serial No', 'Category Name', 'Sub Category Name', 'Title', 'Description', 'Circular No', 'Document Date', 'Content Type', 'File', 'Details'];
    }

    componentDidMount() {
        const {from_date, to_date} = this.state;
        this.getData({from_date: from_date.subtract(1, 'day'), to_date});
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        const {category_id} = this.state;

        switch (name) {
            case "category_id":
                if (!value) return;
                Axios.get(apiUrl() + 'document/sub/category/by/category/' + value)
                    .then(resData => {
                        this.setState({
                            documentSubCategory: resData.data
                        }, () => {
                            this.setState({
                                category_id: value,
                                sub_category_id: '',
                                title: '',
                                documentTitle: [],
                                keyword: [],
                                keywordHolder: [],
                                activeSuggestion: 0,
                                error: false
                            }, () => {
                                this.getKeyword({category_id: value});
                            });
                        })
                    });
                return;
            case "sub_category_id":
                if (!value) return;
                Axios.post(apiUrl() + 'document/list/by/category/sub/category', {
                    category_id: category_id,
                    sub_category_id: value
                })
                    .then(resData => {
                        this.setState({
                            documentTitle: resData.data
                        }, () => {
                            this.setState({
                                sub_category_id: value,
                                title: '',
                                keyword: [],
                                keywordHolder: [],
                                activeSuggestion: 0
                            }, () => {
                                this.getKeyword({category_id, sub_category_id: value});
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

    handleSearch = () => {
        const {category_id, sub_category_id, content_type, title, circular_no, from_date, to_date, keywordHolder} = this.state;
        if (!category_id) return this.setState({errorMessage: 'Category Field is required!', error: true});
        const data = {
            category_id,
            sub_category_id,
            content_type,
            title,
            circular_no,
            from_date: from_date.subtract(1, 'day'),
            to_date,
            keyword: keywordHolder
        };
        this.getData(data);
    };

    getData = (data) => {
        this.setState({
            isLoading: true
        }, () => {
            Axios.post(apiUrl() + 'document/list/search', data)
                .then(res => {
                    this.setState({
                        searchData: res.data[0],
                        error: false,
                        isLoading: false,
                        searchTableData: []
                    }, () => {
                        let searchTableData = [];
                        res.data[0].length > 0 && res.data[0].map(item => {
                            let newObj = {
                                id: item.id,
                                category_name: item.category_name,
                                sub_category_name: item.sub_category_name,
                                title: item.title,
                                description: item.description,
                                circular_no: item.circular_no,
                                document_date: moment(item.document_date).format('YYYY-MM-DD'),
                                content_type: item.content_type === 1 ? 'notice' : 'circular',
                                file_name: item.file_name
                            };
                            searchTableData.push(newObj);
                        });
                        this.setState({searchTableData: searchTableData}, () => {
                            this.setState({
                                from_date: this.state.from_date.add(1, 'day')
                            })
                        })
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        });
    };

    getKeyword = (data) => {
        Axios.post(apiUrl() + 'document/list/keyword/by/category/sub/category', data)
            .then(res => {
                let keyword_content = [];
                res.data.map(item => {
                    if (item.keyword !== null) {
                        keyword_content = [...(item.keyword.split(',').filter(value => value !== '')), ...keyword_content]
                    }
                });

                this.setState({
                    keyword: keyword_content.filter((value, index, self) => self.indexOf(value) === index)
                });
            })
            .catch(err => {
                console.log(err.response);
            });
    };

    deleteKey = (index) => {
        let newKeys = this.state.keywordHolder.filter((item, ind) => index !== ind);
        this.setState({
            keywordHolder: newKeys
        })
    };

    onKeyDown = e => {
        const {activeSuggestion, keyword, keywordHolder, keywordText} = this.state;
        let filterKeys = keyword.length > 0 && keyword.filter(item => item.includes(keywordText));
        const keyboardCode = [13, 38, 40]; // 13 = Enter, 38 = Arrow key up, 40 = Arrow key down

        if (keyboardCode.includes(e.keyCode)) {
            let x = document.getElementById('keywordScrollID');

            if (e.keyCode === 13) {
                if (!keywordHolder.includes(filterKeys[activeSuggestion])) {
                    this.setState({
                        activeSuggestion: 0,
                        keywordHolder: [...keywordHolder, filterKeys[activeSuggestion]],
                        keywordText: '',
                        receivedByFocus: false
                    });
                } else return false;
            } else if (e.keyCode === 38) {
                if (activeSuggestion === 0) return;
                if (activeSuggestion > 2) x.scrollBy(0, -50)
                this.setState({activeSuggestion: activeSuggestion - 1});
            } else if (e.keyCode === 40) {
                if (activeSuggestion === filterKeys.length - 1) return;
                if (activeSuggestion > 1) x.scrollBy(0, 50);
                this.setState({activeSuggestion: activeSuggestion + 1});
            }
        }
    };

    fileDownload = (e, file_name) => {
        e.preventDefault();
        Axios.get(apiUrl() + 'document/list/download/' + file_name)
            .then(() => {
                const link = document.createElement('a');
                link.href = apiUrl() + 'document/list/download/' + file_name;
                link.setAttribute('download', file_name);
                link.click();
            })
            .catch(err => {
                const {error, msg} = err.response.data;
                if (msg) {
                    this.setState({
                        fileError: error,
                        fileErrorMessage: error && msg
                    }, () => {
                        setTimeout(() => {
                            this.setState({fileError: false});
                        }, 2300);
                    })
                }
                console.log(err.response);
            })
    };

    docDetails = id => {
      let a = document.createElement('a');
      a.href = process.env.PUBLIC_URL + '/documents/details/' + id;
      a.target = '_blank';
      a.click();
    };

    render() {

        const {
            category_id, keywordText, sub_category_id, content_type, title, circular_no, receivedByFocus, recDropFoc, from_date, to_date, documentTitle, keywordHolder,
            documentSubCategory, error, errorMessage, fileError, fileErrorMessage, keyword, activeSuggestion, isLoading, searchData, searchTableData
        } = this.state;
        let filterKeys = keyword.length > 0 && keyword.filter(item => item.includes(keywordText));
        const keywordList = filterKeys.length > 0 && filterKeys.map((item, index) => (
            <p key={index} className={index === activeSuggestion ? 'ui-received-by-active' : ''} onClick={() => {
                !keywordHolder.includes(item) && this.setState({
                    keywordHolder: [...this.state.keywordHolder, item],
                    keywordText: ''
                })
            }}>{item}</p>
        ));
        const badgeKeyword = keywordHolder.length > 0 && keywordHolder.map((item, index) => (
            <li className="ui-custom-badge" style={{marginTop: 3}} key={index}>{item} <i onClick={() => {
                this.deleteKey(index)
            }} className="fas fa-times-circle cursor-pointer"></i></li>
        ));

        return (
            <>
                <div className="px-2 my-2">
                    <div className="px-2 py-1 my-1">
                        <div className={`bg-white rounded p-3 my-1 ui-document-search`}>
                            <h5 className="ui-document-search-title">Document Search</h5>
                            <div>
                                <div className="grid-3">
                                    <div>
                                        <label className={'ui-custom-label'}>Category</label>
                                        <select name={'category_id'} value={category_id}
                                                onChange={this.handleChange}
                                                className={`ui-custom-input`}>
                                            <option value="">Select Category</option>
                                            <DocumentCategoryOptions/>
                                        </select>
                                        {error &&
                                        <span className="error">{errorMessage}</span>
                                        }
                                    </div>
                                    <div>
                                        <label className={'ui-custom-label'}>Sub Category</label>
                                        <select name={'sub_category_id'} value={sub_category_id}
                                                onChange={this.handleChange}
                                                className={`ui-custom-input`}>
                                            <option value="">Select Category</option>
                                            {documentSubCategory.length > 0 && documentSubCategory.map((item, index) => (
                                                <option key={index}
                                                        value={item.id}>{item.sub_category_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={'ui-custom-label'}>Title</label>
                                        <select name={'title'} value={title}
                                                onChange={this.handleChange}
                                                className={`ui-custom-input`}>
                                            <option value="">Select Title</option>
                                            {documentTitle.length > 0 && documentTitle.map((item, index) => (
                                                <option key={index}
                                                        value={item.title}>{item.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid-3 my-13p">
                                    <div>
                                        <label className={'ui-custom-label'}>Content Type</label>
                                        <select name={'content_type'} value={content_type}
                                                onChange={this.handleChange}
                                                className={`ui-custom-input`}>
                                            <option value="">Select Content Type</option>
                                            {this.content_types.map((value, index) => (
                                                <option value={index + 1} key={index}>{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={'ui-custom-label'}>Circular No</label>
                                        <input
                                            placeholder='Circular No'
                                            name={'circular_no'}
                                            value={circular_no}
                                            onChange={this.handleChange}
                                            className={`ui-custom-input`}/>
                                    </div>
                                    <div>
                                        <div className={'position-relative'}>
                                            <div className="grid-2-nc">
                                                <div>
                                                    <ul className={'d-flex flex-wrap mb-1 list-unstyled'}>
                                                        {keywordHolder.length > 0 ? badgeKeyword : <p>Keywords</p>}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <label className={'ui-custom-label'}>Keywords</label>
                                                    <input onFocus={() => {
                                                        this.setState({receivedByFocus: true})
                                                    }} onBlur={() => {
                                                        this.setState({receivedByFocus: false})
                                                    }} autoComplete={'off'} placeholder='Search Keywords'
                                                           onKeyDown={this.onKeyDown}
                                                           onKeyPress={e => e.which === 13 && e.preventDefault()}
                                                           onChange={this.handleChange}
                                                           name={'keywordText'}
                                                           value={this.state.keywordText}
                                                           className="ui-custom-input"/>
                                                    {(keyword.length > 0 && (receivedByFocus || recDropFoc)) &&
                                                    <div id={'keywordScrollID'} onMouseEnter={() => {
                                                        this.setState({recDropFoc: true})
                                                    }}
                                                         onMouseLeave={() => {
                                                             this.setState({recDropFoc: false})
                                                         }} className={'ui-received-by-keyword'}> {keywordList}
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-3">
                                    <div>
                                        <label className={'ui-custom-label'}>From Date</label>
                                        <DatePicker timePicker={false}
                                                    name={'document_date'}
                                                    className={`ui-custom-input`}
                                                    inputFormat="DD/MM/YYYY"
                                                    onChange={date => this.setState({from_date: date})}
                                                    ranges={disabledRanges}
                                                    value={from_date}/>
                                    </div>
                                    <div>
                                        <label className={'ui-custom-label'}>To Date</label>
                                        <DatePicker timePicker={false}
                                                    name={'document_date'}
                                                    className={`ui-custom-input`}
                                                    inputFormat="DD/MM/YYYY"
                                                    onChange={date => this.setState({to_date: date})}
                                                    ranges={disabledRanges}
                                                    value={to_date}/>
                                    </div>
                                    <div className="d-flex">
                                        <button className="submit-btn-normal w-100 h-100 px-4 py-2"
                                                onClick={this.handleSearch}>Search Document
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'p-2 my-2'}>
                        {fileError && <ErrorModal errorMessage={fileErrorMessage} />}
                        <div className="rounded p-3 bg-white max-h-80vh">
                            {isLoading ? <Spinner/> : searchTableData.length > 0 ? <>
                                <nav className="navbar text-center mb-2 pl-2 rounded">
                                    <p className="text-dark f-weight-500 f-20px m-0">Document Search</p>
                                </nav>
                                <ReactDataTable
                                    dataDisplay
                                    footer
                                    isLoading
                                    pagination
                                    searchable
                                    tableData={searchTableData}
                                    bigTable
                                    file={this.fileDownload}
                                    docDetails={this.docDetails}
                                />
                            </> : <h4 className={'no-project px-2'}><i
                                className="icofont-exclamation-circle"></i> Currently There are No Content</h4>}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default DocumentListSearch;