import './UserLogin.css';
import Axios from 'axios';
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import DatePicker from 'react-datepicker2';
import moment from "moment";
import Spinner from "../../layouts/Spinner";
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";

moment.locale('en');

const disabledRanges = [{
    disabled: true,
    start: moment().add(1, 'day'),
    end: moment().add(50, 'year')
}];

class UserLoginLogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 18,
            data: [],
            trackData: [],
            from_date: moment().subtract(6, 'days'),
            to_date: moment(),
            isLoading: false
        }
    }

    componentDidMount() {
        const {from_date, to_date} = this.state;
        const data = {
            from_date: moment(from_date).format('YYYY-MM-DD'),
            to_date: moment(to_date).format('YYYY-MM-DD')
        };
        this.getData(data);
    }

    handleSearch = () => {
        const {from_date, to_date} = this.state;
        const data = {
            from_date: moment(from_date).format('YYYY-MM-DD'),
            to_date: moment(to_date).format('YYYY-MM-DD')
        };
        this.getData(data);
    };

    getData = data => {
        this.setState({
            isLoading: true
        }, () => {
            Axios.post(apiUrl() + 'user-login-logs/by/credential', data)
                .then(res => {
                    this.setState({
                        data: [],
                        isLoading: false
                    }, () => {
                        this.setState({
                            data: res.data
                        })
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        });
    };

    trackUser = (ip) => {
        Axios.get('http://ip-api.com/json/' + ip)
            .then(res => {
                this.setState({
                    trackData: res.data
                })
            })
    };

    render() {
        const {data, trackData, zoom, from_date, to_date, isLoading} = this.state;
        return (
            <div className={'p-2 m-2 bg-white rounded min-h-80vh'}>
                <nav className="navbar text-center mb-2 pl-1 rounded">
                    <p className="text-blue f-weight-700 f-22px ml-2 mb-0">Login Logs</p>
                </nav>
                <div className="row pl-1">
                    <div className="col-md-5">
                        <label className={'ui-custom-label pl-2'}>From Date</label>
                        <DatePicker timePicker={false}
                                    name={'from_date'}
                                    className={`ui-custom-input`}
                                    inputFormat="DD/MM/YYYY"
                                    onChange={date => this.setState({from_date: date})}
                                    ranges={disabledRanges}
                                    value={from_date}/>
                    </div>
                    <div className="col-md-5">
                        <label className={'ui-custom-label pl-2'}>To Date</label>
                        <DatePicker timePicker={false}
                                    name={'to_date'}
                                    className={`ui-custom-input`}
                                    inputFormat="DD/MM/YYYY"
                                    onChange={date => this.setState({to_date: date})}
                                    ranges={disabledRanges}
                                    value={to_date}/>
                    </div>
                    <div className="col-md-2">
                        <button className="submit-btn-normal w-100 h-100 px-4 py-2"
                                onClick={this.handleSearch}>Search
                        </button>
                    </div>
                </div>
                {isLoading ? <Spinner/> : trackData.length === 0 ? data.length > 0 && <div className={'mt-5'}>
                    <PrimeDataTable
                        track
                        trackUser={this.trackUser}
                        data={data}
                    />
</div>
                : <>
                    <nav className="navbar text-center mb-2 pl-2 rounded cursor-pointer">
                        <p className="text-dark f-weight-500 f-20px m-0" onClick={() => {
                            this.setState({trackData: []})
                        }}>
                            <i className="fas fa-chevron-circle-left"/> Go Back</p>
                    </nav>
                    <div className={'ui_track'}>
                        <div className={'ui-details'}>
                            <p><strong className={'mr-2'}>Username:</strong> {data[0].name}</p>
                            <p><strong className={'mr-2'}>Country:</strong> {trackData.country}</p>
                            <p><strong className={'mr-2'}>CountryCode:</strong> {trackData.countryCode}</p>
                            <p><strong className={'mr-2'}>City:</strong> {trackData.city}</p>
                            <p><strong className={'mr-2'}>RegionName:</strong> {trackData.regionName}</p>
                            <p><strong className={'mr-2'}>Zip:</strong> {trackData.zip}</p>
                            <p><strong className={'mr-2'}>Timezone:</strong> {trackData.timezone}</p>
                            <p><strong className={'mr-2'}>IP:</strong> {data[0].user_ip}</p>
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
                                    position={{lat: trackData.lat, lng: trackData.lon}}/>
                            </Map>
                        </div>
                    </div>
                </>}
            </div>
        );
    }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyCT4xV8kUxUG45jT1lQggvJ0VJG9jzRk6Q'})(UserLoginLogComponent)