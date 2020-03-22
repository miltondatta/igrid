import Axios from 'axios'
import './assetReqDashboard.css'
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";

class AssetReqHomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            totalCateogry: 0,
            totalSubCateogry: 0,
            totalProducts: 0,
            totalAssets: 0,
        }
    }

    componentDidMount() {
        this.getTotalProducts()
        this.getTotalAssetCategories()
        this.getTotalRegisteredAssets()
        this.getTotalSubAssetCategories()



    }

    getTotalAssetCategories = () => {
        Axios.get(apiUrl() + 'total/asset-category')
            .then(res => {
                if (res.data.status){
                    this.setState({
                        totalCateogry: res.data.total
                    })
                }
            })
    }

    getTotalSubAssetCategories = () => {
        Axios.get(apiUrl() + 'total/asset-sub-category')
            .then(res => {
                if (res.data.status){
                    this.setState({
                        totalSubCateogry: res.data.total
                    })
                }
            })
    }

    getTotalProducts = () => {
        Axios.get(apiUrl() + 'total/products')
            .then(res => {
                if (res.data.status){
                    this.setState({
                        totalProducts: res.data.total
                    })
                }
            })
    }

    getTotalRegisteredAssets = () => {
        Axios.get(apiUrl() + 'total/assets')
            .then(res => {
                if (res.data.status){
                    this.setState({
                        totalAssets: res.data.total
                    })
                }
            })
    }


    render() {
        const {totalCateogry, totalSubCateogry, totalProducts, totalAssets} = this.state
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
                                <p>5</p>
                                <p>Pending</p>
                            </div>
                            <div>
                                <p>7</p>
                                <p>In Progress</p>
                            </div>
                            <div>
                                <p>14</p>
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