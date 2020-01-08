import React, {Component} from 'react'
import jwt from "jsonwebtoken";
import {Link} from 'react-router-dom'

class Topnav extends Component{
    constructor(props){
        super(props)
        this.state = {
            showUserOption: false
        }
    }

    handleUserOptions = () => {
        this.setState((prevState) => ({
            showUserOption: !prevState.showUserOption
        }))
    }

    render(){
        const {home} = this.props
        const {showUserOption} = this.state
        const {userName, image} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        if(home){
            return (
                <div className='ui-topnav w-100'>
                    <div className={`position-relative ui-topnav-container d-flex justify-content-between w-80 m-auto align-items-center h-100`}>
                        <div>
                            <img alt='Logo' className='ml-4 mr-3' src={process.env.PUBLIC_URL + '/media/image/logo.png'} />
                            <input placeholder='Search' className='ui-search' />
                        </div>
                        <div className={'text-white mr-4 ui-user-nav d-flex align-items-center'}>
                            <img className={'ui-user-avatar'} onClick={this.handleUserOptions} src={'http://localhost:5000/' + image} alt={'user'} />
                            <span onClick={this.handleUserOptions}>{userName}</span> <i onClick={this.handleUserOptions} className="ml-2 fas fa-caret-down"></i>
                            {showUserOption && <div className={'ui-user-dropdown'}>
                                <p> <Link to={'/profile'}>Profile</Link> </p>
                                <p> <Link to={'/pass-reset'}>Update Password</Link> </p>
                                <p> <a onClick={() => {localStorage.removeItem('user')}} href={'/'}>Logout</a> </p>
                            </div>}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='ui-topnav overflow-hidden w-100'>
                    <div className={`position-relative ui-topnav-container d-flex w-100 align-items-center h-100`}>
                        <img alt='Logo' className='ml-4 mr-3' src={process.env.PUBLIC_URL + '/media/image/logo.png'} />
                        <input placeholder='Search' className='ui-search' />
                    </div>
                </div>
            )}
    }
}

export default Topnav