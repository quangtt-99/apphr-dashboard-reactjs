export const REDUX_STATE = {
  login: {
    SET_TOKEN: 'SET_TOKEN',
    GET_TOKEN: 'GET_TOKEN',
    LOG_OUT: 'LOG_OUT',
  },
  location: {
    SET_PROVINCES: 'SET_PROVINCES',
    SET_DISTRICTS: 'SET_DISTRICTS',
    SET_WARDS: 'SET_WARDS',
  },
  setting: {
    SET_GENERAL: 'SET_GENERAL',
  },

  shift: {
    EMPTY_VALUE: 'EMPTY_VALUE',
    GET_SHIFT: 'GET_SHIFT',
    SET_SHIFT: 'SET_SHIFT',
    GET_SHIFTS: 'GET_SHIFTS',
    DELETE_SHIFT: 'DELETE_SHIFT',
  },

  branch: {
    SET_BRANCHES: 'SET_BRANCHES',
    SET_BRANCH: 'SET_BRANCH',
    GET_BRANCH: 'GET_BRANCH',
    GET_BRANCHES: 'GET_BRANCHES',
    DELETE_BRANCH: 'DELETE_BRANCH',
    EMPTY_VALUE: 'EMPTY_VALUE',
  },

  department: {
    SET_DEPARTMENTS: 'SET_DEPARTMENTS',
    SET_DEPARTMENT: 'SET_DEPARTMENT',
    DELETE_DEPARTMENT: 'DELETE_DEPARTMENT',
    RESET_DEPARTMENT: 'RESET_DEPARTMENT',
  },

  position: {
    GET_POSITION: 'GET_POSITION',
    UPDATE_POSITION: 'UPDATE_NEW_POSITION',
    GET_POSITIONS: 'GET_POSITIONS',
    DELETE_POSITION: 'DELETE_POSITION',
    EMPTY_VALUE: 'EMPTY_VALUE',
    SET_DELETED_BRANCH_ID: 'SET_DELETED_BRANCH_ID',
  },
  style: {
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    CHANGE_SIDE_BAR_SHOW: 'CHANGE_SIDE_BAR_SHOW',
  },
  header: {
    CHANGE_ACTIONS: 'CHANGE_ACTIONS',
  },
  holiday: {
    SET_HOLIDAYS: 'SET_HOLIDAYS',
    SET_HOLIDAY: 'SET_HOLIDAY',
    GET_HOLIDAY: 'GET_HOLIDAY',
    GET_HOLIDAYS: 'GET_HOLIDAYS',
    DELETE_HOLIDAY: 'DELETE_HOLIDAY',
    EMPTY_VALUE: 'EMPTY_VALUE',
    GET_REQUESTS: 'GET_REQUESTS',
    GET_REQUEST: 'GET_REQUEST',
  },
  user: {
    SET_USER: 'SET_USER',
  },
  account: {
    SET_ACCOUNTS: 'SET_ACCOUNTS',
    SET_ACCOUNT: 'SET_ACCOUNT',
    GET_ACCOUNT: 'GET_ACCOUNT',
    GET_ACCOUNTS: 'GET_ACCOUNTS',
    DELETE_ACCOUNT: 'DELETE_ACCOUNT',
    EMPTY_VALUE: 'EMPTY_VALUE',
    GET_ROLES: 'GET_ROLES',
  },
  role: {
    SET_ROLES: 'SET_ROLES',
    SET_ROLE: 'SET_ROLE',
    GET_ROLE: 'GET_ROLE',
    GET_ROLES: 'GET_ROLES',
    DELETE_ROLE: 'DELETE_ROLE',
    EMPTY_VALUE: 'EMPTY_VALUE',
    SET_PERMISSIONS: 'SET_PERMISSIONS',
  },
  profile: {
    SET_PROFILES: 'SET_ACCOUNTS',
    SET_PROFILE: 'SET_ACCOUNT',
    DELETE_PROFILE: 'DELETE_ACCOUNT',
    EMPTY_VALUE: 'EMPTY_ACCOUNT_VALUE',
    GET_ROLES: 'GET_ROLES',
    SET_TAB_NAME: 'SET_TAB_NAME',
    SET_SUB_TAB_NAME: 'SET_SUB_TAB_NAME',
  },
};
