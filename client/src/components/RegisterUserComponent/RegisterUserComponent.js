import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";

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
            this.setState({
                [name]: files[0]
            })
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
            <div className={'bg-white p-3 rounded shadow'}>
                <nav className="navbar navbar-light mb-3 f-weight-500">
                    <p className="navbar-brand m-0">Register User</p>
                </nav>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">First Name</label>
                            <input onChange={this.handleChange} name={'firstName'} value={firstName} type="text" className="form-control" id="inputEmail4" placeholder="First Name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Last Name</label>
                            <input onChange={this.handleChange} name={'lastName'} value={lastName} type="text" className="form-control" id="inputPassword4" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Official Email</label>
                            <input onChange={this.handleChange} name={'email'} value={email} type="text" className="form-control" id="inputEmail4" placeholder="Official Email" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Official Phone Number</label>
                            <input onChange={this.handleChange} name={'phone_number'} value={phone_number} type="text" className="form-control" id="inputPassword4" placeholder="Official Phone Number" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputAddress">Address</label>
                            <input onChange={this.handleChange} name={'address'} value={address} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Your PIN</label>
                            <input type="text" className="form-control" id="inputEmail4" name='pin' value={pin} onChange={this.handleChange} placeholder="PIN" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputAddress">Password</label>
                            <input onChange={this.handleChange} name={'password'} value={password} type="password" className="form-control"
                                   id="inputAddress" placeholder="Password" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Confirm Password</label>
                            <input type="password" className="form-control" id="inputEmail4" name='confirm_password'
                                   value={confirm_password} onChange={this.handleChange} placeholder="Confirm Password" />
                        </div>
                    </div>
                    <button type="submit" onClick={this.handleSubmit} className="ui-btn mt-2">Register</button>
                </form>
            </div>
        );
    }
}

export default RegisterUserComponent;