import Axios from 'axios'
import './assetReqDashboard.css'
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import jwt from "jsonwebtoken";

class AssetReqHomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            totalAssets: 0,
            totalCateogry: 0,
            totalProducts: 0,
            totalSubCateogry: 0,
            closedRequisition: 0,
            pendingRequisition: 0,
            inProgressRequisition: 0,
        }
    }

    componentDidMount() {
        this.getPendingRequisition()

    }

    getPendingRequisition = () => {
        const {id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        Axios.get(apiUrl() + 'requisition/total/' + id)
            .then(res => {
                if (res.data.status){
                    console.log(res, 47)
                    this.setState({
                        pendingRequisition: res.data.total[0].pending,
                        inProgressRequisition: res.data.total[0].in_progress,
                        closedRequisition: res.data.total[0].closed,
                        totalCateogry: res.data.total[0].total_category,
                        totalSubCateogry: res.data.total[0].total_sub_category,
                        totalProducts: res.data.total[0].total_products,
                        totalAssets: res.data.total[0].registered_assets,
                    })
                }
            })
    }


    render() {
        const {totalCateogry, totalSubCateogry, totalProducts, totalAssets, pendingRequisition, inProgressRequisition, closedRequisition} = this.state
        return (
            <div className={'ui-asset-dashboard p-4'}>
                <div className="ui-asset-dashboard-top">
                    <div className={'ui-top-section'}>
                        <div>
                            <div className="ui-img-container">
                                <img src={process.env.PUBLIC_URL + '/media/icons/category.png'} alt=""/>
                            </div>
                        </div>
                        <div>
                            Asset Category
                            <h2>{totalCateogry}</h2>
                        </div>
                    </div>
                    <div className={'ui-top-section'}>
                        <div>
                            <div className="ui-img-container">
                                <img src={process.env.PUBLIC_URL + '/media/icons/subCat.png'} alt=""/>
                            </div>
                        </div>
                        <div>
                            Asset Sub Category
                            <h2>{totalSubCateogry}</h2>
                        </div>
                    </div>
                    <div className={'ui-top-section'}>
                        <div>
                            <div className="ui-img-container">
                                <img src={process.env.PUBLIC_URL + '/media/icons/register.png'} alt=""/>
                            </div>
                        </div>
                        <div>
                            Total Product
                            <h2>{totalProducts}</h2>
                        </div>
                    </div>
                    <div className={'ui-top-section'}>
                        <div>
                            <div className="ui-img-container">
                                <img src={process.env.PUBLIC_URL + '/media/icons/subCat.png'} alt=""/>
                            </div>
                        </div>
                        <div>
                            Registered Asset
                            <h2>{totalAssets}</h2>
                        </div>
                    </div>
                </div>
                <div className="ui-asset-dashboard-body">
                    <div className={'ui-body'}>
                        <div className={'ui-asset-body-top'}>
                            <div>
                                <div className="ui-icon-container-1">
                                    <i className="icofont-search-document"></i>
                                </div>
                            </div>
                            <p>Requisition</p>
                        </div>
                        <div className={'ui-asset-body-bottom'}>
                            <div>
                                <p>{pendingRequisition}</p>
                                <p>Pending</p>
                            </div>
                            <div>
                                <p>{inProgressRequisition}</p>
                                <p>In Progress</p>
                            </div>
                            <div>
                                <p>{closedRequisition}</p>
                                <p>Closed</p>
                            </div>
                        </div>
                    </div>
                    <div className={'ui-body'}>
                        <div className={'ui-asset-body-top'}>
                            <div>
                                <div className="ui-icon-container-2">
                                    <i className="fab fa-laravel"></i>
                                </div>
                            </div>
                            <p>Asset</p>
                        </div>
                        <div className={'ui-asset-body-bottom'}>
                            <div>
                                <p>21</p>
                                <p>Transfer</p>
                            </div>
                            <div>
                                <p>3</p>
                                <p>Lost</p>
                            </div>
                            <div>
                                <p>1</p>
                                <p>Disposal</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AssetReqHomeComponent;