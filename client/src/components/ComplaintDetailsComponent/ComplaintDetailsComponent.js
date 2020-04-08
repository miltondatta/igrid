import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import Axios from "axios";
import {apiUrl, apiBaseUrl} from "../../utility/constant";
import moment from "moment";
import {getFileExtension} from "../../utility/custom";
import * as jwt from "jsonwebtoken";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";
import UserRoleOptions from "../../utility/component/userRoleOptions";
import UserOptionsByRole from "../../utility/component/userOptionsByRole";

moment.locale('en');


class ComplaintDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complaintFeedBackAllData: [],
            complaintFeedBackTableData: [],
            complaintForwardAllData: [],
            complaintForwardTableData: [],
            feedback: '',
            file_name: '',
            role_id: '',
            fw_to: '',
            solution_details: '',
            item: {},
            success: false,
            successMessage: '',
            errorDict: null,
            error: false,
            errorMessage: '',
            isLoading: false,
            fileError: '',
            fileErrorMessage: '',
            fileUrl: ''
        };

        this.accepted_file_ext = ['png', 'jpg', 'jpeg', 'doc', 'docx', 'pdf', 'xlsx'];
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
                    if (res.data.length < 1) {this.props.history.push('/assign-complaint'); window.location.reload()}
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
                    }, () => {
                        const {item} = this.state;
                        if (item && Object.values(item).length > 0) {
                            this.getComplaintFeedBackData();
                            this.getComplaintForwardData();
                        }
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        })
    };

    getComplaintFeedBackData = () => {
        const {id} = this.state.item;

        this.setState({
            isLoading: true
        }, () => {
            Axios.post(apiUrl() + 'complaint/feedback/all/by/credential', {complaint_id: id})
                .then(res => {
                    this.setState({
                        complaintFeedBackAllData: res.data,
                        isLoading: false,
                        complaintFeedBackTableData: []
                    }, () => {
                        let complaintFeedBackTableData = [];
                        res.data.length > 0 && res.data.map(item => {
                            let newObj = {
                                id: item.id,
                                complaint_name: item.complaint_name,
                                sub_complaint_name: item.sub_complaint_name,
                                feedback: item.feedback,
                                feedback_by: item.feedback_by,
                                file_name: item.file_name,
                                feedback_at: moment(item.createdAt).format('YYYY-MM-DD h:mm:ss a')
                            };
                            complaintFeedBackTableData.push(newObj);
                        });
                        this.setState({complaintFeedBackTableData});
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        })
    };

    getComplaintForwardData = () => {
        const {id} = this.state.item;

        this.setState({
            isLoading: true
        }, () => {
            Axios.post(apiUrl() + 'complaint/forward/all/by/credential', {complaint_id: id})
                .then(res => {
                    this.setState({
                        complaintForwardAllData: res.data,
                        isLoading: false,
                        complaintForwardTableData: []
                    }, () => {
                        const complaintForwardTableData = res.data.length > 0 && res.data.map(item => {
                            return {
                                complaint_name: item.complaint_name,
                                sub_complaint_name: item.sub_complaint_name,
                                forward_by: item.forward_by,
                                forward_to: item.forward_to,
                                forwarded_at: moment(item.createdAt).format('YYYY-MM-DD h:mm:ss a')
                            };
                        });
                        this.setState({complaintForwardTableData});
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

    handleChange = (e, formType) => {
        const {name, value, files} = e.target;
        if (!value) return;

        if (name === 'file_name') {
            if (!files.length) return;
            const ext = getFileExtension(files[0].name);
            if (!this.accepted_file_ext.includes(ext)) return this.setState({extError: true, file_name: ''});

            this.setState({
                file_name: files[0],
                extError: false
            }, () => this.validate(formType));
        } else {
            this.setState({
                [name]: value
            }, () => this.validate(formType));
        }
    };

    handleSubmit = formType => {
        if (Object.values(this.validate(formType)).includes(false)) return;

        if (formType === 'FEEDBACK') {
            Axios.post(apiUrl() + 'complaint/feedback/store', this.getApiData(formType))
                .then(res => {
                    const {success, msg} = res.data;
                    this.setState({
                        complaintFeedBackTableData: [],
                        feedbackSuccess: success,
                        feedbackSuccessMessage: msg,
                        feedbackError: false
                    }, () => {
                        document.getElementById('validatedCustomFile').value = '';
                    })
                })
                .then(() => {
                    this.setState({
                        feedback: '',
                        file_name: ''
                    });
                    this.getData();
                })
                .catch(err => {
                    const {error, msg} = err.response.data;
                    if (msg) {
                        this.setState({
                            feedbackError: error,
                            feedbackErrorMessage: error && msg,
                            feedbackSuccess: false
                        })
                    }
                    console.log(err.response);
                })
        } else if (formType === 'FORWARD') {
            Axios.post(apiUrl() + 'complaint/forward/store', this.getApiData(formType))
                .then(res => {
                    const {success, msg} = res.data;
                    this.setState({
                        complaintForwardTableData: [],
                        forwardSuccess: success,
                        forwardSuccessMessage: msg,
                        forwardError: false
                    })
                })
                .then(() => {
                    this.setState({
                        role_id: '',
                        fw_to: ''
                    });
                    this.getData();
                })
                .catch(err => {
                    const {error, msg} = err.response.data;
                    if (msg) {
                        this.setState({
                            forwardError: error,
                            forwardErrorMessage: error && msg,
                            forwardSuccess: false
                        })
                    }
                    console.log(err.response);
                })
        } else if (formType === 'CLOSE') {
            Axios.post(apiUrl() + 'complaint/update', this.getApiData(formType))
                .then(res => {
                    const {success, msg} = res.data;
                    this.setState({
                        success: success,
                        successMessage: msg
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                success: false
                            })
                        }, 2300);
                    })
                })
                .then(() => {
                    this.setState({
                        solution_details: ''
                    });
                    this.getData();
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
        }

    };

    validate = formType => {
        const {feedback, role_id, fw_to, solution_details} = this.state;
        let errorDict = {};

        if (formType === 'FEEDBACK') {
            errorDict = {
                feedback: feedback !== ''
            };
        } else if (formType === 'FORWARD') {
            errorDict = {
                role_id: role_id !== '',
                fw_to: fw_to !== ''
            };
        } else if (formType === 'CLOSE') {
            errorDict = {
                solution_details: solution_details !== ''
            };
        }

        this.setState({errorDict});
        return errorDict;
    };

    getApiData = formType => {
        const {feedback, file_name, user, item, fw_to, solution_details} = this.state;
        let data = '';

        if (formType === 'FEEDBACK') {
            data = new FormData();
            data.append('complaint_id', item.id);
            data.append('feedback', feedback);
            data.append('file', file_name);
            data.append('feedback_by', user.id);
        } else if (formType === 'FORWARD') {
            data = {
                complaint_id: item.id,
                fw_by: user.id,
                fw_to
            }
        } else if (formType === 'CLOSE') {
            data = {
                id: item.id,
                solution_details: solution_details,
                solved_by: user.id
            }
        }
        return data;
    };

    fileDownload = (e, file_name) => {
        e.preventDefault();
        Axios.get(apiUrl() + 'complaint/feedback/download/' + file_name)
            .then(() => {
                const link = document.createElement('a');
                link.href = apiUrl() + 'complaint/feedback/download/' + file_name;
                link.setAttribute('download', file_name);
                link.click();
                this.setState({feedbackError: false});
            })
            .catch(err => {
                const {error, msg} = err.response.data;
                if (msg) {
                    this.setState({
                        feedbackError: error,
                        feedbackErrorMessage: error && msg,
                        feedbackSuccess: false
                    })
                }
                console.log(err.response);
            })
    };

    render() {
        const {
            complaintFeedBackTableData, item, file_name, feedback, fileUrl, fileError, extError, fileErrorMessage,
            error, errorMessage, success, successMessage, errorDict, role_id, fw_to, solution_details, complaintForwardAllData, user
        } = this.state;
        const ext = item && item.file_name && getFileExtension(item.file_name);
        let images = ['jpg', 'jpeg', 'png'];
        const forward_check = complaintForwardAllData.length > 0 ? complaintForwardAllData.filter(item => item.fw_by === user.id) : [];

        return (
            <>
                {success && <SuccessModal successMessage={successMessage}/>}
                {error && <ErrorModal errorMessage={errorMessage}/>}
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
                            <div className="row">
                                <div className="col-md-2">
                                    <ul className="ul-list-unstyled pl-1"
                                        style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        <li>Action</li>
                                    </ul>
                                </div>
                                <div className="col-md-1 pr-0">
                                    <ul className={'ul-list-unstyled'}
                                        style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        <li>:</li>
                                    </ul>
                                </div>
                                <div className="col-md-2 pl-0">
                                    <ul className={'ul-list-unstyled'}
                                        style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        <button className={'submit-btn-normal w-100'} data-toggle={'modal'}
                                                data-target={'#complaintFeedback'}>FeedBack
                                        </button>
                                    </ul>
                                </div>
                                <div className="col-md-2 pl-0">
                                    <ul className={'ul-list-unstyled'}
                                        style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        <button className={'submit-btn-normal bg-success w-100'} data-toggle={'modal'}
                                                data-target={'#complaintForward'}>Forward
                                        </button>
                                    </ul>
                                </div>
                                {item && item.status !== 8 &&
                                <div className="col-md-2 pl-0">
                                    <ul className={'ul-list-unstyled'}
                                        style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                        <button className={'reset-btn-normal w-100'} data-toggle={'modal'}
                                                data-target={'#complaintClose'}>Close
                                        </button>
                                    </ul>
                                </div>
                                }
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
                                            <img src={`${apiBaseUrl}complaints/${item.file_name}`} alt="" width="100%"
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

                <div className="modal fade lost-asset-modal" id="complaintFeedback" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Complaint Feedback</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.state.feedbackSuccess && <div className="alert alert-success" role="alert">
                                    {this.state.feedbackSuccessMessage}
                                </div>}
                                {this.state.feedbackError && <div className="alert alert-danger" role="alert">
                                    {this.state.feedbackErrorMessage}
                                </div>}
                                {complaintFeedBackTableData.length > 0 ?
                                    <PrimeDataTable
                                        data={complaintFeedBackTableData}
                                        file={this.fileDownload}
                                    />
                                    : <h4 className={'no-project px-2 mt-3'}><i
                                        className="icofont-exclamation-circle"></i> Currently There are No FeedBack
                                    </h4>}
                                <nav className="navbar text-center mb-0 mt-1 pl-0 rounded">
                                    <p className="text-blue f-weight-700 f-20px m-0">Your Feedback</p>
                                </nav>
                                <div>
                                    <textarea name="feedback" value={feedback}
                                              onChange={e => this.handleChange(e, 'FEEDBACK')}
                                              placeholder={'Your Feedback'}
                                              className={`ui-custom-textarea ${errorDict && (errorDict.feedback === false) && 'is-invalid'}`}
                                              style={{height: '100px'}}/>
                                </div>
                                <div className="ui-custom-file">
                                    <input type="file" onChange={e => this.handleChange(e, 'FEEDBACK')}
                                           name={'file_name'}
                                           className={`custom-file-input`} id="validatedCustomFile"/>
                                    <label htmlFor="validatedCustomFile"
                                           style={{width: '100%'}}>{file_name ? file_name.name ? file_name.name.substr(0, 20) + '...' : file_name.substr(0, 20) + '...' : 'Choose File'}</label>
                                    <div className="bottom text-center" style={{width: '100%'}}>
                                        JPG | JPEG | PNG | DOC | PDF | XLSX Allowed
                                    </div>
                                    {extError &&
                                    <span className="error">Only png, jpg, jpeg, doc, docx, pdf, xlsx file format is allowed!</span>
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="reset-btn-normal" data-dismiss="modal">Close</button>
                                <button type="button" className="submit-btn-normal"
                                        onClick={() => this.handleSubmit('FEEDBACK')}>Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade lost-asset-modal" id="complaintForward" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Complaint Forward</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.state.forwardSuccess && <div className="alert alert-success" role="alert">
                                    {this.state.forwardSuccessMessage}
                                </div>}
                                {this.state.forwardError && <div className="alert alert-danger" role="alert">
                                    {this.state.forwardErrorMessage}
                                </div>}
                                {this.state.complaintForwardTableData.length > 0 ?
                                    <PrimeDataTable
                                        data={this.state.complaintForwardTableData}
                                    />
                                    : <h4 className={'no-project px-2 mt-3'}><i
                                        className="icofont-exclamation-circle"></i> Currently There are No Forward
                                    </h4>}
                                {item && item.status !== 8 && forward_check.length < 1 &&
                                <>
                                    <nav className="navbar text-center mb-0 mt-1 pl-0 rounded">
                                        <p className="text-blue f-weight-700 f-20px m-0">Forward To Another User</p>
                                    </nav>
                                    <div className="mb-2">
                                        <label htmlFor="inputPassword4" className={'ui-custom-label'}>User Role</label>
                                        <select name={'role_id'} value={role_id}
                                                onChange={e => this.handleChange(e, 'FORWARD')}
                                                className={`ui-custom-input ${errorDict && (errorDict.role_id === false) && 'is-invalid'}`}>
                                            <option value="">Select User Role</option>
                                            <UserRoleOptions/>
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="inputPassword4" className={'ui-custom-label'}>User</label>
                                        <select name={'fw_to'} value={fw_to}
                                                onChange={e => this.handleChange(e, 'FORWARD')}
                                                className={`ui-custom-input ${errorDict && (errorDict.fw_to === false) && 'is-invalid'}`}>
                                            <option value="">Select User</option>
                                            <UserOptionsByRole role_id={role_id}/>
                                        </select>
                                    </div>
                                </>
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="reset-btn-normal" data-dismiss="modal">Close</button>
                                {item && item.status !== 8 && forward_check.length < 1 &&
                                <button type="button" className="submit-btn-normal"
                                        onClick={() => this.handleSubmit('FORWARD')}>Submit
                                </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {item && item.status !== 8 &&
                <div className="modal fade lost-asset-modal" id="complaintClose" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Complaint Close</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <nav className="navbar text-center mb-0 mt-1 pl-0 rounded">
                                    <p className="text-blue f-weight-700 f-20px m-0">Solution Details</p>
                                </nav>
                                <textarea name="solution_details" value={solution_details}
                                          onChange={e => this.handleChange(e, 'CLOSE')}
                                          placeholder={'Solution Details'}
                                          className={`ui-custom-textarea ${errorDict && (errorDict.solution_details === false) && 'is-invalid'}`}
                                          style={{height: '150px'}}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="reset-btn-normal" data-dismiss="modal">Close</button>
                                <button type="button" className="submit-btn-normal" id={'complaintCloseSubmitButton'}
                                        onClick={() => this.handleSubmit('CLOSE')}
                                        data-dismiss={solution_details ? 'modal' : ''}>Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </>
        );
    }
}

export default withRouter(ComplaintDetailsComponent);