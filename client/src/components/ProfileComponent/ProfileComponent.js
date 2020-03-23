import Axios from 'axios'
import React, {Component} from 'react'
import jwt from "jsonwebtoken";
import {apiUrl} from "../../utility/constant";
import {getFileExtension} from "../../utility/custom";
import SuccessModal from "../../utility/success/successModal";
import ErrorModal from "../../utility/error/errorModal";

class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: null
        };

        this.file_types = ["jpg", "jpeg", "png", "doc", "docx", "pdf", "xlsx"];
    }

    handleChange = (e) => {
        const {name, value, files} = e.target;
        if (name === 'filename' && files.length > 0) {
            const file_name = getFileExtension(files[0].name);
            if (!this.file_types.includes(file_name)) {
                this.setState({
                    error: true,
                    errorMessage: 'Only JPG | JPEG | PNG | DOC | DOCX | PDF | XLSX Files Accepted',
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            error: false
                        })
                    }, 2300)
                })
            } else {
                this.setState({
                    [name]: files[0],
                })
            }
        } else {
            this.setState({
                [name]: value
            })
        }
    };

    componentDidMount() {
        const {id} = jwt.decode(localStorage.getItem('user')).data;
        if (id) Axios.get(apiUrl() + 'user/' + id)
            .then(res => {
                Object.keys(res.data).forEach(item => {
                    this.setState({
                        [item]: res.data[item]
                    })
                });
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {firstName, lastName, email, pin, phone_number, address, filename} = this.state;
        const {id} = jwt.decode(localStorage.getItem('user')).data;

        const data = new FormData();
        data.append('file', filename);
        data.append('firstName', firstName);
        data.append('lastName', lastName);
        data.append('email', email);
        data.append('pin', pin);
        data.append('phone_number', phone_number);
        data.append('address', address);

        Axios.put(apiUrl() + 'users/update/' + id, data)
            .then(resData => {
                const {message} = resData.data;
                if (message) this.setState({
                    success: true,
                    successMessage: message,
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            success: false
                        });
                        window.location.reload();
                    }, 2300);
                });
            })
            .catch(err => {
                console.log(err.response);
                const {message} = err.response.data;
                if (message) this.setState({error: true, errorMessage: message}, () => {
                    setTimeout(() => {
                        this.setState({
                            error: false
                        })
                    }, 2300);
                });
            })
    };

    render() {
        const {firstName, lastName, phone_number, email, pin, address, filename, error, errorMessage, success, successMessage} = this.state;
        return (
            <div className={'bg-white p-3 rounded m-3 grid-2'}>
                {success && <SuccessModal successMessage={successMessage}/>}
                {error && <ErrorModal errorMessage={errorMessage}/>}
                <div className={'ui-profile'}>
                    <img src={process.env.PUBLIC_URL + '/media/image/profile.png'} alt="Register"/>
                </div>
                <div className={'min-h-80vh position-relative'}>
                    <nav className="navbar text-center mb-2 pl-3 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0">Update Profile</p>
                    </nav>
                    <div className="mb-2 ml-3">
                        <label htmlFor="inputEmail4" className={'ui-custom-label'}>First Name</label>
                        <input onChange={this.handleChange} name={'firstName'} value={firstName} type="text"
                               className="ui-custom-input" id="inputEmail4" placeholder="First Name"/>
                    </div>
                    <div className="mb-2 ml-3">
                        <label htmlFor="inputPassword4" className={'ui-custom-label'}>Last Name</label>
                        <input onChange={this.handleChange} name={'lastName'} value={lastName} type="text"
                               className="ui-custom-input" id="inputPassword4" placeholder="Last Name"/>
                    </div>
                    <div className="mb-2 ml-3">
                        <label htmlFor="inputEmail4" className={'ui-custom-label'}>Official Email</label>
                        <input onChange={this.handleChange} name={'email'} value={email} type="text"
                               className="ui-custom-input" id="inputEmail4" placeholder="Official Email"/>
                    </div>
                    <div className="mb-2 ml-3">
                        <label htmlFor="inputPassword4" className={'ui-custom-label'}>Official Phone Number</label>
                        <input onChange={this.handleChange} name={'phone_number'} value={phone_number} type="text"
                               className="ui-custom-input" id="inputPassword4" placeholder="Official Phone Number"/>
                    </div>
                    <div className="mb-2 ml-3">
                        <label htmlFor="inputAddress" className={'ui-custom-label'}>Address</label>
                        <input onChange={this.handleChange} name={'address'} value={address} type="text"
                               className="ui-custom-input" id="inputAddress" placeholder="1234 Main St"/>
                    </div>
                    <div className="mb-2 ml-3">
                        <label htmlFor="inputEmail4" className={'ui-custom-label'}>Your PIN</label>
                        <input type="text" className="ui-custom-input" id="inputEmail4" name='pin' value={pin}
                               onChange={this.handleChange} placeholder="PIN"/>
                    </div>
                    <div className="mb-2 ml-3">
                        <div className="ui-custom-file w-50 mb-20p">
                            <input onChange={this.handleChange} type="file" className="custom-file-input"
                                   id="customFile" name="filename"/>
                            <label htmlFor="customFile">{filename ? filename.name.substr(0, 20) + (filename.name.length > 20 ? '...' : '') : 'Choose File'}</label>
                            <div className="bottom">
                                JPG | JPEG | PNG | DOC | PDF | XLSX Allowed
                            </div>
                        </div>
                    </div>
                    <button type="submit" onClick={this.handleSubmit} className="submit-btn">Update</button>
                </div>
            </div>
        )
    }
}

export default ProfileComponent