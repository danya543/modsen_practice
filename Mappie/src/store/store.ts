import { configureStore } from '@reduxjs/toolkit';
import { thunk } from "redux-thunk";

import favoritesReducer from "./reducers/favoritesSlice";
import filterReducer from './reducers/filterSlice';
import placesReducer from "./reducers/placesSlice";
import userReducer from './reducers/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        filter: filterReducer,
        places: placesReducer,
        favorites: favoritesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export default store;