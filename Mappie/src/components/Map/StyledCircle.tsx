import { Circle } from '@react-google-maps/api';

export const StyledCircle = ({
  center,
  radius
}: {
  center: { lat: number; lng: number };
  radius: number;
}) => {
  return (
    <Circle
      center={center}
      radius={radius * 1000}
      options={{
        strokeColor: 'rgb(94,123,199)',
        fillColor: 'rgb(94,123,199)',
        strokePosition: google.maps.StrokePosition.INSIDE,
        strokeWeight: 2,
        fillOpacity: 0.2
      }}
    />
  );
};
