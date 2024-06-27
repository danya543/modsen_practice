import { GoogleMap, Marker } from "@react-google-maps/api";
import { useRef, useCallback } from "react";
import styles from '../style.module.css';

const containerStyle = {
    width: '100%',
    height: '100%',
}

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
    enableRetinaIcons: false
}

export const Map = ({ isLoaded, center, onMarkerAdd, marker }: { isLoaded: boolean, center: { lat: number, lng: number }, onMarkerAdd: ({ lat, lng }: { lat: number, lng: number }) => void, marker: { lat: number, lng: number } | undefined }) => {
    const mapRef = useRef(undefined)

    const onClick = (location) => {
        const lat = location.latLng.lat();
        const lng = location.latLng.lng()
        onMarkerAdd({ lat, lng });
        console.log({ lat, lng })
    }

    const onLoad = useCallback(function callback(map) {
        mapRef.current = map;
    }, [])

    const onUnmount = useCallback(function callback() {
        mapRef.current = undefined;
    }, [])


    return isLoaded ?
        (<div className="w-75">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
                onDblClick={onClick}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={defaultOptions}
            >
                <Marker position={center} />
                {marker && <Marker position={marker} />}
            </GoogleMap>
        </div>) : (<span className={styles.loader} ></span>)

}