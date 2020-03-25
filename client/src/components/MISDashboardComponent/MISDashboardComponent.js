import './misDashboard.css'
import Axios from 'axios'
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";

class MisDashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            locations: []
        }
    }

    componentDidMount() {
        this.getMisDashboardData()
    }

    getMisDashboardData = () => {
        Axios.get(apiUrl() + 'mis-dashboard/info')
            .then(res => {
                if(res.data.status){
                    this.setState({
                        roles: res.data.payload.roles,
                        locations: res.data.payload.locations
                    })
                }
            })
    }

    render() {
        const {roles, locations} = this.state
        let colors = ['#cc1d66', '#6f1dcc', '#1d92cc', '#4aa59c', '#cc9a1d', '#cc6f1d', '#cc1d1d', '#486e27']
        const rolesBox = roles.length > 0 && roles.map((item, index) => {
            return(
                <div key={index} className={'ui-role-child'}>
                    <p>{item.role_name}</p>
                    <p style={{backgroundColor: colors[Math.floor(Math.random() * colors.length)]}}>{item.cnt}</p>
                </div>
            )
        })
        const locationsBox = locations.length > 0 && locations.map((item, index) => {
            return(
                <div key={index} className={'ui-role-child'}>
                    <p>{item.hierarchy_name}</p>
                    <p style={{backgroundColor: colors[Math.floor(Math.random() * colors.length)]}}>{item.cnt}</p>
                </div>
            )
        })
        return (
            <>
                <div className={'ui-mis-dashboard-container'}>
                    <div className={'ui-mis-top '}>
                        <div className={'ui-mis-body-top mb-3'}>
                            <div className="ui-icon-container-1">
                                <i className="fas fa-globe"></i>
                            </div>
                            <p>Total Locations</p>
                        </div>
                        <div className={'ui-mis-body-bottom'}>
                            {rolesBox}
                        </div>
                    </div>
                    <div className={'ui-mis-top'}>
                        <div className={'ui-mis-body-top  mb-3'}>
                            <div>
                                <div className="ui-icon-container-2">
                                    <i className="fas fa-users"></i>
                                </div>
                            </div>
                            <p>Total Users</p>
                        </div>
                        <div className={'ui-mis-body-bottom'}>
                            {locationsBox}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MisDashboardComponent;