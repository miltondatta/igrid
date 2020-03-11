import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import Axios from "axios";
import {apiUrl, apiBaseUrl} from "../../utility/constant";
import moment from "moment";
import {getFileExtension} from "../../utility/custom";

moment.locale('en');


class DocumentListDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: [],
            isLoading: false,
            fileError: '',
            fileErrorMessage: '',
            fileUrl: ''
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const {id} = this.props.match.params;
        this.setState({
            isLoading: true
        }, () => {
            Axios.get(apiUrl() + 'document/list/details/' + id)
                .then(res => {
                    this.setState({
                        item: res.data
                    }, () => {
                        let ext = getFileExtension(res.data.file_name);
                        if (res.data.file_name && ext === 'pdf') {
                            Axios(apiUrl() + `document/list/pdf/${res.data.file_name}`, {
                                method: "GET",
                                responseType: "blob"
                            })
                                .then(response => {
                                    const file = new Blob([response.data], {type: "application/pdf"});

                                    this.setState({
                                        fileUrl: URL.createObjectURL(file)
                                    });
                                })
                                .catch(err => {
                                    this.setState({
                                        fileError: true,
                                        fileErrorMessage: res.data.file_name + ' File didn\'t found!'
                                    });
                                    console.log(err.response);
                                });
                        }
                    });
                })
                .then(() => {
                    this.setState({
                        isLoading: false
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
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
        const {item, fileUrl, fileError, fileErrorMessage} = this.state;
        const ext = item.file_name && getFileExtension(item.file_name);
        let images = ['jpg', 'jpeg', 'png'];

        return (
            <>
                {fileError &&
                <div
                    className="alert alert-danger mx-1 mb-2"
                    role="alert">
                    {fileErrorMessage}
                </div>
                }
                <div className="ui-document-details-container">
                    <div className="bg-project-blue p-3">
                        <div className="row">
                            <div className="col-md-12 p-0">
                                <table className="table text-white border-less-table">
                                    <tbody>
                                    <tr className={'border border-bottom'}>
                                        <th>Category</th>
                                        <th>:</th>
                                        <td>{item.document_category && item.document_category.category_name}</td>
                                    </tr>
                                    <tr className={'border border-bottom'}>
                                        <th>Sub Category</th>
                                        <th>:</th>
                                        <td>{item.document_sub_category && item.document_sub_category.sub_category_name}</td>
                                    </tr>
                                    <tr className={'border border-bottom'}>
                                        <th>Title</th>
                                        <th>:</th>
                                        <td>{item.title}</td>
                                    </tr>
                                    <tr className={'border border-bottom'}>
                                        <th>Content Type</th>
                                        <th>:</th>
                                        <td>{item.content_type ? 'Notice' : 'Circular'}</td>
                                    </tr>
                                    <tr className={'border border-bottom'}>
                                        <th>Circular Number</th>
                                        <th>:</th>
                                        <td>{item.circular_no}</td>
                                    </tr>
                                    <tr className={'border border-bottom'}>
                                        <th>Display Notice</th>
                                        <th>:</th>
                                        <td>{item.display_notice ? 'On' : 'Off'}</td>
                                    </tr>
                                    <tr className={'border border-bottom'}>
                                        <th>Status</th>
                                        <th>:</th>
                                        <td>{item.status ? 'Active' : 'Inactive'}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="ui-document-details-right">
                        <div className="ui-document-details-header  p-3">
                            <div className="row">
                                <div className="col-md-2">
                                    <ul className="list-unstyled pl-1"
                                        style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        <li>Document Date</li>
                                        <li>Description</li>
                                    </ul>
                                </div>
                                <div className="col-md-1 pr-0">
                                    <ul className="list-unstyled" style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        <li>:</li>
                                        <li>:</li>
                                    </ul>
                                </div>
                                <div className="col-md-9 p-0">
                                    <ul className="list-unstyled" style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        <li>{moment(item.document_date).format('dddd MM, YYYY hh:mm a')}</li>
                                        <li style={{fontWeight: 400}}
                                            dangerouslySetInnerHTML={{__html: item.description}}></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">
                                    <ul className="list-unstyled pl-1"
                                        style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        <li>File Download</li>
                                    </ul>
                                </div>
                                <div className="col-md-1 pr-0">
                                    <ul className="list-unstyled" style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        <li>:</li>
                                    </ul>
                                </div>
                                <div className="col-md-6 px-0">
                                    <ul className="list-unstyled" style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        {!fileError && <li>
                                            <p className={'text-white'}>{item.file_name}</p>
                                        </li>}
                                    </ul>
                                </div>
                                <div className="col-md-3">
                                    <ul className="list-unstyled" style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        {!fileError && <li>
                                            <button className={'ui-document-btn'} onClick={e => this.downloadFile(e, item.file_name)}><i
                                                className="icofont-download"></i> Download File</button>
                                        </li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {item.file_name && !fileError &&
                        <div className="row">
                            <div className="col-md-12">
                                {(ext === 'pdf') &&
                                <div className="ui-docDetailsFile">
                                    <iframe id="inlineFrameExample"
                                            title="Inline Frame Example"
                                            width="100%"
                                            height="100%"
                                            src={fileUrl}>
                                    </iframe>
                                </div>
                                }

                                {(images.includes(ext)) &&
                                <div className="ui-docDetailsFile">
                                    <img src={`${apiBaseUrl}document/${item.file_name}`} alt="" width="100%"
                                         height="100%"/>
                                </div>
                                }
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(DocumentListDetails);