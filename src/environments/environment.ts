export const environment = {
  production: false,
  api: {
    baseUrl: 'http://localhost:8080/api',
    endpoints: {
      auth: '/auth',
      aspirante: '/aspirante',
      convocatorias: '/convocatorias',
      postulaciones: '/postulaciones',
      evaluacion: '/evaluacion',
      catalogos: '/catalogos'
    },
  },
  auth: {
    mockDelayMs: 0,
    tokenStorageKey: 'auth.token',
    userEmailStorageKey: 'auth.userEmail',
    loginRedirectUrl: '/dashboard',
    logoutRedirectUrl: '/login',
  },
};

