import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class AMCTypeOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            run: false
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        Axios.get(apiUrl() + 'amc_types/options')
            .then(resData => {

                this.setState({
                    data: resData.data
                })
            })
    }

    render() {
        const {data} = this.state
        if (this.props.stateForceUpdate) {
            this.getData()
            this.props.forceUp()
        }
        const Options = data.length > 0 && data.map((item, index) => (
            <option key={index} value={item.id}>{item.type_name}</option>
        ))
        return(
            <>
                {Options}
            </>
        )
    }
}

export default AMCTypeOptions