export const environment = {
  auth: {
    keycloakUrl: import.meta.env.VITE_KEYCLOAK_URL,
    keycloakRealm: import.meta.env.VITE_KEYCLOAK_REALM,
    keycloakClientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
  },
  demoAppServiceUrl: import.meta.env.VITE_DEMO_APP_SERVICE_URL,
  demoAppDomain: import.meta.env.VITE_DEMO_APP_DOMAIN,
};
