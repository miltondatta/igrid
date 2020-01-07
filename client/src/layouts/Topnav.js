import React from 'react'
import jwt from "jsonwebtoken";

const Topnav = (props) => {
    const {home} = props
    const {userName, image} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
    if(home){
        return (
            <div className='ui-topnav w-100'>
                <div className={`position-relative ui-topnav-container d-flex justify-content-between w-80 m-auto align-items-center h-100`}>
                    <div>
                        <img alt='Logo' className='ml-4 mr-3' src={process.env.PUBLIC_URL + './media/image/logo.png'} />
                        <input placeholder='Search' className='ui-search' />
                    </div>
                    <div className={'text-white mr-4 ui-user-nav d-flex align-items-center'}><img className={'ui-user-avatar'} src={'http://localhost:5000/' + image} alt={'user'} /> {userName} <i className="ml-2 fas fa-caret-down"></i></div>
                </div>
            </div>
        )
    } else {
    return (
        <div className='ui-topnav w-100'>
            <div className={`position-relative ui-topnav-container d-flex w-100 align-items-center h-100`}>
                <img alt='Logo' className='ml-4 mr-3' src={process.env.PUBLIC_URL + './media/image/logo.png'} />
                <input placeholder='Search' className='ui-search' />
            </div>
        </div>
    )}
}

export default Topnav