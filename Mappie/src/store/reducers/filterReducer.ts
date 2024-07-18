import { constants } from "@/constants/constants";
import { FilterAction, FilterActionType, FilterState } from "@/entities/filter";

const initialState: FilterState = {
    radius: constants.DEFAULT_RADIUS,
    filters: [],
};

export const filterReducer = (
    state: FilterState = initialState,
    action: FilterAction,
): FilterState => {
    switch (action.type) {
        case FilterActionType.SetFilters:
            console.log(action.payload)
            return { ...state, filters: [...action.payload] };
        default:
            return state;
    }
};
