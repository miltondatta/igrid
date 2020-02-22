import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class LocationsOptions extends Component {
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
        Axios.get(apiUrl() + 'locations')
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
        const Options = brandData.length > 0 && brandData.map((item, index) => (
            <option key={index} value={item.id}>{item.location_name}</option>
        ))
        return(
            <>
                {Options}
            </>
        )
    }
}

export default LocationsOptions;