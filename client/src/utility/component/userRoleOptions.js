import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class UserRoleOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            brandData: []
        }
    }

    componentDidMount() {
        Axios.get(apiUrl() + 'user-roles')
            .then(resData => {

                this.setState({
                    brandData: resData.data
                })
            })
    }

    render() {
        const {brandData} = this.state
        const Options = brandData.length > 0 && brandData.map((item, index) => (
            <option key={index} value={item.id}>{item.role_name}</option>
        ))
        return(
            <>
                {Options}
            </>
        )
    }
}

export default UserRoleOptions;