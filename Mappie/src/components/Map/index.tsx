import { GoogleMap, Marker } from '@react-google-maps/api';
import { useCallback, useRef } from 'react';


import { coords } from '@/entities/location';

import { GeolocationMarker } from '../geolocationMarker';
import styles from '../style.module.css';
import { StyledCircle } from './StyledCircle';
import { containerStyle, defaultOptions } from './constants';

export const Map = ({
  isLoaded,
  geolocation,
  center,
  zoom,
  onMarkerAdd,
  marker,
  radius
}: {
  isLoaded: boolean;
  geolocation: coords | undefined;
  center: coords;
  zoom: number;
  onMarkerAdd: ({ lat, lng }: any) => void;
  marker: coords | null;
  radius: number;
}) => {
  const mapRef = useRef(undefined);

  const onDblClick = (location: any) => {
    const lat = location.latLng.lat();
    const lng = location.latLng.lng();
    onMarkerAdd({ lat, lng });
  };

  const onClick = () => {
    onMarkerAdd(undefined);
  };

  const onLoad = useCallback(function callback(map: any) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback() {
    mapRef.current = undefined;
  }, []);

  if (!isLoaded) {
    return <span className={styles.loader} />;
  }

  return (
    <div className="w-75">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onClick={onClick}
        onDblClick={onDblClick}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        {geolocation && <GeolocationMarker location={geolocation} />}
        {marker && <Marker position={marker} />}
        {radius &&
          (marker ? (
            <StyledCircle center={marker} radius={radius} />
          ) : (
            geolocation && <StyledCircle center={geolocation} radius={radius} />
          ))}
      </GoogleMap>
    </div>
  );
};
