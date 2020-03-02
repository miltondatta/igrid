import './location.css'
import Axios from 'axios'
import React, {Component} from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import {apiUrl} from "../../utility/constant";

class LocationComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            branchs: [],
            zoom: 7.1,
            showMap: false,
            selectedLat: 23.6850,
            selectedLong: 90.3563,
        }
    }

    handleClick = () => {
        this.setState({
            showMap: true
        })
    }

    componentDidMount() {
        Axios.get(apiUrl() + 'locations/branch')
            .then(resData => {
                this.setState({
                    branchs: resData.data
                })
            })
    }

    handleMarker = (lat, long) => {
        let {zoom} = this.state
        this.setState({
            selectedLat: lat,
            selectedLong: long
        }, () => {
            setInterval(() => {
                if (zoom <= 12) {
                    zoom++
                    this.setState({
                        zoom,
                    })
                } else {
                    clearInterval()
                }
            }, 200)
        })
    }

    render() {
        const {showMap, zoom, branchs, selectedLat, selectedLong} = this.state
        console.log(selectedLat, selectedLong)
        const bnc = branchs.length > 0 && branchs.map(item => (
            <Marker
                onClick={() => this.handleMarker(item.location_lat, item.location_long)}
                title={item.location_name}
                name={item.address}
                position={{lat: item.location_lat, lng: item.location_long}} />
        ))
        return (
            <div className={'ui-location-finder'}>
                <div className={'ui-map-div'}>
                    <Map
                        google={this.props.google}
                        zoom={zoom}
                        style={{width: '100%', height: '85.5vh'}}
                        initialCenter={{
                            lat: selectedLat,
                            lng: selectedLong
                        }}
                    >
                        {bnc}
                    </Map>
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyCT4xV8kUxUG45jT1lQggvJ0VJG9jzRk6Q'})(LocationComponent)