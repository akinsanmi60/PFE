export const SEARCH_ALL_VICTIMS = 'https://dummyjson.com/users/search';

export const USER_LOGIN_URL = 'auth/login';
export const EXPORTER_LOGIN_URL = 'auth/login/exporter';
export const OFFTAKER_LOGIN_URL = 'auth/login/offtaker';
export const AGENCY_LOGIN_URL = 'agency/login';
export const ADMIN_LOGIN_URL = 'admin/login';
export const USER_SIGNUP_URL = 'auth/signup';
export const PARTIAL_USER_CREATION_URL = 'auth/create-partialuser';
export const USER_VERIFY_URL = 'auth/verify';
export const USER_FORGET_URL = 'auth/forgot-password';
export const USER_RESET_URL = 'auth/reset-password';
export const USER_CHANGE_PASSWORD_URL = (id: string) =>
  `auth/${id}/change-password`;

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
export const GET_ALL_FARMER_URL = () => 'farmer/allfarmers';
export const UPDATE_FARMER_URL = (id: string) => `farmer/${id}/update-farmer`;
export const APPROVE_FARMER_URL = (farmerID: string) =>
  `farmer/${farmerID}/approve-farmer`;
export const ACTIVATE_FARMER_URL = (farmerID: string) =>
  `farmer/${farmerID}/activate-farmer`;
export const DEACTIVATE_FARMER_URL = (farmerID: string) =>
  `farmer/${farmerID}/deactivate-farmer`;

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
  `aggregator/${id}/individual-aggregator`;
export const START_AGGREGATOR_EMAIL_VERIFICATION_URL = (id: string) =>
  `aggregator/${id}/update-email`;
export const COMPLETE_AGGREGATOR_EMAIL_VERIFICATION_URL = (id: string) =>
  `aggregator/${id}/complete-email-reset`;
export const GET_ALL_AGGREGATOR_URL = () => 'aggregator/allAggregators';
export const UPDATE_AGGREGATOR_URL = (id: string) =>
  `aggregator/${id}/update-aggregator`;
export const APPROVE_AGGREGATOR_URL = (aggregatorID: string) =>
  `aggregator/${aggregatorID}/approve-aggregator`;
export const ACTIVATE_AGGREGATOR_URL = (aggregatorID: string) =>
  `aggregator/${aggregatorID}/activate-aggregator`;
export const DEACTIVATE_AGGREGATOR_URL = (aggregatorID: string) =>
  `aggregator/${aggregatorID}/deactivate-aggregator`;

//Pentra Hub
export const GET_PENTRAHUB_PRODUCE_URL = () => 'pentrar-hub/getAllHubProduce';

//Produce urls
export const GET_ALL_PRODUCE_URL = () => 'produce/allProduces';
export const ADD_PRODUCE_URL = (id: string) => `produce/${id}/create-produce`;
export const UPDATE_PRODUCE_URL = (id: string) =>
  `produce/${id}/update-produce`;
export const EDIT_PRODUCE_URL = (
  id: string,
  userId: string,
  user_type: string,
) => `/produce/${id}/edit-produce/${userId}/${user_type}`;
export const DELETE_PRODUCE_URL = (id: string) =>
  `produce/${id}/delete-produce`;

export const TRANSFER_PRODUCE_URL = (id: string, userId: string) =>
  `produce/${id}/transfer/${userId}`;
export const GET_USER_PRODUCE_URL = (id: string, type: string) =>
  `produce/${id}/get-produce-by/${type}`;
export const GET_PRODUCE_BY_ID_URL = (id: string) =>
  `produce/${id}/get-produce`;
export const APPROVE_PRODUCE = (produceID: string, adminID: string) =>
  `produce/${produceID}/approved-produce-by/${adminID}`;
export const TRANSFER_PROODUCE = `produce/transfered-produces`;
export const ACCEPT_TRANSFERED_PRODUCE = (id: string, userId: string) =>
  `/produce/${id}/accept-transfer/${userId}`;
export const REJECT_TRANSFERED_PRODUCE = (id: string, userId: string) =>
  `/produce/${id}/reject-transfer/${userId}`;
export const GET_PRODUCE_HANDLER_HISTORY = (id: string) =>
  `produce/${id}/transfer-handler`;

// Admin urls
export const ADD_ADMIN_URL = 'admin/create-admin';
export const GET_ADMIN_DASHBOARD_COUNT_URL = (id: string) =>
  `admin/${id}/dashboard-count`;
export const GET_ALL_ADMIN_OFFICERS = 'admin/all-admins';
export const START_ADMIN_PHONE_VERIFICATION_URL = (id: string) =>
  `admin/${id}/team-update-phonenumber`;
export const COMPLETE_ADMIN_PHONE_VERIFICATION_URL = (id: string) =>
  `admin/${id}/team-complete-phonenumber-reset`;
export const START_ADMIN_EMAIL_VERIFICATION_URL = (id: string) =>
  `admin/${id}/team-update-email`;
export const COMPLETE_ADMIN_EMAIL_VERIFICATION_URL = (id: string) =>
  `admin/${id}/team-complete-email-reset`;
