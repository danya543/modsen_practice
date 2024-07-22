import { useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Map } from "@/components/Map";
import { SideBar } from "@/components/SideBar";
import { Place } from "@/entities/global.types";
import { coords } from "@/entities/location";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { setPlacesList } from "@/store/reducers/placesSlice";
import { setUser } from "@/store/reducers/userSlice";
import { getLocation } from "@/utils/geo";

const defCenter = {
    lat: 53.897,
    lng: 27.555
};

const API_KEY: string = import.meta.env.VITE_APP_API_KEY

export const MainPage = () => {
    const dispatch = useDispatch();
    const [markerCoord, setMarkerCoord] = useState(null);
    const [center, setCenter] = useState(defCenter);
    const [zoom, setZoom] = useState(10);
    const [radius, setRadius] = useState(useTypedSelector((state) => state.filter.radius));
    const filters = useTypedSelector((state) => state.filter.filters);
    const [places, setPlaces] = useState<Place[]>([]);
    const [geolocation, setGeolocation] = useState(undefined);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: API_KEY || '',
        libraries: ['places'],
        language: 'ru'
    });
    const user = JSON.parse(localStorage.getItem('user') ?? '[]');
    if (user) {
        dispatch(setUser({ email: user.email || '', token: user.accessToken, id: user.uid }));
    }

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
                const centerCoords = geolocation ? geolocation : markerCoord ? markerCoord : defCenter;
                console.log(centerCoords)
                /* getPlacesInCircle(centerCoords, radius, filters)
                    .then((response) => {
                        // @ts-ignore
                        setPlaces([...(response || [])]);
                        console.log(places)
                    }); */
                if (isLoaded) {
                    const service = new google.maps.places.PlacesService(
                        document.createElement('div')
                    );

                    const queryParts = [];
                    if (filters) {
                        queryParts.push(filters);
                    }

                    const query = queryParts.join(' ');

                    const request = {
                        query: query,
                        location: centerCoords,
                        radius: radius
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

                }
            })
    }, [filters, center]);

    return (
        <div className="w-100 h-100 d-flex flex-md-row">
            <SideBar isLoaded={isLoaded} onSearch={onSearch} radius={radius} onChangeRadius={onChangeRadius} />
            <Map isLoaded={isLoaded} geolocation={geolocation} center={center} zoom={zoom} onMarkerAdd={onMarkerAdd} marker={markerCoord} radius={radius} places={places} />
        </div>
    )
}