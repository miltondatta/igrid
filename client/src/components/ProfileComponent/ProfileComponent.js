import Axios from 'axios'
import React, {Component} from 'react'
import jwt from "jsonwebtoken";
import {apiUrl} from "../../utility/constant";

class ProfileComponent extends Component{
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

    componentDidMount() {
        Axios.get(apiUrl() + 'users')
            .then(resData => {
                let data = resData.data[0]
                Object.keys(data).forEach(item => {
                    this.setState({
                        [item]: data[item]
                    })
                })
            })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {firstName, lastName, email, pin, number, address, filename } = this.state
        const data = new FormData()
        data.append('file', filename)
        data.append('firstName', firstName)
        data.append('lastName', lastName)
        data.append('email', email)
        data.append('pin', pin)
        data.append('number', number)
        data.append('address', address)
        const {id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        Axios.put(apiUrl() + 'users/update/'+id, data)
            .then(resData => {

            })
            .catch(err => {console.log(err)})
    }

    render(){
        const {firstName, lastName, phone_number, email, pin, address} = this.state
        return(
            <div className={'bg-white p-3 rounded shadow'}>
                <nav className="navbar navbar-light mb-3 f-weight-500">
                    <p className="navbar-brand m-0">Update Profile</p>
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
                    <div className="form-group">
                        <label htmlFor="inputAddress">Address</label>
                        <input onChange={this.handleChange} name={'address'} value={address} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Your PIN</label>
                                <input type="text" className="form-control" id="inputEmail4" name='pin' value={pin} onChange={this.handleChange} placeholder="PIN" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="customFile">Upload Image</label>
                            <div className="custom-file mb-3">
                                <input onChange={this.handleChange} type="file" className="custom-file-input" id="customFile" name="filename" />
                                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" onClick={this.handleSubmit} className="ui-btn">Update</button>
                </form>
            </div>
        )
    }
}

export default ProfileComponent