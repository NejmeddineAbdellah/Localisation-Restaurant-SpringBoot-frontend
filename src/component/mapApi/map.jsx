import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { useParams } from 'react-router-dom';

const customizeMap = {
  width: '100%',
  height: '100%'
};

const GoogleMapComponent = ({ google }) => {
  const [coords, setCoords] = useState([]);
  const [initialCenter, setInitialCenter] = useState({ lat: 31.6665735, lng: -7.9754785 });

  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://local-restau-springboot-backend-production.up.railway.app/api/restaus/restau/id/${id}`)
      .then(response => {
        const data = response.data;
  
        // Check if data has latitude and longitude properties
        if (data.latitude && data.longitude) {
          const coordinates = {
            lat: data.latitude,
            lng: data.longitude
          };
          
          setCoords([coordinates]);
          setInitialCenter(coordinates);
  
          console.log(coordinates);
        } else {
          // Handle the case when data does not have the expected properties
          console.error('Invalid data structure:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id]);
  
  const drawMarker = () => {
    return coords.map((coord, i) => {
      const { lat, lng } = coord;
  
      return (
        <Marker
          key={i}
          id={i}
          position={{
            lat: lat,
            lng: lng
          }}
          onClick={() => console.log("Event Handler Called")}
        />
      );
    });
  };
  

  return (
    <Map
      google={google}
      style={customizeMap}
      zoom={6}
      initialCenter={initialCenter}
    >
      {drawMarker()}
    </Map>
  );
};


export default GoogleApiWrapper({
  apiKey: 'AIzaSyCsA6hQ1C8D6IIeB_r2WDEEgPelvpUWIf8&amp;region=MA'
})(GoogleMapComponent);
