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
        this.getData()
    }

    getData = () => {
        Axios.get(apiUrl() + '/asset-sub-category/options')
            .then(resData => {

                this.setState({
                    assetSubCategory: resData.data
                })
            })
    }

    render() {
        if (this.props.stateForceUpdate) {
            this.getData()
            this.props.forceUp()
        }
        const {assetId} = this.props
        const {assetSubCategory} = this.state
        const filteredCategory = assetSubCategory.length > 0 && assetSubCategory.filter(item => item.category_id === parseInt(assetId, 10))
        console.log(filteredCategory, assetSubCategory, assetId, 35)
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