import React from 'react';
import Slider from "react-slick";
import {Link} from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NoticeBoardComponent from "./NoticeBoardComponent";
import {homeBanner} from "../../utility/constant";
import Loader from "../../utility/loader/Loader";
import LatestUpdateComponent from "./LatestUpdateComponent";

const HomeComponent = () => {
    let settings = {
        centerMode: false,
        slidesToShow: 1,
        centerPadding: '0',
        infinite: true,
        autoplay: true,
        speed: 1200,
        autoplaySpeed: 3000,
    };
    const homeBan = homeBanner.map((item, index) => (
        <div>
            <div className={'ui-help-center'}>
                <p>{item.title}</p>
                <Link to={item.link}><button>{item.btnText}</button></Link>
            </div>
            <img src={process.env.PUBLIC_URL + item.img} alt="banner"/>
        </div>
    ))
    return (
        <>
            <div className="ui-hometop">
                <div className={'ui-news'}>
                    <p className={'f-19px f-weight-600 text-grey border-bottom-gray pb-3'}>Latest Updates</p>
                    <LatestUpdateComponent/>
                </div>
                <div className={'w-100 rounded overflow-hidden'}>
                    <Slider {...settings}>
                    {homeBan}
                </Slider>
                </div>
            </div>
            <div className="ui-hometop">
                <div className={'ui-news'}>
                    <p className={'f-19px f-weight-600 text-grey border-bottom-gray pb-3 mb-0'}>Notice Board</p>
                    <NoticeBoardComponent />
                </div>
                <div className={'ui-home-options'}>
                    <a href={'/asset-dashboard'}>
                        <div className={'ui-cards ui-asset'}>
                            <div className={'ui-card-left'}>
                                <img className={'mb-5'} src={process.env.PUBLIC_URL + '/media/image/asset.png'} alt="document_management"/>
                            </div>
                            <p>ASSET REQUISITION & TRACKING</p>
                        </div>
                    </a>
                    <a href={'/report/stock-report'}>
                        <div className={'ui-cards ui-mis'}>
                            <div className={'ui-card-left'}>
                                <img className={'mb-5'} src={process.env.PUBLIC_URL + '/media/image/mis_report.png'} alt="document_management"/>
                            </div>
                            <p>REPORT</p>
                        </div>
                    </a>
                    <a href={'/location'}>
                        <div className={'ui-cards ui-location'}>
                            <div className={'ui-card-left'}>
                                <img className={'mb-5'} src={process.env.PUBLIC_URL + '/media/image/location_finder.png'} alt="document_management"/>
                            </div>
                            <p>LOCATION FINDER</p>
                        </div>
                    </a>
                    <a href={'/documents/document-list-search'}>
                        <div className={'ui-cards ui-document'}>
                            <div className={'ui-card-left'}>
                                <img className={'mb-5'} src={process.env.PUBLIC_URL + '/media/image/document_management.png'} alt="document_management"/>
                            </div>
                            <p className={'mt-2'}>DOCUMENT MANAGEMENT</p>
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
};

export default HomeComponent;
