import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class documentSubCategoryOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documentSubCategory: []
        }
    }

    componentDidMount() {
        Axios.get(apiUrl() + '/api/document/sub/category/by/category?category_id=' + this.props.category_id)
            .then(resData => {
                this.setState({
                    documentSubCategory: resData.data
                })
            })
    }

    render() {
        const {documentSubCategory} = this.state;
        const options = documentSubCategory.length > 0 && documentSubCategory.map((item, index) => (
            <option key={index} value={item.id}>{item.sub_category_name}</option>
        ));

        return (
            <>
                {options}
            </>
        );
    }
}

export default documentSubCategoryOptions;