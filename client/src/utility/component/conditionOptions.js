import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class ConditionOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            assetCategory: []
        }
    }
    
    componentDidMount() {
        Axios.get(apiUrl() + 'conditions')
            .then(resData => {

                this.setState({
                    assetCategory: resData.data
                })
            })
    }

    render() {
        const {assetCategory} = this.state
        const options = assetCategory.length > 0 && assetCategory.map((item, index) => (
            <option key={index} value={item.id}>{item.condition_type}</option>
        ))
        return(
            <>
                {options}
            </>
        )
    }
}

export default ConditionOptions;