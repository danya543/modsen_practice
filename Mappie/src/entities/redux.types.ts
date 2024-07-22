import { Place } from "./global.types";
export interface UserState {
    email: string | null,
    token: string | null,
    id: string | null
}

export interface FilterState {
    filters: Array<string>;
    radius: number;
    name: string;
}

export interface PlacesState {
    places: Place[]
}

export interface FavoritesState {
    favorites: Place[]
}