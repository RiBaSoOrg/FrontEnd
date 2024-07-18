import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
    url: 'http://localhost:8080/',
    realm: 'ribaso',
    clientId: 'frontend'
});// Pass initialization options as required or leave blank to load from 'keycloak.json'

export default keycloak