import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import {keycloak} from '../../keycloak'
import { ReactKeycloakProvider } from '@react-keycloak/web';
import {login as logindispatch, logout} from "../../slices/authSlice";
import AppHeader from "../NavBar/AppHeader";
import Footer from "../Footer/Footer";
import { createUser, getUser } from '../../domain/APIs/UserAPI';

export const LoginProvidere: React.FC = () => {
    const dispatch = useDispatch();

    const eventLogger = (event: unknown, error: unknown) => {
        console.log('onKeycloakEvent', event, error);
    };

    const tokenLogger = async (tokens: unknown) => {
        // @ts-ignore
        const idToken = tokens?.idToken;
        const userId = keycloak.tokenParsed?.sub;
        const realmRoles = keycloak.tokenParsed?.realm_access?.roles || [];
        console.log('onKeycloakTokens', tokens);

        if (typeof idToken === 'string' && typeof userId === 'string') {
            dispatch(logindispatch({ roles: realmRoles, token: idToken, userId }));

            try {
                const user = await getUser();
                if (!user) {
                    // Erstelle den Benutzer, wenn er nicht existiert
                    const newUser = {
                        id: userId,
                        firstname: keycloak.tokenParsed?.given_name || '',
                        lastname: keycloak.tokenParsed?.family_name || '',
                        billingAddress: {
                            firstname: '',
                            lastname: '',
                            street: '',
                            houseNumber: '',
                            postalCode: '',
                            state: '',
                            city: '',
                        },
                        shippingAddress: {
                            firstname: '',
                            lastname: '',
                            street: '',
                            houseNumber: '',
                            postalCode: '',
                            state: '',
                            city: '',
                        },
                    };
                    await createUser(newUser);
                }
            } catch (error) {
                console.error('Error checking or creating user:', error);
            }
        } else {
            dispatch(logout());
        }
    };

    useEffect(() => {
        if (!keycloak.authenticated) {
            return;
        }
        if (!keycloak.tokenParsed?.realm_access) {
            return;
        }
    }, [keycloak?.authenticated]);

    return (
        <ReactKeycloakProvider
            authClient={keycloak}
            onEvent={eventLogger}
            onTokens={tokenLogger}
        >
            <div className="App">
                <AppHeader />
                <div className="content">
                    <Outlet /> {/* Rendere die Kindrouten-Komponenten */}
                </div>
                <Footer />
            </div>
        </ReactKeycloakProvider>
    );
};

export default LoginProvidere;