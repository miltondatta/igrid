import Loading from './Loading';
import Loadable from 'react-loadable'
import React, {Component} from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import Sidenav from '../layouts/Sidenav';
import Topnav from '../layouts/Topnav';

const AsyncHome = Loadable({
    loader: () => import('../containers/Home'),
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
const AsyncMIS = Loadable({
    loader: () => import('../containers/MIS'),
    loading: Loading,
});
const AsyncLocationFinder = Loadable({
    loader: () => import('../containers/LocationFinder'),
    loading: Loading,
});
const AsyncProile = Loadable({
    loader: () => import('../containers/User/Profile'),
    loading: Loading,
});
const AsyncPasswordReset = Loadable({
    loader: () => import('../containers/User/PasswordReset'),
    loading: Loading,
});

class MasterRoute extends Component{
    constructor(props){
        super(props);
        this.state = {
            sideNav: false
        }
    }
    handleSideNav = () => {
        this.setState((prevState) => ({
            sideNav: !prevState.sideNav
        }))
    }
    render(){
        const {sideNav} = this.state
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
                    <div className='ui-container h-100' style={{gridTemplateColumns: sideNav ? "85px auto" : "250px auto"}}>
                        <Sidenav handleSideNav={this.handleSideNav} />
                        <div>
                            <Topnav/>
                            <div className='ui-body-container'>
                                <Switch>
                                    <Route exact path='/asset' component={AsyncAsset}/>
                                    <Route exact path='/documents' component={AsyncDocManagement}/>
                                    <Route exact path='/mis' component={AsyncMIS}/>
                                    <Route exact path='/location' component={AsyncLocationFinder}/>
                                    <Route exact path='/profile' component={AsyncProile}/>
                                    <Route exact path='/pass-reset' component={AsyncPasswordReset}/>
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