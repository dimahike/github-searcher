import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { userInfoReducer, userListReducer, usersReposReducer } from './reducers/userReducers';

const initialState = {};

const reducer = combineReducers({
  userList: userListReducer,
  usersRepos: usersReposReducer,
  userInfo: userInfoReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;
