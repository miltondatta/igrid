import Axios from 'axios'
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

class LocationDetailsComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            zoom: 7.1,
            locationName: '',
            lcoationAddress: '',
            detLocation: [],
            showMap: false,
            infoVisible: false,
            selectedLat: 23.6850,
            selectedLong: 90.3563,
        }
    }

    componentDidMount() {
        Axios.get(apiUrl() + 'locations/top')
            .then(res => {
                this.setState({
                    detLocation: res.data
                })
            })
    }

    handleMarker = (parentId) => {
        Axios.get(apiUrl() + 'locations/child/' + parentId)
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        detLocation: res.data
                    })
                } else {
                    this.setState({
                        infoVisible: true
                    })
                }
            })
    }

    onMarkerClick= (lat, long, locationName, lcoationAddress) => {
        this.setState({
            locationName,
            lcoationAddress,
            selectedLat: lat,
            selectedLong: long,
        })
    }

    render() {
        const {selectedLat, selectedLong, zoom, detLocation, locationName, lcoationAddress, infoVisible} = this.state
        const location = detLocation.length > 0 && detLocation.map((item, index) => (
                <Marker
                    onClick={(e) => {this.handleMarker(item.id); this.onMarkerClick(item.location_lat, item.location_long, item.location_name, item.address)}}
                    key={index}
                    icon={{
                        url: process.env.PUBLIC_URL + `/media/image/marker_${item.parent_id}.png`
                    }}
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
                        {location}
                        <InfoWindow
                            position={{lat: selectedLat, lng: selectedLong}}
                            visible={infoVisible}
                        >
                            <h3>{locationName}</h3>
                            <p>{lcoationAddress}</p>
                        </InfoWindow>
                    </Map>
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyCT4xV8kUxUG45jT1lQggvJ0VJG9jzRk6Q'})(LocationDetailsComponent);