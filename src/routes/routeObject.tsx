import React from 'react';

const LoginPage = React.lazy(
  () => import('@modules/authentication/login/index'),
);
const ErrorPage = React.lazy(() => import('@pages/error/error'));
const UnauthourizedPage = React.lazy(() => import('@pages/error/unauthorized'));

const HomePage = React.lazy(() => import('@pages/homePage'));

const VerifyPasswordPage = React.lazy(
  () => import('@modules/authentication/verifyEmail'),
);

const noLayoutRoutes = {
  LoginPage: {
    element: LoginPage,
    path: '/login',
  },

  ErrorPage: {
    element: ErrorPage,
    path: '*',
  },
  UnauthourizedPage: {
    element: UnauthourizedPage,
    path: '/unauthourized',
  },
  VerifyPasswordPage: {
    element: VerifyPasswordPage,
    path: '/verify-email',
  },
};

export const AppRouteWithoutLayout = {
  WebLayout: false,
  AllRoutes: noLayoutRoutes,
};

// WithLayout
const routeWithLayout = {
  HomePage: {
    element: HomePage,
    path: '/',
  },
};

export const AppRouteWithLayout = {
  WebLayout: true,
  AllRoutes: routeWithLayout,
};
