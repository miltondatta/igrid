import Axios from 'axios'
import jwt from "jsonwebtoken";
import io from 'socket.io-client'
import React, {Component} from 'react'
import {Link, Redirect, withRouter} from 'react-router-dom'
import {
    documentNav,
    sidenav,
    systemAdmin,
    report,
    apiUrl,
    locationCategory,
    misCategory,
    profileCategory
} from "../utility/constant";
import {BackEnd_BaseUrl} from "../config/private";

const socket = io('http://localhost:5000/');

class Topnav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentHover: '',
            notification: '',
            showUserOption: false,
            assetRequest: false,
            toggleNotification: false,
            menuData: []
        }
    }

    handleUserOptions = () => {
        this.setState((prevState) => ({
            showUserOption: !prevState.showUserOption
        }))
    }

    handleMouseOver = (e) => {
        if (e === this.state.currentHover) {
        } else {
            this.setState({
                currentHover: e
            })
        }
    }

    componentDidMount() {
        const {id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : '';
        socket.on('incomingTransferRequest', (data) => {
            data.forEach((item, index) => {
                    console.log(parseInt(item.request_to, 10) === id && item.status, 52)
                if (parseInt(item.request_to, 10) === id && item.status) {
                    this.setState({
                        assetRequest: true,
                        assetRequestInd: index
                    }, () => {
                        console.log(this.state.assetRequest, 57)
                    })
                }
            })
        })
        this.getNotification();
        this.getMenu();
    }

    getNotification = () => {
        const {id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        id !== null && Axios.get(apiUrl() + 'requisition-approve/count-req/' + id)
            .then(res => {
                if(res.data.message){
                    return
                } else {
                    this.setState({
                        notification: res.data
                    })
                }

            })
    }

    getMenu = () => {
        const { id, role_id } = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        id !== null && Axios.get(apiUrl() + 'menu/get/' + role_id)
            .then(res => {
                console.log(res, 86)
                this.setState({
                    menuData: res.data
                })
            })
    }

    renderCategory = () => {
        const {menuData} = this.state
        console.log(menuData, 95)
        const moduleName = window.location.pathname.split('/').filter(value => value !== '')[0];
        const {userType} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        let data = [];
        if (moduleName === 'documents') {
            data = documentNav;
        } else if (moduleName === 'admin') {
            data = systemAdmin
        } else if (moduleName === 'profile') {
            data = profileCategory
        } else if (moduleName === 'report') {
            data = report
        } else if (moduleName === 'location') {
            data = locationCategory
        } else if (moduleName === 'mis') {
            data = misCategory
        } else {
            data = sidenav;
        }

        const {currentHover} = this.state
        const {pathname} = this.props.location
        return (
            <>
                {data.map((items, index) => {
                    return (
                        <>
                            {items.subCat ? <div key={index + 20}
                                                 className={`px-4 text-white ui-navbtn h-100 text-center d-flex align-items-center ui-hover-option`}
                                                 onMouseOut={() => {
                                                     this.setState({currentHover: ''})
                                                 }} onMouseOver={() => {
                                this.handleMouseOver(items.id)
                            }}>
                                <div>
                                    <i className={`f-14px ${items.icon}`}></i>
                                    <span className={'ml-1 f-15px f-weight-500 mb-0 text-white'}
                                          key={index}>{items.name}</span>
                                    {items.subCat && <div className={`ui-subcategory`}
                                                          style={{display: currentHover !== items.id && 'none'}}>
                                        {items.categories.map((subItems, key) => (
                                            <>
                                                {(items.id === 4) && (userType === 2 || userType === 6) ? ((subItems.id === 4 || subItems.id === 5) ? <a key={subItems.id} href={subItems.link}>
                                                    <p key={key + 10}
                                                       className={`m-0 ${pathname === subItems.link ? 'ui-subcat-active' : 'ui-subcat-hover'}`}>
                                                        {subItems.name}
                                                    </p>
                                                </a> : null) : (items.id === 4 && userType === 1) ? (subItems.id !== 4 || subItems.id !== 5) && <a key={subItems.id} href={subItems.link}>
                                                    <p key={key + 10}
                                                       className={`m-0 ${pathname === subItems.link ? 'ui-subcat-active' : 'ui-subcat-hover'}`}>
                                                        {subItems.name}
                                                    </p>
                                                </a> : <a key={subItems.id} href={subItems.link}>
                                                    <p key={key + 10}
                                                       className={`m-0 ${pathname === subItems.link ? 'ui-subcat-active' : 'ui-subcat-hover'}`}>
                                                        {subItems.name}
                                                    </p>
                                                </a> }
                                            </>
                                        ))}
                                    </div>}
                                </div>
                            </div> : items.id === 33 ? userType === 0 && <Link to={items.link} className={'h-100'}>
                                <div key={index + 20}
                                     className={`px-4 ui-navbtn h-100 text-center d-flex align-items-center ui-hover-option`}
                                     onMouseOut={() => {
                                         this.setState({currentHover: ''})
                                     }} onMouseOver={() => {
                                    this.handleMouseOver(items.id)
                                }}>
                                    <div>
                                        <i className={`f-14px ${items.icon}`}></i>
                                        <span className={'ml-1 f-15px f-weight-500 mb-0 text-white'}
                                              key={index}>{items.name}</span>
                                        {items.subCat && <div className={`ui-subcategory`}
                                                              style={{display: currentHover !== items.id && 'none'}}>
                                            {items.categories.map((subItems, key) => (
                                                <>
                                                    <p key={key + 10}
                                                       className={`m-0 ${pathname === subItems.link ? 'ui-subcat-active' : 'ui-subcat-hover'}`}>
                                                        <a key={subItems.id} href={subItems.link}> {subItems.name}</a>
                                                    </p>
                                                </>
                                            ))}
                                        </div>}
                                    </div>
                                </div>
                            </Link> : <Link to={items.link} className={'h-100'} onClick={() => {
                                items.id === 34 && localStorage.removeItem('user')
                            }}>
                                <div key={index + 20}
                                     className={`px-4 ui-navbtn h-100 text-center d-flex align-items-center ui-hover-option`}
                                     onMouseOut={() => {
                                         this.setState({currentHover: ''})
                                     }} onMouseOver={() => {
                                    this.handleMouseOver(items.id)
                                }}>
                                    <div>
                                        <i className={`f-14px ${items.icon}`}></i>
                                        <span className={'ml-1 f-15px f-weight-500 mb-0 text-white'}
                                              key={index}>{items.name}</span>
                                        {items.subCat && <div className={`ui-subcategory`}
                                                              style={{display: currentHover !== items.id && 'none'}}>
                                            {items.categories.map((subItems, key) => (
                                                <>
                                                    <p key={key + 10}
                                                       className={`m-0 ${pathname === subItems.link ? 'ui-subcat-active' : 'ui-subcat-hover'}`}>
                                                        <a key={subItems.id} href={subItems.link}> {subItems.name}</a>
                                                    </p>
                                                </>
                                            ))}
                                        </div>}
                                    </div>
                                </div>
                            </Link>}
                        </>
                    )
                })}
            </>
        )
    }

    render() {
        const {home} = this.props
        const {showUserOption, toggleNotification, notification, menuData, assetRequest, assetRequestInd} = this.state
        const moduleName = window.location.pathname.replace('/', '').split('/');
        let breadCrumb = moduleName.map((item, index) => (
            <>
                {item !== 'home' && <li className="breadcrumb-item active f-capitalize" aria-current="page">
                    {moduleName.length === index + 1 ? <>{item.replace('-', ' ')}</> : <Link to={'/' + item}>{item.replace('-', ' ')}</Link>}
                </li>}
            </>
        ))


        const {userName, image, userType, id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''

        if (moduleName[0] === 'admin' && id !== 1) {
            return(
                <Redirect
                    to={'/'}
                />
            )
        }

        if (home || moduleName[0] === 'contact' || moduleName[0] === 'about')
        {
            return (
                <div className='ui-topnav w-100 px-4'>
                    <div className={`position-relative ui-topnav-container w-100  align-items-center h-100`}>
                        <div className={'w-100 h-100 align-items-center d-flex'}>
                            <a href={'/'}>
                                <img alt='Logo' src={process.env.PUBLIC_URL + '/media/image/logo_white.png'}/>
                            </a>
                            {/*<span className={`text-white ui-nav-init-link ml-5 mr-2 `}>Site Map</span>*/}
                            <Link to={'/contact'}><span className={`text-white ui-nav-init-link ml-5 mx-2 ${moduleName[0] === 'contact' && 'link-active'}`}>Contact Us</span></Link>
                            <Link to={'/about'}><span className={`text-white ui-nav-init-link mx-2 ${moduleName[0] === 'about' && 'link-active'}`}>About Us</span></Link>
                            {/*<span className={'text-white ui-nav-init-link mx-2'}>Help Center</span>*/}
                        </div>
                        <div className={'text-white ui-user-nav h-100'}>
                            {toggleNotification && <div className="ui-notification">
                                <p className={'ui-notification-header'}>Notification</p>
                                <div>
                                    {(notification || assetRequest) ? <>
                                        {notification && <p className={'align-items-center no-project px-2 f-14px text-left'}>
                                            You Have {notification} Notification
                                            <br />
                                            Go To <a href={'/requisition-status'}>Requisition Status</a>
                                        </p>}
                                        {assetRequest && <p className={'align-items-center no-project px-2 f-14px text-left'}>
                                            You Have Pending Asset Transfer Request
                                            <br />
                                            Go To <a onClick={() => {socket.emit('requestChecked' , {index: assetRequestInd})}} href={'/incoming-transfer-req'}>Incoming Asset Transfer</a>
                                        </p>}
                                    </>
                                        : <p className={'d-flex align-items-center no-project px-2 f-14px text-left'}>
                                        <i className="f-20px mr-1 text-grey icofont-exclamation-circle"></i> Notification is currently empty
                                    </p>}
                                </div>
                            </div>}
                            <i className="fas fa-bell cursor-pointer" onClick={() => {this.setState({toggleNotification: !toggleNotification})}}>
                                {(notification !== '' || assetRequest) && <p className={'ui-notification-count'}>{notification + 1}</p>}
                            </i>
                            <div className="ui-dropdown-holder">
                                <span onClick={this.handleUserOptions}>{userName}</span>
                                <img className={'ui-user-avatar ml-3'} onClick={this.handleUserOptions}
                                     src={ BackEnd_BaseUrl + 'images/' + image} alt={'user'}/>
                                <div className={'ui-user-dropdown'} style={{bottom: userType === 0 ? -221.5 : -171}}>
                                <Link onClick={() => {
                                    this.setState((prevState) => ({
                                        showUserOption: false
                                    }))
                                }} to={'/profile'}><p>Profile</p></Link>
                                <Link onClick={() => {
                                    this.setState((prevState) => ({
                                        showUserOption: false
                                    }))
                                }} to={'/profile/pass-reset'}><p>Update Password</p></Link>
                                    {userType === 0 && <p><Link onClick={() => {
                                        this.setState((prevState) => ({
                                            showUserOption: false
                                        }))
                                    }} to={'/admin/user-login-log'}>Setting</Link></p>}
                                <a onClick={() => {
                                    localStorage.removeItem('user')
                                }} href={'/'}><p>Logout</p></a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    <div className='ui-topnav w-100 px-4'>
                        <div className={`position-relative ui-topnav-container w-100  align-items-center h-100`}>
                            <div className={'w-100 h-100 align-items-center d-flex'}>
                                <a href={'/'}>
                                    <img alt='Logo' src={process.env.PUBLIC_URL + '/media/image/logo_white.png'}/>
                                </a>
                                <div className={'ui-search-bar'}>
                                    <ol className="breadcrumb h-100">
                                        <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                                        {breadCrumb}
                                    </ol>
                                </div>
                            </div>
                            <div className={'text-white ui-user-nav h-100'}>
                                {toggleNotification && <div className="ui-notification">
                                    <p className={'ui-notification-header'}>Notification</p>
                                    <div>
                                        {(notification || assetRequest) ? <>
                                            {notification && <p className={'align-items-center no-project px-2 f-14px text-left'}>
                                                You Have {notification} Notification
                                                <br />
                                                Go To <a href={'/requisition-status'}>Requisition Status</a>
                                            </p>}
                                            {assetRequest && <p className={'align-items-center no-project px-2 f-14px text-left'}>
                                                You Have Pending Asset Transfer Request
                                                <br />
                                                Go To <a onClick={() => {socket.emit('requestChecked' , {index: assetRequestInd})}} href={'/incoming-transfer-req'}>Incoming Asset Transfer</a>
                                            </p>}
                                        </> : <p className={'d-flex align-items-center no-project px-2 f-14px text-left'}>
                                            <i className="f-20px mr-1 text-grey icofont-exclamation-circle"></i> Notification is currently empty
                                        </p>}
                                    </div>
                                </div>}
                                <i className="fas fa-bell cursor-pointer" onClick={() => {this.setState({toggleNotification: !toggleNotification})}}>
                                    {(notification !== '' || assetRequest) && <p className={'ui-notification-count'}>{notification + 1}</p>}
                                </i>

                                <div className="ui-dropdown-holder">
                                    <span onClick={this.handleUserOptions}>{userName}</span>
                                    <img className={'ui-user-avatar ml-3'} onClick={this.handleUserOptions}
                                         src={BackEnd_BaseUrl + 'images/' + image} alt={'user'}/>
                                    <div className={'ui-user-dropdown'} style={{bottom: userType === 0 ? -221.5 : -171}}>
                                    <p><Link onClick={() => {
                                        this.setState((prevState) => ({
                                            showUserOption: false
                                        }))
                                    }} to={'/profile'}>Profile</Link></p>
                                    <p><Link onClick={() => {
                                        this.setState((prevState) => ({
                                            showUserOption: false
                                        }))
                                    }} to={'/profile/pass-reset'}>Update Password</Link></p>
                                        {userType === 0 && <p><Link onClick={() => {
                                            this.setState((prevState) => ({
                                                showUserOption: false
                                            }))
                                }} to={'/admin/user-login-log'}>Settings</Link></p>}
                                    <p><a onClick={() => {
                                        localStorage.removeItem('user')
                                    }} href={'/'}>Logout</a></p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-project-primary h-50px w-100 d-flex justify-content-center align-items-center'>
                        {this.renderCategory()}
                    </div>
                </>
            )
        }
    }
}

export default withRouter(Topnav)
