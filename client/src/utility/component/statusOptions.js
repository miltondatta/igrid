import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class StatusOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            brandData: []
        }
    }

    componentDidMount() {
        Axios.get(apiUrl() + 'status')
            .then(resData => {
                this.setState({
                    brandData: resData.data
                })
            })
    }

    render() {
        const {brandData} = this.state
        const Options = brandData.length > 0 && brandData.map((item, index) => (
            <option key={index} value={item.id}>{item.status_name}</option>
        ))
        return(
            <>
                {Options}
            </>
        )
    }
}

export default StatusOptions;