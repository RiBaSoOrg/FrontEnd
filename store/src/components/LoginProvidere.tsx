import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import keycloak from '../keycloak'
import { ReactKeycloakProvider } from '@react-keycloak/web';
import {login as logindispatch, logout} from "../slices/authSlice";
import AppHeader from "./NavBar/AppHeader";
import Footer from "./Footer/Footer";


export const LoginProvidere: React.FC = () => {
    const dispatch = useDispatch();

    const eventLogger = (event: unknown, error: unknown) => {
        console.log('onKeycloakEvent', event, error)
    }

    const tokenLogger = (tokens: unknown) => {

        // @ts-ignore
        const idToken = tokens?.idToken
        const userId = keycloak.tokenParsed?.sub; 
        console.log('onKeycloakTokens', tokens)
        if (typeof idToken === "string" && typeof userId === "string" ) {
            dispatch(logindispatch({roles: [], token: idToken, userId })); // Aufruf der login-Aktion
        }
        if (typeof idToken === "undefined") {
            dispatch(logout());
        }
    }

    useEffect(() => {
        if (!keycloak.resourceAccess) {return }
        if (!keycloak.idToken) {return }
    },[keycloak?.authenticated]);

    return (
        <ReactKeycloakProvider authClient={keycloak}
                               onEvent={eventLogger}
                               onTokens={tokenLogger}>
            // Umwickle die gesamte App mit dem Redux-Provider, um den Store bereitzustellen
                    <div className="App">
                        <AppHeader />
                        <div className="content">
                            <Outlet /> {/* Rendere die Kindrouten-Komponenten */}
                        </div>
                        <Footer />
                    </div>
        </ReactKeycloakProvider>
    )
};

export default LoginProvidere;
