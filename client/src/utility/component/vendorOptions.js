import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class VendorOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            brandData: []
        }
    }

    componentDidMount() {
        Axios.get(apiUrl() + 'vendors')
            .then(resData => {

                this.setState({
                    brandData: resData.data
                })
            })
    }

    render() {
        const {brandData} = this.state
        const Options = brandData.length > 0 && brandData.map((item, index) => (
            <option key={index} value={item.id}>{item.vendor_name}</option>
        ))
        return(
            <>
                {Options}
            </>
        )
    }
}

export default VendorOptions;