import './404.css'
import Parallax from 'parallax-js'
import React, {Component} from 'react';
import {Link} from "react-router-dom";

class My404Component extends Component {
    componentDidMount() {
        let id = document.getElementById('__lost_container')
        let parallax = new Parallax(id);
    }

    render() {

        return (
            <div className={'lost-container'} id={'__lost_container'}>
                <div className={'lost-first-hole'} data-depth="0.5"></div>
                <div className={'lost-second-hole'} data-depth="0.30"></div>
                <h1 data-depth="0.10">
                    404
                    <p>Let's Find Our Way Back</p>
                </h1>
            </div>
        );
    }
}

export default My404Component;