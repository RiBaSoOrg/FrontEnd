import * as React from 'react'
import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'


const Test = () => {
    let navigate = useNavigate();
    const location = useLocation()
    const currentLocationState = location.state || {
        from: { pathname: '/home' },
    }

    const { keycloak } = useKeycloak()

    const login = useCallback(() => {
        keycloak?.login({redirectUri:"http://localhost:3000/welcome"})
    }, [keycloak])

    useEffect(() => {
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

export default Test