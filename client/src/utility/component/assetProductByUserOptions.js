import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";
import jwt from 'jsonwebtoken';
import memoize from 'memoize-one';

class AssetProductByUserOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assetProduct: [],
            id: ''
        }
    }

    componentDidMount() {
        const {id} = jwt.decode(localStorage.getItem('user')).data;
        if (id) this.setState({id});
    }

    getData = memoize((category_id, sub_category_id) => {
        const {id} = this.state;
        if (id && category_id && sub_category_id) {
            Axios.get(apiUrl() + 'assets-product/all/' + id + '/' + category_id + '/' + sub_category_id)
                .then(resData => {
                    this.setState({
                        assetProduct: resData.data[0]
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        }
    });

    render() {
        this.getData(this.props.category_id, this.props.sub_category_id);

        const {assetProduct} = this.state;
        const options = assetProduct.length > 0 && assetProduct.map((item, index) => (
            <option key={index} value={item.id}>{item.product_name}</option>
        ));

        return (
            <>
                {options}
            </>
        );
    }
}

export default AssetProductByUserOptions;