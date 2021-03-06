import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class ComCategoryOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            assetCategory: []
        }
    }
    componentDidMount() {
        this.getData()
    }

    getData = () => {
        Axios.get(apiUrl() + 'com-category-options')
            .then(resData => {
                this.setState({
                    assetCategory: resData.data
                })
            })
    }

    render() {
        const {assetCategory} = this.state
        if (this.props.stateForceUpdate) {
            this.getData()
            this.props.forceUp()
        }
        const assetCategoryOptions = assetCategory.length > 0 && assetCategory.map((item, index) => (
            <option key={index} value={item.id}>{item.complaint_name}</option>
        ))
        return(
            <>
                {assetCategoryOptions}
            </>
        )
    }
}

export default ComCategoryOptions;