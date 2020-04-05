import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class
LocationsWithHOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.parentID !== prevProps.parentID && this.props.parentID !== 0 && this.props.hierarchyID) {
            this.getData()
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        const {parentID, hierarchyID} = this.props
        const payLoad = {
            parentID,
            hierarchyID
        }
        if (typeof parentID !== 'undefined' && hierarchyID) {
            Axios.post(apiUrl() + 'locations/witHierarchy', payLoad)
                .then(resData => {
                    this.setState({
                        data: resData.data
                    })
                })
        }
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

export default LocationsWithHOptions