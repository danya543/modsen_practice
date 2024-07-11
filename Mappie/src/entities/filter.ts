import { PlacesFilter } from "./PlacesFilter";

export type FilterState = {
    filters: PlacesFilter[];
    radius: number;
};

export enum FilterActionType {
    SetFilters = "SET_FILTERS",
    SetRadius = "SET_RADIUS",
    SetAll = "SET_ALL",
}

type SetFilters = {
    type: FilterActionType.SetFilters;
    payload: Set<PlacesFilter>;
};

type SetFilterRadius = {
    type: FilterActionType.SetRadius;
    payload: number;
};

type SetAllFilters = {
    type: FilterActionType.SetAll;
    payload: Filter;
};

export type FilterAction = SetAllFilters | SetFilterRadius | SetFilters;

export class Filter {
    filters: Set<PlacesFilter>;
    radius: number;
    constructor(filters: Set<PlacesFilter>, radius: number) {
        this.filters = filters;
        this.radius = radius;
    }
}
