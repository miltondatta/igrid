import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";
import memoize from 'memoize-one';

class UserOptionsByLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: []
        }
    }

    getData = memoize(location_id => {
        const {userId} = this.props
        if (userId) {

        } else if(location_id === ''){
            return false
        }
        let endPoint = userId ? 'user-info/by-user/' + userId : 'user-info/by/location/' + location_id
        Axios.get(apiUrl() + endPoint)
            .then(resData => {
                this.setState({
                    userData: resData.data[0]
                })
            })
            .catch(err => {
                console.log(err.response);
            })
    });

    render() {
        this.getData(this.props.location_id);

        const {userData} = this.state;
        const options = userData.length > 0 && userData.map((item, index) => (
            <option key={index} value={item.id}>{item.name}{item.role_name ? (' (' + item.role_name + ')') : ''}</option>
        ));

        return (
            <>
                {options}
            </>
        );
    }
}

export default UserOptionsByLocation;