import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';

const Redirect: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated); // Hole den Authentifizierungsstatus aus dem AuthContext

  // Überprüfe, ob der Benutzer authentifiziert ist
  if (isAuthenticated) {
    // Wenn der Benutzer authentifiziert ist, leite zur Willkommensseite weiter
    return <Navigate to="/welcome" replace />;
  }
  // Wenn der Benutzer nicht authentifiziert ist, leite zur Login-Seite weiter
  return <Navigate to="/login" replace />;
};

export default Redirect;
