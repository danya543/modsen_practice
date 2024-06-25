import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useRef, useCallback } from "react";
import styles from '../style.module.css'

const API_KEY = process.env.REACT_APP_API_KEY;

const containerStyle = {
    width: '100%',
    height: '100%',
}

const center = {
    lat: 53.897,
    lng: 27.555
};

export const Map = () => {
    const mapRef = useRef(undefined)
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: API_KEY || "",
        libraries: ['places'],
        language: 'ru'
    });

    const onLoad = useCallback(function callback(map) {
        mapRef.current = map;
    }, [])

    const onUnmount = useCallback(function callback(map) {
        mapRef.current = undefined;
    }, [])


    return isLoaded ?
        (<div className={styles.mapContainer}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
            </GoogleMap>
        </div>) : (<div>loading...</div>)

}