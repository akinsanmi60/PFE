import React from 'react';

const LoginPage = React.lazy(
  () => import('@modules/authentication/login/farmerAggregatorLogin'),
);
const ErrorPage = React.lazy(() => import('@pages/error/error'));
const UnauthourizedPage = React.lazy(() => import('@pages/error/unauthorized'));

const HomePage = React.lazy(() => import('@pages/homePage'));
// const AboutPage = React.lazy(() => import('@pages/about'));
const AboutPage = React.lazy(() => import('@pages/features'));
const ServicePage = React.lazy(() => import('@pages/servicesPage'));
const ContactUsPage = React.lazy(() => import('@pages/contact'));
const BlogPage = React.lazy(() => import('@pages/blog'));
const BlogDetailsPage = React.lazy(
  () => import('@pages/blog/components/blogDetails'),
);

const RegisterPage = React.lazy(
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

const ExporterLogin = React.lazy(
  () => import('@modules/authentication/login/exporterOfftaker'),
);

export const RootLink = {
  login: ':type/login',
  registerFarmerAggregator: 'register-form/:type',
  forgotPassword: 'forgot-password',
  resetPassword: 'reset-password',
  adminLogin: 'admin-login',
  agencyLogin: 'agency-login/:type',
  exporterLogin: 'login/:type',
  registerExporterOfftaker: 'register',
  unauthourized: 'unauthourized',
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

  RegisterPage: {
    element: RegisterPage,
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

  ExporterLogin: {
    element: ExporterLogin,
    path: RootLink.exporterLogin,
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
  ContactUsPage: {
    element: ContactUsPage,
    path: '/contact',
  },
  BlogPage: {
    element: BlogPage,
    path: '/blog',
  },
  BlogDetailsPage: {
    element: BlogDetailsPage,
    path: '/blog/:title',
  },
};

export const AppRouteWithLayout = {
  WebLayout: true,
  AllRoutes: routeWithLayout,
};
