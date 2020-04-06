import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import {getFileExtension} from "../../utility/custom";
import ComCategoryOptions from "../../utility/component/comCategoryOption";
import ComSubCategoryOptions from "../../utility/component/comSubCategoryOptions";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";
import jwt from "jsonwebtoken";

class ComplaintComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assetList: [],
            user: {},
            complaint_category: '',
            complaint_sub_category: '',
            problem_details: '',
            asset_id: '',
            file_name: '',
            errorDict: null,
            extError: false,
            error: false,
            errorMessage: '',
            success: false,
            successMessage: ''
        };

        this.accepted_file_ext = ['png', 'jpg', 'jpeg', 'doc', 'docx', 'pdf', 'xlsx'];
    }

    componentDidMount() {
        const user = jwt.decode(localStorage.getItem('user')).data;
        Axios.post(apiUrl() + 'assets-entry/all/by/credentials', {user_id: user.id})
            .then(resData => {
                this.setState({
                    assetList: resData.data[0]
                }, () => {
                    this.setState({user: user});
                })
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    handleChange = (e) => {
        const {name, value, files} = e.target;

        if (name === 'file_name') {
            if (!files.length) return;
            const ext = getFileExtension(files[0].name);
            if (!this.accepted_file_ext.includes(ext)) return this.setState({extError: true, file_name: ''});

            this.setState({
                file_name: files[0],
                extError: false
            }, () => {
                this.validate();
            });
        } else {
            this.setState({
                [name]: value
            }, () => {
                this.validate();
            });
        }
    };

    handleSubmit = () => {
        if (Object.values(this.validate()).includes(false)) return;
        Axios.post(apiUrl() + 'complaint/store', this.getApiData())
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

    emptyStateValue = () => {
        return this.setState({
            complaint_category: '',
            complaint_sub_category: '',
            problem_details: '',
            asset_id: '',
            file_name: '',
            errorDict: null,
            extError: false
        });
    };

    validate = () => {
        const {complaint_category, complaint_sub_category, problem_details} = this.state;

        let errorDict = {
            complaint_category: complaint_category !== '',
            complaint_sub_category: complaint_sub_category !== '',
            problem_details: problem_details !== ''
        };

        this.setState({errorDict});
        return errorDict;
    };

    getApiData = () => {
        const {complaint_category, complaint_sub_category, problem_details, asset_id, file_name, user} = this.state;
        let data = new FormData();
        data.append('created_by', user.id);
        data.append('location_id', user.location_id);
        data.append('role_id', user.role_id);
        data.append('complaint_category', complaint_category);
        data.append('complaint_sub_category', complaint_sub_category);
        data.append('problem_details', problem_details);
        data.append('asset_id', asset_id);
        data.append('file', file_name);
        return data;
    };

    render() {
        const {
            error, errorMessage, success, successMessage, complaint_category, complaint_sub_category, problem_details, asset_id, file_name,
            assetList, extError, errorDict} = this.state;

        const assetOptions = assetList.length > 0 && assetList.map((item, index) => (
            <option value={item.id} key={index}>{`${item.product_name} - ${item.product_serial}`}</option>
        ));

        return (
            <>
                {error &&
                <ErrorModal errorMessage={errorMessage}/>
                }
                {success &&
                <SuccessModal successMessage={successMessage}/>
                }

                <div className="px-2 my-2 ui-dataEntry">
                    <div
                        className={`bg-white rounded p-2 admin-input-height overflow-y-auto overflow-x-hidden position-relative`}>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Complaint Information</p>
                        </nav>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Complaint Category</label>
                            <select name={'complaint_category'} value={complaint_category} onChange={this.handleChange}
                                    className={`ui-custom-input ${errorDict && !errorDict.complaint_category ? 'is-invalid' : ''}`}>
                                <option value="">Select Complaint Category</option>
                                <ComCategoryOptions/>
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Complaint Sub Category</label>
                            <select name={'complaint_sub_category'} value={complaint_sub_category} onChange={this.handleChange}
                                    className={`ui-custom-input ${errorDict && !errorDict.complaint_sub_category ? 'is-invalid' : ''}`}>
                                <option value="">Select Complaint Sub Category</option>
                                <ComSubCategoryOptions category_id={complaint_category}/>
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Problem Details</label>
                            <textarea
                                placeholder='Problem Details'
                                name={'problem_details'}
                                value={problem_details}
                                onChange={this.handleChange}
                                className={`ui-custom-textarea h-100px ${(errorDict && !errorDict.problem_details) && 'is-invalid'}`}
                                style={{height: '100px'}}/>
                        </div>
                        <div className="px-1 mb-2">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Assets</label>
                            <select name={'asset_id'} value={asset_id} onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Asset</option>
                                {assetOptions}
                            </select>
                        </div>
                        <div className="px-1 mb-2">
                            <div className="ui-custom-file">
                                <input type="file" onChange={this.handleChange} name={'file_name'}
                                       className={`custom-file-input`} id="validatedCustomFile"/>
                                <label htmlFor="validatedCustomFile" style={{width: '100%'}}>{file_name ? file_name.name ? file_name.name.substr(0, 20) + '...' : file_name.substr(0, 20) + '...' : 'Choose File'}</label>
                                <div className="bottom text-center" style={{width: '100%'}}>
                                    JPG | JPEG | PNG | DOC | PDF | XLSX Allowed
                                </div>
                            </div>
                            {extError &&
                            <span className="error">Only png, jpg, jpeg, doc, docx, pdf, xlsx file format is allowed!</span>
                            }
                        </div>
                        <button className="submit-btn-normal mt-5" onClick={this.handleSubmit}>Submit</button>
                    </div>
                    <div className="rounded bg-white admin-input-height">
                        <nav className="navbar text-center mb-2 pl-3 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Complaint Instruction</p>
                        </nav>
                        <div className={'pl-3'}>
                            <ul className={'ul-list-unstyled'}>
                                <li>1. Choose your related Complaint Category and Sub Category.</li>
                                <li>2. Please write your complaint details clearly for better understanding.</li>
                                <li>3. Only own asset will be shown on Assets dropdown.</li>
                                <li>4. Assets and File name field is optional.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ComplaintComponent;