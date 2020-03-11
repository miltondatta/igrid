import React, {Component} from 'react'
import Axios from "axios";
import jwt from "jsonwebtoken";
import {apiUrl} from "../../utility/constant";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";

class PasswordResetComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            confirmPassword: '',
            newPassword: '',
            oldPassword: '',
            error: false,
            errorMessage: '',
            success: false,
            successMessage: '',
            errorObj: null
        }
    }

    componentDidMount() {
        const {id} = jwt.decode(localStorage.getItem('user')).data;
        if(id) this.setState({user_id: id});
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        }, () => {
            this.validate()
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(this.validate()).includes(false)) return;

        const {oldPassword, newPassword, confirmPassword, user_id} = this.state;
        const payload = {
            oldPassword,
            newPassword,
            confirmPassword
        };

        if (newPassword !== confirmPassword) return this.setState({
            error: true,
            errorMessage: 'New Password and Confirm Password Didn\'t Match'
        }, () => {
            setTimeout(() => {
                this.setState({
                    error: false
                })
            }, 2300);
        });

        Axios.put(apiUrl() + 'users/password-reset/' + user_id, payload)
            .then(resData => {
                this.setState({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                    error: false
                });
                const {message} = resData.data;
                if (message) this.setState({success: true, successMessage: message}, () => {
                    setTimeout(() => {
                        this.setState({
                            success: false
                        })
                    }, 2300);
                });
            })
            .catch(err => {
                console.log(err.response);
                const {message} = err.response.data;
                if (message) this.setState({error: true, errorMessage: message}, () => {
                    setTimeout(() => {
                        this.setState({
                            error: false
                        })
                    }, 2300);
                });
            });
    };

    validate = () => {
        const {oldPassword, newPassword, confirmPassword} = this.state;
        let errorObj = {
            oldPassword: oldPassword !== '',
            newPassword: newPassword !== '',
            confirmPassword: confirmPassword !== ''
        };

        this.setState({errorObj});
        return errorObj;
    };

    render() {
        const {oldPassword, newPassword, confirmPassword, errorObj, success, error, successMessage, errorMessage} = this.state;
        return (
            <div className={'bg-white p-3 rounded m-3 grid-2'}>
                {success && <SuccessModal successMessage={successMessage}/>}
                {error && <ErrorModal errorMessage={errorMessage}/>}
                <div className={'ui-passwordUpdate'}>
                    <img src={process.env.PUBLIC_URL + '/media/image/passwordUpdate.png'} alt="Password Update"/>
                </div>
                <div className={'max-h-80vh position-relative'}>
                    <nav className="navbar text-center mb-2 pl-3 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0">Update Password</p>
                    </nav>
                    <div className="mb-2 ml-3">
                        <label className={'ui-custom-label'} htmlFor="inputAddress">Old Password</label>
                        <input onChange={this.handleChange} name={'oldPassword'} value={oldPassword} type="password"
                               className={`ui-custom-input ${(errorObj && !errorObj.oldPassword) && 'is-invalid'}`}
                               id="inputAddress" placeholder="Old Password"/>
                    </div>
                    <div className="mb-2 ml-3">
                        <label className={'ui-custom-label'} htmlFor="inputAddress">New Password</label>
                        <input onChange={this.handleChange} name={'newPassword'} value={newPassword} type="password"
                               className={`ui-custom-input ${(errorObj && !errorObj.newPassword) && 'is-invalid'}`}
                               id="inputAddress" placeholder="New Password"/>
                    </div>
                    <div className="mb-2 ml-3">
                        <label className={'ui-custom-label'} htmlFor="inputAddress">Confirm Password</label>
                        <input onChange={this.handleChange} name={'confirmPassword'} value={confirmPassword}
                               type="password"
                               className={`ui-custom-input ${(errorObj && !errorObj.confirmPassword) && 'is-invalid'}`}
                               id="inputAddress"
                               placeholder="Confirm Password"/>
                    </div>
                    <button type="submit" onClick={this.handleSubmit} className="submit-btn-normal ml-3">Update
                        Password
                    </button>
                </div>
            </div>
        )
    }
}

export default PasswordResetComponent;