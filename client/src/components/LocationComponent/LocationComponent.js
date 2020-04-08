import './location.css'
import Axios from 'axios'
import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import {apiUrl} from "../../utility/constant";
import {BackEnd_BaseUrl} from "../../config/private";

class LocationComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            branchs: [],
            zoom: 7.1,
            locationName: '',
            lcoationAddress: '',
            showMap: false,
            infoVisible: false,
            locationImage: '',
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
        })
    }

    onMarkerClick= (lat, long, locationName, lcoationAddress, locationImage) => {
        this.setState({
            locationName,
            locationImage,
            lcoationAddress,
            selectedLat: lat,
            selectedLong: long,
            infoVisible: true
        })
    }

    render() {
        const {showMap, zoom, branchs, selectedLat, selectedLong, locationName, lcoationAddress, infoVisible, locationImage} = this.state
        console.log(selectedLat, selectedLong)
        const bnc = branchs.length > 0 && branchs.map(item => (
            <Marker
                onClick={() => {this.handleMarker(item.location_lat, item.location_long); this.onMarkerClick(item.location_lat, item.location_long, item.location_name, item.address, item.location_image)}}
                title={item.location_name}
                name={item.address}
                position={{lat: item.location_lat, lng: item.location_long}} />
        ))
        console.log(bnc)
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
                        <InfoWindow
                            position={{lat: selectedLat, lng: selectedLong}}
                            visible={infoVisible}
                        >
                            <h3>{locationName}</h3>
                            <p>{lcoationAddress}</p>
                            <img style={{width: '200px'}} onClick={this.handleUserOptions}
                                 src={BackEnd_BaseUrl + 'images/' + locationImage} alt={'user'}/>
                        </InfoWindow>
                    </Map>
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyCT4xV8kUxUG45jT1lQggvJ0VJG9jzRk6Q'})(LocationComponent)