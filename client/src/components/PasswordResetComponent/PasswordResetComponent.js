import React, {Component} from 'react'
import Axios from "axios";
import jwt from "jsonwebtoken";
import {apiUrl} from "../../utility/constant";

class PasswordResetComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            confirmPassword: '',
            newPassword: '',
            oldPassword: ''
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
                [name]: value
            })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {oldPassword, newPassword, confirmPassword} = this.state
        const payload = {
            oldPassword,
            newPassword,
            confirmPassword
        }
        console.log(this.state, 26)
        if (newPassword === confirmPassword) {
            const {id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
            Axios.put(apiUrl() + 'users/password-reset/'+id, payload)
                .then(resData => {
                    this.setState({
                        oldPassword: '',
                        newPassword: '',
                        confirmPasswor: ''
                    })

                })
                .catch(err => {console.log(err)})
        }
    }

    render(){
        const {oldPassword, newPassword, confirmPassword} = this.state
        return(
            <div className={'bg-white p-3 rounded m-3 grid-2'}>
                <div className={'ui-passwordUpdate'}>
                    <img src={process.env.PUBLIC_URL + '/media/image/passwordUpdate.png'} alt="Password Update"/>
                </div>
                <div className={'max-h-80vh position-relative'}>
                    <nav className="navbar text-center mb-2 pl-3 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0">Update Password</p>
                    </nav>
                    <div className="mb-2 ml-3">
                        <label className={'ui-custom-label'} htmlFor="inputAddress">Old Password</label>
                        <input onChange={this.handleChange} name={'oldPassword'} value={oldPassword} type="password" className="ui-custom-input" id="inputAddress" placeholder="Old Password" />
                    </div>
                    <div className="mb-2 ml-3">
                        <label className={'ui-custom-label'} htmlFor="inputAddress">New Password</label>
                        <input onChange={this.handleChange} name={'newPassword'} value={newPassword} type="password" className="ui-custom-input" id="inputAddress" placeholder="New Password" />
                    </div>
                    <div className="mb-2 ml-3">
                        <label className={'ui-custom-label'} htmlFor="inputAddress">Confirm Password</label>
                        <input onChange={this.handleChange} name={'confirmPassword'} value={confirmPassword} type="password" className="ui-custom-input" id="inputAddress" placeholder="Confirm Password" />
                    </div>
                    <button type="submit" onClick={this.handleSubmit} className="submit-btn">Update Password</button>
                </div>
            </div>
        )
    }
}

export default PasswordResetComponent