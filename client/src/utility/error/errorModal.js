import './error.css'
import React, {Component} from 'react';

class ErrorModal extends Component {
    render() {
        const {errorMessage, ops} = this.props
        return (
            <div className={'ui-error-modal'}>
                <div className="ui-container">
                    <div className={'ui-image-container'}>
                        <img src={process.env.PUBLIC_URL + '/media/image/error.png'} alt=""/>
                    </div>
                    <div className={'ui-content'}>
                        <h4>{ops ? 'Opps!' : 'Error!'} <i className="icofont-sad"></i></h4>
                        <p className={'text-center'}>{errorMessage}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ErrorModal;