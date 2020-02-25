import './UserLogin.css'
import Axios from 'axios'
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";

class UserLoginLogComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            zoom: 18,
            data: [],
            trackData: []
        }
    }

    componentDidMount() {
        Axios.get(apiUrl() + 'user-login-logs')
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
    }

    trackUser = (ip) => {
        Axios.get('http://ip-api.com/json/' + ip)
            .then(res => {
                this.setState({
                    trackData: res.data
                })
            })
    }

    render() {
        const {data, trackData, zoom} = this.state
        console.log(data)
        return (
            <div className={'p-1 m-3 bg-white rounded'}>
                <nav className="navbar text-center mb-2 pl-3 rounded">
                    <p className="text-blue f-weight-700 f-22px ml-2 mb-0">Login Logs</p>
                </nav>
                {trackData.length === 0 ? <ReactDataTable
                    track
                    pagination
                    footer
                    dataDisplay
                    trackUser={this.trackUser}
                    tableData={data}
                /> : <>
                    <nav className="navbar text-center mb-2 pl-2 rounded cursor-pointer">
                        <p className="text-dark f-weight-500 f-20px m-0" onClick={() => {this.setState({trackData: []})}}>
                            <i className="fas fa-chevron-circle-left"></i> Go Back</p>
                    </nav>
                    <div className={'ui_track'}>
                    <div className={'ui-details'}>
                        <p> <strong className={'mr-2'}>Username:</strong>  {data[0].name}</p>
                        <p> <strong className={'mr-2'}>Country:</strong>  {trackData.country}</p>
                        <p> <strong className={'mr-2'}>CountryCode:</strong>  {trackData.countryCode}</p>
                        <p> <strong className={'mr-2'}>City:</strong>  {trackData.city}</p>
                        <p> <strong className={'mr-2'}>RegionName:</strong>  {trackData.regionName}</p>
                        <p> <strong className={'mr-2'}>Zip:</strong>  {trackData.zip}</p>
                        <p> <strong className={'mr-2'}>Timezone:</strong>  {trackData.timezone}</p>
                        <p> <strong className={'mr-2'}>IP:</strong>  {data[0].user_ip}</p>
                    </div>

                    <div className={'ui-map'}>
                        <Map
                            google={this.props.google}
                            zoom={zoom}
                            style={{width: '97%', height: '60vh'}}
                            initialCenter={{
                                lat: trackData.lat,
                                lng: trackData.lon
                            }}
                        >
                            <Marker
                                title={data[0].firstName + ' ' + data[0].lastName}
                                position={{lat: trackData.lat, lng: trackData.lon}} />
                        </Map>
                    </div>
                </div></>}
            </div>
        );
    }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyCT4xV8kUxUG45jT1lQggvJ0VJG9jzRk6Q'})(UserLoginLogComponent)