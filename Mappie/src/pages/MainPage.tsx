import { useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";

import { Map } from "@/components/Map";
import { SideBar } from "@/components/SideBar";
import { coords } from "@/entities/location";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { getLocation } from "@/utils/geo";
import { getPlacesInCircle } from "@/utils/getPlacesInCircle";

const defCenter = {
    lat: 53.897,
    lng: 27.555
};

const API_KEY: string = import.meta.env.VITE_APP_API_KEY

export const MainPage = () => {
    const [markerCoord, setMarkerCoord] = useState(null)
    const [center, setCenter] = useState(defCenter);
    const [radius, setRadius] = useState(0)
    const [zoom, setZoom] = useState(10);
    const filters = useTypedSelector((state) => state.filter.filters);
    const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
    const [geolocation, setGeolocation] = useState(undefined)
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: API_KEY || '',
        libraries: ['places'],
        language: 'ru'
    });

    const onSearch = useCallback((coord: { lat: number, lng: number }, zoom: number) => {
        setCenter(coord), setZoom(zoom)
    }, [])

    const onChangeRadius = (e: { target: { value: string; }; }) => {
        if (!isNaN(+e.target.value)) { setRadius(+e.target.value); }
    }

    const onMarkerAdd = (coord: coords) => {
        // @ts-ignore
        setMarkerCoord(coord);
    }

    useEffect(() => {
        getLocation().then((curLoc) => {
            // @ts-ignore
            setGeolocation(curLoc)
        }).catch(() => setGeolocation(undefined))
            .finally(() => {
                const centerCoords = geolocation || center || defCenter;
                console.log(filters)
                getPlacesInCircle(centerCoords, radius, filters)
                    .then((response) => {
                        // @ts-ignore
                        setPlaces([...(response || [])]);
                        console.log(places)
                    });
            })
        /* if (isLoaded) {
            const service = new google.maps.places.PlacesService(
                document.createElement('div')
            );
 
            const queryParts = [];
            if (filters.name) {
                queryParts.push(filters.name);
            }
            if (filters.buildingType) {
                queryParts.push(filters.buildingType);
            }
 
            const query = queryParts.join(' ');
 
            const request = {
                query: query,
                location: mapCenter,
                radius: filters.radius
            };
 
            // @ts-ignore
            service.textSearch(request, (results: Place[], status: google.maps.places.PlacesServiceStatus) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    setPlaces(results);
                    dispatch(setPlacesList(results));
                } else {
                    console.error('Ошибка при запросе мест:', status);
                }
            });
 
        } */
    }, [radius, filters, center, geolocation]);

    return (
        <div className="w-100 h-100 d-flex flex-md-row">
            <SideBar isLoaded={isLoaded} onSearch={onSearch} radius={radius} onChangeRadius={onChangeRadius} />
            <Map isLoaded={isLoaded} geolocation={geolocation} center={center} zoom={zoom} onMarkerAdd={onMarkerAdd} marker={markerCoord} radius={radius} />
        </div>
    )
}