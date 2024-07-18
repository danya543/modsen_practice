import { Marker as GoogleMapMarker } from '@react-google-maps/api';
export const Marker = ({ position }: { position: { lat: number; lng: number } }) => {
  return <GoogleMapMarker position={position} icon={{ url: '/marker.png' }} />;
};
