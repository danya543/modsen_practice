import { useJsApiLoader } from "@react-google-maps/api";

import { SideBar } from "../components/SideBar";
import { Map } from "../components/Map";
import { useCallback, useEffect, useState } from "react";
import { getLocation } from "../utils/geo";

const defCenter = {
    lat: 53.897,
    lng: 27.555
};

const API_KEY: string = import.meta.env.VITE_APP_API_KEY

export const MainPage = () => {
    const [markerCoord, setMarkerCoord] = useState(undefined)
    const [center, setCenter] = useState(defCenter);
    const [zoom, setZoom] = useState(10);
    const [geolocation, setGeolocation] = useState(undefined)
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: API_KEY || '',
        libraries: ['places'],
        language: 'ru'
    });

    const onSearch = useCallback((coord: { lat: number, lng: number }, zoom: number) => { setCenter(coord), setZoom(zoom) }, [])

    const onMarkerAdd = (coord: any) => {
        setMarkerCoord(coord);
    }

    useEffect(() => {
        getLocation().then((curLoc: any) => {
            setGeolocation(curLoc)
        }).catch(() => setGeolocation(undefined))
    }, []);

    return (
        <div className="w-100 h-100 d-flex flex-md-row">
            <SideBar isLoaded={isLoaded} onSearch={onSearch} />
            <Map isLoaded={isLoaded} geolocation={geolocation} center={center} zoom={zoom} onMarkerAdd={onMarkerAdd} marker={markerCoord} />
        </div>
    )
}