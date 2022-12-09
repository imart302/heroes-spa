import { authReducer } from '../../../src/auth/context/authReducer';
import { vi } from 'vitest';
import { IActionReducer, types } from '../../../src/auth/interfaces/typesReducer';

describe('Tests on authReducer', () => {
  const initialState = {
    logged: false,
  };

  test('should return a default state', () => {
    const action = {
      type: types['[AUTH] none'],
      payload: {},
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  test('should (login) set the user and logged to true', () => {
    const action: IActionReducer = {
      type: types['[AUTH] login'],
      payload: {
        id: '1',
        user: 'ivan'
      },
    }

    const state = authReducer(initialState, action);

    expect(state).toEqual({
      logged: true,
      ... action.payload
    });

  });

  test('should (logout) erase user and set logged to false', () => {
      const initSte = {
        logged: true,
        id: '1',
        user: 'ivan'
      }

      const action : IActionReducer = {
        type: types['[AUTH] logout'],
        payload: {}
      }

      const state = authReducer(initSte, action);

      expect(state).toEqual({logged: false});
  });
});
