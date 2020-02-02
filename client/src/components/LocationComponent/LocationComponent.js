import './location.css'
import React, {Component} from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class LocationComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            zoom: 7.1,
            showMap: false
        }
    }

    handleClick = () => {
        this.setState({
            showMap: true
        })
    }

    handleMarker = () => {
        let {zoom} = this.state
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
    }

    render() {
        const {showMap, zoom} = this.state
        return (
            <div className={'ui-location-finder'}>
                {!showMap ? <div className="ui-location-card" onClick={this.handleClick}>
                    <img src={process.env.PUBLIC_URL + '/media/image/location.png'} alt="location"/>
                    <p>Find Location</p>
                </div> : <div className={'ui-map-div'}>
                    <Map
                        google={this.props.google}
                        zoom={zoom}
                        style={{width: '100%', height: '80vh'}}
                        initialCenter={{
                            lat: 23.6850,
                            lng: 90.3563
                        }}
                    >
                        <Marker
                            onClick={this.handleMarker}
                            title={'Dhaka'}
                            name={'SOMA'}
                            position={{lat: 23.8103, lng: 90.4125}} />
                        <Marker
                            title={'Slyhet'}
                            name={'SOMA'}
                            position={{lat: 24.8949, lng: 91.8687}} />
                        <Marker
                            title={'Chittagong'}
                            name={'SOMA'}
                            position={{lat: 22.3569, lng: 91.7832}} />
                        <Marker
                            title={'Satkhira'}
                            name={'SOMA'}
                            position={{lat: 23.1778, lng: 89.1801}} />
                        <Marker
                            title={'Rajhshahi'}
                            name={'SOMA'}
                            position={{lat: 24.3745, lng: 88.6042}} />
                        <Marker
                            title={'Madaripur'}
                            name={'SOMA'}
                            position={{lat: 23.2393, lng: 90.1870}} />
                    </Map>
                </div>}
            </div>
        );
    }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyCT4xV8kUxUG45jT1lQggvJ0VJG9jzRk6Q'})(LocationComponent)