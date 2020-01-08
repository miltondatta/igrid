import React from 'react'
import {Link} from 'react-router-dom'
import jwt from "jsonwebtoken";

const HomeComponent = () => {
    return(
        <>
            <div className={'ui-homecomponent mt-4'}>
                <Link to={'/mis'} ><div className={'m-2 ui-cards bg-purple-orange'}>
                    <div className={'ui-card-left'}><i className="fas fa-hotel"></i></div>
                    <p>MIS REPORT</p>
                </div></Link>
                <Link to={'/documents'} ><div className={'m-2 ui-cards bg-purple-gradient'}>
                    <div className={'ui-card-left'}><i className="far fa-file-alt"></i></div>
                    <p>DOCUMENT MANAGEMENT</p>
                </div></Link>
                <Link to={'/location'}><div className={'m-2 ui-cards bg-purple-primary'}>
                    <div className={'ui-card-left'}><i className="fas fa-map-marked-alt"></i></div>
                    <p>LOCATION FINDER</p>
                </div></Link>
                <Link to={'/home'} ><div className={'m-2 ui-cards bg-purple-red'}>
                    <div className={'ui-card-left'}><i className="fas fa-laptop-medical"></i></div>
                    <p>ASSET REQUISITION & TRACKING</p>
                </div></Link>
            </div>
            <div className="card ui-home mb-4 shadow">
                <div className="card-header bg-dark text-white">
                    <i className="fas fa-thumbtack mr-2"></i> Notice Board
                </div>
                <div className={'w-100 p-2 ui-noticeboard'}>
                    <i className="fas fa-angle-right mr-2"></i>Notice board is currently empty
                </div>
            </div>
            </>
    )
}

export default HomeComponent