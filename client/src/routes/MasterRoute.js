import Loading from './Loading';
import Loadable from 'react-loadable'
import React, {Component} from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import Topnav from '../layouts/Topnav';

const AsyncHome = Loadable({
    loader: () => import('../containers/Home'),
    loading: Loading,
  });
const AsyncMIS = Loadable({
    loader: () => import('../containers/MIS'),
    loading: Loading,
});
const AsyncHomeLand = Loadable({
    loader: () => import('../containers/HomeLand'),
    loading: Loading,
});
const AsyncProile = Loadable({
    loader: () => import('../containers/User/Profile'),
    loading: Loading,
});
const AsyncLogin = Loadable({
    loader: () => import('../containers/User/Login'),
    loading: Loading,
});
const AsyncAsset = Loadable({
    loader: () => import('../containers/Asset'),
    loading: Loading,
});
const AsyncDocManagement = Loadable({
    loader: () => import('../containers/DocManagement'),
    loading: Loading,
});
const AsyncLocationFinder = Loadable({
    loader: () => import('../containers/LocationFinder'),
    loading: Loading,
});
const AsyncPasswordReset = Loadable({
    loader: () => import('../containers/User/PasswordReset'),
    loading: Loading,
});
const AsyncRequestHistory = Loadable({
    loader: () => import('../containers/RequestHistory'),
    loading: Loading,
});
const AsyncRequestDetails = Loadable({
    loader: () => import('../containers/RequestDetails'),
    loading: Loading,
});
const AsyncBranchRequesition = Loadable({
    loader: () => import('../containers/BranchRequesition'),
    loading: Loading,
});
const AsyncDeliveryRequest = Loadable({
    loader: () => import('../containers/DeliveryRequest'),
    loading: Loading,
});
const AsyncSupportHistory= Loadable({
    loader: () => import('../containers/SupportHistory'),
    loading: Loading,
});
const AsyncAssetReg= Loadable({
    loader: () => import('../containers/AssetReg'),
    loading: Loading,
});
const AsyncAssetList = Loadable({
    loader: () => import('../containers/AssetList'),
    loading: Loading,
});
const AsyncAssetDisposal = Loadable({
    loader: () => import('../containers/AssetDisposal'),
    loading: Loading,
});
const AsyncAssetSale = Loadable({
    loader: () => import('../containers/AssetSale'),
    loading: Loading,
});
const AsyncAssetReEvaluation = Loadable({
    loader: () => import('../containers/AssetReEvaluation'),
    loading: Loading,
});
const AsyncAssetTransfer = Loadable({
    loader: () => import('../containers/AssetTransfer'),
    loading: Loading,
});
const AsyncRepairMaintenence= Loadable({
    loader: () => import('../containers/RepairMaintenence'),
    loading: Loading,
});
const AsyncCreateProject = Loadable({
    loader: () => import('../containers/Projects'),
    loading: Loading,
});
const AsyncVendor = Loadable({
    loader: () => import('../containers/Vendor'),
    loading: Loading,
});
const AsyncModels = Loadable({
    loader: () => import('../containers/Models'),
    loading: Loading,
});
const AsyncBrands = Loadable({
    loader: () => import('../containers/Brands'),
    loading: Loading,
});
const AsyncAssetCategory = Loadable({
    loader: () => import('../containers/AssetCategory'),
    loading: Loading,
});
const AsyncAssetSubCategory = Loadable({
    loader: () => import('../containers/AssetSubCategory'),
    loading: Loading,
});
const AsyncProduct = Loadable({
    loader: () => import('../containers/Product'),
    loading: Loading,
});
const AsyncDepMethod = Loadable({
    loader: () => import('../containers/DepMethod'),
    loading: Loading,
});
const AsyncAssetTypes = Loadable({
    loader: () => import('../containers/AssetTypes'),
    loading: Loading,
});
const AsyncConditions = Loadable({
    loader: () => import('../containers/Conditions'),
    loading: Loading,
});
const AsyncChallan = Loadable({
    loader: () => import('../containers/Challan'),
    loading: Loading,
});
const AsyncUserLoginLog = Loadable({
    loader: () => import('../containers/Logs/UserLoginLog'),
    loading: Loading,
});
const AsyncLocHierarchies = Loadable({
    loader: () => import('../containers/LocHierarchies'),
    loading: Loading,
});
const AsyncUserRoles = Loadable({
    loader: () => import('../containers/UserRoles'),
    loading: Loading,
});
const AsyncLocations = Loadable({
    loader: () => import('../containers/Locations'),
    loading: Loading,
});
const AsyncModules = Loadable({
    loader: () => import('../containers/Modules'),
    loading: Loading,
});
const AsyncUserAssociateRole = Loadable({
    loader: () => import('../containers/UserAssociateRole'),
    loading: Loading,
});
const AsyncRegisterUser = Loadable({
    loader: () => import('../containers/RegisterUser'),
    loading: Loading,
});
const AsyncDocumentCategory = Loadable({
    loader: () => import('../containers/DocCategory'),
    loading: Loading,
});
const AsyncDocumentSubCategory = Loadable({
    loader: () => import('../containers/DocSubCategory'),
    loading: Loading,
});
const AsyncDocumentList = Loadable({
    loader: () => import('../containers/DocList'),
    loading: Loading,
});
const AsyncDocumentListSearch = Loadable({
    loader: () => import('../containers/DocListSearch'),
    loading: Loading,
});
const AsyncDocumentListDetails = Loadable({
    loader: () => import('../containers/DocListDetails'),
    loading: Loading,
});
const AsyncApprovalLevel = Loadable({
    loader: () => import('../containers/ApprovalLevel'),
    loading: Loading,
});
const AsyncRequisitionStatus = Loadable({
    loader: () => import('../containers/RequisitionStatus'),
    loading: Loading,
});
const AsyncIndicatorCategory = Loadable({
    loader: () => import('../containers/IndCategory'),
    loading: Loading,
});
const AsyncIndicatorSubCategory = Loadable({
    loader: () => import('../containers/IndSubCategory'),
    loading: Loading,
});
const AsyncOwnStockContainer = Loadable({
    loader: () => import('../containers/OwnStockContainer'),
    loading: Loading,
});
const AsyncComplaintCategory = Loadable({
    loader: () => import('../containers/Complaints/ComplaintsCategory'),
    loading: Loading,
});
const AsyncComplaintSubCategory = Loadable({
    loader: () => import('../containers/Complaints/ComplaintsSubCategory'),
    loading: Loading,
});
const AsyncComplain = Loadable({
    loader: () => import('../containers/Complaints/Complaint'),
    loading: Loading,
});
const AsyncComplainList = Loadable({
    loader: () => import('../containers/Complaints/ComplintList'),
    loading: Loading,
});

