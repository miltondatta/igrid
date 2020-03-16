import Loadable from 'react-loadable'
import React, {Component} from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import Topnav from '../layouts/Topnav';
import Footer from "../layouts/Footer";
import Loader from "../utility/loader/Loader";

const AsyncHome = Loadable({
    loader: () => import('../containers/Home'),
    loading: Loader,
  });
const AsyncMIS = Loadable({
    loader: () => import('../containers/MIS'),
    loading: Loader,
});
const AsyncHomeLand = Loadable({
    loader: () => import('../containers/HomeLand'),
    loading: Loader,
});
const AsyncProile = Loadable({
    loader: () => import('../containers/User/Profile'),
    loading: Loader,
});
const AsyncLogin = Loadable({
    loader: () => import('../containers/User/Login'),
    loading: Loader,
});
const AsyncAsset = Loadable({
    loader: () => import('../containers/Asset'),
    loading: Loader,
});
const AsyncDocManagement = Loadable({
    loader: () => import('../containers/DocManagement'),
    loading: Loader,
});
const AsyncLocationFinder = Loadable({
    loader: () => import('../containers/LocationFinder'),
    loading: Loader,
});
const AsyncPasswordReset = Loadable({
    loader: () => import('../containers/User/PasswordReset'),
    loading: Loader,
});
const AsyncRequestHistory = Loadable({
    loader: () => import('../containers/RequestHistory'),
    loading: Loader,
});
const AsyncRequestDetails = Loadable({
    loader: () => import('../containers/RequestDetails'),
    loading: Loader,
});
const AsyncBranchRequisition = Loadable({
    loader: () => import('../containers/BranchRequisition'),
    loading: Loader,
});
const AsyncDeliveryRequest = Loadable({
    loader: () => import('../containers/DeliveryRequest'),
    loading: Loader,
});
const AsyncSupportHistory= Loadable({
    loader: () => import('../containers/SupportHistory'),
    loading: Loader,
});
const AsyncAssetReg= Loadable({
    loader: () => import('../containers/AssetReg'),
    loading: Loader,
});
const AsyncAssetList = Loadable({
    loader: () => import('../containers/AssetList'),
    loading: Loader,
});
const AsyncAssetDisposal = Loadable({
    loader: () => import('../containers/AssetDisposal'),
    loading: Loader,
});
const AsyncDisposalAssetListContainer = Loadable({
    loader: () => import('../containers/DisposalAssetListContainer'),
    loading: Loader,
});
const AsyncAssetSale = Loadable({
    loader: () => import('../containers/AssetSale'),
    loading: Loader,
});
const AsyncAssetReEvaluation = Loadable({
    loader: () => import('../containers/AssetReEvaluation'),
    loading: Loader,
});
const AsyncAssetTransfer = Loadable({
    loader: () => import('../containers/AssetTransfer'),
    loading: Loader,
});
const AsyncRepairMaintenance= Loadable({
    loader: () => import('../containers/RepairMaintenance'),
    loading: Loader,
});
const AsyncRepairMaintenanceList= Loadable({
    loader: () => import('../containers/RepairMaintenanceList'),
    loading: Loader,
});
const AsyncCreateProject = Loadable({
    loader: () => import('../containers/Projects'),
    loading: Loader,
});
const AsyncVendor = Loadable({
    loader: () => import('../containers/Vendor'),
    loading: Loader,
});
const AsyncModels = Loadable({
    loader: () => import('../containers/Models'),
    loading: Loader,
});
const AsyncBrands = Loadable({
    loader: () => import('../containers/Brands'),
    loading: Loader,
});
const AsyncAssetCategory = Loadable({
    loader: () => import('../containers/AssetCategory'),
    loading: Loader,
});
const AsyncAssetSubCategory = Loadable({
    loader: () => import('../containers/AssetSubCategory'),
    loading: Loader,
});
const AsyncProduct = Loadable({
    loader: () => import('../containers/Product'),
    loading: Loader,
});
const AsyncDepMethod = Loadable({
    loader: () => import('../containers/DepMethod'),
    loading: Loader,
});
const AsyncAssetTypes = Loadable({
    loader: () => import('../containers/AssetTypes'),
    loading: Loader,
});
const AsyncConditions = Loadable({
    loader: () => import('../containers/Conditions'),
    loading: Loader,
});
const AsyncChallan = Loadable({
    loader: () => import('../containers/Challan'),
    loading: Loader,
});
const AsyncUserLoginLog = Loadable({
    loader: () => import('../containers/Logs/UserLoginLog'),
    loading: Loader,
});
const AsyncLocHierarchies = Loadable({
    loader: () => import('../containers/LocHierarchies'),
    loading: Loader,
});
const AsyncUserRoles = Loadable({
    loader: () => import('../containers/UserRoles'),
    loading: Loader,
});
const AsyncLocations = Loadable({
    loader: () => import('../containers/Locations'),
    loading: Loader,
});
const AsyncModules = Loadable({
    loader: () => import('../containers/Modules'),
    loading: Loader,
});
const AsyncUserAssociateRole = Loadable({
    loader: () => import('../containers/UserAssociateRole'),
    loading: Loader,
});
const AsyncRegisterUser = Loadable({
    loader: () => import('../containers/RegisterUser'),
    loading: Loader,
});
const AsyncDocumentCategory = Loadable({
    loader: () => import('../containers/DocCategory'),
    loading: Loader,
});
const AsyncDocumentSubCategory = Loadable({
    loader: () => import('../containers/DocSubCategory'),
    loading: Loader,
});
const AsyncDocumentList = Loadable({
    loader: () => import('../containers/DocList'),
    loading: Loader,
});
const AsyncDocumentListSearch = Loadable({
    loader: () => import('../containers/DocListSearch'),
    loading: Loader,
});
const AsyncDocumentListDetails = Loadable({
    loader: () => import('../containers/DocListDetails'),
    loading: Loader,
});
const AsyncApprovalLevel = Loadable({
    loader: () => import('../containers/ApprovalLevel'),
    loading: Loader,
});
const AsyncRequisitionStatus = Loadable({
    loader: () => import('../containers/RequisitionStatus'),
    loading: Loader,
});
const AsyncIndicatorCategory = Loadable({
    loader: () => import('../containers/IndCategory'),
    loading: Loader,
});
const AsyncIndicatorSubCategory = Loadable({
    loader: () => import('../containers/IndSubCategory'),
    loading: Loader,
});
const AsyncMisImportCSV = Loadable({
    loader: () => import('../containers/Mis/ImportCSV'),
    loading: Loader,
});
const AsyncOwnStockContainer = Loadable({
    loader: () => import('../containers/OwnStockContainer'),
    loading: Loader,
});
const AsyncAssetDetailsContainer = Loadable({
    loader: () => import('../containers/AssetDetailsContainer'),
    loading: Loader,
});
const AsyncComplaintCategory = Loadable({
    loader: () => import('../containers/Complaints/ComplaintsCategory'),
    loading: Loader,
});
const AsyncComplaintSubCategory = Loadable({
    loader: () => import('../containers/Complaints/ComplaintsSubCategory'),
    loading: Loader,
});
const AsyncComplain = Loadable({
    loader: () => import('../containers/Complaints/Complaint'),
    loading: Loader,
});
const AsyncComplainList = Loadable({
    loader: () => import('../containers/Complaints/ComplintList'),
    loading: Loader,
});
const AsyncLostAssets = Loadable({
    loader: () => import('../containers/LostAssets'),
    loading: Loader,
});
const AsyncLostAssetsStatus = Loadable({
    loader: () => import('../containers/LostAssetsStatus'),
    loading: Loader,
});
const AsyncAbout = Loadable({
    loader: () => import('../containers/About'),
    loading: Loader,
});
const AsyncContact = Loadable({
    loader: () => import('../containers/Contact'),
    loading: Loader,
});
const AsyncLocationDetails = Loadable({
    loader: () => import('../containers/LocationDetails'),
    loading: Loader,
});
const AsyncDeliveryReport = Loadable({
    loader: () => import('../containers/Report/DeliveryReport'),
    loading: Loader,
});
const AsyncAmcTypes = Loadable({
    loader: () => import('../containers/AmcTypes'),
    loading: Loader,
});
const AsyncLostAssetsReport = Loadable({
    loader: () => import('../containers/Report/LostAssetsReport'),
    loading: Loader,
});
const AsyncAssetDisposalReport = Loadable({
    loader: () => import('../containers/Report/AssetDisposalReport'),
    loading: Loader,
});
const AsyncMaintenanceReport = Loadable({
    loader: () => import('../containers/Report/MaintenanceReport'),
    loading: Loader,
});
const AsyncDailyReport = Loadable({
    loader: () => import('../containers/MISReport/DailyReport.js'),
    loading: Loader,
});
const AsyncWeeklyReport = Loadable({
    loader: () => import('../containers/MISReport/WeeklyReport.js'),
    loading: Loader,
});
const AsyncFortnightlyReport = Loadable({
    loader: () => import('../containers/MISReport/FortnightlyReport.js'),
    loading: Loader,
});
const AsyncMonthlyReport = Loadable({
    loader: () => import('../containers/MISReport/MonthlyReport.js'),
    loading: Loader,
});
const AsyncDeliveryReceivedContainer = Loadable({
    loader: () => import('../containers/DeliveryReceivedContainer'),
    loading: Loader,
});
const AsyncMenuContainer = Loadable({
    loader: () => import('../containers/MenuContainer'),
    loading: Loader
});
const AsyncAdminAssetReport = Loadable({
    loader: () => import('../containers/AdminReport/AllAssetReport'),
    loading: Loader,
});
const AsyncAssetRequisition = Loadable({
    loader: () => import('../containers/AssetReqHome'),
    loading: Loader,
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
                <>
                    <Topnav home />
                        <Switch>
                            <Route exact path='/' component={AsyncHome} />
                        </Switch>
                    <Footer />
                </>
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
                        <Topnav/>
                        <Switch>
                            <Route exact path='/mis' component={AsyncMIS}/>
                            <Route exact path='/about' component={AsyncAbout}/>
                            <Route exact path='/home' component={AsyncHomeLand}/>
                            <Route exact path='/profile' component={AsyncProile}/>
                            <Route exact path='/challan' component={AsyncChallan}/>
                            <Route exact path='/contact' component={AsyncContact}/>
                            <Route exact path='/complain' component={AsyncComplain}/>
                            <Route exact path='/admin/brand' component={AsyncBrands}/>
                            <Route exact path='/admin/model' component={AsyncModels}/>
                            <Route exact path='/requisition' component={AsyncAsset} />
                            <Route exact path='/stock-reg' component={AsyncAssetReg}/>
                            <Route exact path='/admin/vendor' component={AsyncVendor}/>
                            <Route exact path='/asset-sale' component={AsyncAssetSale}/>
                            <Route exact path='/asset-list' component={AsyncAssetList}/>
                            <Route exact path='/admin/modules' component={AsyncModules}/>
                            <Route exact path='/admin/product' component={AsyncProduct}/>
                            <Route exact path='/lost-assets' component={AsyncLostAssets}/>
                            <Route exact path='/documents' component={AsyncDocManagement}/>
                            <Route exact path='/location' component={AsyncLocationFinder}/>
                            <Route exact path='/admin/amc-types' component={AsyncAmcTypes}/>
                            <Route exact path='/pass-reset' component={AsyncPasswordReset}/>
                            <Route exact path='/admin/user-roles' component={AsyncUserRoles}/>
                            <Route exact path='/admin/project' component={AsyncCreateProject}/>
                            <Route exact path='/own-stock' component={AsyncOwnStockContainer}/>
                            <Route exact path='/admin/conditions' component={AsyncConditions}/>
                            <Route exact path='/admin/asset-types' component={AsyncAssetTypes}/>
                            <Route exact path='/mis/daily-report' component={AsyncDailyReport}/>
                            <Route exact path='/asset-disposal' component={AsyncAssetDisposal}/>
                            <Route exact path='/asset-transfer' component={AsyncAssetTransfer}/>
                            <Route exact path='/admin/complaint' component={AsyncComplainList}/>
                            <Route exact path='/mis/weekly-report' component={AsyncWeeklyReport}/>
                            <Route exact path='/report/delivery-report' component={AsyncDeliveryReport}/>
                            <Route exact path='/request-history' component={AsyncRequestHistory}/>
                            <Route exact path='/support-hisotry' component={AsyncSupportHistory}/>
                            <Route exact path='/asset-repair' component={AsyncRepairMaintenance}/>
                            <Route exact path='/mis/monthly-report' component={AsyncMonthlyReport}/>
                            <Route exact path='/location/details' component={AsyncLocationDetails}/>
                            <Route exact path='/delivery-request' component={AsyncDeliveryRequest}/>
                            <Route exact path='/admin/register-user' component={AsyncRegisterUser}/>
                            <Route exact path='/asset-dashboard' component={AsyncAssetRequisition}/>
                            <Route exact path='/admin/assign-locations' component={AsyncLocations}/>
                            <Route exact path='/admin/mis/import/csv' component={AsyncMisImportCSV}/>
                            <Route exact path='/admin/user-login-log' component={AsyncUserLoginLog}/>
                            <Route exact path='/request-details/:id' component={AsyncRequestDetails}/>
                            <Route exact path='/admin/asset-category' component={AsyncAssetCategory}/>
                            <Route exact path='/admin/approval-level' component={AsyncApprovalLevel}/>
                            <Route exact path='/lost-assets-status' component={AsyncLostAssetsStatus}/>
                            <Route exact path='/report/lost-assets-report' component={AsyncLostAssetsReport}/>
                            <Route exact path='/approved-delivery' component={AsyncBranchRequisition}/>
                            <Route exact path='/asset-details' component={AsyncAssetDetailsContainer}/>
                            <Route exact path='/report/maintenance-report' component={AsyncMaintenanceReport}/>
                            <Route exact path='/requisition-status' component={AsyncRequisitionStatus}/>
                            <Route exact path='/admin/loc_hierarchies' component={AsyncLocHierarchies}/>
                            <Route exact path='/admin/depreciation-methods' component={AsyncDepMethod}/>
                            <Route exact path='/asset-reevaluation' component={AsyncAssetReEvaluation}/>
                            <Route exact path='/documents/document-list' component={AsyncDocumentList}/>
                            <Route exact path='/admin/asset-report/all' component={AsyncAdminAssetReport}/>
                            <Route exact path='/asset-repair-list' component={AsyncRepairMaintenanceList}/>
                            <Route exact path='/mis/fortnightly-report' component={AsyncFortnightlyReport}/>
                            <Route exact path='/admin/complain-category' component={AsyncComplaintCategory}/>
                            <Route exact path='/admin/asset-sub-category' component={AsyncAssetSubCategory}/>
                            <Route exact path='/report/asset-disposal-report' component={AsyncAssetDisposalReport}/>
                            <Route exact path='/documents/details/:id' component={AsyncDocumentListDetails}/>
                            <Route exact path='/delivery-received' component={AsyncDeliveryReceivedContainer}/>
                            <Route exact path='/admin/user-associate-role' component={AsyncUserAssociateRole}/>
                            <Route exact path='/documents/document-category' component={AsyncDocumentCategory}/>
                            <Route exact path='/admin/mis/indicator/list' component={AsyncIndicatorSubCategory}/>
                            <Route exact path='/asset-disposal-list' component={AsyncDisposalAssetListContainer}/>
                            <Route exact path='/admin/mis/indicator/category' component={AsyncIndicatorCategory}/>
                            <Route exact path='/admin/complain-sub-category' component={AsyncComplaintSubCategory}/>
                            <Route exact path='/documents/document-list-search' component={AsyncDocumentListSearch}/>
                            <Route exact path='/documents/document-sub-category' component={AsyncDocumentSubCategory}/>
                            <Route exact path='/documents/details/:id' component={AsyncDocumentListDetails}/>
                            <Route exact path='/delivery-received' component={AsyncDeliveryReceivedContainer}/>
                            <Route exact path='/admin/menu' component={AsyncMenuContainer}/>
                </Switch>
                    </div>
                )
            }
        }
    }
}

export default withRouter(MasterRoute)