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
            totaldisposal: 0,
            totalTransfer: 0,
            totalProducts: 0,
            totallostassets: 0,
            totalSubCateogry: 0,
            closedRequisition: 0,
            pendingRequisition: 0,
            inProgressRequisition: 0,
            complaintStatus: []
        }
    }

    componentDidMount() {
        this.getComplaintStatus()
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
                        totaldisposal: res.data.total[0].totaldisposal,
                        totallostassets: res.data.total[0].totaldisposal,
                        totalTransfer: res.data.total[0].totaltransfer
                    })
                }
            })
    }

    getComplaintStatus = () => {
        const {id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        Axios.get(apiUrl() + 'complaint/db/complaint-status/' + id)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        complaintStatus: res.data.data
                    })
                }
            })
    }

    render() {
        const {totalCateogry, totalSubCateogry, totalProducts, totalAssets, pendingRequisition, inProgressRequisition, closedRequisition, totaldisposal, totallostassets, totalTransfer, complaintStatus} = this.state
        const dispComplaint = complaintStatus.length > 0 ? Object.keys(complaintStatus[0]).map((item, index) => {
            return(
                <>
                    <div key={index}>
                        <p>{complaintStatus[0][item]}</p>
                        <p className={'f-capitalize'}>{item.replace('_', ' ')}</p>
                    </div>
                </>
            )
        }) :
                <>
                    <div>
                        <p>0</p>
                        <p className={'f-capitalize'}>pending</p>
                    </div>
                    <div>
                        <p>0</p>
                        <p className={'f-capitalize'}>in progress</p>
                    </div>
                    <div>
                        <p>0</p>
                        <p className={'f-capitalize'}>solved</p>
                    </div>
                </>
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
                        <div className={'ui-asset-body-bottom ui-assets'}>
                            <div>
                                <p>{totalTransfer}</p>
                                <p>Transfer</p>
                            </div>
                            <div>
                                <p>{totaldisposal}</p>
                                <p>Lost</p>
                            </div>
                            <div>
                                <p>{totallostassets}</p>
                                <p>Disposal</p>
                            </div>
                        </div>
                    </div>
                    <div className={'ui-body'}>
                        <div className={'ui-asset-body-top'}>
                            <div>
                                <div className="ui-icon-container-3">
                                    <i className="fas fa-flag-checkered"></i>
                                </div>
                            </div>
                            <p>Complaints</p>
                        </div>
                        <div className={'ui-asset-body-bottom'}>
                            {dispComplaint}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AssetReqHomeComponent;