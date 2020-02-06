import jwt from "jsonwebtoken";
import {Link, withRouter} from 'react-router-dom'
import React, {Component} from 'react'
import {sidenav} from "../utility/constant";

class Topnav extends Component{

    constructor(props){
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
        if (e === this.state.currentHover){} else {
            this.setState({
                currentHover: e
            })
        }
    }

    renderCategory = () => {
        const {currentHover} = this.state
        const {pathname} = this.props.location
        const {userType} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        return(
            <>
                {sidenav.map((items, index) => {
                    return(
                        <>
                        {(userType !== 1 && items.id === 1) ? null : items.subCat ? <div key={index + 20} className={`px-4 text-white ui-navbtn h-100 text-center d-flex align-items-center ui-hover-option`} onMouseOut={() => {this.setState({currentHover: ''})}} onMouseOver={() => {this.handleMouseOver(items.id)}}>
                            <div>
                                <i className={`f-14px ${items.icon}`}></i>
                                <p className={'f-14px f-weight-500 mb-0'} key={index}>{items.name}</p>
                                {items.subCat && <div className={`ui-subcategory`} style={{display: currentHover !== items.id && 'none'}}>
                                    {items.categories.map((subItems, key) => (
                                        <>
                                            <p key={key + 10} className={`m-0 ${pathname === subItems.link ? 'ui-subcat-active' : 'ui-subcat-hover'}`}>
                                                <a key={subItems.id} href={subItems.link}> - {subItems.name}</a>
                                            </p>
                                        </>
                                    ))}
                                </div>}
                            </div>
                        </div> : <Link to={items.link} className={'h-100'}><div key={index + 20} className={`px-4 ui-navbtn h-100 text-center d-flex align-items-center ui-hover-option`} onMouseOut={() => {this.setState({currentHover: ''})}} onMouseOver={() => {this.handleMouseOver(items.id)}}>
                            <div>
                                <i className={`f-14px ${items.icon}`}></i>
                                <p className={'f-14px f-weight-500 mb-0'} key={index}>{items.name}</p>
                                {items.subCat && <div className={`ui-subcategory`} style={{display: currentHover !== items.id && 'none'}}>
                                    {items.categories.map((subItems, key) => (
                                        <>
                                            <p key={key + 10} className={`m-0 ${pathname === subItems.link ? 'ui-subcat-active' : 'ui-subcat-hover'}`}>
                                                <a key={subItems.id} href={subItems.link}> - {subItems.name}</a>
                                            </p>
                                        </>
                                    ))}
                                </div>}
                            </div>
                        </div></Link>}
                        </>
                    )
                })}
            </>
        )
    }

    render(){
        const {home} = this.props
        const {showUserOption} = this.state
        const {userName, image} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        if(home){
            return (
                <div className='ui-topnav w-100 px-4'>
                    <div className={`position-relative ui-topnav-container w-100  align-items-center h-100`}>
                        <input placeholder='Search' className='ui-search' />
                        <div className={'text-center w-100'}>
                                <img alt='Logo' src={process.env.PUBLIC_URL + '/media/image/logo.png'} />
                        </div>
                        <div className={'text-black ui-user-nav d-flex align-items-center'}>
                            <span onClick={this.handleUserOptions}>{userName}</span>
                            <img className={'ui-user-avatar ml-2'} onClick={this.handleUserOptions} src={'http://localhost:5000/images/' + image} alt={'user'} />
                             <i onClick={this.handleUserOptions} className="ml-2 fas fa-caret-down"></i>
                            {showUserOption && <div className={'ui-user-dropdown'}>
                                <p> <Link onClick={() => {
                                    this.setState((prevState) => ({
                                        showUserOption: false
                                    }))
                                }} to={'/profile'}>Profile</Link> </p>
                                <p> <Link onClick={() => {
                                    this.setState((prevState) => ({
                                        showUserOption: false
                                    }))
                                }} to={'/pass-reset'}>Update Password</Link> </p>
                                <p> <a onClick={() => {localStorage.removeItem('user')}} href={'/'}>Logout</a> </p>
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
                            <div>
                                <input placeholder='Search' className='ui-search' />
                            </div>
                            <div className={'text-center w-100'}>
                                <Link to={'/'}>
                                    <img alt='Logo' src={process.env.PUBLIC_URL + '/media/image/logo.png'} />
                                </Link>
                            </div>
                            <div className={'text-black ui-user-nav d-flex align-items-center'}>
                                <span onClick={this.handleUserOptions}>{userName}</span>
                                <img className={'ui-user-avatar ml-2'} onClick={this.handleUserOptions} src={'http://localhost:5000/images/' + image} alt={'user'} />
                                <i onClick={this.handleUserOptions} className="ml-2 fas fa-caret-down"></i>
                                {showUserOption && <div className={'ui-user-dropdown'}>
                                    <p> <Link onClick={() => {
                                    this.setState((prevState) => ({
                                        showUserOption: false
                                    }))
                                }}  to={'/profile'}>Profile</Link> </p>
                                    <p> <Link onClick={() => {
                                    this.setState((prevState) => ({
                                        showUserOption: false
                                    }))
                                }}  to={'/pass-reset'}>Update Password</Link> </p>
                                    <p> <a onClick={() => {localStorage.removeItem('user')}} href={'/'}>Logout</a> </p>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className='drop-shadow bg-project h-60px w-100 d-flex justify-content-center align-items-center'>
                        {this.renderCategory()}
                    </div>
                </>
            )}
    }
}

export default withRouter(Topnav)