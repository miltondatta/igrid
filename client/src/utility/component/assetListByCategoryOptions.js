import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";
import memoize from 'memoize-one';

class AssetListByCategoryOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assetSubCategory: []
        }
    }

    getData = memoize(category_id => {
        if (category_id) {
            Axios.get(apiUrl() + 'assets-sub-category/all/' + category_id)
                .then(resData => {
                    this.setState({
                        assetSubCategory: resData.data
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        }
    });

    render() {
        this.getData(this.props.category_id);

        const {assetSubCategory} = this.state;
        const options = assetSubCategory.length > 0 && assetSubCategory.map((item, index) => (
            <option key={index} value={item.id}>{item.sub_category_name}</option>
        ));

        return (
            <>
                {options}
            </>
        );
    }
}

export default AssetListByCategoryOptions;