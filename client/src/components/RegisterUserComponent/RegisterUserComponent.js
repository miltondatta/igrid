import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import {getFileExtension} from "../../utility/custom";

class RegisterUserComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            filename: null
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
        e.preventDefault()
        const {firstName, lastName, email, pin, phone_number, address, confirm_password, password} = this.state
        const data = {firstName, lastName, email, pin, phone_number, address, password}
        if (password === confirm_password) {
            Axios.post(apiUrl() + 'users/register', data)
                .then(resData => {
                    console.log(resData, 45)
                })
                .catch(err => {console.log(err)})
        }
    }

    render() {
        const {firstName, lastName, phone_number, email, pin, address, confirm_password, password} = this.state
        return (
            <div className={'bg-white p-3 rounded m-3 grid-2'}>
                <div className={'ui-register'}>
                    <img src={process.env.PUBLIC_URL + '/media/image/register.png'} alt="Register"/>
                </div>
                <div className={'max-h-80vh position-relative'}>
                        <nav className="navbar text-center mb-2 pl-3 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Register User</p>
                        </nav>
                        <div className="mb-2 ml-3">
                            <label htmlFor="inputEmail4" className={'ui-custom-label'}>First Name</label>
                            <input onChange={this.handleChange} name={'firstName'} value={firstName} type="text" className="ui-custom-input" id="inputEmail4" placeholder="First Name" />
                        </div>
                        <div className="mb-2 ml-3">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Last Name</label>
                            <input onChange={this.handleChange} name={'lastName'} value={lastName} type="text" className="ui-custom-input" id="inputPassword4" placeholder="Last Name" />
                        </div>
                        <div className="mb-2 ml-3">
                            <label htmlFor="inputEmail4" className={'ui-custom-label'}>Official Email</label>
                            <input onChange={this.handleChange} name={'email'} value={email} type="text" className="ui-custom-input" id="inputEmail4" placeholder="Official Email" />
                        </div>
                        <div className="mb-2 ml-3">
                            <label htmlFor="inputPassword4" className={'ui-custom-label'}>Official Phone Number</label>
                            <input onChange={this.handleChange} name={'phone_number'} value={phone_number} type="text" className="ui-custom-input" id="inputPassword4" placeholder="Official Phone Number" />
                        </div>
                        <div className="mb-2 ml-3">
                            <label htmlFor="inputAddress" className={'ui-custom-label'}>Address</label>
                            <input onChange={this.handleChange} name={'address'} value={address} type="text" className="ui-custom-input" id="inputAddress" placeholder="1234 Main St" />
                        </div>
                        <div className="mb-2 ml-3">
                            <label htmlFor="inputEmail4" className={'ui-custom-label'}>Your PIN</label>
                            <input type="text" className="ui-custom-input" id="inputEmail4" name='pin' value={pin} onChange={this.handleChange} placeholder="PIN" />
                        </div>
                        <div className="mb-2 ml-3">
                            <label htmlFor="inputAddress" className={'ui-custom-label'}>Password</label>
                            <input onChange={this.handleChange} name={'password'} value={password} type="password" className="ui-custom-input"
                                   id="inputAddress" placeholder="Password" />
                        </div>
                        <div className="mb-2 ml-3">
                            <label htmlFor="inputEmail4" className={'ui-custom-label'}>Confirm Password</label>
                            <input type="password" className="ui-custom-input" id="inputEmail4" name='confirm_password'
                                   value={confirm_password} onChange={this.handleChange} placeholder="Confirm Password" />
                        </div>
                        <button type="submit" onClick={this.handleSubmit} className="submit-btn-normal ml-3">Register</button>
                </div>
            </div>
        );
    }
}

export default RegisterUserComponent;