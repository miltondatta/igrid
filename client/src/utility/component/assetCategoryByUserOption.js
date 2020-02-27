import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";
import jwt from 'jsonwebtoken';

class AssetCategoryByUserOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assetCategory: []
        }
    }

    componentDidMount() {
        const {id} = jwt.decode(localStorage.getItem('user')).data;
        this.getData(id)
    }

    getData = (id) => {
        if (!id) return false;
        Axios.get(apiUrl() + 'assets-category/all/' + id )
            .then(resData => {
                this.setState({
                    assetCategory: resData.data[0]
                })
            })
    };

    render() {
        const {assetCategory} = this.state;
        const options = assetCategory.length > 0 && assetCategory.map((item, index) => (
            <option key={index} value={item.id}>{item.category_name}</option>
        ));

        return (
            <>
                {options}
            </>
        );
    }
}

export default AssetCategoryByUserOption;