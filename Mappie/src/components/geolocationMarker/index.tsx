import { Marker } from '@react-google-maps/api';

import { coords } from '@/entities/location';

export const GeolocationMarker = ({ location }: { location: coords }) => {
  return (
    <Marker
      position={location}
      icon={'./src/assets/geolocation.svg'}
      title={'Моё местоположение'}
    />
  );
};
