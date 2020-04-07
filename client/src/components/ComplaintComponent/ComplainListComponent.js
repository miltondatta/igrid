import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";

import {Map, Marker} from "google-maps-react";
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";

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
                if(res.data.message) {

                } else {
                    this.setState({
                        data: res.data
                    })
                }
            })
    }

    render() {
        const {data, trackData, zoom} = this.state
        return (
            <div className={'p-2 m-3 bg-white rounded'}>
                <nav className="navbar text-center mb-2 pl-1 rounded">
                    <p className="text-blue f-weight-700 f-22px ml-2 mb-0">User Complaints</p>
                </nav>
                {data.length > 0 && <PrimeDataTable
                    trackUser={this.trackUser}
                    data={data}
                />}
            </div>
        );
    }
}

export default ComplainListComponent;