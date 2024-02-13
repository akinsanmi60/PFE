import React from 'react';

const LoginPage = React.lazy(
  () => import('@modules/authentication/login/index'),
);
const ErrorPage = React.lazy(() => import('@pages/error/error'));
const UnauthourizedPage = React.lazy(() => import('@pages/error/unauthorized'));

const HomePage = React.lazy(() => import('@pages/homePage'));
const AboutPage = React.lazy(() => import('@pages/about'));
const ServicePage = React.lazy(() => import('@pages/servicesPage'));

const FarmerAggregatorRegisterPage = React.lazy(
  () => import('@modules/authentication/register/farmerAggregatorForm'),
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

  FarmerAggregatorRegisterPage: {
    element: FarmerAggregatorRegisterPage,
    path: '/register/farmer-aggregator',
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
  AboutPage: {
    element: AboutPage,
    path: '/about',
  },
  ServicePage: {
    element: ServicePage,
    path: '/services',
  },
};

export const AppRouteWithLayout = {
  WebLayout: true,
  AllRoutes: routeWithLayout,
};
