import { Place } from "./global.types";
export interface UserState {
    email: string | null,
    token: string | null,
    id: string | null
}

export interface FilterState {
    buildingType: string;
    radius: string;
    name: string;
}

export interface PlacesState {
    places: Place[]
}

export interface FavoritesState {
    favorites: Place[]
}