import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class ApproveLevelOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        Axios.get(apiUrl() + 'approval_level/options')
            .then(resData => {
                console.log(resData.data, 17)
                this.setState({
                    data: resData.data
                })
            })
    }

    render() {
        const {data} = this.state
        console.log(data, 32)
        const Options = data.length > 0 && data.map((item, index) => (
            <option key={index} value={item.id}>{item.approval_name}</option>
        ))
        return(
            <>
                {Options}
            </>
        )
    }
}

export default ApproveLevelOptions