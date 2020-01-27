import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class AssetSubCategoryOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            assetSubCategory: []
        }
    }
    componentDidMount() {
        Axios.get(apiUrl() + 'asset-sub-category')
            .then(resData => {
                console.log(resData)
                this.setState({
                    assetSubCategory: resData.data
                })
            })
    }

    render() {
        const {assetId} = this.props
        const {assetSubCategory} = this.state
        const filteredCategory = assetSubCategory.length > 0 && assetSubCategory.filter(item => item.category_id === parseInt(assetId, 10))
        const assetCategoryOptions = filteredCategory.length > 0 && filteredCategory.map((item, index) => (
            <option key={index} value={item.id}>{item.sub_category_name}</option>
        ))
        return(
            <>
                {assetCategoryOptions}
            </>
        )
    }
}

export default AssetSubCategoryOptions;