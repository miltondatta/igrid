import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";
import memoize from 'memoize-one';

class ComSubCategoryOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: []
        }
    }

    getData = memoize(category_id => {
        if (!category_id) return;
        Axios.get(apiUrl() + 'complaint/sub/category/by/' + category_id)
            .then(resData => {
                this.setState({
                    allData: resData.data
                })
            })
            .catch(err => {
                console.log(err.response);
            })
    });

    render() {
        const {category_id} = this.props;
        this.getData(category_id);

        const {allData} = this.state;
        const options = allData.length > 0 && allData.map((item, index) => (
            <option key={index} value={item.id}>{item.sub_complaint_name}</option>
        ));

        return (
            <>
                {options}
            </>
        );
    }
}

export default ComSubCategoryOptions;