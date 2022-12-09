import React, { createContext, useContext } from 'react'
import { IAuthReducerSte, ILoginPayload } from '../interfaces/typesReducer'


const initial: IAuthReducerSte = {
  logged: false,
};

export interface IAuthContext {
  authSte: IAuthReducerSte,
  login?: (user: ILoginPayload) => void,
  logout?: () => void,
}

export const AuthContext = createContext<IAuthContext>({
  authSte: {
    logged: false,
  }
});


