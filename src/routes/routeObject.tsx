import React from 'react';

const LoginPage = React.lazy(
  () => import('@modules/authentication/login/farmerAggregatorLogin'),
);
const ErrorPage = React.lazy(() => import('@pages/error/error'));
const UnauthourizedPage = React.lazy(() => import('@pages/error/unauthorized'));

const HomePage = React.lazy(() => import('@pages/homePage'));
const AboutPage = React.lazy(() => import('@pages/about'));
const ServicePage = React.lazy(() => import('@pages/servicesPage'));

const FarmerAggregatorRegisterPage = React.lazy(
  () => import('@modules/authentication/register/farmerAggregatorForm'),
);

const AdminLogin = React.lazy(
  () => import('@modules/authentication/login/adminLogin'),
);

const ForgotPasswordPage = React.lazy(
  () => import('@modules/authentication/forgotPassword'),
);

const ResetPasswordPage = React.lazy(
  () => import('@modules/authentication/resetPassword'),
);

const AgencyLogin = React.lazy(
  () => import('@modules/authentication/login/agencyLogin'),
);

export const RootLink = {
  login: '/login',
  registerFarmerAggregator: '/register-form',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  adminLogin: '/admin-login',
  agencyLogin: '/agency-login',
  registerExporterOfftaker: '/register',
  unauthourized: '/unauthourized',
  error: '*',
};

const noLayoutRoutes = {
  LoginPage: {
    element: LoginPage,
    path: RootLink.login,
  },

  ErrorPage: {
    element: ErrorPage,
    path: RootLink.error,
  },

  AdminLogin: {
    element: AdminLogin,
    path: RootLink.adminLogin,
  },

  AgencyLogin: {
    element: AgencyLogin,
    path: RootLink.agencyLogin,
  },

  UnauthourizedPage: {
    element: UnauthourizedPage,
    path: RootLink.unauthourized,
  },

  FarmerAggregatorRegisterPage: {
    element: FarmerAggregatorRegisterPage,
    path: RootLink.registerFarmerAggregator,
  },

  ForgotPasswordPage: {
    element: ForgotPasswordPage,
    path: RootLink.forgotPassword,
  },

  ResetPasswordPage: {
    element: ResetPasswordPage,
    path: RootLink.resetPassword,
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
