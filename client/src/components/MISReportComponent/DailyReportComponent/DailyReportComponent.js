import React, {Component} from 'react';
import Axios from "axios";
import {apiUrl} from "../../../utility/constant";

class DailyReportComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hierarchies: []
        }
    }

    componentDidMount() {
        this.getHierarchies()
    }

    getHierarchies = () => {
        Axios.get(apiUrl() + 'locHierarchies')
            .then(res => {
                this.setState({
                    hierarchies: res.data
                })
            })
    }

    render() {
        const {hierarchies} = this.state
        const locations = hierarchies.length > 0 && hierarchies.map(item => {
            return(
                <select onChange={this.handleChange} className={'ui-custom-input'}>
                    <option></option>
                </select>
            )
        })


        return (
            <div>
                {locations}
            </div>
        );
    }
}

export default DailyReportComponent;