import React from 'react'
import {Link} from 'react-router-dom'

const HomeComponent = () => {
    return(
        <>
            <div className="card ui-home mb-4">
                <div className="card-header bg-dark text-white">
                    <i className="fas fa-thumbtack mr-2"></i> Notice Board
                </div>
                <div className={'w-100 p-2 ui-noticeboard'}>
                    <i className="fas fa-angle-right mr-2"></i>Notice board is currently empty
                </div>
            </div>
            <div className={'ui-homecomponent mt-4'}>
                <div className={'row m-2 ui-cards border-right-orange'}>
                    <div className={'col-4 ui-card-left bg-orange'}><i className="fas fa-hotel"></i></div>
                    <Link to={'/mis'} className={'col-8'}>MIS REPORT</Link>
                </div>
                <div className={'row m-2 ui-cards border-right-purple'}>
                    <div className={'col-4 ui-card-left bg-purple'}><i className="far fa-file-alt"></i></div>
                    <Link to={'/documents'} className={'col-8'}>DOCUMENT MANAGEMENT</Link>
                </div>
                <div className={'row m-2 ui-cards border-right-primary'}>
                    <div className={'col-4 ui-card-left bg-primary'}><i className="fas fa-map-marked-alt"></i></div>
                    <Link to={'/location'} className={'col-8 '}>LOCATION FINDER</Link>
                </div>
                <div className={'row m-2 ui-cards border-right-red'}>
                    <div className={'col-4 ui-card-left bg-red'}><i className="fas fa-laptop-medical"></i></div>
                    <Link to={'/asset'} className={'col-8'}>ASSET REQUISITION & TRACKING</Link>
                </div>
            </div>
            </>
    )
}

export default HomeComponent