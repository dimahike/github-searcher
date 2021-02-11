import {
  USERS_REPOS_FAIL,
  USERS_REPOS_REQUEST,
  USERS_REPOS_RESET,
  USERS_REPOS_SUCCESS,
  USER_INFO_FAIL,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
} from '../constants/constants';

export const userListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const usersReposReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case USERS_REPOS_REQUEST:
      return { loading: true };
    case USERS_REPOS_SUCCESS:
      const users = !state.users ? [action.payload] : [...state.users, action.payload];

      return { loading: false, users };
    case USERS_REPOS_FAIL:
      return { loading: false, error: action.payload };
    case USERS_REPOS_RESET:
      return { loading: false };
    default:
      return state;
  }
};

export const userInfoReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return { loading: true };
    case USER_INFO_SUCCESS:
      return { loading: false, info: action.payload };
    case USER_INFO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
