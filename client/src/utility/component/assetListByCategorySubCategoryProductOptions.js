import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";
import memoize from 'memoize-one';

class AssetListByCategorySubCategoryProductOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assetList: []
        }
    }

    getData = memoize((category_id, sub_category_id, product_id) => {
        if (category_id && sub_category_id && product_id) {
            Axios.post(apiUrl() + 'get/assets/by/category/sub-category/product', {category_id, sub_category_id, product_id})
                .then(resData => {
                    this.setState({
                        assetList: resData.data[0]
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        }
    });

    render() {
        const {category_id, sub_category_id, product_id} = this.props;
        this.getData(category_id, sub_category_id, product_id);

        const {assetList} = this.state;
        const options = assetList.length > 0 && assetList.map((item, index) => (
            <option key={index} value={item.id}>{item.product_serial}</option>
        ));

        return (
            <>
                {options}
            </>
        );
    }
}

export default AssetListByCategorySubCategoryProductOptions;