import './App.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';

import LoginProvidere from "./components/LoginScreen/LoginProvidere";


// Definiere die Haupt-App-Komponente
export const App: React.FC = () => {

  return (
    // Umwickle die gesamte App mit dem Redux-Provider, um den Store bereitzustellen
    <Provider store={store}>
      {/* PersistGate sorgt dafür, dass die UI erst gerendert wird, wenn der persistierte Zustand geladen ist */}
    <PersistGate loading={null} persistor={persistor}>
      <LoginProvidere></LoginProvidere>
      </PersistGate>
      </Provider>
  )
};

export default App;
