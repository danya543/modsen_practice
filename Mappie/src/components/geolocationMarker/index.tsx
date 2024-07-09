import { Marker } from "@react-google-maps/api"
import { coords } from "../../utils/location";

export const GeolocationMarker = ({ location }: { location: coords }) => {

    return (<Marker position={location} icon={{ url: "/geolocation.svg" }} />);
}