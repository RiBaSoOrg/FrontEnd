// src/keycloak-config.ts
import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: 'https://keycloak:8080/auth',
    realm: 'ribaso',
    clientId: 'userservice',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
