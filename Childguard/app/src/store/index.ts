import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {signUpFormSlice} from "./sign-up-form-slice";
import {loginFormSlice} from "./login-form-slice";
import  {userProfileSlice}  from "./user-profile-slice";
import {volunteerSlice} from './volunteer-opp-slice';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {volunteeredSlice} from "./volunteered-slice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['login'],
  };

const persistedReducer = persistReducer(persistConfig, combineReducers({
    [signUpFormSlice.name]: signUpFormSlice.reducer,
    [loginFormSlice.name]: loginFormSlice.reducer,
    [userProfileSlice.name]: userProfileSlice.reducer,
    [volunteerSlice.name]: volunteerSlice.reducer,
    [volunteeredSlice.name]: volunteeredSlice.reducer
}));

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;