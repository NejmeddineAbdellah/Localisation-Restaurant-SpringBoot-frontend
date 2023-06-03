import React, { Component } from 'react';
import axios from 'axios';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const customizeMap = {
  width: '100%',
  height: '100%'
};

class GoogleMapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    cords: [
      { latitude: 31.6665735, longitude: -7.9754785 },
    ],
      initialCenter: { lat: 31.6665735, lng: -7.9754785 } // Initialize with default values
    };
  }

  componentDidMount() {
   axios.get('https://local-restau-springboot-backend-production.up.railway.app/api/restaus/')
     .then(response => {
       const data = response.data; 
 
       const cords = data.map(item => ({
        latitude: item.latitude,
        longitude: item.longitude
       }));

 
       this.setState({
         cords,
         initialCenter: {
           lat: cords[0].latitude,
           lng: cords[0].longitude
         }
       });
       console.log(cords);
     })
     .catch(error => {
       console.error('Error fetching data:', error);
     });
 }
 
 

  drawMarker = () => {
   return this.state.cords.map((store, i) => {
     const { latitude, longitude } = store;
 
     return (
       <Marker
         key={i}
         id={i}
         position={{
           lat: latitude,
           lng: longitude
         }}
         onClick={() => console.log("Event Handler Called")}
       />
     );
   });
 }
 

  render() {
    const { initialCenter } = this.state;

    return (
      <Map
        google={this.props.google}
        style={customizeMap}
        zoom={6}
        initialCenter={initialCenter}
      >
        {this.drawMarker()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCsA6hQ1C8D6IIeB_r2WDEEgPelvpUWIf8&amp;region=MA'
})(GoogleMapComponent);
