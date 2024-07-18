import { GoogleMap, Marker } from '@react-google-maps/api';
import { useCallback, useRef } from 'react';

import { defaultTheme } from '@/constants/Theme';
import { coords } from '@/entities/location';

import { GeolocationMarker } from '../geolocationMarker';
import styles from '../style.module.css';
import { StyledCircle } from './StyledCircle';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: true,
  keyboardShortcuts: false,
  scrollwheel: true,
  disableDoubleClickZoom: true,
  fullscreenControl: false,
  enableRetinaIcons: false,
  styles: defaultTheme
};

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

  return isLoaded ? (
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
  ) : (
    <span className={styles.loader} />
  );
};
