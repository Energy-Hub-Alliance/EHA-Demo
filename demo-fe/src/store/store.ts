import {
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import storage from 'redux-persist/lib/storage';
import { LOCALE_FEATURE_KEY, localeReducer } from './locale.slice';
import { vehicleApi } from './vehicle/vehicleApi';
import { USER_FEATURE_KEY, userReducer } from './user.slice';
import { connectApi } from './connect/connectApi';
import { vendorAccountApi } from './vendorAccount/vendorAccountApi';
import { linkApi } from './link/linkApi';
import { tariffApi } from './tariff/tariffApi';
import { hvacApi } from './hvac/hvacApi';
import { VENDORS_FEATURE_KEY, vendorsReducer } from './vendors.slice';
import { batteryApi } from './home-power/battery/batteryApi';
import { pvInverterApi } from './home-power/pv-inverter/pvInverterApi';
import { meterApi } from './home-power/meters/meterApi';
import { chargingHardwareApi } from './charging-hardware/chargingHardwareApi';

const persistConfig = {
  key: 'DEMO_FE',
  storage,
  // Must keep a whitelist value here or
  // the whole store will be persisted
  whitelist: [LOCALE_FEATURE_KEY, VENDORS_FEATURE_KEY],
};

export const rootReducer = combineReducers({
  [LOCALE_FEATURE_KEY]: localeReducer,
  [USER_FEATURE_KEY]: userReducer,
  [VENDORS_FEATURE_KEY]: vendorsReducer,
  [vehicleApi.reducerPath]: vehicleApi.reducer,
  [vendorAccountApi.reducerPath]: vendorAccountApi.reducer,
  [connectApi.reducerPath]: connectApi.reducer,
  [linkApi.reducerPath]: linkApi.reducer,
  [tariffApi.reducerPath]: tariffApi.reducer,
  [hvacApi.reducerPath]: hvacApi.reducer,
  [batteryApi.reducerPath]: batteryApi.reducer,
  [pvInverterApi.reducerPath]: pvInverterApi.reducer,
  [meterApi.reducerPath]: meterApi.reducer,
  [chargingHardwareApi.reducerPath]: chargingHardwareApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const initStore = (preloadedState = {}) =>
  configureStore({
    preloadedState,
    reducer: persistedReducer,
    // Additional middleware can be passed to this array
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      }).concat(
        vehicleApi.middleware,
        vendorAccountApi.middleware,
        connectApi.middleware,
        linkApi.middleware,
        tariffApi.middleware,
        hvacApi.middleware,
        batteryApi.middleware,
        pvInverterApi.middleware,
        meterApi.middleware,
        chargingHardwareApi.middleware
      ),
    devTools: import.meta.env.DEV || import.meta.env.MODE === 'development',

    // Optional Redux store enhancers
    enhancers: [],
  });

export const store = initStore();
export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
