import jwt from "jsonwebtoken";
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import AssetComponent from "../components/AssetComponent/AssetComponent";

class Asset extends Component{
    render(){
        const {userType} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        if (userType !== 1) {
            return(
                <Redirect to={'/'} />
            )
        } else {
            return(
                <div>
                    <AssetComponent />
                </div>
            )
        }

    }
}

export default Asset