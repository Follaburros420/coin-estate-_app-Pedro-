import React, { useCallback, useRef } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  fullscreenControl: false,
};

const defaultCenter = { lat: 3.6532, lng: 17.3832 };

export default function GoogleMapNew({ coordinates = [], icon }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries,
  });

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps...';

  // Set the map center to the first location or the default
  const center =
    coordinates?.length > 0 ? { lat: coordinates[0].Latitude, lng: coordinates[0].Longitude } : defaultCenter;

  return (
    <div className='rounded-lg overflow-hidden'>
      <GoogleMap
        id='map'
        mapContainerStyle={mapContainerStyle}
        zoom={7}
        center={center}
        options={options}
        onLoad={onMapLoad}>
        {coordinates?.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.Latitude, lng: location.Longitude }}
            // icon={{
            //   url: icon?.url || "/assets/svg/locationIcon.svg",
            //   scaledSize: new window.google.maps.Size(30, 30),
            // }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
