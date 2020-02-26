import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import {Map, Marker} from "google-maps-react";

class ComplainListComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            zoom: 18,
            data: [],
            trackData: []
        }
    }

    componentDidMount() {
        Axios.get(apiUrl() + 'complaints/list')
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
    }

    render() {
        const {data, trackData, zoom} = this.state
        return (
            <div className={'p-2 m-3 bg-white rounded'}>
                <nav className="navbar text-center mb-2 pl-1 rounded">
                    <p className="text-blue f-weight-700 f-22px ml-2 mb-0">User Complaints</p>
                </nav>
                <ReactDataTable
                    pagination
                    footer
                    dataDisplay
                    trackUser={this.trackUser}
                    tableData={data}
                />
            </div>
        );
    }
}

export default ComplainListComponent;