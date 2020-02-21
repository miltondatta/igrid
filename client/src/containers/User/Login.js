import jwt from "jsonwebtoken";
import React, {Component} from 'react'
import LoginComponent from '../../components/LoginComponent/LoginComponent'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        if(localStorage.getItem('user')){
            const {exp} = jwt.decode(localStorage.getItem('user'))
            if (exp < (Date.now().valueOf() / 1000)) {
                return(
                    <div className='ui-user'>
                        <LoginComponent />
                    </div>
                )
            }
        } else {
            return(
                <div className='ui-user'>
                    <LoginComponent />
                </div>
            )
        }
    }
}

export default Login