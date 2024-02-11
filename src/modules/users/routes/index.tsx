// import { Account } from '@utils/constants';
// import React from 'react';
// import AdminLayout from '..';

// const AdminDashBoard = React.lazy(
//   () => import('@modules/admin/pages/dashboard'),
// );
// const AdminProfile = React.lazy(() => import('@modules/admin/pages/profile'));
// const AllUsers = React.lazy(() => import('@modules/admin/pages/users'));
// const AllVictims = React.lazy(() => import('@modules/admin/pages/victims'));
// const AdminList = React.lazy(() => import('@modules/admin/pages/admins'));
// const VictimPage = React.lazy(
//   () => import('@modules/admin/pages'),
// );

// const adminRoutes = {
//   AdminDashBoard: {
//     element: AdminDashBoard,
//     path: 'dashboard',
//   },
//   AdminProfil: {
//     element: AdminProfile,
//     path: 'profile',
//   },
//   AllVictims: {
//     element: AllVictims,
//     path: 'victims-list',
//   },
//   VictimPage: {
//     element: VictimPage,
//     path: 'victims-list/victim/:id',
//   },
//   AllUsers: {
//     id: '3',
//     element: AllUsers,
//     path: 'users-list',
//   },
//   AdminList: {
//     element: AdminList,
//     path: 'admin-list',
//   },
// };

// export const AdminAppRoute = {
//   AppLayout: AdminLayout,
//   IndexRoute: AdminDashBoard,
//   AllowedRoles: [Account.superAdmin],
//   BasePath: 'sadmin',
//   ListedRoutes: adminRoutes,
// };
