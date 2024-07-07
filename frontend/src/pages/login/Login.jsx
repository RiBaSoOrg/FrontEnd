import React, { useState } from 'react';
import './login.css';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        // Replace this with your actual login logic
        if (username === 'user' && password === 'password') {
            setLoggedIn(true);
        } else {
            alert('Please try again, maybe check your spelling');
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
    };

    if (loggedIn) {
        return (
            <div className="login-container">
                <h1 className="welcome-message">Welcome, {username}!</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        );
    }

    return (
        <div className="login-container">
            <h1 className="login-title">Login Page</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
            </div>
            <button onClick={handleLogin} className="login-button">Login</button>
        </div>
    );
};

export default LoginPage;