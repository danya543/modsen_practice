import { useJsApiLoader } from "@react-google-maps/api";

import { SideBar } from "../components/SideBar";
import { Map } from "../components/Map";
import { useCallback, useState } from "react";

const defCenter = {
    lat: 53.897,
    lng: 27.555
};

const API_KEY: string = import.meta.env.VITE_APP_API_KEY

export const MainPage = () => {
    const [markerCoord, setMarkerCoord] = useState(null)
    const [center, setCenter] = useState(defCenter);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: API_KEY || '',
        libraries: ['places'],
        language: 'ru'
    });

    const onSearch = useCallback((coord: { lat: number, lng: number }) => { setCenter(coord) }, [])

    const onMarkerAdd = (coord: any) => {
        setMarkerCoord(coord);
    }
    return (
        <div className="w-100 h-100 d-flex flex-md-row">
            <SideBar isLoaded={isLoaded} onSearch={onSearch} />
            <Map isLoaded={isLoaded} center={center} onMarkerAdd={onMarkerAdd} marker={markerCoord} />
        </div>
    )
}