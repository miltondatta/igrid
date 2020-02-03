import Axios from 'axios'
import jwt from 'jsonwebtoken'
import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {apiUrl} from "../../utility/constant";

class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            redirect: false
        }
    }

    handleChange = (e) => {
        const {name,value} = e.target
        this.setState({
            [name]: value
        })
    }

    submitLogin = () => {
        const {email,password} = this.state
        Axios.get('https://ipapi.co/json/')
            .then(res => {
                console.log(res, 28)
                const payload = {
                    email,
                    password,
                    ip: res.ip
                }
                Axios.post(apiUrl() + 'users/login',payload)
                    .then(resData => {
                        if(resData){
                            console.log(jwt.decode(resData.data.token))
                            localStorage.setItem('user', resData.data.token)
                            this.setState({
                                redirect: true
                            })
                        }
                    })
                    .catch(err => {console.log(err)})
            })
    }

    renderRedirect = () => {
        if(localStorage.getItem('user') && this.state.redirect){
            return(
                <Redirect to='/' />
            )
        }
    }

    render() {
        const {email, password} = this.state
        return (
            <div className='ui-user-container'>
                {this.renderRedirect()}
                    <div className='ui-login'>
                        <h4 className='mb-3'>Login</h4>

                        <label htmlFor='email'>Email</label>
                        <br />
                        <input 
                            type='text' 
                            id ='email' 
                            value={email} 
                            onChange={this.handleChange} 
                            name='email' 
                            placeholder='Please enter your email' />
                        <br />
                        <label htmlFor='password'>Password</label>
                        <br />
                        <input 
                            type='password' 
                            id ='password' 
                            value={password} 
                            onChange={this.handleChange} 
                            name='password' 
                            placeholder='Please enter your passsword' />

                        <div className='d-flex justify-content-between align-items-center mt-4'>
                            <button className='ui-signin' onClick={this.submitLogin}>SIGN IN</button>
                            <a href='/' className='text-project'>Forgot Password?</a>
                        </div>

                    </div>
                    <div className='bg-project d-flex justify-content-center align-items-center ui-logo'>
                        <img alt='Logo' src={process.env.PUBLIC_URL + './media/image/logo_white.png'} />
                    </div>
                </div>
        )
    }
}

export default LoginComponent