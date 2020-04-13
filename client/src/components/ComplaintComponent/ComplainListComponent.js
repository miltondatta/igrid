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
        Axios.get(apiUrl() + 'complaintslist')
            .then(res => {
                if(res.data.message) {

                } else {
                    this.setState({
                        data: res.data
                    })
                }
            })
    }

    done = (val, id) => {
        console.log(val, 31)
        const payload = {solution_details: val, status: 8}
        Axios.put(apiUrl() + 'complaints/update/'+ id, payload)
            .then(res => {
                if (res.data.status) {
                    window.location.reload()
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
                    comments
                    done={this.done}
                    data={data}
                />}
            </div>
        );
    }
}

export default ComplainListComponent;