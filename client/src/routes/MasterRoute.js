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
const AsyncAssetDispose = Loadable({
    loader: () => import('../containers/AssetDispose'),
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
const AsyncLocations = Loadable({
    loader: () => import('../containers/Locations'),
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
                    <div>
                        <Topnav home />
                        <div className='ui-body-container'>
                            <Switch>
                                <Route exact path='/' component={AsyncHome} />
                            </Switch>
                        </div>
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
                            <div className='ui-body-container'>
                                <Switch>
                                    <Route exact path='/mis' component={AsyncMIS}/>
                                    <Route exact path='/model' component={AsyncModels}/>
                                    <Route exact path='/brand' component={AsyncBrands}/>
                                    <Route exact path='/vendor' component={AsyncVendor}/>
                                    <Route exact path='/home' component={AsyncHomeLand}/>
                                    <Route exact path='/profile' component={AsyncProile}/>
                                    <Route exact path='/challan' component={AsyncChallan}/>
                                    <Route exact path='/product' component={AsyncProduct}/>
                                    <Route exact path='/stock-reg' component={AsyncAssetReg}/>
                                    <Route exact path='/asset/:option' component={AsyncAsset}/>
                                    <Route exact path='/asset-sale' component={AsyncAssetSale}/>
                                    <Route exact path='/asset-list' component={AsyncAssetList}/>
                                    <Route exact path='/conditions' component={AsyncConditions}/>
                                    <Route exact path='/project' component={AsyncCreateProject}/>
                                    <Route exact path='/asset-types' component={AsyncAssetTypes}/>
                                    <Route exact path='/documents' component={AsyncDocManagement}/>
                                    <Route exact path='/location' component={AsyncLocationFinder}/>
                                    <Route exact path='/pass-reset' component={AsyncPasswordReset}/>
                                    <Route exact path='/assign-locations' component={AsyncLocations}/>
                                    <Route exact path='/asset-dispose' component={AsyncAssetDispose}/>
                                    <Route exact path='/user-login-log' component={AsyncUserLoginLog}/>
                                    <Route exact path='/asset-category' component={AsyncAssetCategory}/>
                                    <Route exact path='/asset-transfer' component={AsyncAssetTransfer}/>
                                    <Route exact path='/loc_hierarchies' component={AsyncLocHierarchies}/>
                                    <Route exact path='/depreciation-methods' component={AsyncDepMethod}/>
                                    <Route exact path='/request-history' component={AsyncRequestHistory}/>
                                    <Route exact path='/support-hisotry' component={AsyncSupportHistory}/>
                                    <Route exact path='/asset-repair' component={AsyncRepairMaintenence}/>
                                    <Route exact path='/delivery-request' component={AsyncDeliveryRequest}/>
                                    <Route exact path='/request-details/:id' component={AsyncRequestDetails}/>
                                    <Route exact path='/asset-sub-category' component={AsyncAssetSubCategory}/>
                                    <Route exact path='/asset-reevaluation' component={AsyncAssetReEvaluation}/>
                                    <Route exact path='/branch-requesition' component={AsyncBranchRequesition}/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}

export default withRouter(MasterRoute)