export const environment = {
  production: true,
  api: {
    baseUrl: 'https://...',
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

