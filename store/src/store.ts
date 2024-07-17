// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// Kombiniere die Authentifizierungs- und Warenkorb-Reducer zu einem Root-Reducer
const rootReducer = combineReducers({
  auth: authReducer, // Authentifizierungszustand
  cart: cartReducer,  // Warenkorbzustand
});

// Konfigurationsobjekt für Redux Persist
const persistConfig = {
  key: 'root', // Schlüssel für die Persistenz
  storage, // Speicherort (hier lokaler Speicher)
  whitelist: ['auth', 'cart'], // Nur auth und cart werden persistiert
};

// Erstelle einen persistierten Reducer mit der Konfiguration und dem Root-Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Konfiguriere den Redux-Store mit dem persistierten Reducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Erstelle einen Persistor für den Store
export const persistor = persistStore(store);

// Definiere den Typ des Root-Zustands, der den Zustand des gesamten Stores repräsentiert
export type RootState = ReturnType<typeof store.getState>;

// Definiere den Typ des Dispatchers des Stores
export type AppDispatch = typeof store.dispatch;
