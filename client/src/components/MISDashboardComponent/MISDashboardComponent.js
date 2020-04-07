import './misDashboard.css'
import Axios from 'axios'
import React, { Component } from 'react';
import { Bar, HorizontalBar, Line, Radar } from 'react-chartjs-2';
import { apiUrl } from "../../utility/constant";

class MisDashboardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            locations: [],
            gData1: [],
            gData2: [],
            gData3: [],
            gData4: [],
        }
    }

    
    componentDidMount() {
        this.getMisDashboardData();
        this.drawGraph1();
        this.drawGraph2();
        this.drawGraph3();
        this.drawGraph4();
    }

    drawGraph1 = () => {
        Axios.get(apiUrl() + 'mis/dashboard/graph/data', { params: { indicatordetails_id: 1 } })
            .then(res => {
                if (res.data.status) {
                    let gdata = {
                        labels: res.data.graphLabels,
                        datasets: [
                            {
                                label: res.data.label,
                                backgroundColor: 'rgba(0,0,132,0.6)',
                                borderColor: 'rgba(50,0,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(0,0,132,0.3)',
                                hoverBorderColor: 'rgba(50,0,132,1)',
                                data: res.data.graphDatas
                            }
                        ]
                    };
                    this.setState({
                        gData1: gdata
                    });
                }
            })
    }

    drawGraph2 = () => {
        Axios.get(apiUrl() + 'mis/dashboard/graph/data', { params: { indicatordetails_id: 6 } })
            .then(res => {
                if (res.data.status) {
                    let gdata = {
                        labels: res.data.graphLabels,
                        datasets: [
                            {
                                label: res.data.label,
                                backgroundColor: 'rgba(255,99,0,0.6)',
                                borderColor: 'rgba(255,99,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(255,99,0,0.3)',
                                hoverBorderColor: 'rgba(255,99,132,1)',
                                data: res.data.graphDatas
                            }
                        ]
                    };
                    this.setState({
                        gData2: gdata
                    });
                }
            })
    }

    drawGraph3 = () => {
        Axios.get(apiUrl() + 'mis/dashboard/graph/data', { params: { indicatordetails_id: 12 } })
            .then(res => {
                if (res.data.status) {
                    let gdata = {
                        labels: res.data.graphLabels,
                        datasets: [
                            {
                                label: res.data.label,
                                backgroundColor: 'rgba(25,200,100,0.6)',
                                borderColor: 'rgba(25,150,100,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(25,200,100,0.3)',
                                hoverBorderColor: 'rgba(25,150,100,1)',
                                data: res.data.graphDatas
                            }
                        ]
                    };
                    this.setState({
                        gData3: gdata
                    });
                }
            })
    }

    drawGraph4 = () => {
        Axios.get(apiUrl() + 'mis/dashboard/graph/data', { params: { indicatordetails_id: 16 } })
            .then(res => {
                if (res.data.status) {
                    let gdata = {
                        labels: res.data.graphLabels,
                        datasets: [
                            {
                                label: res.data.label,
                                backgroundColor: 'rgba(255,99,132,0.8)',
                                borderColor: 'rgba(255,99,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(255,99,132,0.2)',
                                hoverBorderColor: 'rgba(255,99,132,1)',
                                data: res.data.graphDatas
                            }
                        ]
                    };
                    this.setState({
                        gData4: gdata
                    });
                }
            })
    }


    getMisDashboardData = () => {
        Axios.get(apiUrl() + 'mis-dashboard/info')
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        roles: res.data.payload.roles,
                        locations: res.data.payload.locations
                    })
                }
            })
    }

    render() {
        const { roles, locations } = this.state
        let colors = ['#cc1d66', '#6f1dcc', '#1d92cc', '#4aa59c', '#cc9a1d', '#cc6f1d', '#cc1d1d', '#486e27']
        const rolesBox = roles.length > 0 && roles.map((item, index) => {
            return (
                <div key={index} className={'ui-role-child'}>
                    <p>{item.role_name}</p>
                    <p style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}>{item.cnt}</p>
                </div>
            )
        })
        const locationsBox = locations.length > 0 && locations.map((item, index) => {
            return (
                <div key={index} className={'ui-role-child'}>
                    <p>{item.hierarchy_name}</p>
                    <p style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}>{item.cnt}</p>
                </div>
            )
        })
        return (
            <>
                <div className={'ui-mis-dashboard-container'}>
                    <div className={'ui-mis-top '}>
                        <div className={'ui-mis-body-top mb-3'}>
                            <div className="ui-icon-container-1">
                                <i className="fas fa-users"></i>
                            </div>
                            <p>Total Users</p>
                        </div>
                        <div className={'ui-mis-body-bottom'}>
                            {rolesBox}
                        </div>
                    </div>
                    <div className={'ui-mis-top'}>
                        <div className={'ui-mis-body-top  mb-3'}>
                            <div>
                                <div className="ui-icon-container-2">
                                    <i className="fas fa-globe"></i>
                                </div>
                            </div>
                            <p>Total Locations</p>
                        </div>
                        <div className={'ui-mis-body-bottom'}>
                            {locationsBox}
                        </div>
                    </div>
                </div>
                <div className={'ui-mis-graph'}>
                    <div className={'ui-mis-gsection'}>
                        <Bar
                            data={this.state.gData1}
                            width={100}
                            height={50}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                    <div className={'ui-mis-gsection'}>
                        <HorizontalBar
                            data={this.state.gData2}
                            width={100}
                            height={50}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                    <div className={'ui-mis-gsection'}>
                        <Line
                            data={this.state.gData3}
                            width={100}
                            height={50}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                    <div className={'ui-mis-gsection'}>
                        <Radar
                            data={this.state.gData4}
                            width={100}
                            height={50}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default MisDashboardComponent;
