import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class LocationsOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        Axios.get(apiUrl() + 'locations')
            .then(resData => {

                this.setState({
                    data: resData.data
                })
            })
    }

    render() {
        const {data} = this.state
        const Options = data.length > 0 && data.map((item, index) => (
            <option key={index} value={item.id}>{item.location_name}</option>
        ))
        return(
            <>
                {Options}
            </>
        )
    }
}

export default LocationsOptions