// src/Keycloak/KeycloakProvider.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Keycloak, { KeycloakInstance } from 'keycloak-js';
import keycloak from "./keycloak-config";

interface AuthContextProps {
    keycloak: KeycloakInstance | null;
    authenticated: boolean;
    token: string | null;
}

const AuthContext = createContext<AuthContextProps>({
    keycloak: null,
    authenticated: false,
    token: null,
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [keycloakInstance, setKeycloakInstance] = useState<KeycloakInstance | null>(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
            setKeycloakInstance(keycloak);
            setAuthenticated(authenticated);
            setToken(keycloak.token || null);
            console.log('Keycloak initialized:', keycloak);
        }).catch(error => {
            console.error('Failed to initialize Keycloak', error);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ keycloak: keycloakInstance, authenticated, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
