import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Place } from '@/entities/global.types';
import { PlacesState } from "@/entities/redux.types";


const initialState: PlacesState = {
    places: []
};

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        setPlacesList: (state, action: PayloadAction<Place[]>) => {
            state.places = action.payload;
        },
        clearPlacesList: (state) => {
            state.places = []
        }
    }
});

export const { setPlacesList, clearPlacesList } = placesSlice.actions;

export default placesSlice.reducer;