export const ADMIN_UPDATE_PASSWORD_URL = (id: string) =>
  `admin/${id}/change-password`;
export const GET_INDIVIDUAL_ADMIN_URL = (id: string) => `admin/${id}/admin`;

// Check email
export const CHECK_EMAIL_URL = 'auth/check-email-validity';

// Agency urls
export const ADD_AGENCY_URL = 'agency/create-agency';
export const GET_ALL_AGENCY_URL = 'agency/all-agencies';
export const GET_INDIVIDUAL_AGENCY_URL = (id: string) => `agency/${id}/agency`;
export const GET_AGENCYTEAM_MEMBER_URL = (agencyId: string) =>
  `agency/${agencyId}/agency-team`;
export const GET_AGENCY_DASHBOARD_COUNT_URL = (id: string) =>
  `agency/${id}/dashboard-count`;
export const ACTIVATE_AGENCY_URL = (agencyID: string) =>
  `agency/${agencyID}/activate-agency`;
export const DEACTIVATE_AGENCY_URL = (agencyID: string) =>
  `agency/${agencyID}/deactivate-agency`;
export const TEAMMEMBER_COUNT_URL = (agencyId: string) =>
  `agency/${agencyId}/team-count`;
export const CREATE_AGENCY_TEAMMEMBER = (agencyId: string) =>
  `agency/${agencyId}/create-agency-team-member`;
export const TEAMMEMBER_TASKS_COUNT_URL = (agentId: string, agencyId: string) =>
  `agency/${agentId}/task-count/${agencyId}`;
export const TEAMMEMBER_TASKS_URL = (agentId: string, agencyId: string) =>
  `agency/${agentId}/team-tasks/${agencyId}`;
export const GET_INDIVIDUAL_TEAM_MEMBER_URL = (
  agentId: string,
  agencyId: string,
) => `agency/${agentId}/agent-details/${agencyId}`;
export const START_AGENCY_PHONE_VERIFICATION_URL = (id: string) =>
  `agency/${id}/update-phonenumber`;
export const COMPLETE_AGENCY_PHONE_VERIFICATION_URL = (id: string) =>
  `agency/${id}/complete-phonenumber-reset`;
export const START_AGENCY_EMAIL_VERIFICATION_URL = (id: string) =>
  `agency/${id}/update-email`;
export const COMPLETE_AGENCY_EMAIL_VERIFICATION_URL = (id: string) =>
  `agency/${id}/complete-email-reset`;
export const AGENCY_UPDATE_PASSWORD_URL = (id: string) =>
  `agency/${id}/change-password`;

// Exporter urls
export const ADD_EXPORTER_URL = 'exporter/create-exporter';
export const GET_ALL_EXPORTER_URL = 'exporter/allExporters';
export const GET_INDIVIDUAL_EXPORTER_URL = (id: string) =>
  `exporter/${id}/individual-exporter`;
export const GET_EXPORTER_DASHBOARD_COUNT_URL = (id: string) =>
  `exporter/${id}/dashboard-count`;
export const GET_EXPORTER_RECENT_PRODUCE_URL = (id: string) =>
  `exporter/${id}/recentproduce`;
export const UPDATE_EXPORTER_URL = (id: string) =>
  `exporter/${id}/update-exporter`;
export const ACTIVATE_EXPORTER_URL = (exporterID: string) =>
  `exporter/${exporterID}/activate-exporter`;
export const DEACTIVATE_EXPORTER_URL = (exporterID: string) =>
  `exporter/${exporterID}/deactivate-exporter`;
export const START_EXPORTER_PHONE_VERIFICATION_URL = (id: string) =>
  `exporter/${id}/update-phonenumber`;
export const COMPLETE_EXPORTER_PHONE_VERIFICATION_URL = (id: string) =>
  `exporter/${id}/complete-phonenumber-reset`;
export const START_EXPORTER_EMAIL_VERIFICATION_URL = (id: string) =>
  `exporter/${id}/update-email`;
export const COMPLETE_EXPORTER_EMAIL_VERIFICATION_URL = (id: string) =>
  `exporter/${id}/complete-email-reset`;
// Certification
export const SUBMIT_CERTIFICATION_URL = (
  agencyID: string,
  produceID: string,
  exporterID: string,
) =>
  `certification/create/${agencyID}/${produceID}/${exporterID}/certification-request`;
export const GET_ALL_CERTIFICATIONS_URL =
  'certification/get-all-certifications';
export const GET_CERTIFICATION_URL = (
  id: string,
  userId: string,
  userType: string,
) => `certification/${id}/get-request/${userId}/${userType}`;
export const UPDATE_CERTIFICATION_URL = (
  id: string,
  agencyId: string,
  agentId: string,
) => `certification/${id}/update-status/${agencyId}/${agentId}`;
export const AGENCY_UPDATE_CERTIFICATION_URL = (id: string, agencyId: string) =>
  `certification/${id}/update-status/${agencyId}`;
export const ADMIN_UPDATE_CONSENT_CERTIFICATION_URL = (
  id: string,
  adminId: string,
) => `/certification/${id}/consent-certification/${adminId}`;
