import React, {Component} from 'react';
import {apiUrl} from "../constant";
import Axios from "axios";
import jwt from 'jsonwebtoken';


class ComCategoryByRoleOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: []
        }
    }

    componentDidMount() {
        const user = jwt.decode(localStorage.getItem('user')).data;
        this.getData(user.role_id);
    }

    getData = role_id => {
        Axios.get(apiUrl() + 'complaint/mapping/by/' + role_id)
            .then(resData => {
                this.setState({
                    allData: resData.data
                })
            })
            .catch(err => {
                console.log(err.response);
            })
    };

    render() {
        const {allData} = this.state;
        const complaintOptions = allData.length > 0 && allData.map((item, index) => (
            <option key={index} value={item.comCategory.id}>{item.comCategory.complaint_name}</option>
        ));

        return (
            <>
                {complaintOptions}
            </>
        )
    }
}

export default ComCategoryByRoleOptions;