export const SEARCH_ALL_VICTIMS = 'https://dummyjson.com/users/search';

export const USER_LOGIN_URL = 'auth/login';
export const ADMIN_LOGIN_URL = 'auth/admin-login';
export const USER_SIGNUP_URL = 'auth/signup';
export const PARTIAL_USER_CREATION_URL = 'auth/create-partialuser';
export const USER_VERIFY_URL = 'auth/verify';
export const USER_FORGET_URL = 'auth/forgot-password';
export const USER_RESET_URL = 'auth/reset-password';
export const USER_CHANGE_PASSWORD_URL = 'auth/change-password';

// farmer urls
export const GET_FARMER_DASHBOARD_COUNT_URL = (id: string) =>
  `farmer/${id}/dashboardcount`;

//Aggregator urls
export const GET_AGGREGATOR_DASHBOARD_COUNT_URL = (id: string) =>
  `aggregator/${id}/dashboardcount`;
