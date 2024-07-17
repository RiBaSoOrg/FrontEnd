import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer'; // Importiere die Footer-Komponente
import { Outlet } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import AppHeader from "./components/NavBar/AppHeader";
import keycloak from './keycloak'
import { ReactKeycloakProvider } from '@react-keycloak/web';

// Definiere die Haupt-App-Komponente
export const App: React.FC = () => {
  return (
      <ReactKeycloakProvider authClient={keycloak}>
    // Umwickle die gesamte App mit dem Redux-Provider, um den Store bereitzustellen
    <Provider store={store}>
      {/* PersistGate sorgt dafür, dass die UI erst gerendert wird, wenn der persistierte Zustand geladen ist */}
    <PersistGate loading={null} persistor={persistor}>
      <div className="App">
        <AppHeader />
        <div className="content">
        <Outlet /> {/* Rendere die Kindrouten-Komponenten */}
      </div>
        <Footer />
      </div>
      </PersistGate>
      </Provider>
      </ReactKeycloakProvider>
  )
};

export default App;
