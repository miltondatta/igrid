import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class BrandIdOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            brandData: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        Axios.get(apiUrl() + 'brands')
            .then(resData => {

                this.setState({
                    brandData: resData.data
                })
            })
    }

    render() {
        if (this.props.stateForceUpdate) {
            this.getData()
            this.props.forceUp()
        }
        const {brandData} = this.state
        const assetCategoryOptions = brandData.length > 0 && brandData.map((item, index) => (
            <option key={index} value={item.id}>{item.brand}</option>
        ))
        return(
            <>
                {assetCategoryOptions}
            </>
        )
    }
}

export default BrandIdOptions;