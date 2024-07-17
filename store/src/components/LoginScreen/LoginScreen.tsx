// src/pages/LoginPage.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../slices/authSlice';
import './LoginScreen.css';
import { useAuth } from '../../Keycloak/KeycloakProvider';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keycloak, authenticated, token } = useAuth();

  useEffect(() => {
    console.log('useEffect triggered');
    console.log('Authenticated:', authenticated);
    console.log('Keycloak:', keycloak);
    console.log('Token:', token);

    if (authenticated && keycloak && token) {
      console.log('User is authenticated, processing login');
      const userProfile = keycloak.tokenParsed;
      console.log('User Profile:', userProfile);
      const role = userProfile?.realm_access?.roles[0]; // Beispiel: Abrufen der ersten Rolle
      console.log('Role:', role);

      dispatch(login({ role, token }));
      navigate('/welcome');
    }
  }, [authenticated, keycloak, token, dispatch, navigate]);

  const handleLogin = () => {
    console.log('Login button clicked');
    if (keycloak) {
      console.log('Keycloak instance found, redirecting to login');
      keycloak.login();
    } else {
      console.log('No Keycloak instance found');
    }
  };

  return (
      <div className="login-container">
        <h2 className="login-header">Login</h2>
        {!authenticated && (
            <button onClick={handleLogin} className="login-button">
              Login with Keycloak
            </button>
        )}
      </div>
  );
};

export default LoginPage;
