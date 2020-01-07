import Axios from 'axios'
import React, {Component} from 'react'
import jwt from "jsonwebtoken";

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

    handleSubmit = (e) => {
        e.preventDefault()
        const {firstName, lastName, email, pin, phone_number, address, filename } = this.state
        const data = new FormData()
        data.append('file', filename)
        const payload = {
            firstName,
            lastName,
            email,
            pin,
            phone_number,
            address,
        }
        const {id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        Axios.put('http://localhost:5000/api/v1/users/update/'+id, payload)
            .then(resData => {
                console.log(resData)
            })
            .catch(err => {console.log(err)})
        Axios.put('http://localhost:5000/api/v1/users/image/'+id, data)
            .then(resData => {
                console.log(resData)
            })
            .catch(err => {console.log(err)})
    }

    render(){
        console.log(this.state)
        return(
            <div className={'bg-white w-80 mx-auto p-3 mt-5 rounded'}>
                <nav className="navbar navbar-light bg-light mb-3">
                    <a className="navbar-brand" href="#">Update Profile</a>
                </nav>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">First Name</label>
                            <input onChange={this.handleChange} name={'firstName'} type="text" className="form-control" id="inputEmail4" placeholder="First Name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Last Name</label>
                            <input onChange={this.handleChange} name={'lastName'} type="text" className="form-control" id="inputPassword4" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Official Email</label>
                            <input onChange={this.handleChange} name={'email'} type="text" className="form-control" id="inputEmail4" placeholder="Official Email" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Official Phone Number</label>
                            <input onChange={this.handleChange} name={'phonenumber'} type="text" className="form-control" id="inputPassword4" placeholder="Official Phone Number" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Address</label>
                        <input onChange={this.handleChange} name={'address'} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Your BRAC PIN</label>
                                <input type="text" className="form-control" id="inputEmail4" name='pin' onChange={this.handleChange} placeholder="BRAC PIN" />
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