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
            <div className={'bg-white p-3 rounded m-3 grid-2'}>
                <div className={'ui-profile'}>
                    <img src={process.env.PUBLIC_URL + '/media/image/profile.png'} alt="Register"/>
                </div>
                <div className={'max-h-80vh position-relative'}>
                    <nav className="navbar text-center mb-2 pl-3 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0">Update Profile</p>
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
                        <div className="ui-custom-file w-50 mb-20p">
                            <input onChange={this.handleChange} type="file" className="custom-file-input" id="customFile" name="filename" />
                                <label htmlFor="customFile">Choose file</label>
                        </div>
                    </div>
                    <button type="submit" onClick={this.handleSubmit} className="submit-btn">Update</button>
                </div>
            </div>
        )
    }
}

export default ProfileComponent