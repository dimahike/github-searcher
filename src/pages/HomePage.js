import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LoadingBox from '../components/shared/LoadingBox';
import MessageBox from '../components//shared/MessageBox';
import { userList } from '../reducer/actions/userActions';

import './HomePage.scss';
import Field from '../components/shared/Field';

const HomePage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [timerId, setTimerId] = useState(false);

  const { loading, users, error } = useSelector((state) => state.usersRepos);

  useEffect(() => {
    // action default user list
    if (!search) {
      dispatch(userList());
    } else {
      if (timerId > 0 || undefined) {
        clearTimeout(timerId);
        delay();
      } else {
        delay();
      }
    }

    function delay() {
      setTimerId(
        setTimeout(function () {
          dispatch(userList(search));
        }, 1000),
      );
    }
  }, [search]);

  const searchHandle = (inputText) => {
    setSearch(inputText);
  };

  return (
    <div id="home">
      <div className="paper">
        <div className="title">
          <h1>GitHub Searcher</h1>
        </div>
        <div className="search">
          <Field value={search} onChangeHandle={searchHandle} placeholder="Search For User" />
        </div>

        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error} </MessageBox>
        ) : (
          <div className="user-list">
            <h3>Users:</h3>
            {users.map((user, index) => (
              <Link
                key={`${user.items[0].owner.login}_${index}`}
                to={`/github-searcher/user/${user.items[0].owner.login}`}>
                <div className="user row space-btw">
                  <div className="left">
                    <div className="sm-image">
                      <img
                        src="https://avatars.githubusercontent.com/u/61499375?v=4"
                        alt="avatar"
                      />
                    </div>
                    <span>{user.items[0].owner.login}</span>
                  </div>
                  <div className="right">
                    <span>Repo: {user.total_count}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
