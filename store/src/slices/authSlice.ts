// src/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definiere das Authentifizierungs-Zustands-Interface
interface AuthState {
  isAuthenticated: boolean; // Gibt an, ob der Benutzer authentifiziert ist
  userRoles: string[] | null; // Die Rolle des Benutzers (z.B. 'admin' oder 'non-admin')
  authToken: string | null; // Das Authentifizierungs-Token des Benutzers
}
// Initialer Zustand des Authentifizierungs-Zustands
const initialState: AuthState = {
  isAuthenticated: false, // Der Benutzer ist standardmäßig nicht authentifiziert
  userRoles: null, // Keine Rolle standardmäßig
  authToken: null, // Kein Authentifizierungs-Token standardmäßig
};

// Erstelle einen Slice für den Authentifizierungs-Zustand
const authSlice = createSlice({
  name: 'auth', // Name des Slices
  initialState,  // Initialer Zustand des Slices
  reducers: {
    // Definiere den Reducer für das Login
    login: (state, action: PayloadAction<{ roles: string[], token: string }>) => {
      state.isAuthenticated = true; // Setze den Zustand auf authentifiziert
      state.userRoles = action.payload.roles; // Speichere die Rolle des Benutzers
      state.authToken = action.payload.token; // Speichere das Authentifizierungs-Token
    },
    // Definiere den Reducer für das Logout
    logout: (state) => {
      state.isAuthenticated = false; // Setze den Zustand auf nicht authentifiziert
      state.userRoles = null; // Entferne die Rolle des Benutzers
      state.authToken = null; // Entferne das Authentifizierungs-Token
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
