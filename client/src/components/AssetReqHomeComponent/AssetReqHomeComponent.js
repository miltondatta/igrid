import './assetReqDashboard.css'
import React, {Component} from 'react';

class AssetReqHomeComponent extends Component {
    render() {
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
                            <h2>10</h2>
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
                            <h2>49</h2>
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
                            <h2>143</h2>
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
                            <h2>376</h2>
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