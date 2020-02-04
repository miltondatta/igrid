import Axios from "axios/index";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class HierarchiesOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        Axios.get(apiUrl() + 'locHierarchies')
            .then(resData => {

                this.setState({
                    data: resData.data
                })
            })
    }

    render() {
        const {data} = this.state
        const Options = data.length > 0 && data.map((item, index) => (
            <option key={index} value={item.id}>{item.hierarchy_name}</option>
        ))
        return(
            <>
                {Options}
            </>
        )
    }
}

export default HierarchiesOptions