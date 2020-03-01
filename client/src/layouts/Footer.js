import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <div className={'position-relative'}>
                <img className={'w-100 bg-white'} src={process.env.PUBLIC_URL + '/media/image/footer.png'} alt="footer"/>
                <p className={'position-absolute text-center text-copyright'}>&copy; Copyright | iGRID | All rights reserved </p>
            </div>
        );
    }
}

export default Footer;