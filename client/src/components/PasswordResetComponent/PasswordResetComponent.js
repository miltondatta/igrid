import React, {Component} from 'react'
import Axios from "axios";
import jwt from "jsonwebtoken";

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
            Axios.put('http://localhost:5000/api/v1/users/password-reset/'+id, payload)
                .then(resData => {
                    this.setState({
                        oldPassword: '',
                        newPassword: '',
                        confirmPasswor: ''
                    })
                    console.log(resData)
                })
                .catch(err => {console.log(err)})
        }
    }

    render(){
        const {oldPassword, newPassword, confirmPassword} = this.state
        return(
            <div className={'bg-white w-80 mx-auto p-3 mt-5 rounded'}>
                <nav className="navbar navbar-light bg-light mb-3">
                    <a className="navbar-brand" href="#">Update Password</a>
                </nav>
                <form>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Old Password</label>
                        <input onChange={this.handleChange} name={'oldPassword'} value={oldPassword} type="password" className="form-control" id="inputAddress" placeholder="Old Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">New Password</label>
                        <input onChange={this.handleChange} name={'newPassword'} value={newPassword} type="password" className="form-control" id="inputAddress" placeholder="New Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Confirm Password</label>
                        <input onChange={this.handleChange} name={'confirmPassword'} value={confirmPassword} type="password" className="form-control" id="inputAddress" placeholder="Confirm Password" />
                    </div>
                    <button type="submit" onClick={this.handleSubmit} className="ui-btn">Update Password</button>
                </form>
            </div>
        )
    }
}

export default PasswordResetComponent