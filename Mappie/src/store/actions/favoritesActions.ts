import { Place } from "@/entities/global.types";
import { addFavoritePlace, deleteFavoritePlace } from "@/firestore";

import { addToFavorites, deleteFromFavoritesList } from "../reducers/favoritesSlice";
import { AppDispatch } from "../store";

export const addPlaceToFavorites = (userId: string, place: Place) => async (dispatch: AppDispatch) => {
    const favPlaces = JSON.parse(localStorage.getItem('favourite-places') ?? '[]')
    if (favPlaces.every((el: { place_id: string }) => el.place_id !== place.place_id)) {
        try {
            dispatch(addToFavorites(place));
            const favPlaces = JSON.parse(localStorage.getItem('favourite-places') ?? '[]');
            const places = favPlaces.length > 0 ? [...favPlaces, place] : [place];
            localStorage.setItem('favourite-places', JSON.stringify(places));
            await addFavoritePlace(userId, place.place_id);
        } catch (error) {
            console.error("Failed to add place:", error);
        }
    }
}
export const deletePlaceFromFavorites = (userId: string, placeId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteFromFavoritesList(placeId));
        const favPlaces = JSON.parse(localStorage.getItem('favourite-places') ?? '[]');
        localStorage.setItem('favourite-places', JSON.stringify(favPlaces.filter((el: { place_id: string }) => el.place_id !== placeId)));
        await deleteFavoritePlace(userId, placeId);
    } catch (error) {
        console.error("Failed to delete place:", error);
    }
}