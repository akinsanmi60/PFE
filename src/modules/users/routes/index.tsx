import { Account } from '@utils/constants';
import React from 'react';
import UserLayout from '..';

const HomeDashBoard = React.lazy(
  () => import('@modules/users/pages/dashboard'),
);
const UserPentrarHub = React.lazy(
  () => import('@modules/users/pages/userPentrarHub'),
);

const UserProduce = React.lazy(
  () => import('@modules/users/pages/userProduce'),
);
const userRoutes = {
  HomeDashBoard: {
    element: HomeDashBoard,
    path: 'dashboard',
  },
  UserPentrarHub: {
    element: UserPentrarHub,
    path: 'pentrar-hub',
  },
  UserProduce: {
    element: UserProduce,
    path: 'my-produces',
  },
};

export const UserAppRoute = {
  AppLayout: UserLayout,
  IndexRoute: HomeDashBoard,
  AllowedRoles: [Account.Aggregator, Account.Farmer],
  BasePath: 'pentrar/user',
  ListedRoutes: userRoutes,
};
