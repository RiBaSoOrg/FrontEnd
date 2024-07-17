import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../domain/APIs/BookAPI';
import { login } from '../../slices/authSlice';
import './LoginScreen.css';
import { useNavigate } from 'react-router-dom';
import Test from "../../Test";

function LoginPage() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(''); // Zustand für den Benutzernamen
  const [password, setPassword] = useState(''); // Zustand für das Passwort
  const [error, setError] = useState(''); // Zustand für Fehlermeldungen
  const navigate = useNavigate(); // Hook zum Navigieren


  // Funktion, die aufgerufen wird, wenn der Login-Button geklickt wird
  const handleLogin = async () => {
    try {
      const result = await loginUser({ email: username, password });
      if (result) {
        dispatch(login({ role: result.user.role, token: result.accessToken })); // Aufruf der login-Aktion
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
return <Test></Test>
  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form onSubmit={(e) => {
        e.preventDefault(); // Verhindere das Neuladen der Seite
        handleLogin();
      }} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Benutzername</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Benutzername"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Passwort</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort"
            required
          />
        </div>
        {error && <div className="login-error" style={{ color: 'red' }}>{error}</div>}
        <button type="submit" className="login-button-login-formular">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;