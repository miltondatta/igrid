import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";
import jwt from 'jsonwebtoken';
import memoize from 'memoize-one';

class AssetListByUserOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assetList: [],
            id: ''
        }
    }

    componentDidMount() {
        const {id} = jwt.decode(localStorage.getItem('user')).data;
        if (id) this.setState({id});
    }

    getData = memoize((category_id, sub_category_id, product_id) => {
        const {id} = this.state;
        if (id && category_id && sub_category_id && product_id) {
            Axios.post(apiUrl() + 'get/assets/by/credentials', {user_id: id, category_id, sub_category_id, product_id})
                .then(resData => {
                    this.setState({
                        assetList: resData.data[0]
                    })
                })
        }
    });

    render() {
        const {category_id, sub_category_id, product_id} = this.props;
        this.getData(category_id, sub_category_id, product_id);

        const {assetList} = this.state;
        const options = assetList.length > 0 && assetList.map((item, index) => (
            <option key={index} value={item.product_serial}>{item.product_serial}</option>
        ));

        return (
            <>
                {options}
            </>
        );
    }
}

export default AssetListByUserOptions;