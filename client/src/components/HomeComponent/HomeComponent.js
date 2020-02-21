import React from 'react';
import {Link} from 'react-router-dom';
import NoticeBoardComponent from "./NoticeBoardComponent";

const HomeComponent = () => {
    return (
        <>
            <div className="ui-hometop">
                <div className={'ui-news'}>
                    <p className={'f-19px f-weight-600 text-grey border-bottom-gray pb-3'}>Latest Updates</p>
                </div>
                <div>
                    <div className={'ui-help-center'}>
                        <p>Manage your Business Easily</p>
                        <button>Help Center</button>
                    </div>
                    <img src={process.env.PUBLIC_URL + '/media/image/banner.png'} alt="banner"/>
                </div>
            </div>
            <div className="ui-hometop">
                <div className={'ui-news'}>
                    <p className={'f-19px f-weight-600 text-grey border-bottom-gray pb-3 mb-0'}>Notice Board</p>
                    <NoticeBoardComponent />
                </div>
                <div className={'ui-home-options'}>
                    <Link to={'/documents'}>
                        <div className={'ui-cards ui-document'}>
                            <div className={'ui-card-left'}>
                                <img className={'mb-5'} src={process.env.PUBLIC_URL + '/media/image/document_management.png'} alt="document_management"/>
                            </div>
                            <p className={'mt-2'}>DOCUMENT MANAGEMENT</p>
                        </div>
                    </Link>
                    <Link to={'/location'}>
                        <div className={'ui-cards ui-location'}>
                            <div className={'ui-card-left'}>
                                <img className={'mb-5'} src={process.env.PUBLIC_URL + '/media/image/location_finder.png'} alt="document_management"/>
                            </div>
                            <p>LOCATION FINDER</p>
                        </div>
                    </Link>
                    <Link to={'/home'}>
                        <div className={'ui-cards ui-asset'}>
                            <div className={'ui-card-left'}>
                                <img className={'mb-5'} src={process.env.PUBLIC_URL + '/media/image/asset.png'} alt="document_management"/>
                            </div>
                            <p>ASSET REQUISITION & TRACKING</p>
                        </div>
                    </Link>
                    <Link to={'/mis'}>
                        <div className={'ui-cards ui-mis'}>
                            <div className={'ui-card-left'}>
                                <img className={'mb-5'} src={process.env.PUBLIC_URL + '/media/image/mis_report.png'} alt="document_management"/>
                            </div>
                            <p>MIS REPORT</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
};

export default HomeComponent;