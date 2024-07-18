import React, {useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {login as logindispatch, login, logout} from '../../slices/authSlice';
import './LoginScreen.css';
import {useLocation, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

function LoginPage() {
  const [username, setUsername] = useState(''); // Zustand für den Benutzernamen
  const [password, setPassword] = useState(''); // Zustand für das Passwort
  const [error, setError] = useState(''); // Zustand für Fehlermeldungen
  const navigate = useNavigate(); // Hook zum Navigieren
  const dispatch = useDispatch();
  

    const location = useLocation()
    const currentLocationState = location.state || {
      from: { pathname: '/home' },
    }

    const { keycloak } = useKeycloak()

    const login = useCallback(() => {
      keycloak?.login({redirectUri:"http://localhost:3000/welcome"})
    }, [keycloak])

    useEffect(() => {
      if (!keycloak.resourceAccess) {return }
      if (!keycloak.idToken) {return }

      const userId = keycloak.tokenParsed?.sub;
      const roles = keycloak.resourceAccess.account?.roles


      if (typeof keycloak.idToken === 'string' && userId) {
        dispatch(logindispatch({ roles, token: keycloak.idToken, userId })); // Aufruf der login-Aktion mit Benutzer-ID
      } else {
        dispatch(logout());
      }
      if (keycloak?.authenticated) {
        navigate('/welcome');
      }
    }, [keycloak?.authenticated, keycloak.resourceAccess, keycloak.idToken, keycloak.tokenParsed, dispatch, navigate]);

    return (
        <div className="login-container">
          <h2 className="login-header">Login</h2>
          <button className="login-button" type="button" onClick={login}>
            Login via Keycloak
          </button>
        </div>
    )
}


export default LoginPage;