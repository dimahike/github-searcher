import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Field from '../components/shared/Field';
import LoadingBox from '../components/shared/LoadingBox';
import MessageBox from '../components/shared/MessageBox';
import { userInfo, usersRepos } from '../reducer/actions/userActions.js';
import { USERS_REPOS_RESET } from '../reducer/constants/constants';

import './UserPage.scss';

const UserPage = (props) => {
  const dispatch = useDispatch();
  const username = props.match.params.username;
  const { users, loading, error } = useSelector((state) => state.usersRepos);

  const { info, loading: loadingUserInfo, error: errorUserInfo } = useSelector(
    (state) => state.userInfo,
  );

  const [search, setSearch] = useState('');
  const [timerId, setTimerId] = useState(false);

  useEffect(() => {
    if (!info || username !== info.login) {
      dispatch(userInfo(username));
    }

    function delay() {
      setTimerId(
        setTimeout(function () {
          dispatch({ type: USERS_REPOS_RESET });
          dispatch(usersRepos(username, 10, search));
        }, 1000),
      );
    }

    if (!search) {
      dispatch(usersRepos(username, 10));
    } else {
      if (timerId > 0 || undefined) {
        clearTimeout(timerId);
        delay();
      } else {
        delay();
      }
    }
  }, [dispatch, search, username, info]);

  const searchHandle = (inputText) => {
    setSearch(inputText);
  };

  return (
    <div id="user">
      <div className="paper">
        <h1>GitHub Searcher</h1>
        {loadingUserInfo ? (
          <LoadingBox />
        ) : errorUserInfo ? (
          <MessageBox variant="danger">{errorUserInfo} </MessageBox>
        ) : (
          <>
            <div className="header row top">
              <div className="lg-image">
                <img src={info.avatar_url} alt="" />
              </div>
              <div className="description">
                <div>
                  Name: <span>{info.name ? info.name : 'Unknown'}</span>
                </div>
                <div>
                  Email: <span>{info.email ? info.email : 'Unknown'}</span>
                </div>
                <div>
                  Loacation: <span>{info.location ? info.location : 'Unknown'} </span>
                </div>
                <div>
                  Join Date: <span>{info.created_at.slice(0, 10)}</span>
                </div>
                <div>
                  <span>{info.followers}</span> Followers
                </div>
              </div>
            </div>
            <div>{info.bio ? info.bio : 'No biography'}</div>
          </>
        )}
        <div className="search">
          <Field
            value={search}
            onChangeHandle={searchHandle}
            placeholder="Search For User`s repositories"
          />
        </div>

        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error} </MessageBox>
        ) : (
          <div className="repo-list">
            <p>
              Number of Repositories : <span>{users ? users[0].total_count : 0}</span>
            </p>
            {users &&
              users[0].items.map((item) => (
                <div key={item.name} className="repo row space-btw align-center">
                  <h3 className="left">{item.name}</h3>
                  <div className="right">
                    <h4>
                      {item.forks ? item.forks : 0} <span>Forks</span>
                    </h4>
                    <h4>
                      {item.stargazers_count ? item.stargazers_count : 0} <span>Stars</span>
                    </h4>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
