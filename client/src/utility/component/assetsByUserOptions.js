import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class AssetListOptions extends Component {
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
        const {userId} = this.props
        Axios.get(apiUrl() + 'assets/user/options/' + userId)
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
            <option key={index} value={item.id}>{item.products}</option>
        ))
        return(
            <>
                {Options}
            </>
        )
    }
}

export default AssetListOptions