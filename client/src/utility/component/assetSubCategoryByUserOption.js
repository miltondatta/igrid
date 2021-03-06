import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";
import jwt from 'jsonwebtoken';
import memoize from 'memoize-one';

class AssetSubCategoryByUserOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assetSubCategory: [],
            id: ''
        }
    }

    componentDidMount() {
        const {id} = jwt.decode(localStorage.getItem('user')).data;
        if (id) this.setState({id});
    }

    getData = memoize(category_id => {
        const {id} = this.state;
        if (id && category_id) {
            Axios.get(apiUrl() + 'assets-sub-category/all/' + id + '/' + category_id)
                .then(resData => {
                    this.setState({
                        assetSubCategory: resData.data[0]
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

export default AssetSubCategoryByUserOption;