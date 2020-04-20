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
        this.getData()
    }

    getData = () => {
        const {selectedId} = this.props
        if (typeof selectedId !== 'undefined') {
            Axios.get(apiUrl() + 'locations/' + selectedId)
                .then(resData => {
                    this.setState({
                        data: resData.data
                    })
                })
        }
    }

    render() {
        if (this.props.stateForceUpdate) {
            this.getData()
            this.props.forceUp()
        }
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