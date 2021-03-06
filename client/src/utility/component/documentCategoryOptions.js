import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class DocumentCategoryOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documentCategory: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        Axios.get(apiUrl() + 'document/category/all')
            .then(resData => {
                this.setState({
                    documentCategory: resData.data
                })
            })
    };

    render() {
        if (this.props.stateForceUpdate) {
            this.getData();
            this.props.forceUp()
        }
        const {documentCategory} = this.state;
        const options = documentCategory.length > 0 && documentCategory.map((item, index) => (
            <option key={index} value={item.id}>{item.category_name}</option>
        ));

        return (
            <>
                {options}
            </>
        );
    }
}

export default DocumentCategoryOptions;