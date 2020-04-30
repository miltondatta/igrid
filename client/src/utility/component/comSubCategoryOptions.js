import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class ComSubCategoryOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            assetCategory: []
        }
    }
    componentDidMount() {
        this.getData()
    }

    getData = () => {
        Axios.get(apiUrl() + 'com-sub-category-options')
            .then(resData => {
                this.setState({
                    assetCategory: resData.data
                })
            })
    }

    render() {
        const {assetCategory} = this.state
        if (this.props.stateForceUpdate) {
            this.getData()
            this.props.forceUp()
        }

        const {com_category_id} = this.props
        const filteredCategory = assetCategory.length > 0 && assetCategory.filter(item => item.complain_id === parseInt(com_category_id, 10))
        const assetCategoryOptions = filteredCategory.length > 0 && filteredCategory.map((item, index) => (
            <option key={index} value={item.id}>{item.sub_complaint_name}</option>
        ))
        return(
            <>
                {assetCategoryOptions}
            </>
        )
    }
}

export default ComSubCategoryOptions;
