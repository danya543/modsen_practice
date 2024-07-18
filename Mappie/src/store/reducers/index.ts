import { combineReducers } from "redux";

import { filterReducer } from "./filterReducer";
/* import { routeReducer } from "./routeReducer";
import { sectionReducer } from "./sectionReducer";
import { zoomReducer } from "./zoomReducer"; */

export const rootReducer = combineReducers({
    /* section: sectionReducer,
    zoom: zoomReducer, */
    filter: filterReducer,
    /* route: routeReducer, */
});

export type RootState = ReturnType<typeof rootReducer>;
