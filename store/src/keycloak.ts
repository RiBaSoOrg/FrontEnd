import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://keycloak:8080/',
    realm: 'ribaso',
    clientId: 'frontend'
});

const initKeycloak = (): Promise<void> => {
    return keycloak.init({
        onLoad: 'login-required',
        redirectUri: 'http://localhost:3000/welcome',
    }).then(authenticated => {
        if (!authenticated) {
            console.warn("Not authenticated!");
        }
    }).catch(error => {
        console.error("Keycloak initialization error:", error);
    });
};

export { keycloak, initKeycloak };
