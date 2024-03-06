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
export const GET_FARMER_RECENT_PRODUCE_URL = (id: string) =>
  `farmer/${id}/recentproduce`;
export const START_FARMER_PHONE_VERIFICATION_URL = (id: string) =>
  `farmer/${id}/update-phonenumber`;
export const COMPLETE_FARMER_PHONE_VERIFICATION_URL = (id: string) =>
  `farmer/${id}/complete-phonenumber-reset`;
export const GET_INDIVIDUAL_FARMER_URL = (id: string) =>
  `farmer/${id}/individual-farmer`;
export const START_FARMER_EMAIL_VERIFICATION_URL = (id: string) =>
  `farmer/${id}/update-email`;
export const COMPLETE_FARMER_EMAIL_VERIFICATION_URL = (id: string) =>
  `farmer/${id}/complete-email-reset`;

//Aggregator urls
export const GET_AGGREGATOR_DASHBOARD_COUNT_URL = (id: string) =>
  `aggregator/${id}/dashboardcount`;
export const GET_AGGREGATOR_RECENT_PRODUCE_URL = (id: string) =>
  `aggregator/${id}/recentproduce`;

export const START_AGGREGATOR_PHONE_VERIFICATION_URL = (id: string) =>
  `aggregator/${id}/update-phonenumber`;
export const COMPLETE_AGGREGATOR_PHONE_VERIFICATION_URL = (id: string) =>
  `aggregator/${id}/complete-phonenumber-reset`;
export const GET_INDIVIDUAL_AGGREGATOR_URL = (id: string) =>
  `farmer/${id}/individual-aggregator`;
export const START_AGGREGATOR_EMAIL_VERIFICATION_URL = (id: string) =>
  `aggregator/${id}/update-email`;
export const COMPLETE_AGGREGATOR_EMAIL_VERIFICATION_URL = (id: string) =>
  `aggregator/${id}/complete-email-reset`;

//Pentra Hub
export const GET_PENTRAHUB_PRODUCE_URL = () => 'pentrar-hub/getAllHubProduce';
