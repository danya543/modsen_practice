import { configureStore } from "@reduxjs/toolkit";
// @ts-ignore
import persistReducer from "redux-persist/es/persistReducer";
// @ts-ignore
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";

import { rootReducer } from "./reducers";

const persistConfig = {
    key: "root",
    storage: storage,
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});
