import { Dispatch } from "redux";

import { Filter, FilterAction, FilterActionType } from "@/entities/filter";
import { PlacesFilter } from "@/entities/PlacesFilter";

export const setFilters = (filters: Set<PlacesFilter>) => {
    return (dispatch: Dispatch<FilterAction>) => {
        dispatch({ type: FilterActionType.SetFilters, payload: filters });
    };
};

export const setRadius = (radius: number) => {
    return (dispatch: Dispatch<FilterAction>) => {
        dispatch({ type: FilterActionType.SetRadius, payload: radius });
    };
};

export const setAllFilters = (filters: Set<PlacesFilter>, radius: number) => {
    return (dispatch: Dispatch<FilterAction>) => {
        dispatch({
            type: FilterActionType.SetAll,
            payload: new Filter(filters, radius),
        });
    };
};
