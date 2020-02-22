import jwt from "jsonwebtoken";
import {Link, withRouter} from 'react-router-dom'
import React, {Component} from 'react'
import {documentNav, sidenav, systemAdmin} from "../utility/constant";

class Topnav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentHover: '',
            showUserOption: false
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

    renderCategory = () => {
        const moduleName = window.location.pathname.split('/').filter(value => value !== '')[0];
        const {userType} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        let data = [];
        if (moduleName === 'documents') {
            data = documentNav;
        } else if (moduleName === 'admin') {
            data = systemAdmin
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
                            {(userType !== 1 && items.id === 1) ? null : items.subCat ? <div key={index + 20}
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
                                                {items.id === 4 && userType !== 2 && subItems.id === 4 ? null : <a key={subItems.id} href={subItems.link}>
                                                    <p key={key + 10}
                                                       className={`m-0 ${pathname === subItems.link ? 'ui-subcat-active' : 'ui-subcat-hover'}`}>
                                                        {subItems.name}
                                                    </p>
                                                </a> }
                                            </>
                                        ))}
                                    </div>}
                                </div>
                            </div> : <Link to={items.link} className={'h-100'}>
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
        const {showUserOption} = this.state
        const moduleName = window.location.pathname.replace('/', '').split('/');
        let breadCrumb = moduleName.map((item, index) => (
            <>
                {item !== 'home' && <li className="breadcrumb-item active f-capitalize" aria-current="page">
                    {moduleName.length === index + 1 ? <>{item.replace('-', ' ')}</> : <Link to={'/' + item}>{item.replace('-', ' ')}</Link>}
                </li>}
            </>
        ))
        const {userName, image, userType} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        if (home) {
            return (
                <div className='ui-topnav w-100 px-4'>
                    <div className={`position-relative ui-topnav-container w-100  align-items-center h-100`}>
                        <div className={'w-100 h-100 align-items-center d-flex'}>
                            <img alt='Logo' src={process.env.PUBLIC_URL + '/media/image/logo_white.png'}/>
                            <span className={'text-white ui-nav-init-link ml-5 mr-2'}>Site Map</span>
                            <span className={'text-white ui-nav-init-link mx-2'}>Contact Us</span>
                            <span className={'text-white ui-nav-init-link mx-2'}>About Us</span>
                            <span className={'text-white ui-nav-init-link mx-2'}>Help Center</span>
                        </div>
                        <div className={'text-white ui-user-nav d-flex align-items-center'}>
                            <i className="fas fa-bell"></i>
                            {userType === 0 ? <Link to={'/admin/user-login-log'}><span className={'text-white ui-nav-init-link mr-2'}>System Admin</span></Link> :
                                <span onClick={this.handleUserOptions}>{userName}</span>}
                            <img className={'ui-user-avatar ml-3'} onClick={this.handleUserOptions}
                                 src={'http://localhost:5000/images/' + image} alt={'user'}/>
                            {showUserOption && <div className={'ui-user-dropdown'}>
                                <p><Link onClick={() => {
                                    this.setState((prevState) => ({
                                        showUserOption: false
                                    }))
                                }} to={'/profile'}>Profile</Link></p>
                                <p><Link onClick={() => {
                                    this.setState((prevState) => ({
                                        showUserOption: false
                                    }))
                                }} to={'/pass-reset'}>Update Password</Link></p>
                                <p><a onClick={() => {
                                    localStorage.removeItem('user')
                                }} href={'/'}>Logout</a></p>
                            </div>}
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
                                <Link to={'/'}>
                                    <img alt='Logo' src={process.env.PUBLIC_URL + '/media/image/logo_white.png'}/>
                                </Link>
                                <div className={'ui-search-bar'}>
                                    <ol className="breadcrumb h-100">
                                        <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                                        {breadCrumb}
                                    </ol>
                                </div>
                            </div>
                            <div className={'text-white ui-user-nav d-flex align-items-center'}>
                                <i className="fas fa-bell"></i>
                                {userType === 0 ? <Link to={'/admin/user-login-log'}><span className={'text-white ui-nav-init-link mr-2'}>System Admin</span></Link> : <span onClick={this.handleUserOptions}>{userName}</span>}
                                <img className={'ui-user-avatar ml-3'} onClick={this.handleUserOptions}
                                     src={'http://localhost:5000/images/' + image} alt={'user'}/>
                                {showUserOption && <div className={'ui-user-dropdown'}>
                                    <p><Link onClick={() => {
                                        this.setState((prevState) => ({
                                            showUserOption: false
                                        }))
                                    }} to={'/profile'}>Profile</Link></p>
                                    <p><Link onClick={() => {
                                        this.setState((prevState) => ({
                                            showUserOption: false
                                        }))
                                    }} to={'/pass-reset'}>Update Password</Link></p>
                                    <p><a onClick={() => {
                                        localStorage.removeItem('user')
                                    }} href={'/'}>Logout</a></p>
                                </div>}
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