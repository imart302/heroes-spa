
export enum types { 
  '[AUTH] login',
  '[AUTH] logout',
  '[AUTH] none',
}

export interface IAuthReducerSte {
  logged: boolean,
  user?: string,
  id?: string,
}


export interface ILoginPayload {
  user: string,
  id: string,
}

export interface IActionReducer {
  type: types,
  payload: ILoginPayload | {}
}