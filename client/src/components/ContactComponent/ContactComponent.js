import Axios from 'axios'
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";
import jwt from "jsonwebtoken";

class ContactComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            company: '',
            email: '',
            subject: '',
            message: '',
            errorDict: null,
            error: false,
            success: false,
            errorMessage: '',
            successMessage: '',
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = () => {
        if (Object.values(this.validate()).includes(false)){
            return null
        }
        const {id, role_id, location_id} = jwt.decode(localStorage.getItem('user')).data
        const {name, company, email, subject, message} = this.state
        let payload = {name, company, email, subject, message, user_id: id, role_id, location_id}
        Axios.post(apiUrl() + 'contacts/entry', payload)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        name: '',
                        email: '',
                        company: '',
                        subject: '',
                        message: '',
                        success: true,
                        successMessage: res.data.message,
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
                        errorMessage: res.message
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                error: false
                            })
                        }, 2300);
                    })
                }
            })
    }

    validate = () => {
        const {name, company, email, subject, message} = this.state
        let errorDict = {
            name: typeof name !== 'undefined' && name !== '',
            company: typeof company !== 'undefined' && company !== '',
            email: typeof email !== 'undefined' && email !== '',
            subject: typeof subject !== 'undefined' && subject !== '',
            message: typeof message !== 'undefined' && message !== ''
        }
        this.setState({
            errorDict
        })
        return errorDict
    }

    render() {
        const {name, company, email, subject, message, errorMessage, error, successMessage, success, errorDict} = this.state
        return (
            <div className={'grid-55-45 h-100 bg-white rounded'}>
                {error &&
                    <ErrorModal errorMessage={errorMessage} />
                }
                {success &&
                    <SuccessModal successMessage={successMessage} />
                }
                <div className={'ui-contact justify-content-center align-items-center'}>
                    <h1 className={'text-center mb-5 text-white'}>Contact with <b>iGrid</b><br/> service team</h1>
                    <img src={process.env.PUBLIC_URL + '/media/image/contact.png'} alt="contact"/>
                </div>
                <div className={'p-4'}>
                    <div className="mb-2">
                        <label className={'ui-custom-label'}>Your Name</label>
                        <input type="text" onChange={this.handleChange} name={'name'} value={name} className={`ui-custom-input ${errorDict && !errorDict.name && 'is-invalid'}`} placeholder={'Your Name'}/>
                    </div>
                    <div className="mb-2">
                        <label className={'ui-custom-label'}>Company</label>
                        <input type="text" onChange={this.handleChange} name={'company'} value={company} className={`ui-custom-input ${errorDict && !errorDict.company && 'is-invalid'}`} placeholder={'Company'}/>
                    </div>
                    <div className="mb-2">
                        <label className={'ui-custom-label'}>Email</label>
                        <input type="email" onChange={this.handleChange} name={'email'} value={email} className={`ui-custom-input ${errorDict && !errorDict.email && 'is-invalid'}`} placeholder={'Email'}/>
                    </div>
                    <div className="mb-2">
                        <label className={'ui-custom-label'}>Subject</label>
                        <input type="text" onChange={this.handleChange} name={'subject'} value={subject} className={`ui-custom-input ${errorDict && !errorDict.subject && 'is-invalid'}`} placeholder={'Select Subject'}/>
                    </div>
                    <div className="mb-2">
                        <label className={'ui-custom-label'}>Write Message</label>
                        <textarea name={'message'} value={message} onChange={this.handleChange} className={`ui-custom-textarea ${errorDict && !errorDict.message && 'is-invalid'}`} placeholder={'Write Message'} />
                    </div>
                    <button className={'w-100 btn-message'} onClick={this.handleSubmit}>Send Message</button>
                </div>
            </div>
        );
    }
}

export default ContactComponent;