import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import classNames from 'classnames';
import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { FavPlace } from '@/entities/FavPlaces';
import { Place } from '@/entities/global.types';
import { coords } from '@/entities/location';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { addPlaceToFavorites } from '@/store/actions/favoritesActions';

import { GeolocationMarker } from '../geolocationMarker';
import styles from '../style.module.css';
import { containerStyle, defaultOptions } from './constants';
import { StyledCircle } from './StyledCircle';

export const Map = ({
  isLoaded,
  geolocation,
  center,
  zoom,
  onMarkerAdd,
  marker,
  radius,
  places
}: {
  isLoaded: boolean;
  geolocation: coords | undefined;
  center: coords;
  zoom: number;
  onMarkerAdd: ({ lat, lng }: any) => void;
  marker: coords | null;
  radius: number;
  places: Place[];
}) => {
  const mapRef = useRef(undefined);
  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.user);
  const filters = useTypedSelector((state) => state.filter.filters);

  const [currentPlace, setCurrentPlace] = useState<any | null>(null);

  const onDblClick = (location: any) => {
    const lat = location.latLng.lat();
    const lng = location.latLng.lng();
    onMarkerAdd({ lat, lng });
  };

  const onClick = () => {
    onMarkerAdd(undefined);
  };

  const onLoad = useCallback(function callback(map: any) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback() {
    mapRef.current = undefined;
  }, []);

  if (!isLoaded) {
    return <span className={styles.loader} />;
  }
  const getPlacePhoto = (place: google.maps.places.PlaceResult) => {
    if (place.photos && place.photos.length > 0) {
      const photoUrl = place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });
      return <img src={photoUrl} alt={place.name || 'Place'} />;
    }
    else { return <img src={"src/assets/noimage.png"} alt={place.name || 'Place'} /> }
  }

  const handleAddFavorite = (place: FavPlace) => {
    if (user.id === null) {
      alert('Need to login')
      /* document.getElementById('root').append(<Alert icon={<InfoIcon fontSize="inherit" />} severity="success">
        Here is a gentle confirmation that your action was successful.
      </Alert>) */
    }
    // @ts-ignore
    dispatch(addPlaceToFavorites(user.id, place));
  }

  const handleAddFavoriteCurried = (place: FavPlace) => () => handleAddFavorite(place)

  return (
    <div className="w-75">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onClick={onClick}
        onDblClick={onDblClick}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        {geolocation && <GeolocationMarker location={geolocation} />}
        {marker && <Marker position={marker} />}
        {radius &&
          (marker ? (
            <StyledCircle center={marker} radius={radius} />
          ) : (
            geolocation && <StyledCircle center={geolocation} radius={radius} />
          ))}
        {places.map((place, index) => {
          /* let id = 100;

          console.log(PlacesFilter[place.types[0][0].toUpperCase() + place.types[0].slice(1)])
          for (const placefilt in PlacesFilter) {
            console.log(place.types.indexOf(placefilt.toLowerCase()) >= 0)
            if (place.types.indexOf(placefilt.toLowerCase()) >= 0 && place.types.indexOf(placefilt.toLowerCase()) < id) { id = place.types.indexOf(placefilt.toLowerCase()); }
          }
          console.log(id) */
          return (
            <Marker
              key={index}
              position={{
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              }}
              icon={{
                url: `./src/assets/places/${filters[filters.length - 1]?.toLowerCase()}.svg`,
                scaledSize: new window.google.maps.Size(30, 30)
              }}
              onClick={() => setCurrentPlace(place)}
            />
          );
        })}
        {currentPlace &&
          <InfoWindow
            position={{ lat: currentPlace.geometry?.location?.lat() || 0, lng: currentPlace.geometry?.location?.lng() || 0 }}
            onCloseClick={() => setCurrentPlace(null)}
          >
            <div className={styles.placeInfo}>
              {getPlacePhoto(currentPlace)}
              <div className={styles.placeInfo_title}>
                <h3>{currentPlace.name}</h3>
                {<img src={`./src/assets/places/${filters[filters.length - 1]?.toLowerCase()}.svg`} style={{ width: '30px' }} />}
                <p
                  title={currentPlace.user_ratings_total}
                  className={classNames(
                    currentPlace.rating >= 4 ? styles.well : currentPlace.rating >= 2.5 ? styles.good : styles.bad,
                    styles.rating
                  )}
                >{currentPlace.rating}</p>
                <span className={styles.open}>{currentPlace.opening_hours?.isOpen() ? 'Открыто' : 'Закрыто'}</span>
              </div>
              <p>Адрес: {currentPlace.formatted_address}</p>
              <div className={styles.buttons}>
                <button className={styles.bookmarkbtn} onClick={handleAddFavoriteCurried(currentPlace)}><img src="src/assets/book_btn.png" alt="" />Сохранить</button>
                <button className={styles.routebtn} ><img src="./src/assets/route.png" alt="" />Маршрут</button>
              </div>
            </div>
          </InfoWindow>}
      </GoogleMap>
    </div>
  );
};
