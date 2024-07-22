import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterState } from "@/entities/redux.types";

const initialState: FilterState = {
    filters: [],
    radius: 0,
    name: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<{ filters: string, radius: number }>) => {
            state.filters.push(action.payload.filters);
            state.radius = action.payload.radius;
        },
        clearFilter: (state, action: PayloadAction<{ radius: number }>) => {
            state.filters = [];
            state.radius = action.payload.radius;
        }
    }
});

export const { setFilter, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
