import Axios from 'axios';

import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USERS_REPOS_FAIL,
  USERS_REPOS_REQUEST,
  USERS_REPOS_SUCCESS,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
} from '../constants/constants';

export const userList = (inputSearch) => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  let requestUrl;

  if (inputSearch) {
    requestUrl = `https://api.github.com/search/users?q=${inputSearch}+in:login&per_page=10`;
  } else {
    requestUrl = 'https://api.github.com/users?per_page=10';
  }

  try {
    const { data } = await Axios.get(requestUrl, {
      headers: {
        authorization: `token ${process.env.REACT_APP_TOKEN}`,
      },
    });

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
    const {
      userList: { users },
    } = getState();

    // dispatch({ type: USERS_DETAILS_RESET });

    if (users) {
      if (users.length > 0) {
        users.forEach((user) => {
          dispatch(usersRepos(user.login, 1));
        });
      } else if (users.items && users.items.length > 0) {
        users.items.forEach((user) => {
          dispatch(usersRepos(user.login, 1));
        });
      }
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};

export const usersRepos = (user, items = 1, search = '') => async (dispatch) => {
  dispatch({ type: USERS_REPOS_REQUEST });

  try {
    const { data } = await Axios.get(
      `https://api.github.com/search/repositories?q=${search}+user:${user}&per_page=${items}`,
      {
        headers: {
          authorization: `token ${process.env.REACT_APP_TOKEN}`,
        },
      },
    );

    dispatch({ type: USERS_REPOS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: USERS_REPOS_FAIL, payload: message });
  }
};

export const userInfo = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_INFO_REQUEST });

  try {
    const { data } = await Axios.get(`https://api.github.com/users/${user}`, {
      headers: {
        authorization: `token ${process.env.REACT_APP_TOKEN}`,
      },
    });

    const userInfo = data;

    dispatch({ type: USER_INFO_SUCCESS, payload: userInfo });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: USER_INFO_FAIL, payload: message });
  }
};
