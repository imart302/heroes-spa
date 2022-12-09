import React, { useReducer } from 'react';
import {
  IActionReducer,
  IAuthReducerSte,
  ILoginPayload,
  types,
} from '../interfaces/typesReducer';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

const initialSte: IAuthReducerSte = {
  logged: false,
};

const init = () => {
  const luser = localStorage.getItem('user');

  if(!luser){
    return {
      logged: false,
    }
  }

  const user = JSON.parse(luser);

  const user2 = {
    logged: true,
    ... user,
  };

  return user2;
};

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement[] | React.ReactElement;
}) => {
  const [authSte, dispatch] = useReducer(authReducer, initialSte, init);
  
  const login = (user: ILoginPayload) => {
    const action: IActionReducer = {
      type: types['[AUTH] login'],
      payload: user,
    };

    localStorage.setItem('user', JSON.stringify(user));

    dispatch(action);
  };

  const logout = () => {
    
    const action: IActionReducer = {
      type: types['[AUTH] logout'],
      payload: {},
    };

    localStorage.removeItem('user');

    dispatch(action);
  };

  return (
    <AuthContext.Provider value={{ authSte: authSte, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
