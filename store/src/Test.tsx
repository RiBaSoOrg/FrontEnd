import * as React from 'react'
import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { useDispatch } from 'react-redux'
import { login as reduxLogin } from './slices/authSlice';

const Test = () => {
    let navigate = useNavigate();
    const location = useLocation()
    const currentLocationState = location.state || {
        from: { pathname: '/home' },
    }

    const { keycloak } = useKeycloak()
    const dispatch = useDispatch();

    const handlelogin = useCallback(() => {
        keycloak?.login({ redirectUri: "http://localhost:3000/welcome" })
    }, [keycloak])

    useEffect(() => {
        if (keycloak?.authenticated) {
            // Holen des Tokens und Benutzerinformationen von Keycloak
            const token = keycloak.token || '';
            const userRole = keycloak.realmAccess?.roles[0] || 'user'; // Beispiel: Nimm die erste Rolle, die Keycloak zurückgibt

            // Update des Redux-Store mit den Benutzerinformationen
            dispatch(reduxLogin({ role: userRole, token }));

            navigate("/welcome")
        }
    }, [keycloak?.authenticated, dispatch, navigate]);

    return (
        <div>
            <button type="button" onClick={handlelogin}>
                Login
            </button>
        </div>
    )
}

export default Test