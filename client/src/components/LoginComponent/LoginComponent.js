import Axios from 'axios'
import jwt from 'jsonwebtoken'
import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {apiUrl} from "../../utility/constant";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";

class LoginComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            redirect: false,

            error: false,
            success: false,
            errorMessage: '',
            successMessage: '',

            errorDict: null
        }

    }

    componentDidMount() {
        window.addEventListener('keydown', (event) => {
            if(event.isComposing || event.keyCode === 13) {
                this.submitLogin()
            }
        })
    }

    handleChange = (e) => {
        const {name,value} = e.target
        this.setState({
            [name]: value
        })
    }

    submitLogin = () => {
        if (Object.values(this.validate()).includes(false)) return false;
        const {email,password} = this.state;

        Axios.get('https://ipapi.co/json/')
            .then(res => {
                console.log(res, 28)
                const payload = {
                    email,
                    password,
                    ip: res.data.ip
                }
                Axios.post(apiUrl() + 'users/login',payload)
                    .then(resData => {
                        if(resData.data.status){
                            console.log(jwt.decode(resData.data.token))
                            localStorage.setItem('user', resData.data.token)
                            this.setState({
                                success: true,
                                successMessage: resData.data.message,
                                redirect: true
                            }, () => {
                                setTimeout(() => {
                                    this.setState({
                                        success: false,
                                    })
                                }, 2300)
                            })
                        } else {
                            this.setState({
                                error: true,
                                errorMessage: resData.data.message,
                                redirect: true
                            }, () => {
                                setTimeout(() => {
                                    this.setState({
                                        error: false,
                                    })
                                }, 2300)
                            })
                        }
                    })
                    .catch(err => {console.log(err)})
            }).catch(err => { 
                console.log(err);
                const payload = {
                    email,
                    password,
                    ip: '127.0.0.1'
                }
                Axios.post(apiUrl() + 'users/login',payload)
                    .then(resData => {
                        if(resData.data.status){
                            console.log(jwt.decode(resData.data.token))
                            localStorage.setItem('user', resData.data.token)
                            this.setState({
                                success: true,
                                successMessage: resData.data.message,
                                redirect: true
                            }, () => {
                                setTimeout(() => {
                                    this.setState({
                                        success: false,
                                    })
                                }, 2300)
                            })
                        } else {
                            this.setState({
                                error: true,
                                errorMessage: resData.data.message,
                                redirect: true
                            }, () => {
                                setTimeout(() => {
                                    this.setState({
                                        error: false,
                                    })
                                }, 2300)
                            })
                        }
                    })
                    .catch(err => {console.log(err)})
                
            })
    }

    validate = () => {
        const {email, password} = this.state
        let errorDict = {
            email: typeof email !== 'undefined' && email !== '',
            password: typeof password !== 'undefined' && password !== ''
        }

        this.setState({
            errorDict
        })

        return errorDict
    }

    renderRedirect = () => {
        if(localStorage.getItem('user') && this.state.redirect){
            return(
                <Redirect to='/' />
            )
        }
    }

    render() {
        const {email, password, error,success, errorMessage, successMessage, errorDict} = this.state
        return (
            <>
                {error &&
                    <ErrorModal errorMessage={errorMessage} />
                }
                {success &&
                    <SuccessModal successMessage={successMessage} />
                }
                <div className='ui-user-container'>
                    {this.renderRedirect()}
                    <div className='ui-login'>
                        <h4 className='mb-3'>
                            <img src={process.env.PUBLIC_URL + '/media/image/logo.png'} alt="Logo"/>
                            <p className={'my-4 f-28px text-bold'}><b>Log In</b></p>
                        </h4>
                        <input 
                            type='text' 
                            id ='email' 
                            value={email} 
                            onChange={this.handleChange} 
                            name='email'
                            className={`${errorDict && !errorDict.email ? 'bb-red' : 'bb-gray'}`}
                            placeholder='Please enter your email' />
                        <br />
                        <br />
                        <input 
                            type='password'
                            id ='password' 
                            value={password} 
                            onChange={this.handleChange} 
                            name='password'
                            className={`mb-2 ${errorDict && !errorDict.password ? 'bb-red' : 'bb-gray'}`}
                            placeholder='Please enter your passsword' />
                        <div className='d-flex justify-content-between align-items-center mt-4'>
                            <button className='ui-signin' onClick={this.submitLogin}>Log In</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default LoginComponent