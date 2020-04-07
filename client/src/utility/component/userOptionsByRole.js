import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";
import memoize from 'memoize-one';

class UserOptionsByRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: []
        }
    }

    getData = memoize((role_id) => {
        if (role_id) {
            Axios.get(apiUrl() + 'user/options/by/' + role_id)
                .then(resData => {
                    this.setState({
                        userData: resData.data
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        }
    });

    render() {
        this.getData(this.props.role_id);
        const {userData} = this.state;
        const options = userData.length > 0 && userData.map((item, index) => (
            <option key={index} value={item.id}>{item.user_name}</option>
        ));

        return (
            <>
                {options}
            </>
        );
    }
}

export default UserOptionsByRole;