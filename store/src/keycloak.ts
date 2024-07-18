import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
    url: 'http://keycloak:8080/',
    realm: 'ribaso',
    clientId: 'frontend'
});// Pass initialization options as required or leave blank to load from 'keycloak.json'

keycloak.init({
    onLoad: 'login-required',
    redirectUri: 'http://localhost:3000/welcome',
  });

export default keycloak