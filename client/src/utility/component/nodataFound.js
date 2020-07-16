import './css/nodatafound.css';
import React, {Component} from 'react';

class NodataFound extends Component {
    render() {
        return (
            <div className={'no-data-found-container'}>
                <img className={'mb-5 no-data-found'} src={process.env.PUBLIC_URL + '/media/image/no_data_found.png'} alt="no_data_found"/>
            </div>
        );
    }
}

export default NodataFound;
