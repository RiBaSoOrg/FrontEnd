import React, {useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../domain/APIs/BookAPI';
import {login as logindispatch, login} from '../../slices/authSlice';
import './LoginScreen.css';
import {useLocation, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

function LoginPage() {
  const [username, setUsername] = useState(''); // Zustand für den Benutzernamen
  const [password, setPassword] = useState(''); // Zustand für das Passwort
  const [error, setError] = useState(''); // Zustand für Fehlermeldungen
  const navigate = useNavigate(); // Hook zum Navigieren
  const dispatch = useDispatch();


  // Funktion, die aufgerufen wird, wenn der Login-Button geklickt wird
  const handleLogin = async () => {
    try {
      const result = await loginUser({ email: username, password });
      if (result) {
       // dispatch(login({ roles: result.user.role, token: result.accessToken })); // Aufruf der login-Aktion
        setError(''); // Setzt die Fehlermeldung zurück
        navigate('/welcome'); // Navigiert zur Willkommensseite
      } else {
        setError('Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldeinformationen.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login fehlgeschlagen. Bitte versuchen Sie es später erneut.');
    }
  };

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
      dispatch(logindispatch({ roles: keycloak.resourceAccess.account.roles, token: keycloak.idToken })); // Aufruf der login-Aktion
      if (keycloak?.authenticated){
        return navigate("/welcome")
      }
    },[keycloak?.authenticated]);

    return (
        <div>
          <button type="button" onClick={login}>
            Login
          </button>
        </div>
    )
  }


export default LoginPage;