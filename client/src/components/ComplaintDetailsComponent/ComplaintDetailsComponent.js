import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import Axios from "axios";
import {apiUrl, apiBaseUrl} from "../../utility/constant";
import moment from "moment";
import {getFileExtension} from "../../utility/custom";
import * as jwt from "jsonwebtoken";

moment.locale('en');


class ComplaintDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            isLoading: false,
            fileError: '',
            fileErrorMessage: '',
            fileUrl: ''
        }
    }

    componentDidMount() {
        const user = jwt.decode(localStorage.getItem('user')).data;
        this.setState({user}, () => this.getData());
    }

    getData = () => {
        const {id} = this.props.match.params;
        const {user} = this.state;
        this.setState({
            isLoading: true
        }, () => {
            Axios.get(apiUrl() + 'complaint/details/' + id + '/' + user.id)
                .then(res => {
                    this.setState({
                        item: res.data[0]
                    }, () => {
                        if (!res.data.length > 0) return;
                        let ext = getFileExtension(res.data[0].file_name);
                        if (res.data[0].file_name && ext === 'pdf') {
                            Axios(apiUrl() + `complaint/pdf/${res.data[0].file_name}`, {
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

        Axios.get(apiUrl() + 'complaint/download/' + file_name)
            .then(() => {
                const link = document.createElement('a');
                link.href = apiUrl() + 'complaint/download/' + file_name;
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
        const ext = item && item.file_name && getFileExtension(item.file_name);
        let images = ['jpg', 'jpeg', 'png'];

        return (
            <>
                {fileError && <div className="alert alert-danger mx-1 mb-2 mt-2" role="alert">{fileErrorMessage}</div>}
                <div className="ui-document-details-container min-h-86p">
                    <div className="bg-project-blue p-3">
                        <div className="row">
                            <div className="col-md-12 p-0">
                                <table className="table text-white border-less-table">
                                    <tbody>
                                    <tr>
                                        <th className={'border-bottom-light'}>Complaint No</th>
                                        <th className={'border-bottom-light'}>:</th>
                                        <td className={'border-bottom-light'}>{item && item.complaint_no}</td>
                                    </tr>
                                    <tr className={'border border-bottom'}>
                                        <th className={'border-bottom-light'}>Assigned {item && item.bool ? 'to' : 'by'}</th>
                                        <th className={'border-bottom-light'}>:</th>
                                        <td className={'border-bottom-light'}>{item && item.assign_to}</td>
                                    </tr>
                                    <tr className={'border border-bottom'}>
                                        <th className={'border-bottom-light'}>Complaint Name</th>
                                        <th className={'border-bottom-light'}>:</th>
                                        <td className={'border-bottom-light'}>{item && item.complaint_name}</td>
                                    </tr>
                                    <tr className={'border border-bottom'}>
                                        <th className={'border-bottom-light'}>Sub Complaint Name</th>
                                        <th className={'border-bottom-light'}>:</th>
                                        <td className={'border-bottom-light'}>{item && item.sub_complaint_name}</td>
                                    </tr>
                                    {item && item.product_name &&
                                    <tr className={'border border-bottom'}>
                                        <th className={'border-bottom-light'}>Product Name</th>
                                        <th className={'border-bottom-light'}>:</th>
                                        <td className={'border-bottom-light'}>{item && item.product_name}</td>
                                    </tr>
                                    }
                                    {item && item.product_serial &&
                                    <tr className={'border border-bottom'}>
                                        <th className={'border-bottom-light'}>Product Serial</th>
                                        <th className={'border-bottom-light'}>:</th>
                                        <td className={'border-bottom-light'}>{item && item.product_serial}</td>
                                    </tr>
                                    }
                                    <tr className={'border border-bottom'}>
                                        <th className={'border-bottom-light'}>Status</th>
                                        <th className={'border-bottom-light'}>:</th>
                                        <td className={'border-bottom-light'}>{item && item.status_name}</td>
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
                                    <ul className="ul-list-unstyled pl-1"
                                        style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        <li>Complaint Date</li>
                                        <li>Problem Details</li>
                                    </ul>
                                </div>
                                <div className="col-md-1 pr-0">
                                    <ul className={'ul-list-unstyled'}
                                        style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        <li>:</li>
                                        <li>:</li>
                                    </ul>
                                </div>
                                <div className="col-md-9 p-0">
                                    <ul className={'ul-list-unstyled'}
                                        style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        <li>{item && moment(item.createdAt).format('MMMM Do YYYY, hh:mm a')}</li>
                                        <li style={{fontWeight: 400}}>{item && item.problem_details}</li>
                                    </ul>
                                </div>
                            </div>
                            {item && item.file_name &&
                            <div className="row">
                                <div className="col-md-2">
                                    <ul className="ul-list-unstyled pl-1"
                                        style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        <li>File Download</li>
                                    </ul>
                                </div>
                                <div className="col-md-1 pr-0">
                                    <ul className={'ul-list-unstyled'}
                                        style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        <li>:</li>
                                    </ul>
                                </div>
                                <div className="col-md-6 px-0">
                                    <ul className={'ul-list-unstyled'}
                                        style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        {!fileError && <li>
                                            <p className={'text-white'}>{item && item.file_name}</p>
                                        </li>}
                                    </ul>
                                </div>
                                <div className="col-md-3">
                                    <ul className={'ul-list-unstyled'}
                                        style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        {!fileError && item && <li>
                                            <button className={'ui-document-btn'}
                                                    onClick={e => this.downloadFile(e, item.file_name)}><i
                                                className="icofont-download"></i> Download File
                                            </button>
                                        </li>}
                                    </ul>
                                </div>
                            </div>
                            }
                        </div>
                        {item && item.file_name && !fileError &&
                        <div className="row">
                            <div className="col-md-12">
                                {(ext === 'pdf') ?
                                    <div className="ui-docDetailsFile">
                                        <iframe id="inlineFrameExample"
                                                title="Inline Frame Example"
                                                width="100%"
                                                height="100%"
                                                src={fileUrl}>
                                        </iframe>
                                    </div>
                                    : (images.includes(ext)) ?
                                        <div className="ui-docDetailsFile">
                                            <img src={`${apiBaseUrl}public/${item.file_name}`} alt="" width="100%"
                                                 height="100%"/>
                                        </div>
                                        :
                                        <div className="ui-document-preview">
                                            <img src={process.env.PUBLIC_URL + '/media/image/preview.png'}
                                                 alt="Preview"/>
                                            <h3>Complaint File Is Not Viewable! <p
                                                onClick={e => this.downloadFile(e, item.file_name)}>Download Here</p>
                                            </h3>
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

export default withRouter(ComplaintDetailsComponent);