class MasterRoute extends Component{
    render(){
        const {pathname} = this.props.location
        if(pathname === '/login') {
            return(
                <Switch>
                    <Route exact path='/login' component={AsyncLogin} />
                </Switch>
            )
        } else if(pathname === '/'){
            return(
                <div className=' h-100'>
                        <Topnav home />
                        <div className='ui-body-container'>
                            <Switch>
                                <Route exact path='/' component={AsyncHome} />
                            </Switch>
                        </div>
                </div>
            )
        } else {
            const userInfo = localStorage.getItem('user')
            if (!userInfo) {
                return(
                    <Redirect
                        to='/login'
                    />
                )
            } else {
                return (
                    <div className={`ui-container h-100`}>
                        <div>
                            <Topnav/>
                                <Switch>
                                    <Route exact path='/mis' component={AsyncMIS}/>
                                    <Route exact path='/home' component={AsyncHomeLand}/>
                                    <Route exact path='/profile' component={AsyncProile}/>
                                    <Route exact path='/admin/modules' component={AsyncModules}/>
                                    <Route exact path='/challan' component={AsyncChallan}/>
                                    <Route exact path='/admin/product' component={AsyncProduct}/>
                                    <Route exact path='/complain' component={AsyncComplain}/>
                                    <Route exact path='/admin/brand' component={AsyncBrands}/>
                                    <Route exact path='/admin/model' component={AsyncModels}/>
                                    <Route exact path='/stock-reg' component={AsyncAssetReg}/>
                                    <Route exact path='/admin/vendor' component={AsyncVendor}/>
                                    <Route exact path='/requisition' component={AsyncAsset}/>
                                    <Route exact path='/admin/complaint' component={AsyncComplainList}/>
                                    <Route exact path='/asset-sale' component={AsyncAssetSale}/>
                                    <Route exact path='/asset-list' component={AsyncAssetList}/>
                                    <Route exact path='/documents' component={AsyncDocManagement}/>
                                    <Route exact path='/location' component={AsyncLocationFinder}/>
                                    <Route exact path='/pass-reset' component={AsyncPasswordReset}/>
                                    <Route exact path='/admin/user-roles' component={AsyncUserRoles}/>
                                    <Route exact path='/admin/project' component={AsyncCreateProject}/>
                                    <Route exact path='/admin/conditions' component={AsyncConditions}/>
                                    <Route exact path='/admin/asset-types' component={AsyncAssetTypes}/>
                                    <Route exact path='/asset-transfer' component={AsyncAssetTransfer}/>
                                    <Route exact path='/request-history' component={AsyncRequestHistory}/>
                                    <Route exact path='/support-hisotry' component={AsyncSupportHistory}/>
                                    <Route exact path='/asset-repair' component={AsyncRepairMaintenence}/>
                                    <Route exact path='/delivery-request' component={AsyncDeliveryRequest}/>
                                    <Route exact path='/admin/register-user' component={AsyncRegisterUser}/>
                                    <Route exact path='/admin/assign-locations' component={AsyncLocations}/>
                                    <Route exact path='/asset-disposal' component={AsyncAssetDisposal}/>
                                    <Route exact path='/admin/user-login-log' component={AsyncUserLoginLog}/>
                                    <Route exact path='/request-details/:id' component={AsyncRequestDetails}/>
                                    <Route exact path='/admin/asset-category' component={AsyncAssetCategory}/>
                                    <Route exact path='/requisition-status' component={AsyncRequisitionStatus}/>
                                    <Route exact path='/admin/approval-level' component={AsyncApprovalLevel}/>
                                    <Route exact path='/admin/loc_hierarchies' component={AsyncLocHierarchies}/>
                                    <Route exact path='/admin/depreciation-methods' component={AsyncDepMethod}/>
                                    <Route exact path='/admin/asset-sub-category' component={AsyncAssetSubCategory}/>
                                    <Route exact path='/asset-reevaluation' component={AsyncAssetReEvaluation}/>
                                    <Route exact path='/approved-delivery' component={AsyncBranchRequesition}/>
                                    <Route exact path='/admin/complain-category' component={AsyncComplaintCategory}/>
                                    <Route exact path='/admin/complain-sub-category' component={AsyncComplaintSubCategory}/>
                                    <Route exact path='/admin/user-associate-role' component={AsyncUserAssociateRole}/>
                                    <Route exact path='/documents/document-category' component={AsyncDocumentCategory}/>
                                    <Route exact path='/documents/document-sub-category' component={AsyncDocumentSubCategory}/>
                                    <Route exact path='/documents/document-list' component={AsyncDocumentList}/>
                                    <Route exact path='/documents/document-list-search' component={AsyncDocumentListSearch}/>
                                    <Route exact path='/documents/document-list-search/notice/id/:id' component={AsyncDocumentListDetails}/>
                                    <Route exact path='/mis-indicator-category' component={AsyncIndicatorCategory}/>
                                    <Route exact path='/mis-indicator' component={AsyncIndicatorSubCategory}/>
                                    <Route exact path='/own-stock' component={AsyncOwnStockContainer}/>
                            </Switch>
                        </div>
                    </div>
                )
            }
        }
    }
}

export default withRouter(MasterRoute)