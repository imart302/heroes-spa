import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';

export const LoginPage = () => {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = () => {
    authContext.login?.({
      id: '1',
      user: 'Ivan',
    })

    const lastPath = localStorage.getItem('lastPath') || '/';

    navigate(lastPath, {
      replace: true
    });
  }

  return (
    <div className="contianer mt-5">
      <h1>Login</h1>
      <hr />

      <button className="btn btn-primary" onClick={onLogin}>
        Login
      </button>
    </div>
  );
};
