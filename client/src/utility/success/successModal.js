import './success.css'
import React, {Component} from 'react';

class SuccessModal extends Component {
    render() {
        const {successMessage} = this.props
        return (
            <div className={'ui-success-modal'}>
                <div className="ui-container">
                    <div className={'ui-image-container'}>
                        <img src={process.env.PUBLIC_URL + '/media/image/success.png'} alt=""/>
                    </div>
                    <div className={'ui-content'}>
                        <h4>Successful! <i className="icofont-simple-smile"></i></h4>
                        <p>{successMessage}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SuccessModal;