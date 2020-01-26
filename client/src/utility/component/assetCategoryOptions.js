import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class AssetCategoryOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            assetCategory: []
        }
    }
    componentDidMount() {
        Axios.get(apiUrl() + 'asset-category')
            .then(resData => {
                console.log(resData)
                this.setState({
                    assetCategory: resData.data
                })
            })
    }

    render() {
        const {assetCategory} = this.state
        const assetCategoryOptions = assetCategory.length > 0 && assetCategory.map((item, index) => (
            <option key={index} value={item.id}>{item.category_name}</option>
        ))
        return(
            <>
                {assetCategoryOptions}
            </>
        )
    }
}

export default AssetCategoryOptions;