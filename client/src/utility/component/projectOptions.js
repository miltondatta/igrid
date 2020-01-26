import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../constant";

class ProjectOptions extends Component {
    constructor(props){
        super(props)
        this.state = {
            brandData: []
        }
    }

    componentDidMount() {
        Axios.get(apiUrl() + 'projects')
            .then(resData => {
                console.log(resData)
                this.setState({
                    brandData: resData.data
                })
            })
    }

    render() {
        const {brandData} = this.state
        const Options = brandData.length > 0 && brandData.map((item, index) => (
            <option key={index} value={item.id}>{item.project_name}</option>
        ))
        return(
            <>
                {Options}
            </>
        )
    }
}

export default ProjectOptions;