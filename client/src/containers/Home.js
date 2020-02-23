import React from 'react'
import {Redirect} from 'react-router-dom'
import HomeComponent from "../components/HomeComponent/HomeComponent";

const Home = () => {
    const userInfo = localStorage.getItem('user')
    if (!userInfo) {
        return(
            <Redirect 
                to='/login'
            />
        )
    } else{
        return(
            <div className={'p-4 bg-white h-100'}>
                 <HomeComponent />
            </div>
        )
    }
}

export default Home