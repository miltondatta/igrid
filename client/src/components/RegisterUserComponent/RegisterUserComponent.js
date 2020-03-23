import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import {getFileExtension} from "../../utility/custom";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";

class RegisterUserComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            filename: null,
            error: false,
            errorMessage: '',
        }
    }

    handleChange = (e) => {
        const {name, value, files} = e.target
        if (name === 'filename') {
            if (["jpg","jpeg","png","doc","docx","pdf","xlsx"].includes(getFileExtension(files[0].name))) {
                this.setState({
                    [name]: files[0],
                })
            } else {
                this.setState({
                    error: true,
                    errorMessage: 'Only JPG | JPEG | PNG | DOC | DOCX | PDF | XLSX Files Excepted'
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            error: false,
                        })
                    }, 2300)
                })
            }
        } else{
            this.setState({
                [name]: value
            })
        }
    }

    handleSubmit = (e) => {
        const {firstName, lastName, email, pin, phone_number, address, confirm_password, password} = this.state
        e.preventDefault()
        if (Object.values(this.validate()).includes(false)) return false;
        if (password !== confirm_password) {
            this.setState({
                error: true,
                errorMessage: 'Password Did Not Matched'
            }, () => {
                setTimeout(() => {
                    this.setState({
                        error: false,
                    })
                }, 2300)
            })
        }
        const data = {firstName, lastName, email, pin, phone_number, address, password}
        if (password === confirm_password) {
            Axios.post(apiUrl() + 'users/register', data)
                .then(resData => {
                    if (!resData.data.status){
                        this.setState({
                            error: true,
                            errorMessage: resData.data.message
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    error: false,
                                })
                            }, 2300)
                        })
                    } else {
                        this.setState({
                            success: true,
                            successMessage: resData.data.message
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    success: false,
                                })
                            }, 2300)
                        })
                    }
                })
                .catch(err => {console.log(err)})
        }
    }

    validate = () => {
        const {firstName, lastName, phone_number, email, pin, address, confirm_password, password} = this.state
        let errorDict = {
            firstName: typeof firstName !== 'undefined' && firstName !== '',
            lastName: typeof lastName !== 'undefined' && lastName !== '',
            phone_number: typeof phone_number !== 'undefined' && phone_number !== '',
            email: typeof email !== 'undefined' && email !== '',
            pin: typeof pin !== 'undefined' && pin !== '',
            address: typeof address !== 'undefined' && address !== '',
            confirm_password: typeof confirm_password !== 'undefined' && confirm_password !== '',
            password: typeof password !== 'undefined' && password !== ''
        }
        this.setState({
            errorDict
        })
        return errorDict
    }

    render() {
        const {firstName, lastName, phone_number, email, pin, address, confirm_password, password, errorDict, error, errorMessage, success, successMessage} = this.state
        return (
            <div className={'bg-white p-3 rounded m-3 grid-2'}>
                {error &&
                    <ErrorModal errorMessage={errorMessage} />
                }
                {success &&
                    <SuccessModal successMessage={successMessage} />
                }
                <div className={'ui-register'}>
                    <img src={process.env.PUBLIC_URL + '/media/image/register.png'} alt="Register"/>
                </div>
                <div className={'min-h-80vh position-relative'}>
                        <nav className="navbar text-center mb-2 pl-3 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Register User</p>
                        </nav>
                        <div className="mb-2 ml-3">
                            <label htmlFor="inputEmail4" className={'ui-custom-label'}>First Name</label>
                            <input onChange={this.handleChange} name={'firstName'} value={firstName} type="text" className={`ui-custom-input ${errorDict && !errorDict.firstName && 'is-invalid'}`} id="inputEmail4" placeholder="First Name" />
                        </div>
                        <div className="mb-2 ml-3">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Last Name</label>
                            <input onChange={this.handleChange} name={'lastName'} value={lastName} type="text" className={`ui-custom-input ${errorDict && !errorDict.lastName && 'is-invalid'}`} id="inputPassword4" placeholder="Last Name" />
                        </div>
                        <div className="mb-2 ml-3">
                            <label htmlFor="inputEmail4" className={'ui-custom-label'}>Official Email</label>
                            <input onChange={this.handleChange} name={'email'} value={email} type="text" className={`ui-custom-input ${errorDict && !errorDict.email && 'is-invalid'}`} id="inputEmail4" placeholder="Official Email" />
                        </div>
                        <div className="mb-2 ml-3">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Official Phone Number</label>
                            <input onChange={this.handleChange} name={'phone_number'} value={phone_number} type="text" className={`ui-custom-input ${errorDict && !errorDict.phone_number && 'is-invalid'}`} id="inputPassword4" placeholder="Official Phone Number" />
                        </div>
                        <div className="mb-2 ml-3">
                            <label htmlFor="inputAddress" className={'ui-custom-label'}>Address</label>
                            <input onChange={this.handleChange} name={'address'} value={address} type="text" className={`ui-custom-input ${errorDict && !errorDict.address && 'is-invalid'}`} id="inputAddress" placeholder="1234 Main St" />
                        </div>
                        <div className="mb-2 ml-3">
                            <label htmlFor="inputEmail4" className={'ui-custom-label'}>Your PIN</label>
                            <input type="text" className={`ui-custom-input ${errorDict && !errorDict.pin && 'is-invalid'}`} id="inputEmail4" name='pin' value={pin} onChange={this.handleChange} placeholder="PIN" />
                        </div>
                        <div className="mb-2 ml-3">
                            <label htmlFor="inputAddress" className={'ui-custom-label'}>Password</label>
                            <input onChange={this.handleChange} name={'password'} value={password} type="password" className={`ui-custom-input ${errorDict && !errorDict.password && 'is-invalid'}`}
                                   id="inputAddress" placeholder="Password" />
                        </div>
                        <div className="mb-20p ml-3">
                            <label htmlFor="inputEmail4" className={'ui-custom-label'}>Confirm Password</label>
                            <input type="password" className={`ui-custom-input ${errorDict && !errorDict.confirm_password && 'is-invalid'}`} id="inputEmail4" name='confirm_password'
                                   value={confirm_password} onChange={this.handleChange} placeholder="Confirm Password" />
                        </div>
                        <button type="submit" onClick={this.handleSubmit} className="submit-btn">Register</button>
                </div>
            </div>
        );
    }
}

export default RegisterUserComponent;