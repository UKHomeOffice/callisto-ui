import Keycloak from 'keycloak-js';
const keycloak = new Keycloak('./keycloak-config.json');

export default keycloak;
