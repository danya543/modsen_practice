import { useLoadScript } from "@react-google-maps/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { FavPlace } from "@/entities/FavPlaces";
import { getFavoritePlaces } from "@/firestore";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { deletePlaceFromFavorites } from "@/store/actions/favoritesActions";
import { addToFavorites } from "@/store/reducers/favoritesSlice";

import styles from '../style.module.css'

export const Favourites = () => {
  //const data = [{ primaryText: 'a', secondaryText: 'b', img: '' }, { primaryText: 'a', secondaryText: 'b', img: '' }, { primaryText: 'a', secondaryText: 'b', img: '' }, { primaryText: 'a', secondaryText: 'b', img: '' }, { primaryText: 'a', secondaryText: 'b', img: '' }, { primaryText: 'a', secondaryText: 'b', img: '' }, { primaryText: 'a', secondaryText: 'b', img: '' }]

  const userId = useTypedSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    const fetchFavoritePlaces = async () => {
      if (isLoaded) {
        const service = new window.google.maps.places.PlacesService(
          document.createElement('div')
        );

        try {
          const favoritePlacesId = await getFavoritePlaces(userId);

          favoritePlacesId.forEach((item) => {
            // @ts-ignore
            const placeId = item.place_id;
            const request = {
              placeId: placeId,
              fields: ['name', 'formatted_address', 'geometry', 'photos', 'place_id'],
            };
            // @ts-ignore
            service.getDetails(request, (place, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                // @ts-ignore
                dispatch(addToFavorites(place));
              } else {
                console.error('Place details request failed:', status);
              }
            });
          });
        } catch (error) {
          console.error('Error fetching favorite places:', error);
        }
      } else if (loadError) {
        console.log(loadError);
      }
    };

    fetchFavoritePlaces();
  }, [isLoaded, loadError, userId, dispatch]);

  const data = useTypedSelector((state) => state.favorites.favorites);

  const handleDeleteFavourite = (place: FavPlace) => {
    // @ts-ignore
    dispatch(deletePlaceFromFavorites(userId, place.place_id));
  }

  const handleDeleteFavPlace = (place: FavPlace) => () => handleDeleteFavourite(place);

  return (data.length >= 1 ?
    <div className={styles.favouriteContainer}>
      <h6>Избранное</h6>
      {data.map((place: FavPlace) =>
        <div className={styles.infoWindow}>
          <img src={place.photos ? place.photos[0].getUrl({ maxWidth: 400, maxHeight: 200 }) : 'src/assets/noimage.png'} alt="" className={styles.image} />
          {/* <img src="src/assets/close1.png" alt="" className={styles.cross} onClick={closeWindow} /> */}
          <h3>{place.name}</h3>
          <p>lat: {place.geometry.lat}, lng: {place.geometry.lng}</p>
          <div className={styles.buttons}>

            <button className={styles.bookmarkbtn} onClick={handleDeleteFavPlace(place)}><img src="src/assets/book_btn.png" alt="" />Сохранено</button>
            <button className={styles.routebtn} ><img src="src/assets/route.png" alt="" />Маршрут</button>
          </div>
        </div>)}
    </div>
    :
    <div>No favourite places</div>
  );
};
