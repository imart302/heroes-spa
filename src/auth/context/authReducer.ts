import {
  IActionReducer,
  IAuthReducerSte,
  ILoginPayload,
  types,
} from '../interfaces/typesReducer';

const initialState: IAuthReducerSte = {
  logged: false,
};

export const authReducer = (
  state: IAuthReducerSte = initialState,
  action: IActionReducer
): IAuthReducerSte => {
  switch (action.type) {
    case types['[AUTH] login']:
      const payload = action.payload as ILoginPayload;
      return {
        logged: true,
        id: payload.id,
        user: payload.user,
      };

    case types['[AUTH] logout']:
      return {
        logged: false,
      };

    default:
      return state;
  }
};
