import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class ProductsOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        Axios.get(apiUrl() + 'products')
            .then(resData => {
                this.setState({
                    data: resData.data
                })
            })
    }

    render() {
        if (this.props.stateForceUpdate) {
            this.getData()
            this.props.forceUp()
        }
        const {data} = this.state
        const {subId, catId} = this.props
        const filteredCategory = data.length > 0 && data.filter(item => (item.sub_category_id === parseInt(subId, 10) && item.category_id === parseInt(catId, 10)))

        console.log(filteredCategory, subId, 30)
        const dataOptions = filteredCategory.length > 0 && filteredCategory.map((item, index) => (
            <option key={index} value={item.id}>{item.product_name}</option>
        ))
        return(
            <>
                {dataOptions}
            </>
        )
    }
}

export default ProductsOptions;